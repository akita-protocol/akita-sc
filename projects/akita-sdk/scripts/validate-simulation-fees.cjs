/**
 * Read-only LocalNet investigation of wallet simulation fee pooling.
 * Uses SDK source and an existing wallet with a Global PayPlugin enabled.
 * Run from the repo root:
 * node projects/akita-sdk/scripts/validate-simulation-fees.cjs WALLET_ID PAY_PLUGIN_ID
 * Optionally pass a directory containing Utils 9 + algosdk 3.7 in node_modules.
 * No transaction is signed or submitted; even the balance reduction is simulated.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { createRequire } = require('node:module');
const path = require('node:path');
require('ts-node').register({ transpileOnly: true, compilerOptions: { module: 'CommonJS', moduleResolution: 'node' } });
const algosdk = require('algosdk');
const { AlgorandClient, microAlgo } = require('@algorandfoundation/algokit-utils');
const { decodeTransaction, groupTransactions, Transaction } = require('@algorandfoundation/algokit-utils/transact');
const { WalletSDK, PayPluginSDK, CallerType } = require('../src/wallet');

async function main() {
  const [walletId, payPluginId, comparisonDirectory] = process.argv.slice(2);
  assert(walletId && payPluginId, 'Usage: node validate-simulation-fees.cjs WALLET_ID PAY_PLUGIN_ID [V9_INSTALL_DIRECTORY]');
  process.env.ALGORAND_NETWORK = 'localnet';
  // This investigation never invokes the MBR helper; resolve its constructor only.
  process.env.WALLET_MBR_APP_ID ??= walletId;
  const algorand = AlgorandClient.defaultLocalNet();
  const native = algorand.client.algod;
  const algod = new algosdk.Algodv2('a'.repeat(64), 'http://localhost', 4001);
  const application = await algod.getApplicationByID(BigInt(walletId)).do();
  const admin = application.params.globalState.find(({ key }) => Buffer.from(key).toString() === 'admin');
  assert(admin, 'Wallet must expose its admin global state');
  const sender = algosdk.encodeAddress(admin.value.bytes);
  const signer = algosdk.makeEmptyTransactionSigner();
  const params = { algorand, readerAccount: sender, factoryParams: { appId: BigInt(walletId), defaultSender: sender, defaultSigner: signer } };
  const wallet = new WalletSDK(params);
  const pay = new PayPluginSDK({ ...params, factoryParams: { ...params.factoryParams, appId: BigInt(payPluginId) } });
  const sp = await algorand.getSuggestedParams();
  const buffer = BigInt(sp.minFee) * 272n;
  const calls = (count) => Array.from({ length: count }, (_, index) => pay.pay({
    payments: [{ receiver: sender, amount: count === 1 ? 0n : BigInt(index + 1), asset: 0n }],
    rekeyBack: index === count - 1,
  }));
  const originalSimulate = native.simulateTransactions;
  const originalSend = native.sendRawTransaction;
  native.sendRawTransaction = async () => { throw new Error('Submission is forbidden in this investigation'); };
  const results = [];
  const summarize = (name, group, txns) => {
    const inners = (txn) => (txn.innerTxns ?? []).reduce((sum, child) => sum + 1 + inners(child), 0);
    const row = {
      name,
      fees: txns.map((txn) => String(txn.fee ?? 0n)),
      success: !group.failureMessage,
      failure: group.failureMessage?.split(' []transactions.')[0].slice(0,300),
      innerTransactions: (group.txnResults ?? []).reduce((sum, result) => sum + inners(result.txnResult ?? {}), 0),
      boxes: group.unnamedResourcesAccessed?.boxes?.map(({ appId, appIndex, app, name }) => `${appId ?? appIndex ?? app}:${Buffer.from(name).toString('hex')}`).sort() ?? [],
    };
    results.push(row);
    return row;
  };
  const clone = (txns) => txns.map((txn) => algosdk.decodeUnsignedTransaction(algosdk.encodeUnsignedTransaction(txn)));
  const regroup = (txns) => { for (const txn of txns) txn.group = undefined; return algosdk.assignGroupID(txns); };
  const request = (txns, discovery = true) => ({
    txnGroups: [{ txns: txns.map((txn) => ({ txn: decodeTransaction(algosdk.encodeUnsignedTransaction(txn)), sig: new Uint8Array(64) })) }],
    allowEmptySignatures: true, fixSigners: true, allowUnnamedResources: discovery,
    ...(discovery ? { extraOpcodeBudget: 320_000 } : {}),
  });
  const simulate = async (name, txns, discovery = true) => {
    const response = await originalSimulate.call(native, request(regroup(txns), discovery));
    return summarize(name, response.txnGroups[0], txns);
  };

  try {
    const buildArgs = { sender, signer, callerType: CallerType.Global, lease: 'fee_pool_validation', windowSize: 1000n, skipSignatures: true };
    const captured = [];
    // This is a diagnostic interceptor, not a proposed production implementation.
    // It changes only unsigned discovery requests, leaving AlgoKit's fee caps,
    // final fee calculation, resource propagation, and strict validation intact.
    const build = async (count, pooled) => {
      native.simulateTransactions = async function (req) {
        let effective = req;
        if (pooled && req.allowUnnamedResources && req.extraOpcodeBudget) {
          const txns = req.txnGroups[0].txns.map(({ txn }, i) => new Transaction({ ...txn, group: undefined, fee: i === 0 ? buffer : 0n }));
          assert(txns.every((txn) => txn.sender.toString() === sender), 'Diagnostic pooling requires one sender');
          effective = { ...req, txnGroups: [{ txns: groupTransactions(txns).map((txn) => ({ txn, sig: new Uint8Array(64) })) }] };
        }
        const response = await originalSimulate.call(this, effective);
        captured.push({ discovery: effective.allowUnnamedResources, fees: effective.txnGroups[0].txns.map(({ txn }) => String(txn.fee ?? 0n)) });
        return response;
      };
      try {
        return await wallet.build.usePlugin({ ...buildArgs, calls: calls(count) });
      } finally {
        native.simulateTransactions = originalSimulate;
      }
    };

    const prepared = await wallet.prepareUsePlugin({ sender, signer, callerType: CallerType.Global, calls: calls(1) });
    const raw = (await (await prepared.group.composer()).buildTransactions()).transactions.map((txn) =>
      algosdk.decodeUnsignedTransaction(require('@algorandfoundation/algokit-utils/transact').encodeTransactionRaw(txn)));
    assert.equal(raw.length, 3);
    const variants = [
      ['each app call at maxFee', raw.map(() => buffer)],
      ['first pays, others zero', [buffer, 0n, 0n]],
      ['last pays, others zero', [0n, 0n, buffer]],
      ['actual pooled fee', [BigInt(sp.minFee) * 5n, 0n, 0n]],
      ['insufficient group fee', [BigInt(sp.minFee), 0n, 0n]],
    ];
    for (const [name, fees] of variants) {
      const txns = clone(raw);
      txns.forEach((txn, i) => txn.fee = fees[i]);
      const row = await simulate(`Utils 10: ${name}`, txns);
      assert.equal(row.success, name !== 'insufficient group fee');
      if (row.success) { assert.equal(row.innerTransactions, 2); assert(row.boxes.length > 0); }
    }
    assert.deepEqual(results[0].boxes, results[1].boxes);
    assert.deepEqual(results[0].boxes, results[2].boxes);

    // A maxFee is a ceiling, not actual fee credit. Zeroing other callers'
    // ceilings can produce an AlgoKit allocation error after algod succeeds.
    const zeroCaps = algorand.newGroup({ coverAppCallInnerTransactionFees: true, populateAppCallResources: true });
    const getter = new algosdk.ABIMethod({ name: 'arc58_getAdmin', args: [], returns: { type: 'address' } });
    for (let i = 0; i < 3; i++) zeroCaps.addAppCall({
      sender, signer, appId: BigInt(walletId), args: [getter.getSelector()], note: Uint8Array.of(i),
      staticFee: microAlgo(i === 0 ? BigInt(sp.minFee) : 0n), maxFee: microAlgo(i === 0 ? buffer : 0n),
    });
    await assert.rejects(zeroCaps.build(), (error) => {
      assert.match(error.message, /Calculated transaction fee .* greater than max of 0/);
      results.push({ name: 'Only the first maxFee is nonzero: composer allocation error', failure: error.message });
      return true;
    });

    // Reduce spendable balance inside simulate only. No ledger mutation occurs.
    const before = await algod.accountInformation(sender).do();
    const spendable = before.amount - before.minBalance;
    const remaining = 300_000n;
    assert(spendable > remaining + 1_000n, 'Admin needs > 0.301 ALGO spendable for the simulated balance-reduction test');
    const sdkParams = await algod.getTransactionParams().do();
    for (const pooled of [false, true]) {
      const txns = clone(raw);
      txns.forEach((txn, i) => txn.fee = pooled ? (i === 0 ? buffer : 0n) : buffer);
      txns.unshift(algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        sender, receiver: algosdk.getApplicationAddress(BigInt(walletId)), amount: spendable - remaining - 1_000n,
        suggestedParams: { ...sdkParams, fee: 1_000n, flatFee: true },
      }));
      const row = await simulate(`0.3 ALGO spendable: ${pooled ? 'pooled' : 'individual'}`, txns);
      assert.equal(row.success, pooled);
      if (!pooled) assert.match(row.failure, /balance|overspend/);
    }
    assert.equal((await algod.accountInformation(sender).do()).amount, before.amount);

    const small = await build(1, false);
    assert((await simulate('SDK build, final strict simulation', clone(small.windows[0].transactions), false)).success);
    try {
      const originalLarge = await build(14, false);
      assert((await simulate('SDK original discovery: 16 transactions, final strict simulation', clone(originalLarge.windows[0].transactions), false)).success);
    } catch (error) {
      // A sufficiently funded admin can run this too; only balance errors are
      // expected when the original per-call buffers exceed spendable balance.
      assert.match(error.message, /balance|overspend/);
      results.push({ name: 'SDK original discovery: 16 transactions', success: false, failure: error.message.slice(0, 300) });
    }
    const large = await build(14, true);
    assert.equal(large.windows[0].transactions.length, 16);
    assert((await simulate('SDK pooled discovery: 16 transactions, final strict simulation', clone(large.windows[0].transactions), false)).success);
    assert.equal(large.windows[0].transactions.reduce((sum, txn) => sum + txn.fee, 0n), BigInt(sp.minFee) * 31n);
    results.push({ name: 'SDK requests: original 3- and 16-transaction builds, then pooled 16-transaction build', requests: captured });

    // Compare released algosdk without changing the repository's dependencies.
    const clients = [['installed algosdk', algosdk]];
    if (comparisonDirectory) {
      const external = createRequire(path.resolve(comparisonDirectory, 'package.json'));
      clients.push(['algosdk 3.7.0 from isolated v9 installation', external('algosdk')]);
      const v9 = external('@algorandfoundation/algokit-utils');
      const v9Algorand = v9.AlgorandClient.defaultLocalNet();
      const v9Algod = v9Algorand.client.algod;
      const v9Simulate = v9Algod.simulateTransactions;
      let discoveryFees;
      v9Algod.simulateTransactions = function (req) {
        discoveryFees = req.txnGroups[0].txns.map(({ txn }) => String(txn.fee));
        return v9Simulate.call(this, req);
      };
      const group = v9Algorand.newGroup();
      // The wallet's admin getter has no inner transactions or box references.
      const method = new clients[1][1].ABIMethod({ name: 'arc58_getAdmin', args: [], returns: { type: 'address' } });
      for (let i = 0; i < 3; i++) group.addAppCallMethodCall({ appId: BigInt(walletId), sender, method, args: [], note: Uint8Array.of(i), maxFee: v9.microAlgo(buffer), signer: clients[1][1].makeEmptyTransactionSigner() });
      const { atc } = await group.build();
      const { prepareGroupForSending } = v9;
      await prepareGroupForSending(atc, v9Algod, { coverAppCallInnerTransactionFees: true, populateAppCallResources: true }, {
        suggestedParams: await v9Algorand.getSuggestedParams(),
        maxFees: new Map([0, 1, 2].map((index) => [index, v9.microAlgo(buffer)])),
      });
      assert.deepEqual(discoveryFees, [String(buffer), String(buffer), String(buffer)]);
      results.push({ name: 'Utils 9.2.2 composer discovery fees', fees: discoveryFees });
    }
    for (const [name, sdk] of clients) {
      const txns = clone(raw);
      txns.forEach((txn, i) => txn.fee = i === 0 ? buffer : 0n);
      const client = new sdk.Algodv2('a'.repeat(64), 'http://localhost', 4001);
      const req = new sdk.modelsv2.SimulateRequest({
        txnGroups: [new sdk.modelsv2.SimulateRequestTransactionGroup({ txns: regroup(txns).map((txn) => new sdk.SignedTransaction({ txn: sdk.decodeUnsignedTransaction(algosdk.encodeUnsignedTransaction(txn)) })) })],
        allowEmptySignatures: true, fixSigners: true, allowUnnamedResources: true, extraOpcodeBudget: 320_000,
      });
      const response = await client.simulateTransactions(req).do();
      assert(summarize(`${name}: first pays, others zero`, response.txnGroups[0], txns).success);
    }
    console.log(JSON.stringify({
      network: 'localnet', consensusVersion: sp.consensusVersion, walletId, payPluginId,
      versions: {
        utils: require('@algorandfoundation/algokit-utils/package.json').version,
        algosdk: JSON.parse(fs.readFileSync(path.resolve(path.dirname(require.resolve('algosdk')), '../../package.json'), 'utf8')).version,
      },
      results,
    }, null, 2));
  } finally {
    native.simulateTransactions = originalSimulate;
    native.sendRawTransaction = originalSend;
  }
}

main().catch((error) => { console.error(error.message); process.exitCode = 1; });
