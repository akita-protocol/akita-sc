import { Config, microAlgo } from '@algorandfoundation/algokit-utils';
import { registerDebugEventHandlers } from '@algorandfoundation/algokit-utils-debug';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { AkitaDaoSDK } from 'akita-sdk/dao';
import { newWallet, WalletFactorySDK, WalletSDK } from 'akita-sdk/wallet';
import { buildAkitaUniverse } from '../../../tests/fixtures/dao';
import { TimeWarp } from '../../../tests/utils/time';
import {
    ERR_ADMIN_ONLY,
    ERR_FACTORY_UPDATES_NOT_ALLOWED,
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

            expect(error).toContain(ERR_ADMIN_ONLY);
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

            expect(error).toContain(ERR_ADMIN_ONLY);
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

            expect(error).toContain(ERR_ADMIN_ONLY);
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
            const result = await wallet.client.send.arc58GetDomainKeys({
                sender,
                args: { addresses: [passkey.toString()] },
            });

            expect(result.return?.[0]).toBe('akita.community');
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

            expect(error).toContain(ERR_ADMIN_ONLY);
        });
    });

    // ==================================================================================
    // Read Admin Tests
    // ==================================================================================

    describe('Get Admin', () => {
        test('arc58_getAdmin returns correct admin', async () => {
            const { context: { testAccount } } = localnet;
            const sender = testAccount.toString();

            const result = await wallet.client.send.arc58GetAdmin({
                sender,
                args: {},
            });

            expect(result.return).toBe(sender);
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
                    args: { wallet: wallet.appId },
                });
            } catch (e: any) {
                error = e.message;
            }

            expect(error).toContain(ERR_FACTORY_UPDATES_NOT_ALLOWED);
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

            expect(error).toContain(ERR_ADMIN_ONLY);
        });
    });
});
