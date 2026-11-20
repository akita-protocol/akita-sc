import { Config, microAlgo } from '@algorandfoundation/algokit-utils';
import { registerDebugEventHandlers } from '@algorandfoundation/algokit-utils-debug';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { AkitaDaoSDK } from 'akita-sdk/dao';
import { newWallet, WalletFactorySDK, WalletSDK } from 'akita-sdk/wallet';
import algosdk from 'algosdk';
import { buildAkitaUniverse } from '../../../tests/fixtures/dao';
import { TimeWarp } from '../../../tests/utils/time';
import {
    errAdminOnly,
    errFactoryUpdatesNotAllowed,
    errOnlyAdminCanAddPlugin,
    errPluginDoesNotExist,
} from './errors';

/**
 * Tests for ARC58 admin and profile management functionality.
 *
 * Covers:
 * - Admin changes (arc58_changeAdmin)
 * - Profile settings (nickname, bio)
 * - Domain management
 * - Revocation app management
 * - Domain key assignment and authentication
 */
describe('ARC58 Admin & Profile', () => {
    const localnet = algorandFixture();

    let dao: AkitaDaoSDK;
    let walletFactory: WalletFactorySDK;
    let wallet: WalletSDK;
    let timeWarp: TimeWarp;

    beforeAll(async () => {
        Config.configure({
            debug: true,
        });
        registerDebugEventHandlers();

        await localnet.newScope();
        const { algorand, context: { testAccount } } = localnet;
        const sender = testAccount.toString();
        const signer = testAccount.signer;

        const dispenser = await algorand.account.dispenserFromEnvironment();
        await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

        timeWarp = new TimeWarp(algorand);

        ({ dao, walletFactory } = await buildAkitaUniverse({
            fixture: localnet,
            sender,
            signer,
            apps: {},
        }));
    });

    beforeEach(async () => {
        await localnet.newScope();
        const { algorand, context: { testAccount } } = localnet;
        const sender = testAccount.toString();
        const signer = testAccount.signer;

        const dispenser = await algorand.account.dispenserFromEnvironment();
        await algorand.account.ensureFunded(sender, dispenser.addr, (100).algos());

        timeWarp = new TimeWarp(algorand);

        wallet = await newWallet({
            factoryParams: {
                appId: walletFactory.appId,
                defaultSender: sender,
                defaultSigner: signer,
            },
            readerAccount: sender,
            algorand,
            nickname: 'test_wallet',
        });

        // Fund wallet
        await wallet.client.appClient.fundAppAccount({
            amount: (5).algos(),
        });
    });

    // ==================================================================================
    // Admin Change Tests
    // ==================================================================================

    describe('Admin Changes', () => {
        test('admin can change admin via arc58_changeAdmin', async () => {
            const { context: { testAccount, generateAccount } } = localnet;
            const sender = testAccount.toString();

            // Create a new admin account
            const newAdmin = await generateAccount({ initialFunds: (10).algos() });

            // Change admin
            await wallet.client.send.arc58ChangeAdmin({
                sender,
                args: { newAdmin: newAdmin.toString() },
            });

            // Verify admin was changed
            const result = await wallet.client.send.arc58GetAdmin({
                sender: newAdmin.toString(),
                signer: newAdmin.signer,
                args: {},
            });
            expect(result.return).toBe(newAdmin.toString());
        });

        test('non-admin cannot change admin', async () => {
            const { context: { generateAccount } } = localnet;

            // Create two accounts - one for new admin, one attacker
            const newAdmin = await generateAccount({ initialFunds: (10).algos() });
            const attacker = await generateAccount({ initialFunds: (10).algos() });

            let error = 'no error thrown';
            try {
                await wallet.client.send.arc58ChangeAdmin({
                    sender: attacker.toString(),
                    signer: attacker.signer,
                    args: { newAdmin: newAdmin.toString() },
                });
            } catch (e: any) {
                error = e.message;
            }

            expect(error).toContain(errAdminOnly);
        });

        test('lastChange and lastUserInteraction updated after admin change', async () => {
            const { context: { testAccount, generateAccount } } = localnet;
            const sender = testAccount.toString();

            const stateBefore = await wallet.client.state.global.getAll();
            const lastChangeBefore = stateBefore.lastChange ?? 0n;
            const lastInteractionBefore = stateBefore.lastUserInteraction ?? 0n;

            // Advance the chain time so the subsequent change gets a strictly-greater
            // block timestamp; otherwise localnet can produce the next block in the
            // same second and the assertion degenerates to "did not decrease".
            await timeWarp.timeWarp(2n);

            const newAdmin = await generateAccount({ initialFunds: (10).algos() });

            await wallet.client.send.arc58ChangeAdmin({
                sender,
                args: { newAdmin: newAdmin.toString() },
            });

            const stateAfter = await wallet.client.state.global.getAll();
            expect(stateAfter.lastChange).toBeGreaterThan(lastChangeBefore);
            expect(stateAfter.lastUserInteraction).toBeGreaterThan(lastInteractionBefore);
        });
    });

    // ==================================================================================
    // Profile Management Tests
    // ==================================================================================

    describe('Profile Management', () => {
        test('admin can set nickname', async () => {
            const { context: { testAccount } } = localnet;
            const sender = testAccount.toString();

            const newNickname = 'my_new_nickname';

            await wallet.client.send.setNickname({
                sender,
                args: { nickname: newNickname },
            });

            const walletState = await wallet.client.state.global.getAll();
            expect(walletState.nickname).toBe(newNickname);
        });

        test('non-admin cannot set nickname', async () => {
            const { context: { generateAccount } } = localnet;

            const attacker = await generateAccount({ initialFunds: (10).algos() });

            let error = 'no error thrown';
            try {
                await wallet.client.send.setNickname({
                    sender: attacker.toString(),
                    signer: attacker.signer,
                    args: { nickname: 'hacked' },
                });
            } catch (e: any) {
                error = e.message;
            }

            expect(error).toContain(errAdminOnly);
        });

        test('admin can set bio', async () => {
            const { context: { testAccount } } = localnet;
            const sender = testAccount.toString();

            const newBio = 'This is my wallet bio description';

            await wallet.client.send.setBio({
                sender,
                args: { bio: newBio },
            });

            const walletState = await wallet.client.state.global.getAll();
            expect(walletState.bio).toBe(newBio);
        });

        // Note: Avatar and Banner tests require staking contract integration
        // which is tested through the DAO plugin system in dao.plugins.e2e.spec.ts
    });

    // ==================================================================================
    // Domain Management Tests
    // ==================================================================================

    describe('Domain Management', () => {
        test('admin can set domain', async () => {
            const { context: { testAccount } } = localnet;
            const sender = testAccount.toString();

            const newDomain = 'custom.domain';

            await wallet.client.send.setDomain({
                sender,
                args: { domain: newDomain },
            });

            const walletState = await wallet.client.state.global.getAll();
            expect(walletState.domain).toBe(newDomain);
        });

        test('non-admin cannot set domain', async () => {
            const { context: { generateAccount } } = localnet;

            const attacker = await generateAccount({ initialFunds: (10).algos() });

            let error = 'no error thrown';
            try {
                await wallet.client.send.setDomain({
                    sender: attacker.toString(),
                    signer: attacker.signer,
                    args: { domain: 'evil.domain' },
                });
            } catch (e: any) {
                error = e.message;
            }

            expect(error).toContain(errAdminOnly);
        });

        test('admin can assign domain key to passkey', async () => {
            const { context: { testAccount, generateAccount } } = localnet;
            const sender = testAccount.toString();

            // Create a passkey account
            const passkey = await generateAccount({ initialFunds: (1).algos() });

            // Fund wallet for domain key box MBR
            const mbr = await wallet.getMbr({
                escrow: '',
                methodCount: 0n,
                plugin: 'akita.community', // Use domain as plugin to calculate MBR
                groups: 0n,
            });
            await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.domainKeys) });

            // Assign domain to the passkey
            await wallet.client.send.assignDomain({
                sender,
                extraFee: microAlgo(1_000),
                args: {
                    caller: passkey.toString(),
                    domain: 'akita.community',
                },
            });

            // Verify domain key was assigned
            expect(await wallet.getDomainKey(passkey.toString())).toBe('akita.community');
        });

        test('domain key holder can act as admin', async () => {
            const { context: { testAccount, generateAccount } } = localnet;
            const sender = testAccount.toString();

            // Get the wallet's domain
            const walletState = await wallet.client.state.global.getAll();
            const walletDomain = walletState.domain;

            // Create a passkey account
            const passkey = await generateAccount({ initialFunds: (10).algos() });

            // Fund wallet for domain key box MBR
            const mbr = await wallet.getMbr({
                escrow: '',
                methodCount: 0n,
                plugin: walletDomain ?? '',
                groups: 0n,
            });
            await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.domainKeys) });

            // Assign the wallet's domain to the passkey
            await wallet.client.send.assignDomain({
                sender,
                extraFee: microAlgo(1_000),
                args: {
                    caller: passkey.toString(),
                    domain: walletDomain ?? '',
                },
            });

            // Now the passkey should be able to act as admin
            // Test by setting nickname using the passkey
            const newNickname = 'nickname_set_by_passkey';
            await wallet.client.send.setNickname({
                sender: passkey.toString(),
                signer: passkey.signer,
                args: { nickname: newNickname },
            });

            const updatedState = await wallet.client.state.global.getAll();
            expect(updatedState.nickname).toBe(newNickname);
        });

        test('admin can remove a domain key and the passkey loses admin', async () => {
            const { context: { testAccount, generateAccount } } = localnet;
            const sender = testAccount.toString();

            const walletDomain = (await wallet.client.state.global.getAll()).domain ?? '';
            const passkey = await generateAccount({ initialFunds: (10).algos() });

            const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: walletDomain, groups: 0n });
            await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.domainKeys) });

            await wallet.assignDomain({ sender, caller: passkey.toString(), domain: walletDomain });
            expect(await wallet.getDomainKey(passkey.toString())).toBe(walletDomain);

            await wallet.removeDomainKey({ sender, address: passkey.toString() });
            expect(await wallet.getDomainKey(passkey.toString())).toBeUndefined();

            let error = 'no error thrown';
            try {
                await wallet.client.send.setNickname({
                    sender: passkey.toString(),
                    signer: passkey.signer,
                    args: { nickname: 'should_fail' },
                });
            } catch (e: any) {
                error = e.message;
            }
            expect(error).toContain(errAdminOnly);
        });

        test('non-admin cannot remove a domain key', async () => {
            const { context: { testAccount, generateAccount } } = localnet;
            const sender = testAccount.toString();

            const passkey = await generateAccount({ initialFunds: (1).algos() });
            const attacker = await generateAccount({ initialFunds: (10).algos() });

            const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: 'akita.community', groups: 0n });
            await wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.domainKeys) });

            await wallet.client.send.assignDomain({
                sender,
                extraFee: microAlgo(1_000),
                args: { caller: passkey.toString(), domain: 'akita.community' },
            });

            let error = 'no error thrown';
            try {
                // ACC-06: revocation is assignDomain(key, ''), which is admin-gated
                await wallet.client.send.assignDomain({
                    sender: attacker.toString(),
                    signer: attacker.signer,
                    args: { caller: passkey.toString(), domain: '' },
                });
            } catch (e: any) {
                error = e.message;
            }
            expect(error).toContain(errOnlyAdminCanAddPlugin);
        });

        // ACC-06: revocation is assignDomain(key, ''), which is a no-op for a key that has no
        // domain (it neither fails nor creates a box).
        test('revoking a key without a domain is a no-op', async () => {
            const { context: { testAccount, generateAccount } } = localnet;
            const sender = testAccount.toString();

            const passkey = await generateAccount({ initialFunds: (1).algos() });
            const before = await localnet.algorand.account.getInformation(wallet.client.appAddress);

            await wallet.client.send.assignDomain({
                sender,
                args: { caller: passkey.toString(), domain: '' },
            });

            expect(await wallet.getDomainKey(passkey.toString())).toBeUndefined();
            const after = await localnet.algorand.account.getInformation(wallet.client.appAddress);
            expect(after.minBalance.microAlgos).toBe(before.minBalance.microAlgos);
        });
    });

    // ==================================================================================
    // MBR Refunds (external controlled address)
    // ==================================================================================

    describe('MBR refunds to an external controlled address', () => {
        let externalWallet: WalletSDK;
        let controlled: string;

        beforeEach(async () => {
            const { algorand, context: { testAccount } } = localnet;
            const sender = testAccount.toString();
            const signer = testAccount.signer;

            const externalAccount = algorand.account.random();
            controlled = externalAccount.addr.toString();

            const dispenser = await algorand.account.dispenserFromEnvironment();
            await algorand.send.payment({
                sender: dispenser.addr,
                signer: dispenser.signer,
                receiver: controlled,
                amount: (10).algos(),
            });

            // SG-04: the SDK rekeys the external account to the factory inside the creation group;
            // the factory then rekeys it to the new wallet during newAccount()
            externalWallet = await walletFactory.new({
                sender,
                signer,
                nickname: 'external_controlled',
                controlledAddress: controlled,
                controlledSigner: externalAccount.signer,
            });
            await externalWallet.register({ sender, signer, escrow: '' });
        });

        const balanceOf = async (address: string) =>
            (await localnet.algorand.account.getInformation(address)).balance.microAlgos;

        test('arc58_removePlugin refunds the plugin box MBR', async () => {
            const { context: { testAccount } } = localnet;
            const sender = testAccount.toString();

            const methods: [Uint8Array, bigint][] = [
                [new Uint8Array([1, 2, 3, 4]), 0n],
                [new Uint8Array([5, 6, 7, 8]), 0n],
            ];
            const mbr = await externalWallet.getMbr({ escrow: '', methodCount: 2n, plugin: '', groups: 0n });

            const before = await balanceOf(controlled);

            await externalWallet.client.send.arc58AddPlugin({
                sender,
                signer: testAccount.signer,
                extraFee: microAlgo(1_000),
                args: {
                    plugin: dao.appId,
                    caller: sender,
                    escrow: '',
                    admin: false,
                    delegationType: 0,
                    lastValid: 2n ** 64n - 1n,
                    cooldown: 0n,
                    methods,
                    useRounds: false,
                    useExecutionKey: false,
                    coverFees: false,
                    canReclaim: false,
                    defaultToEscrow: false,
                },
            });

            expect(await balanceOf(controlled)).toBe(before - mbr.plugins);

            await externalWallet.client.send.arc58RemovePlugin({
                sender,
                signer: testAccount.signer,
                extraFee: microAlgo(1_000),
                args: { plugin: dao.appId, caller: sender, escrow: '' },
            });

            expect(await balanceOf(controlled)).toBe(before);
        });

        test('revoking a domain key (assignDomain with an empty domain) refunds the domain box MBR', async () => {
            const { context: { testAccount, generateAccount } } = localnet;
            const sender = testAccount.toString();

            const passkey = await generateAccount({ initialFunds: (1).algos() });
            const domain = 'akita.community';
            const mbr = await externalWallet.getMbr({ escrow: '', methodCount: 0n, plugin: domain, groups: 0n });

            const before = await balanceOf(controlled);

            await externalWallet.client.send.assignDomain({
                sender,
                signer: testAccount.signer,
                extraFee: microAlgo(1_000),
                args: { caller: passkey.toString(), domain },
            });

            expect(await balanceOf(controlled)).toBe(before - mbr.domainKeys);

            await externalWallet.client.send.assignDomain({
                sender,
                signer: testAccount.signer,
                extraFee: microAlgo(1_000),
                args: { caller: passkey.toString(), domain: '' },
            });

            expect(await balanceOf(controlled)).toBe(before);
        });

        test('assignDomain on an existing key refunds the old box before charging the new one', async () => {
            const { context: { testAccount, generateAccount } } = localnet;
            const sender = testAccount.toString();
            const signer = testAccount.signer;

            const passkey = await generateAccount({ initialFunds: (1).algos() });
            const first = 'a.co';
            const second = 'akita.community';
            const mbrFirst = (await externalWallet.getMbr({ escrow: '', methodCount: 0n, plugin: first, groups: 0n })).domainKeys;
            const mbrSecond = (await externalWallet.getMbr({ escrow: '', methodCount: 0n, plugin: second, groups: 0n })).domainKeys;

            const before = await balanceOf(controlled);

            await externalWallet.assignDomain({ sender, signer, caller: passkey.toString(), domain: first });
            expect(await balanceOf(controlled)).toBe(before - mbrFirst);

            await externalWallet.assignDomain({ sender, signer, caller: passkey.toString(), domain: second });
            expect(await balanceOf(controlled)).toBe(before - mbrSecond);

            expect(await externalWallet.getDomainKey(passkey.toString())).toBe(second);

            await externalWallet.removeDomainKey({ sender, signer, address: passkey.toString() });
            expect(await balanceOf(controlled)).toBe(before);
        });

        test('a name orphaned by arc58_removePlugin can still be removed', async () => {
            const { context: { testAccount } } = localnet;
            const sender = testAccount.toString();
            const signer = testAccount.signer;

            const name = 'orphan';
            const mbr = await externalWallet.getMbr({ escrow: '', methodCount: 0n, plugin: name, groups: 0n });
            const pluginArgs = {
                plugin: dao.appId,
                caller: sender,
                escrow: '',
                admin: false,
                delegationType: 0,
                lastValid: 2n ** 64n - 1n,
                cooldown: 0n,
                methods: [] as [Uint8Array, bigint][],
                useRounds: false,
                useExecutionKey: false,
                coverFees: false,
                canReclaim: false,
                defaultToEscrow: false,
            };

            const before = await balanceOf(controlled);

            await externalWallet.client.send.arc58AddNamedPlugin({
                sender,
                signer,
                extraFee: microAlgo(1_000),
                args: { name, ...pluginArgs },
            });
            expect(await balanceOf(controlled)).toBe(before - mbr.plugins - mbr.namedPlugins);

            // Removing by key leaves the name box behind
            await externalWallet.client.send.arc58RemovePlugin({
                sender,
                signer,
                extraFee: microAlgo(1_000),
                args: { plugin: dao.appId, caller: sender, escrow: '' },
            });
            expect(await balanceOf(controlled)).toBe(before - mbr.namedPlugins);

            // The name can still be removed, refunding only the name box
            await externalWallet.client.send.arc58RemoveNamedPlugin({
                sender,
                signer,
                extraFee: microAlgo(1_000),
                args: { name },
            });
            expect(await balanceOf(controlled)).toBe(before);

            let error = 'no error thrown';
            try {
                await externalWallet.client.send.arc58GetNamedPluginKey({
                    sender,
                    signer,
                    args: { name },
                });
            } catch (e: any) {
                error = e.message;
            }
            expect(error).toContain(errPluginDoesNotExist);
        });
    });

    // ==================================================================================
    // Revocation App Tests
    // ==================================================================================

    describe('Revocation App Management', () => {
        test('admin can set revocation app', async () => {
            const { context: { testAccount } } = localnet;
            const sender = testAccount.toString();

            // Use a different app ID as the revocation app (using the DAO as an example)
            const newRevocationApp = dao.appId;

            await wallet.client.send.setRevocationApp({
                sender,
                args: { app: newRevocationApp },
            });

            const walletState = await wallet.client.state.global.getAll();
            expect(walletState.revocation).toBe(newRevocationApp);
        });

        test('non-admin cannot set revocation app', async () => {
            const { context: { generateAccount } } = localnet;

            const attacker = await generateAccount({ initialFunds: (10).algos() });

            let error = 'no error thrown';
            try {
                await wallet.client.send.setRevocationApp({
                    sender: attacker.toString(),
                    signer: attacker.signer,
                    args: { app: 12345n },
                });
            } catch (e: any) {
                error = e.message;
            }

            expect(error).toContain(errAdminOnly);
        });
    });

    // ==================================================================================
    // Read Admin Tests
    // ==================================================================================

    describe('Get Admin', () => {
        test('arc58_getAdmin executes as a confirmed ungrouped NoOp from the global admin, given read budget for the program', async () => {
            const { algorand, context: { testAccount } } = localnet;
            const sender = testAccount.toString();

            const method = algosdk.ABIMethod.fromSignature('arc58_getAdmin()address');
            const bare = {
                sender,
                signer: testAccount.signer,
                appId: wallet.client.appId,
                args: [method.getSelector()],
            };

            // The wallet program has been larger than 8,192 bytes since 2026-11-20. The node charges a
            // program's bytes above 8,192 to the group's box read budget, once for each such app the group
            // touches, so a group that names no box is refused before the call runs.
            const app = await algorand.app.getById(wallet.client.appId);
            const above = app.approvalProgram.length + app.clearStateProgram.length - 8_192;
            expect(above).toBeGreaterThan(0);
            await expect(algorand.send.appCall({ ...bare, note: 'no box reference', populateAppCallResources: false }))
                .rejects.toThrow(`read budget exceeded (${above} > 0)`);

            // Left to the SDK's builder, the same call goes out as one transaction at the minimum fee, with
            // the one reference the builder found by simulation.
            const built = await algorand.send.appCall({ ...bare, note: 'built by the SDK', populateAppCallResources: true });
            expect(built.transactions).toHaveLength(1);
            expect(built.transactions[0].fee).toBe(1_000n);
            expect(built.transactions[0].applicationCall?.access).toHaveLength(1);

            // A hand-built call needs one box reference, which may be empty: it adds 2,048 bytes of budget.
            const result = await algorand.send.appCall({
                ...bare,
                boxReferences: [{ appId: 0n, name: new Uint8Array(0) }],
                populateAppCallResources: false,
            });

            expect(result.txIds).toHaveLength(1);
            expect(result.transactions).toHaveLength(1);
            expect(result.confirmations).toHaveLength(1);
            expect(result.groupId).toBeUndefined();
            expect(result.transactions[0].group).toBeUndefined();
            expect(result.confirmation.confirmedRound).toBeGreaterThan(0n);

            const returnLog = result.confirmation.logs?.at(-1);
            expect(returnLog).toHaveLength(36);
            expect(returnLog?.slice(4)).toEqual(algosdk.decodeAddress(sender).publicKey);
        });

        test('arc58_verifyAuthAddress is rejected as a standalone controller proof', async () => {
            const { context: { testAccount } } = localnet;
            const sender = testAccount.toString();

            await expect(wallet.client.send.arc58VerifyAuthAddress({
                sender,
                args: {},
            })).rejects.toThrow();
        });

        test('arc58_getAdmin returns new admin after change', async () => {
            const { context: { testAccount, generateAccount } } = localnet;
            const sender = testAccount.toString();

            const newAdmin = await generateAccount({ initialFunds: (10).algos() });

            await wallet.client.send.arc58ChangeAdmin({
                sender,
                args: { newAdmin: newAdmin.toString() },
            });

            const result = await wallet.client.send.arc58GetAdmin({
                sender: newAdmin.toString(),
                signer: newAdmin.signer,
                args: {},
            });

            expect(result.return).toBe(newAdmin.toString());
        });
    });

    // ==================================================================================
    // Factory Update Settings Tests
    // ==================================================================================

    describe('Factory Update Settings', () => {
        test('wallets default to automatic updates', async () => {
            const walletState = await wallet.client.state.global.getAll();
            expect(walletState.factoryUpdateSettings).toEqual({ allowed: true, automatic: true });
        });

        test('automaticUpdates = false at creation requires the admin to trigger updates', async () => {
            const { context: { testAccount, generateAccount } } = localnet;
            const sender = testAccount.toString();
            const signer = testAccount.signer;

            const manualWallet = await walletFactory.new({
                sender,
                signer,
                nickname: 'manual_updates',
                automaticUpdates: false,
            });

            const walletState = await manualWallet.client.state.global.getAll();
            expect(walletState.factoryUpdateSettings).toEqual({ allowed: true, automatic: false });

            const stranger = await generateAccount({ initialFunds: (10).algos() });

            let error = 'no error thrown';
            try {
                await walletFactory.client.send.updateWallet({
                    sender: stranger.toString(),
                    signer: stranger.signer,
                    args: { wallet: manualWallet.appId },
                });
            } catch (e: any) {
                error = e.message;
            }
            expect(error).toContain(errAdminOnly);

            // The admin can still pull the factory's code. The inner update carries the wallet program, and a
            // program above 8,192 bytes costs more than one minimum fee (56 µALGO more for the tree wallet),
            // so the client sizes the fee, under a ceiling.
            const updated = await walletFactory.client.send.updateWallet({
                sender,
                signer,
                coverAppCallInnerTransactionFees: true,
                maxFee: microAlgo(10_000),
                args: { wallet: manualWallet.appId },
            });
            expect(updated.transactions[0].fee).toBeGreaterThan(2_000n);
            expect(updated.transactions[0].fee).toBeLessThan(3_000n);
        });

        test('admin can set factory update settings', async () => {
            const { context: { testAccount } } = localnet;
            const sender = testAccount.toString();

            // Wallets are created with { allowed: true, automatic: true } by default.
            // Flip both off so the assertion has something to observe.
            await wallet.client.send.setFactoryUpdateSettings({
                sender,
                args: { allowed: false, automatic: false },
            });

            const walletState = await wallet.client.state.global.getAll();
            expect(walletState.factoryUpdateSettings).toEqual({
                allowed: false,
                automatic: false,
            });
        });

        test('factory cannot update wallet when allowed is false', async () => {
            const { context: { testAccount } } = localnet;
            const sender = testAccount.toString();

            // Disable factory updates entirely. `automatic` is irrelevant once
            // `allowed` is false — the `allowed` check fires first.
            await wallet.client.send.setFactoryUpdateSettings({
                sender,
                args: { allowed: false, automatic: true },
            });

            let error = 'no error thrown';
            try {
                await walletFactory.client.send.updateWallet({
                    sender,
                    signer: testAccount.signer,
                    args: { wallet: wallet.appId },
                });
            } catch (e: any) {
                error = e.message;
            }

            expect(error).toContain(errFactoryUpdatesNotAllowed);
        });

        test('factory cannot auto-update wallet when automatic is false and caller is not admin', async () => {
            const { context: { testAccount, generateAccount } } = localnet;
            const sender = testAccount.toString();

            // Allow updates, but require admin to initiate them.
            await wallet.client.send.setFactoryUpdateSettings({
                sender,
                args: { allowed: true, automatic: false },
            });

            const attacker = await generateAccount({ initialFunds: (10).algos() });

            let error = 'no error thrown';
            try {
                await walletFactory.client.send.updateWallet({
                    sender: attacker.toString(),
                    signer: attacker.signer,
                    args: { wallet: wallet.appId },
                });
            } catch (e: any) {
                error = e.message;
            }

            expect(error).toContain(errAdminOnly);
        });
    });
});
