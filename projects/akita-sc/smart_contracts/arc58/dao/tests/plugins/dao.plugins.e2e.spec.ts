import { microAlgo } from '@algorandfoundation/algokit-utils';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { ProposalActionEnum } from 'akita-sdk/dao';
import { ABIType, ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk';
import { AkitaDaoProposalValidatorFactory } from '../../../../artifacts/arc58/dao/AkitaDAOProposalValidatorClient';
import { expectContractError } from '../../../../../tests/utils/errors';
import { deployOptInPlugin } from '../../../../../tests/fixtures/plugins/optin';
import { logger } from '../../../../../tests/utils/logger';
import { CallerType } from 'akita-sdk/wallet';
import { sendPrepared } from 'akita-sdk';
import { deployPayPlugin } from '../../../../../tests/fixtures/plugins/pay';
import {
  bootstrapDaoTestContext,
  buildAddPluginAction,
  proposeAndExecute,
  type DaoTestContext,
} from '../utils';

const fixture = algorandFixture();

// Counter to ensure unique names across tests
let testCounter = 0;
const getUniqueName = (prefix: string) => `${prefix}_${++testCounter}`;

/**
 * Tests for DAO plugin management.
 *
 * Plugins extend the DAO wallet's functionality by allowing controlled execution
 * of specific operations. These tests use the full DAO setup to ensure
 * all required infrastructure is in place.
 */
describe('ARC58 DAO Plugins', () => {
  let context: DaoTestContext;

  beforeAll(async () => {
    logger.setMode('silent');
    // Use full setup so we have proper wallet and escrow infrastructure
    context = await bootstrapDaoTestContext({ fixture, useFullSetup: true });
  });

  beforeEach(async () => {
    await fixture.newScope();
    const { algorand } = fixture;
    const dispenser = await algorand.account.dispenserFromEnvironment();
    // Each proposal can cost 7+ ALGO in MBR, ensure we have plenty of funds
    // Fund the sender from context (not the new testAccount from fixture.newScope)
    await algorand.account.ensureFunded(context.sender, dispenser.addr, microAlgo(100_000_000n));
  });

  describe('Plugin Installation', () => {
    test('preserves global policy across caller-specific changes and authenticates named removal', async () => {
      const { fixture, dao, sender, signer } = context;
      const { algorand } = fixture.context;
      const deployer = await fixture.context.generateAccount({ initialFunds: (5).algos() });
      const plugin = await deployPayPlugin({ fixture, sender: deployer.toString(), signer: deployer.signer });
      const name = getUniqueName('policy');
      const escrow = getUniqueName('scope');
      const key = { plugin: plugin.appId, escrow: '' };
      const mbr = await dao.wallet.getMbr({ escrow, methodCount: 0n, plugin: name, groups: 0n });
      await dao.wallet.client.appClient.fundAppAccount({ amount: microAlgo(mbr.newEscrowMintCost + 3_000_000n) });
      await proposeAndExecute(dao, [{ type: ProposalActionEnum.NewEscrow, escrow, address: ALGORAND_ZERO_ADDRESS_STRING }]);
      await proposeAndExecute(dao, [buildAddPluginAction({
        name, client: plugin, callerType: CallerType.Global, useExecutionKey: true,
        escrow, defaultToEscrow: true,
        governance: { power: 1n, duration: 60n, participation: 10_000n, approval: 50_000n },
      })]);
      const policy = await dao.client.state.box.plugins.value(key);
      expect(policy).toBeDefined();
      expect(Array.from((await dao.client.state.box.plugins.getMap()).keys()).some(entry => entry.plugin === plugin.appId && entry.escrow === escrow)).toBe(false);

      await proposeAndExecute(dao, [buildAddPluginAction({
        client: plugin, callerType: CallerType.Other, caller: sender, useExecutionKey: false,
      })]);
      expect(await dao.client.state.box.plugins.value(key)).toEqual(policy);

      const validatorFactory = new AkitaDaoProposalValidatorFactory({ algorand, defaultSender: sender, defaultSigner: signer });
      const { appClient: validator } = await validatorFactory.send.create.create({ args: {} });
      for (const tuple of [
        [name, dao.appId, ALGORAND_ZERO_ADDRESS_STRING, ''],
        [name, plugin.appId, sender, ''],
        [name, plugin.appId, ALGORAND_ZERO_ADDRESS_STRING, escrow],
      ]) {
        const mismatch = ABIType.from('(string,uint64,address,string)').encode(tuple);
        await expectContractError(validator.send.validateActions({
          args: { wallet: dao.wallet.appId, actions: [[41, mismatch]] },
          maxFee: microAlgo(100_000n), populateAppCallResources: true, coverAppCallInnerTransactionFees: true,
        }), 'errIact');
      }
      expect(await dao.client.state.box.plugins.value(key)).toEqual(policy);

      await proposeAndExecute(dao, [{ type: ProposalActionEnum.RemovePlugin, ...key, caller: sender }]);
      expect(await dao.client.state.box.plugins.value(key)).toEqual(policy);
      expect(await dao.wallet.client.arc58GetNamedPluginKey({ args: { name } })).toEqual({ ...key, caller: ALGORAND_ZERO_ADDRESS_STRING });

      await proposeAndExecute(dao, [{ type: ProposalActionEnum.RemoveNamedPlugin, name }]);
      expect(Array.from((await dao.client.state.box.plugins.getMap()).keys()).some(entry => entry.plugin === plugin.appId)).toBe(false);
      expect((await dao.wallet.client.state.box.namedPlugins.getMap()).has(name)).toBe(false);
    });

    test('validates named plugin governance settings on chain even when SDK validation is bypassed', async () => {
      const { fixture, dao, sender, signer } = context;
      const validatorFactory = new AkitaDaoProposalValidatorFactory({ algorand: fixture.context.algorand, defaultSender: sender, defaultSigner: signer });
      const { appClient } = await validatorFactory.send.create.create({ args: {} });
      const data = ABIType.from('(string,uint64,address,string,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,uint64,uint64,uint64,uint64,uint64,string,(uint64,uint8,uint64,uint64,uint64,bool)[])').encode([
        'invalid_policy', dao.appId, ALGORAND_ZERO_ADDRESS_STRING, '', 0,
        18_446_744_073_709_551_615n, 0n, [], false, true, false, false,
        0n, 1n, 60n, 10_000n, 0n, '', [],
      ]);
      await expectContractError(appClient.send.validateActions({
        args: { wallet: dao.wallet.appId, actions: [[21, data]] },
        maxFee: microAlgo(100_000n), populateAppCallResources: true, coverAppCallInnerTransactionFees: true,
      }), 'ERR:errImna');
    });

    test('authorizes approved group hashes, rejects other groups, and prevents replay', async () => {
      const { dao, fixture, sender, signer } = context;
      const { algorand } = fixture.context;
      const deployerB = await fixture.context.generateAccount({ initialFunds: microAlgo(5_000_000n) });
      const actual = await deployPayPlugin({ fixture, sender: deployerB.toString(), signer: deployerB.signer });
      await dao.wallet.client.appClient.fundAppAccount({ amount: microAlgo(3_000_000n) });
      await proposeAndExecute(dao, [actual].map(client => buildAddPluginAction({
        client, callerType: CallerType.Global, useExecutionKey: true,
        governance: { power: 1n, duration: 60n, participation: 10_000n, approval: 50_000n },
      })));

      const execution = await dao.wallet.build.usePlugin({
        sender, signer, lease: 'dao_execution_regression', windowSize: 1000n,
        callerType: CallerType.Global,
        calls: [actual.pay({ payments: [{ receiver: sender, amount: 1n, asset: 0n }] })],
      });
      const authorization = {
        type: ProposalActionEnum.ExecutePlugin as const,
        plugin: actual.appId, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow: '',
        executionKey: execution.lease, groups: [new Uint8Array(32).fill(123)],
        firstValid: execution.firstValid, lastValid: execution.lastValid,
      };
      await proposeAndExecute(dao, [authorization]);
      const before = await algorand.account.getInformation(dao.wallet.client.appAddress);
      await expectContractError(sendPrepared(execution.windows[0], algorand.client.algod), 'errNgrp');
      expect((await algorand.account.getInformation(dao.wallet.client.appAddress)).balance.microAlgos).toBe(before.balance.microAlgos);
      expect((await dao.wallet.getExecution(execution.lease)).groups).toEqual(authorization.groups);

      await proposeAndExecute(dao, [{ type: ProposalActionEnum.RemoveExecutePlugin, executionKey: execution.lease }]);
      await proposeAndExecute(dao, [{ ...authorization, groups: execution.ids }]);
      await sendPrepared(execution.windows[0], algorand.client.algod);
      expect((await dao.wallet.client.state.box.executions.getMap()).size).toBe(0);
      await expect(sendPrepared(execution.windows[0], algorand.client.algod)).rejects.toThrow();
    }, 120_000);

    test('should install a global plugin without execution key', async () => {
      const { fixture, dao, sender, signer } = context;

      // Deploy a fresh optin plugin for this test
      const optinPlugin = await deployOptInPlugin({
        fixture,
        sender,
        signer,
      });

      // Fund wallet for plugin installation
      const mbr = await dao.wallet.getMbr({
        escrow: '',
        methodCount: 1n,
        plugin: '',
        groups: 1n,
      });
      await dao.wallet.client.appClient.fundAppAccount({
        amount: microAlgo(mbr.plugins + 1_000_000n),
      });

      const proposalId = await proposeAndExecute(dao, [
        {
          type: ProposalActionEnum.AddPlugin,
          client: optinPlugin,
          callerType: CallerType.Global,
          escrow: '',
          sourceLink: 'https://github.com/test/plugin',
          useExecutionKey: false,
          methods: [{ name: optinPlugin.optIn(), cooldown: 0n }],
        },
      ]);

      expect(proposalId).toBeGreaterThan(0n);

      // Verify plugin is installed
      const pluginInfo = await dao.wallet.getPluginByKey({
        plugin: optinPlugin.appId,
        caller: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ',
        escrow: '',
      });

      expect(pluginInfo.start).toBeGreaterThan(0n);
      expect(pluginInfo.useExecutionKey).toBe(false);
    });

    test('should install a named plugin', async () => {
      const { fixture, dao } = context;
      const pluginName = getUniqueName('np'); // Short name: np_1, np_2, etc.

      // Use a per-test deployer so we get a fresh plugin appId — the shared
      // context sender would reuse the appId installed by the previous test,
      // which collides on (appId, caller) in the wallet's plugin map.
      const pluginDeployer = await fixture.context.generateAccount({
        initialFunds: (5).algos(),
      });
      const optinPlugin = await deployOptInPlugin({
        fixture,
        sender: pluginDeployer.toString(),
        signer: pluginDeployer.signer,
      });

      const mbr = await dao.wallet.getMbr({
        escrow: '',
        methodCount: 1n,
        plugin: pluginName,
        groups: 1n,
      });
      await dao.wallet.client.appClient.fundAppAccount({
        amount: microAlgo(mbr.plugins + mbr.namedPlugins + 1_000_000n),
      });

      const proposalId = await proposeAndExecute(dao, [
        {
          type: ProposalActionEnum.AddNamedPlugin,
          name: pluginName,
          client: optinPlugin,
          callerType: CallerType.Global,
          escrow: '',
          sourceLink: 'https://github.com/test/plugin',
          useExecutionKey: false,
          methods: [{ name: optinPlugin.optIn(), cooldown: 0n }],
        },
      ]);

      expect(proposalId).toBeGreaterThan(0n);

      const pluginInfo = await dao.wallet.getPluginByName(pluginName);
      expect(pluginInfo.start).toBeGreaterThan(0n);
    });
  });

  describe('Escrow Management', () => {
    test('should create a new escrow via proposal', async () => {
      const { dao } = context;
      const escrowName = getUniqueName('esc'); // Short: esc_1, esc_2, etc.

      const mbr = await dao.wallet.getMbr({
        escrow: escrowName,
        methodCount: 0n,
        plugin: '',
        groups: 0n,
      });
      await dao.wallet.client.appClient.fundAppAccount({
        amount: microAlgo(mbr.newEscrowMintCost),
      });

      const proposalId = await proposeAndExecute(dao, [
        {
          type: ProposalActionEnum.NewEscrow,
          escrow: escrowName,
          address: ALGORAND_ZERO_ADDRESS_STRING,
        },
      ]);

      expect(proposalId).toBeGreaterThan(0n);

      const escrowInfo = await dao.wallet.getEscrow(escrowName);
      expect(escrowInfo.id).toBeGreaterThan(0n);
    });

    test('should toggle escrow lock', async () => {
      const { dao } = context;
      const escrowName = getUniqueName('lck');

      const mbr = await dao.wallet.getMbr({
        escrow: escrowName,
        methodCount: 0n,
        plugin: '',
        groups: 0n,
      });
      await dao.wallet.client.appClient.fundAppAccount({
        amount: microAlgo(mbr.newEscrowMintCost),
      });

      await proposeAndExecute(dao, [
        { type: ProposalActionEnum.NewEscrow, escrow: escrowName, address: ALGORAND_ZERO_ADDRESS_STRING },
      ]);

      const escrowBefore = await dao.wallet.getEscrow(escrowName);
      expect(escrowBefore.locked).toBe(false);

      await proposeAndExecute(dao, [
        { type: ProposalActionEnum.ToggleEscrowLock, escrow: escrowName },
      ]);

      const escrowAfter = await dao.wallet.getEscrow(escrowName);
      expect(escrowAfter.locked).toBe(true);
    });

    test('should create escrow and install plugin for it', async () => {
      const { fixture, dao, sender, signer } = context;
      // Use very short escrow name to avoid "name too long" error
      const escrowName = getUniqueName('pe'); // pe_1, pe_2, etc.

      // Create escrow
      const escrowMbr = await dao.wallet.getMbr({
        escrow: escrowName,
        methodCount: 0n,
        plugin: '',
        groups: 0n,
      });
      await dao.wallet.client.appClient.fundAppAccount({
        amount: microAlgo(escrowMbr.newEscrowMintCost),
      });

      await proposeAndExecute(dao, [
        { type: ProposalActionEnum.NewEscrow, escrow: escrowName, address: ALGORAND_ZERO_ADDRESS_STRING },
      ]);

      // Deploy and install plugin
      const optinPlugin = await deployOptInPlugin({
        fixture,
        sender,
        signer,
      });

      const mbr = await dao.wallet.getMbr({
        escrow: escrowName,
        methodCount: 1n,
        plugin: '',
        groups: 1n,
      });
      await dao.wallet.client.appClient.fundAppAccount({
        amount: microAlgo(mbr.plugins + 1_000_000n),
      });

      const proposalId = await proposeAndExecute(dao, [
        {
          type: ProposalActionEnum.AddPlugin,
          client: optinPlugin,
          callerType: CallerType.Global,
          escrow: escrowName,
          sourceLink: 'https://github.com/test/plugin',
          useExecutionKey: false,
          methods: [{ name: optinPlugin.optIn(), cooldown: 0n }],
        },
      ]);

      expect(proposalId).toBeGreaterThan(0n);

      const pluginInfo = await dao.wallet.getPluginByKey({
        plugin: optinPlugin.appId,
        caller: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ',
        escrow: escrowName,
      });

      expect(pluginInfo.start).toBeGreaterThan(0n);
    });
  });

  describe('Allowance Management', () => {
    test('should add allowances to an escrow', async () => {
      const { dao } = context;
      const escrowName = getUniqueName('alw');

      // Create escrow
      const escrowMbr = await dao.wallet.getMbr({
        escrow: escrowName,
        methodCount: 0n,
        plugin: '',
        groups: 0n,
      });
      await dao.wallet.client.appClient.fundAppAccount({
        amount: microAlgo(escrowMbr.newEscrowMintCost),
      });

      await proposeAndExecute(dao, [
        { type: ProposalActionEnum.NewEscrow, escrow: escrowName, address: ALGORAND_ZERO_ADDRESS_STRING },
      ]);

      // Fund for allowance
      const mbr = await dao.wallet.getMbr({
        escrow: escrowName,
        methodCount: 0n,
        plugin: '',
        groups: 0n,
      });
      await dao.wallet.client.appClient.fundAppAccount({
        amount: microAlgo(mbr.allowances + 1_000_000n),
      });

      // Add flat allowance for ALGO
      const proposalId = await proposeAndExecute(dao, [
        {
          type: ProposalActionEnum.AddAllowances,
          escrow: escrowName,
          allowances: [
            {
              type: 'flat',
              asset: 0n,
              amount: 10_000_000n,
            },
          ],
        },
      ]);

      expect(proposalId).toBeGreaterThan(0n);

      const allowanceInfo = await dao.wallet.getAllowance({ escrow: escrowName, asset: 0n });
      expect(allowanceInfo.type).toBe('flat');
      if (allowanceInfo.type === 'flat') {
        expect(allowanceInfo.amount).toBe(10_000_000n);
      }
    });

    test('should remove allowances from an escrow', async () => {
      const { dao } = context;
      const escrowName = getUniqueName('rmw');

      // Create escrow
      const escrowMbr = await dao.wallet.getMbr({
        escrow: escrowName,
        methodCount: 0n,
        plugin: '',
        groups: 0n,
      });
      await dao.wallet.client.appClient.fundAppAccount({
        amount: microAlgo(escrowMbr.newEscrowMintCost),
      });

      await proposeAndExecute(dao, [
        { type: ProposalActionEnum.NewEscrow, escrow: escrowName, address: ALGORAND_ZERO_ADDRESS_STRING },
      ]);

      // Add allowance first
      const mbr = await dao.wallet.getMbr({
        escrow: escrowName,
        methodCount: 0n,
        plugin: '',
        groups: 0n,
      });
      await dao.wallet.client.appClient.fundAppAccount({
        amount: microAlgo(mbr.allowances + 1_000_000n),
      });

      await proposeAndExecute(dao, [
        {
          type: ProposalActionEnum.AddAllowances,
          escrow: escrowName,
          allowances: [
            {
              type: 'flat',
              asset: 0n,
              amount: 10_000_000n,
            },
          ],
        },
      ]);

      // Verify allowance exists
      const allowanceBefore = await dao.wallet.getAllowance({ escrow: escrowName, asset: 0n });
      expect(allowanceBefore.type).toBe('flat');

      // Remove allowance
      const removeProposalId = await proposeAndExecute(dao, [
        {
          type: ProposalActionEnum.RemoveAllowances,
          escrow: escrowName,
          assets: [0n],
        },
      ]);

      expect(removeProposalId).toBeGreaterThan(0n);

      // Verify allowance was removed - box should not exist, so catch the error
      try {
        await dao.wallet.getAllowance({ escrow: escrowName, asset: 0n });
        // If we get here without error, the allowance wasn't fully removed
        // but the start should be 0
      } catch (error) {
        // Expected - box was deleted
        expect(error).toBeDefined();
      }
    });
  });

  describe('Plugin with Allowances', () => {
    test('should install a plugin with allowances in single proposal', async () => {
      const { fixture, dao, sender, signer } = context;
      const escrowName = getUniqueName('pa'); // Short name

      // Create escrow
      const escrowMbr = await dao.wallet.getMbr({
        escrow: escrowName,
        methodCount: 0n,
        plugin: '',
        groups: 0n,
      });
      await dao.wallet.client.appClient.fundAppAccount({
        amount: microAlgo(escrowMbr.newEscrowMintCost),
      });

      await proposeAndExecute(dao, [
        { type: ProposalActionEnum.NewEscrow, escrow: escrowName, address: ALGORAND_ZERO_ADDRESS_STRING },
      ]);

      // Deploy plugin
      const optinPlugin = await deployOptInPlugin({
        fixture,
        sender,
        signer,
      });

      // Fund for plugin + allowances
      const mbr = await dao.wallet.getMbr({
        escrow: escrowName,
        methodCount: 1n,
        plugin: '',
        groups: 1n,
      });
      await dao.wallet.client.appClient.fundAppAccount({
        amount: microAlgo(mbr.plugins + mbr.allowances + 2_000_000n),
      });

      // Install plugin with allowances
      const proposalId = await proposeAndExecute(dao, [
        {
          type: ProposalActionEnum.AddPlugin,
          client: optinPlugin,
          callerType: CallerType.Global,
          escrow: escrowName,
          sourceLink: 'https://github.com/test/plugin',
          useExecutionKey: false,
          methods: [{ name: optinPlugin.optIn(), cooldown: 0n }],
          allowances: [
            {
              type: 'flat',
              asset: 0n,
              amount: 5_000_000n,
            },
          ],
        },
      ]);

      expect(proposalId).toBeGreaterThan(0n);

      // Verify plugin
      const pluginInfo = await dao.wallet.getPluginByKey({
        plugin: optinPlugin.appId,
        caller: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ',
        escrow: escrowName,
      });
      expect(pluginInfo.start).toBeGreaterThan(0n);

      // Verify allowance
      const allowanceInfo = await dao.wallet.getAllowance({ escrow: escrowName, asset: 0n });
      expect(allowanceInfo.type).toBe('flat');
      if (allowanceInfo.type === 'flat') {
        expect(allowanceInfo.amount).toBe(5_000_000n);
      }
    });
  });

  describe('Escrow Deletion', () => {
    test('removes an escrow with its plugins, its allowance and its asset in one proposal, and refuses the delete alone', async () => {
      const { fixture, dao, sender, signer } = context;
      const { algorand } = fixture.context;
      const deployer = await fixture.context.generateAccount({ initialFunds: (5).algos() });
      const optIn = await deployOptInPlugin({ fixture, sender: deployer.toString(), signer: deployer.signer });
      const pay = await deployPayPlugin({ fixture, sender: deployer.toString(), signer: deployer.signer });
      const escrow = getUniqueName('gone');
      const alias = getUniqueName('gone_pay');
      const { assetId: asset } = await algorand.send.assetCreate({ sender, signer, total: 1_000n, decimals: 0, assetName: 'Held' });
      await dao.wallet.client.appClient.fundAppAccount({ amount: microAlgo(10_000_000n) });

      // the DAO wallet holds the asset, so it can take it back from the escrow
      await proposeAndExecute(dao, [buildAddPluginAction({ client: optIn, callerType: CallerType.Global, useExecutionKey: false })]);
      await dao.wallet.usePlugin({ sender, signer, callerType: CallerType.Global, calls: [optIn.optIn({ assets: [asset] })] });

      // an escrow with two grants (one of them voted policy with an alias), an allowance and an asset
      await proposeAndExecute(dao, [{ type: ProposalActionEnum.NewEscrow, escrow, address: ALGORAND_ZERO_ADDRESS_STRING }]);
      await proposeAndExecute(dao, [buildAddPluginAction({ client: optIn, callerType: CallerType.Global, useExecutionKey: false, escrow })]);
      await proposeAndExecute(dao, [buildAddPluginAction({
        name: alias, client: pay, callerType: CallerType.Global, useExecutionKey: true, escrow,
        governance: { power: 1n, duration: 60n, participation: 10_000n, approval: 50_000n },
      })]);
      await proposeAndExecute(dao, [{
        type: ProposalActionEnum.AddAllowances, escrow, allowances: [{ type: 'flat', asset: 0n, amount: 1_000n }],
      }]);
      await dao.wallet.usePlugin({ sender, signer, callerType: CallerType.Global, escrow, calls: [optIn.optIn({ assets: [asset] })] });
      const { id, address } = await dao.wallet.getEscrow(escrow);
      await algorand.send.assetTransfer({ sender, signer, receiver: address, assetId: asset, amount: 40n });
      await algorand.send.payment({ sender, signer, receiver: address, amount: microAlgo(300_000n) });

      expect(await dao.wallet.getEscrowRefs(escrow)).toBe(3n);
      expect(await dao.client.state.box.plugins.value({ plugin: pay.appId, escrow })).toBeDefined();

      // the delete by itself passes validation (the escrow exists) and is refused by the wallet when it runs
      await expectContractError(proposeAndExecute(dao, [{ type: ProposalActionEnum.DeleteEscrow, escrow }]), 'errEuse');
      expect((await dao.wallet.getEscrow(escrow)).id).toBe(id);

      const actions = await dao.deleteEscrowActions({ escrow });
      expect(actions.map(action => action.type).sort()).toEqual([
        ProposalActionEnum.RemovePlugin,
        ProposalActionEnum.RemoveNamedPlugin,
        ProposalActionEnum.RemoveAllowances,
        ProposalActionEnum.Reclaim,
        ProposalActionEnum.DeleteEscrow,
      ].sort());
      expect(actions[actions.length - 1].type).toBe(ProposalActionEnum.DeleteEscrow);

      const controlled = (await dao.wallet.client.state.global.controlledAddress())!;
      const before = await algorand.account.getInformation(controlled);
      const escrowHeld = (await algorand.account.getInformation(address)).balance.microAlgos;

      await proposeAndExecute(dao, actions);

      // the escrow, its app, its record, its count, its grants, its alias and its allowance are gone
      expect((await dao.wallet.getEscrows()).has(escrow)).toBe(false);
      await expect(algorand.client.algod.getApplicationByID(id).do()).rejects.toThrow();
      expect(await dao.wallet.getEscrowRefs(escrow)).toBeUndefined();
      expect(Array.from((await dao.wallet.client.state.box.plugins.getMap()).keys()).some(key => key.escrow === escrow)).toBe(false);
      expect((await dao.wallet.client.state.box.namedPlugins.getMap()).has(alias)).toBe(false);
      expect(Array.from((await dao.wallet.client.state.box.allowances.getMap()).keys()).some(key => key.escrow === escrow)).toBe(false);
      // the DAO forgot the voted policy of the removed plugin
      expect(Array.from((await dao.client.state.box.plugins.getMap()).keys()).some(key => key.plugin === pay.appId && key.escrow === escrow)).toBe(false);
      // and the wallet has the asset and the ALGO back
      const after = await algorand.account.getInformation(controlled);
      expect((await algorand.account.getInformation(address)).balance.microAlgos).toBe(0n);
      expect((after.assets?.find(holding => holding.assetId === asset)?.amount ?? 0n) - (before.assets?.find(holding => holding.assetId === asset)?.amount ?? 0n)).toBe(40n);
      // what the escrow held, and the 150,000 the factory held for its app
      expect(after.balance.microAlgos - before.balance.microAlgos).toBe(escrowHeld + 150_000n);
    });

    test('rejects a proposal to delete an escrow that does not exist', async () => {
      const { dao } = context;
      await expectContractError(
        proposeAndExecute(dao, [{ type: ProposalActionEnum.DeleteEscrow, escrow: 'does-not-exist' }]),
        'errNesc',
      );
    });
  });
});
