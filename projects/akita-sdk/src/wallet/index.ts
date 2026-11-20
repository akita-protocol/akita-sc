import { AbstractedAccountArgs, AbstractedAccountFactory, AllowanceKey, EscrowInfo, PluginKey, type AbstractedAccountClient, ExecutionInfo, AbstractedAccountComposer, PluginInfoFromTuple, EscrowInfoFromTuple } from '../generated/AbstractedAccountClient'
import { AbstractAccountBoxMbrData, AbstractedAccountMbrClient } from '../generated/AbstractedAccountMBRClient'
import { AddAllowanceArgs, AddPluginArgs, AllowanceInfo, BuildWalletUsePluginParams, CallerType, CanCallParams, EscrowPluginRef, EscrowTeardown, ExecutionBuildGroup, FundsRequest, MbrParams, MethodOffset, PluginInfo, RekeyArgs, WalletAddPluginParams, WalletGlobalState, WalletUsePluginParams } from './types';
import { isPluginSDKReturn, MaybeSigner, NewContractSDKParams, SDKClient, GroupReturn, TxnReturn, hasSenderSigner, ExpandedSendParamsWithSigner, PluginTxn } from '../types';
import { BaseSDK } from '../base';
import { EscrowFactorySDK } from '../escrow';
import { ENV_VAR_NAMES, resolveAppIdWithClient, shouldWriteRegistry } from '../config';
import algosdk, { Address, ALGORAND_ZERO_ADDRESS_STRING, makeEmptyTransactionSigner } from 'algosdk';
import { MAX_UINT64 } from '../constants';
import { AllowanceInfoTranslate, AllowancesToTuple, applyDefaultAppCallMaxFees, assertEscrowCanBeDeleted, domainBoxKey, escrowDeleteWarnings, executionBoxKey, ValueMap } from './utils';
import { addPluginExtraFee, controlledMbrFee, deleteEscrowExtraFee, MaxGroupSize, newEscrowExtraFee, ReclaimsPerCall, RemoveAllowancesPerCall } from './constants';
import { encodeLease, microAlgo } from '@algorandfoundation/algokit-utils';
import { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount';
import { BoxIdentifier, BoxReference } from '@algorandfoundation/algokit-utils/types/app-manager';
import { prepareGroup, PreparedGroup, sendPrepared } from '../simulate/prepare';
import { computeExpectedCost, ExpectedCost } from '../simulate/cost';
import { WalletGroupComposer } from './group';
import { algodPrincipalReader, predictWindowPrincipal, windowPrincipalResources, type Principal, type PrincipalResourceReference } from '../principal';
import { seedAccessResources } from '../simulate/access-list';

export * from './constants';
export * from './errors';
export * from './factory';
export * from './group';
export * from './plugins';
export * from "./types";

type ContractArgs = AbstractedAccountArgs["obj"];

// things i want to include in the SDK
// - [x] wallet creation
// - [ ] passkey signer creation
// - [x] plugin installs & management
// - [x] escrow creation & management

export class WalletSDK extends BaseSDK<AbstractedAccountClient> {

  private pluginMapKeyGenerator = ({ plugin, caller = ALGORAND_ZERO_ADDRESS_STRING, escrow = '' }: Partial<Omit<PluginKey, 'plugin'>> & { plugin: bigint }) => (`${plugin}${caller}${escrow}`)
  private allowanceMapKeyGenerator = ({ asset, escrow }: AllowanceKey) => (`${asset}${escrow}`);

  public plugins: ValueMap<PluginKey, PluginInfo> = new ValueMap(this.pluginMapKeyGenerator);
  public namedPlugins: Map<string, PluginKey> = new Map();
  public escrows: Map<string, EscrowInfo> = new Map();
  public allowances: ValueMap<AllowanceKey, AllowanceInfo> = new ValueMap(this.allowanceMapKeyGenerator);
  public executions: Map<Uint8Array, ExecutionInfo> = new Map();
  public mbrClient: AbstractedAccountMbrClient;

  constructor(params: NewContractSDKParams) {
    super({ factory: AbstractedAccountFactory, ...params }, ENV_VAR_NAMES.WALLET_APP_ID);
    const mbrAppId = resolveAppIdWithClient(
      this.algorand,
      undefined,
      ENV_VAR_NAMES.WALLET_MBR_APP_ID,
      'AbstractedAccountMBR',
    )
    this.mbrClient = new AbstractedAccountMbrClient({
      algorand: this.algorand,
      appId: mbrAppId,
      defaultSender: params.factoryParams.defaultSender ?? this.readerAccount,
      defaultSigner: params.factoryParams.defaultSigner,
    });
  }

  group(): WalletGroupComposer {
    return new WalletGroupComposer(this)
  }

  async updateCache(key: PluginKey, allowances?: bigint[]): Promise<void> {
    const { escrow } = key;

    const requestList: any[] = [this.getPluginByKey(key)]

    if (escrow !== '' && !this.escrows.has(escrow)) {
      requestList.push(this.getEscrow(escrow))
    } else {
      requestList.push(Promise.resolve());
    }

    const fetchAllFloor = 5
    if (allowances && allowances.length > 0) {
      if (allowances.length > fetchAllFloor) {
        requestList.push(this.getAllowances());
      } else {
        for (const allowance of allowances) {
          requestList.push(this.getAllowance({ asset: allowance, escrow }));
        }
      }
    }

    const settled = await Promise.allSettled(requestList);

    if (settled[0].status === 'fulfilled') {
      this.plugins.set(key, settled[0].value);
    }

    if (escrow !== '' && !this.escrows.has(escrow) && settled[1].status === 'fulfilled') {
      this.escrows.set(escrow, settled[1].value);
    }

    if (allowances && allowances.length > 0 && !(allowances.length > fetchAllFloor)) {
      for (let i = 0; i < allowances.length; i++) {
        const req = settled[i + 2];
        if (req.status === 'fulfilled') {
          this.allowances.set(
            { asset: allowances[i], escrow },
            req.value
          );
        }
      }
    }
  }

  async prepareUsePlugin({
    sender,
    signer,
    name = '',
    callerType = CallerType.Other,
    escrow = '',
    fundsRequest = [],
    calls,
    lease = '',
    seedPrincipalResources = false,
    preTransactions = [],
  }: WalletUsePluginParams): Promise<{ plugins: bigint[], caller: string, useRounds: boolean, length: number, group: AbstractedAccountComposer<[]>, sendParams: ExpandedSendParamsWithSigner }> {

    const sendParams = this.getSendParams({ sender, signer });

    let spendingAddress = (await this.client.state.global.controlledAddress())!
    if (escrow !== '') {
      if (this.escrows.has(escrow)) {
        spendingAddress = this.escrows.get(escrow)!.address
      } else {
        try {
          spendingAddress = (await this.getEscrow(escrow)).address
        } catch (error) {
          throw new Error(`Escrow with name ${escrow} does not exist`);
        }
      }
    }

    // Group calls into segments by consecutive appId
    type PluginSegment = { appId: bigint; txns: PluginTxn[] };
    const segments: PluginSegment[] = [];

    for (const call of calls) {
      const { appId, getTxns } = call(spendingAddress);
      const callTxns = await getTxns({ wallet: this.client.appId });
      const last = segments[segments.length - 1];
      if (last && last.appId === appId) {
        last.txns.push(...callTxns);
      } else {
        segments.push({ appId, txns: callTxns });
      }
    }

    let caller = ''
    if (callerType === CallerType.Global) {
      caller = ALGORAND_ZERO_ADDRESS_STRING
    } else if (callerType === CallerType.Admin) {
      caller = algosdk.getApplicationAddress(this.appId).toString()
    } else if (sendParams.sender !== undefined) {
      caller = typeof sendParams.sender === 'string'
        ? sendParams.sender
        : (sendParams.sender as { toString(): string }).toString();
    } else {
      throw new Error('Sender must be provided when CallerType is Other');
    }

    const group = this.client.newGroup()
    for (const { txn, signer: txnSigner } of preTransactions) group.addTransaction(txn, txnSigner)
    let lastUseRounds = false;

    for (let segIdx = 0; segIdx < segments.length; segIdx++) {
      const segment = segments[segIdx];
      const isFirstSegment = segIdx === 0;

      // Fetch plugin info and calculate method offsets for this segment
      const key: PluginKey = { plugin: segment.appId, caller, escrow }
      let methods: MethodOffset[] = []
      let useRounds = false;
      let useExecutionKey = false;
      if (this.plugins.has(key)) {
        ({ methods, useRounds, useExecutionKey } = this.plugins.get(key)!);
      } else if (preTransactions.length > 0) {
        // the plugin may be installed by `preTransactions` in this same group: an unrestricted grant
        const installed = await this.getPluginByKey(key).catch(() => undefined)
        if (installed) ({ methods, useRounds, useExecutionKey } = installed)
      } else {
        ({ methods, useRounds, useExecutionKey } = await this.getPluginByKey(key))
      }
      lastUseRounds = useRounds;

      const methodOffsets: number[] = []
      const methodSignatures: string[] = []

      if (methods.length > 0) {
        for (let i = 0; i < methods.length; i++) {
          methodSignatures.push(methods[i].name.toString());
        }

        for (const txn of segment.txns) {
          if (txn.type === 'methodCall' && 'appId' in txn && txn.appId === segment.appId) {
            const selector = txn.method.getSelector()

            if (!methodSignatures.includes(selector.toString())) {
              throw new Error(`Transaction selector does not match any allowed method signatures`);
            }

            methodOffsets.push(methodSignatures.indexOf(selector.toString()));
          }
        }
      }

      const rekeyArgs: RekeyArgs = {
        type: callerType,
        escrow,
        methodOffsets,
        // fundsRequest only on the first segment's rekey
        fundsRequest: isFirstSegment ? fundsRequest?.map(({ asset, amount }) => ([asset, amount])) : []
      }

      let boxReferences: (BoxIdentifier | BoxReference)[] = [];

      // Lease/execution key box references only on first segment
      if (isFirstSegment) {
        if (lease !== '') {
          boxReferences.push(executionBoxKey(lease));
        }

        if (useExecutionKey) {
          if (!hasSenderSigner(sendParams)) {
            throw new Error('Sender and signer must be provided');
          }
          boxReferences.push(domainBoxKey(sendParams.sender as string | Address))
        }
      }

      if (name && segments.length === 1) {
        group.arc58RekeyToNamedPlugin({
          ...sendParams,
          args: {
            name,
            ...rekeyArgs
          },
          extraFee: isFirstSegment ? microAlgo(1_000n + BigInt(fundsRequest.length * 1_000)) : microAlgo(1_000n),
          boxReferences: boxReferences.length > 0 ? boxReferences : undefined
        });
      } else {
        group.arc58RekeyToPlugin({
          ...sendParams,
          args: {
            plugin: segment.appId,
            ...rekeyArgs
          },
          extraFee: isFirstSegment ? microAlgo(1_000n + BigInt(fundsRequest.length * 1_000)) : microAlgo(1_000n),
          boxReferences: boxReferences.length > 0 ? boxReferences : undefined
        });
      }

      // Add segment transactions
      const composer = await group.composer()
      for (const txn of segment.txns) {
        switch (txn.type) {
          case 'pay': {
            composer.addPayment(txn);
            break;
          }
          case 'assetCreate': {
            composer.addAssetCreate(txn);
            break;
          }
          case 'assetConfig': {
            composer.addAssetConfig(txn);
            break;
          }
          case 'assetFreeze': {
            composer.addAssetFreeze(txn);
            break;
          }
          case 'assetDestroy': {
            composer.addAssetDestroy(txn);
            break;
          }
          case 'assetTransfer': {
            composer.addAssetTransfer(txn);
            break;
          }
          case 'assetOptIn': {
            composer.addAssetOptIn(txn);
            break;
          }
          case 'assetOptOut': {
            composer.addAssetOptOut(txn);
            break;
          }
          case 'appCall': {
            const asAny = txn as any;
            if ('appId' in asAny && asAny.appId !== undefined && asAny.appId !== 0n && 'approvalProgram' in asAny) {
              composer.addAppUpdate(asAny);
            } else if ('appId' in asAny && asAny.appId !== undefined && asAny.appId !== 0n) {
              composer.addAppCall(asAny);
            } else {
              composer.addAppCreate(asAny);
            }
            break;
          }
          case 'keyReg': {
            if ('voteKey' in txn) {
              composer.addOnlineKeyRegistration(txn);
            } else {
              composer.addOfflineKeyRegistration(txn);
            }
            break;
          }
          case 'txnWithSigner': {
            composer.addTransaction(txn.txn, txn.signer);
            break;
          }
          case 'methodCall': {
            const asAny = txn as any;
            if ('appId' in asAny && asAny.appId !== undefined && asAny.appId !== 0n && 'approvalProgram' in asAny) {
              composer.addAppUpdateMethodCall(asAny);
            } else if ('appId' in asAny && asAny.appId !== undefined && asAny.appId !== 0n) {
              composer.addAppCallMethodCall(asAny);
            } else {
              composer.addAppCreateMethodCall(asAny);
            }
            break;
          }
          default: {
            throw new Error(`Unknown transaction type`);
          }
        }
      }

      // Note differentiates each verifyAuth so they have unique txn IDs within the group
      group.arc58VerifyAuthAddress({
        ...sendParams,
        args: {},
        ...(segments.length > 1 ? { note: new TextEncoder().encode(`v${segIdx}`) } : {})
      })

    }

    if (seedPrincipalResources && segments.length > 0) {
      const spender = await this.windowSpender({ plugin: segments[0].appId, caller, escrow, spendingAddress })
      seedAccessResources(await group.composer(), await this.principalResources({ spender }))
    }

    const length = await (await group.composer()).count()
    const plugins = [...new Set(segments.map(s => s.appId))];

    return { plugins, caller, useRounds: lastUseRounds, length, group, sendParams: sendParams as ExpandedSendParamsWithSigner }
  }

  // PRINCIPAL RESOLUTION (docs/principal-resolution) ---------------------------------------------

  /**
   * The wallet hint a plugin forwards to a principal-resolving target from inside this wallet's window:
   * exactly this wallet's app id (`windowHint(wallet)`, spec §3.8 rule 6). Akita plugins add it
   * themselves; the SDK never passes a caller-chosen hint. A direct (top-level) call passes `0n`, because
   * a non-zero hint on a top-level call reverts with `errHtop`.
   */
  get windowHint(): bigint {
    return this.client.appId
  }

  /** The spending account of a window for (`plugin`, `caller`, `escrow`), including `defaultToEscrow` grants. */
  private async windowSpender({ plugin, caller, escrow, spendingAddress }: {
    plugin: bigint, caller: string, escrow: string, spendingAddress: string
  }): Promise<string> {
    if (escrow !== '') return spendingAddress
    const key: PluginKey = { plugin, caller, escrow }
    const info = this.plugins.get(key) ?? await this.getPluginByKey(key)
    return info.escrow !== 0n ? algosdk.getApplicationAddress(info.escrow).toString() : spendingAddress
  }

  /**
   * Resources a hinted target reads for a window whose spending account is `spender` (spec §3.6):
   * `P(W)`, plus `A(W.address)` or `A(controlled)` when the spending account is an escrow. Feed them to
   * `seedAccessResources` (or pass `seedPrincipalResources: true` to `usePlugin`).
   */
  async principalResources({ spender }: { spender: string | Address }): Promise<PrincipalResourceReference[]> {
    return windowPrincipalResources(algodPrincipalReader(this.client.algorand.client.algod), this.client.appId, spender)
  }

  /**
   * PREDICTION ONLY (never authorization): the principal a hinted target computes when `plugin` calls it
   * from this wallet's window on `escrow` ('' = the main account, or the grant's `defaultToEscrow` escrow).
   * Gates see `principal`; referrals pay `referrer`.
   *
   * @param walletFactory the pinned wallet factory (`AkitaAppList.wallet`). When omitted, the wallet's own
   * `factory_app` global is used, which is fine for predicting your own wallet but must never be a trust
   * anchor (spec §3.8 rule 4).
   */
  async predictPrincipal({ plugin, caller, escrow = '', walletFactory }: {
    plugin: bigint
    /** the grant's caller (zero address for a global grant, the wallet address for an admin grant) */
    caller: string
    escrow?: string
    walletFactory?: bigint
  }): Promise<Principal> {
    const controlled = (await this.client.state.global.controlledAddress())!
    const spendingAddress = escrow === '' ? controlled : (this.escrows.get(escrow) ?? await this.getEscrow(escrow)).address
    const spender = await this.windowSpender({ plugin, caller, escrow, spendingAddress })
    const factory = walletFactory ?? (await this.client.state.global.factoryApp())
    if (!factory) throw new Error('walletFactory is required: the wallet has no factory_app global')
    return predictWindowPrincipal(algodPrincipalReader(this.client.algorand.client.algod), factory, this.client.appId, spender, plugin)
  }

  /**
   * @deprecated LEGACY registry write (EscrowFactory reverse registry). Principal resolution uses
   * wallet hints, so the SDK no longer calls this on its own (principal-resolution Phase 3). Call it
   * only to keep legacy registry semantics (old plugin ids, legacy shims, old sub-gates) working for
   * this wallet or one of its escrows. Removed with `register` itself in Phase 4.
   */
  async register({ sender, signer, escrow }: ContractArgs['register(string)void'] & MaybeSigner): Promise<void> {

    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.register({
      ...sendParams,
      args: {
        escrow
      }
    });
  }

  async changeRevocationApp({ sender, signer, app }: MaybeSigner & { app: bigint }): Promise<void> {

    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.setRevocationApp({
      ...sendParams,
      args: { app },
    });
  }

  async setNickname({ sender, signer, nickname }: MaybeSigner & { nickname: string }): Promise<void> {

    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.setNickname({
      ...sendParams,
      args: { nickname }
    });
  }

  async setAvatar({ sender, signer, avatar }: MaybeSigner & { avatar: bigint }): Promise<void> {

    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.setAvatar({
      ...sendParams,
      args: { avatar }
    });
  }

  async setBanner({ sender, signer, banner }: MaybeSigner & { banner: bigint }): Promise<void> {

    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.setBanner({
      ...sendParams,
      args: { banner }
    });
  }

  async setBio({ sender, signer, bio }: MaybeSigner & { bio: string }): Promise<void> {

    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.setBio({
      ...sendParams,
      args: { bio }
    });
  }

  async changeAdmin({ sender, signer, newAdmin }: MaybeSigner & { newAdmin: string }): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.arc58ChangeAdmin({
      ...sendParams,
      args: { newAdmin }
    });
  }

  async verifyAuthAddress(params?: MaybeSigner): Promise<void> {

    const sendParams = this.getSendParams(params);

    await this.client.send.arc58VerifyAuthAddress({
      ...sendParams,
      args: {}
    });
  }

  /**
   * Admin rekey of the controlled account to `address`. With `flash: true` the same group must return it
   * with a transaction from the controlled account that rekeys it back to the wallet app (Q2: a later
   * `arc58_verifyAuthAddress` only counts while it verifies the controlled account itself). Plugin windows
   * close only through `arc58_verifyAuthAddress`, which `usePlugin` always appends.
   */
  async rekeyTo({ sender, signer, ...args }: MaybeSigner & ContractArgs['arc58_rekeyTo(address,bool)void']): Promise<void> {

    const sendParams = this.getSendParams({ sender, signer });

    await this.client.send.arc58RekeyTo({ ...sendParams, args });
  }

  async canCall({ sender, signer, ...args }: CanCallParams): Promise<boolean[]> {

    const sendParams = this.getSendParams({ sender, signer });

    const methods = isPluginSDKReturn(args.methods)
      ? args.methods().selectors
      : args.methods;

    const result = await Promise.allSettled(methods.flatMap(method => {
      return this.client.send.arc58CanCall({ ...sendParams, args: { ...args, method } }) as unknown as Promise<boolean>;
    }))

    // ACC-10c: arc58_canCall does not check `lastValid`; treat expired grants as not callable.
    const expired = await this.isPluginExpired(args.plugin, args.type, args.address, args.escrow).catch(() => false)

    return result.map(x => x.status === 'fulfilled' && !expired ? x.value : false)
  }

  /** Whether the grant resolved from (plugin, caller type, address, escrow) is past its lastValid. */
  private async isPluginExpired(plugin: bigint | number, type: bigint | number, address: string, escrow: string): Promise<boolean> {
    const caller = BigInt(type) === CallerType.Global
      ? ALGORAND_ZERO_ADDRESS_STRING
      : BigInt(type) === CallerType.Admin
        ? algosdk.getApplicationAddress(this.appId).toString()
        : address
    const info = await this.getPluginByKey({ plugin: BigInt(plugin), caller, escrow })
    if (info.start === 0n) return false
    const status = await this.client.algorand.client.algod.status().do()
    if (info.useRounds) {
      return BigInt(status.lastRound) > info.lastValid
    }
    const block = await this.client.algorand.client.algod.block(status.lastRound).do()
    return BigInt(block.block.header.timestamp) > info.lastValid
  }

  /**
   * ACC-06: remove a co-admin / domain passkey and refund its MBR to the controlled address.
   * (On-chain this is `assignDomain(address, '')`.)
   */
  async removeDomainKey({ sender, signer, address }: MaybeSigner & { address: string }): Promise<void> {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.assignDomain({
      ...sendParams,
      args: { caller: address, domain: '' },
      extraFee: await this.domainKeyExtraFee(address, 'remove'),
    });
  }

  async usePlugin(params: WalletUsePluginParams): Promise<GroupReturn> {

    const sendParams = this.getSendParams(params);
    const { escrow = '', fundsRequest = [], consolidateFees = false } = params;

    const hasAlgoFundsRequest = fundsRequest.length > 0 && fundsRequest.some(fr => fr.asset === 0n);

    // Check if any plugin in this call has coverFees enabled.
    // When coverFees is true, the contract reimburses Txn.fee from the escrow,
    // so we need to inflate the ALGO fundsRequest for simulation (when fees are maxFee)
    // and then deflate to the real calculated fee after simulation.
    const { callerType = CallerType.Other, calls } = params;
    const firstPluginAppId = calls[0]('').appId;
    const callerAddr = callerType === CallerType.Global
      ? ALGORAND_ZERO_ADDRESS_STRING
      : callerType === CallerType.Admin
        ? algosdk.getApplicationAddress(this.appId).toString()
        : (typeof sendParams.sender === 'string' ? sendParams.sender : (sendParams.sender as { toString(): string }).toString());
    const pluginInfo = this.plugins.get({ plugin: firstPluginAppId, caller: callerAddr, escrow });
    const hasCoverFees = pluginInfo?.coverFees ?? false;

    // ACC-10d: a defaultToEscrow grant is keyed by escrow '' but spends from an escrow app; no
    // allowance can exist for escrow '', so any funds request would fail on-chain.
    if (escrow === '' && pluginInfo !== undefined && pluginInfo.escrow !== 0n && fundsRequest.length > 0) {
      throw new Error('fundsRequest is not supported for defaultToEscrow plugins; fund the escrow directly');
    }

    const suggestedParams = await this.client.algorand.getSuggestedParams();
    const MAX_SIM_FEE = BigInt(suggestedParams.minFee) * 272n;

    const shouldInflate = hasAlgoFundsRequest && hasCoverFees;
    const buildFundsRequest = shouldInflate
      ? fundsRequest.map(fr => fr.asset === 0n ? { ...fr, amount: fr.amount + MAX_SIM_FEE } : fr)
      : fundsRequest;

    const { plugins, caller, length, group, sendParams: preparedSendParams } =
      await this.prepareUsePlugin({ ...params, fundsRequest: buildFundsRequest });

    let result: GroupReturn;

    if (consolidateFees || shouldInflate) {
      // The shared planner discovers and strictly validates resources via
      // `prepareGroup`, while distributing inner-txn fees; we then consolidate onto
      // txn[0] and, when coverFees is on, deflate the fundsRequest from the
      // simulate-only inflated value to the real fee. No extra simulate.
      const composer = await group.composer();
      const internalTxns = (composer as unknown as {
        txns: Array<{ type: string; maxFee?: AlgoAmount }>
      }).txns;
      applyDefaultAppCallMaxFees(internalTxns, microAlgo(MAX_SIM_FEE));

      // Sender/signer already match `preparedSendParams` on the composer
      // calls, so no override is needed for the validated build.
      const prepared = await prepareGroup(composer);

      // Sum the fees AlgoKit just distributed — that's our totalFees cap.
      const totalFees = prepared.transactions.reduce(
        (acc, t) => acc + BigInt(t.fee ?? 0n),
        0n
      );

      // Deflate the fundsRequest: simulate was built with amount + MAX_SIM_FEE,
      // but the real fee is `totalFees`. Only needed when coverFees is on.
      if (shouldInflate) {
        const rekeyTxn = prepared.transactions[0] as unknown as {
          applicationCall: { appArgs: Uint8Array[] }
        };
        const appArgs = rekeyTxn.applicationCall.appArgs;
        const fundsRequestArgIndex = appArgs.length - 1;
        appArgs[fundsRequestArgIndex] = this.adjustFundsRequestAmounts(
          appArgs[fundsRequestArgIndex],
          fundsRequest,
          totalFees,
        );
      }

      // Consolidate: all fees onto txn[0], zero the rest.
      (prepared.transactions[0] as unknown as { fee: bigint }).fee = totalFees;
      for (let i = 1; i < prepared.transactions.length; i++) {
        (prepared.transactions[i] as unknown as { fee: bigint }).fee = 0n;
      }

      // Reassign group ID since we mutated fields after the initial grouping.
      for (const t of prepared.transactions) {
        (t as unknown as { group: Uint8Array | undefined }).group = undefined;
      }
      algosdk.assignGroupID(prepared.transactions);
      prepared.groupId = Buffer.from(prepared.transactions[0].group!).toString('base64');

      result = await sendPrepared(
        prepared,
        this.client.algorand.client.algod,
      ) as unknown as GroupReturn;
    } else {
      result = await group.send({ ...sendParams });
    }

    for (const plugin of plugins) {
      await this.updateCache(
        { plugin, caller, escrow },
        fundsRequest?.map(({ asset }) => asset)
      ).catch(error => {
        console.warn('Failed to update plugin cache:', error);
      });
    }

    return result;
  }

  /**
   * Modify the ABI-encoded fundsRequest argument in a rekey transaction.
   * Replaces the inflated simulation amounts with the correct amounts (original + realFee).
   *
   * The fundsRequest arg is encoded as `(uint64,uint64)[]`:
   *   2 bytes: element count (big-endian uint16)
   *   Per element: 8 bytes asset (big-endian uint64) + 8 bytes amount (big-endian uint64)
   */
  private adjustFundsRequestAmounts(
    encoded: Uint8Array,
    originalFR: FundsRequest[],
    realFee: bigint,
  ): Uint8Array {
    const result = new Uint8Array(encoded);
    const view = new DataView(result.buffer, result.byteOffset, result.byteLength);
    const count = view.getUint16(0);

    for (let i = 0; i < count; i++) {
      const offset = 2 + i * 16;
      const asset = view.getBigUint64(offset);
      const original = originalFR.find(fr => fr.asset === asset);
      if (original && asset === 0n) {
        view.setBigUint64(offset + 8, original.amount + realFee);
      }
    }

    return result;
  }

  async addPlugin<TClient extends SDKClient>({
    sender,
    signer,
    name = '',
    client,
    caller,
    callerType = CallerType.Other,
    methods = [],
    escrow = '',
    admin = false,
    delegationType = 0n,
    lastValid = MAX_UINT64,
    cooldown = 0n,
    useRounds = false,
    useExecutionKey = false,
    coverFees = false,
    // A-3: reclaim permission is opt-in
    canReclaim = false,
    defaultToEscrow = false,
    allowances = [],
    registerEscrow,
  }: WalletAddPluginParams<TClient>): Promise<GroupReturn> {

    const sendParams = this.getSendParams({ sender, signer });

    // Get the plugin app ID from the SDK client
    const plugin = client.appId;

    // ACC-02: the wallet refuses fee cover on a grant anyone can call (callers choose their own fee)
    if (callerType === CallerType.Global && coverFees) {
      throw new Error('A plugin anyone can call cannot cover fees; give fee cover to a specific caller');
    }

    if (callerType === CallerType.Global) {
      caller = ALGORAND_ZERO_ADDRESS_STRING
    } else if (callerType === CallerType.Admin) {
      caller = algosdk.getApplicationAddress(this.appId).toString()
    }

    let transformedMethods: [Uint8Array<ArrayBufferLike>, number | bigint][] = [];
    if (methods.length > 0) {
      transformedMethods = methods.reduce<[Uint8Array<ArrayBufferLike>, number | bigint][]>(
        (acc, method) => {
          if (isPluginSDKReturn(method.name)) {
            const selectors = method.name().selectors ?? [];
            selectors.forEach((selector) => acc.push([selector, method.cooldown]));
          } else {
            method.name.forEach(x => acc.push([x, method.cooldown]));
          }
          return acc;
        },
        []
      );
    }

    const newEscrow = escrow !== '' && !this.escrows.get(escrow);

    // Check if controlled address differs from app address - requires extra fee for MBR transfer inner txn
    const hasExternalControlledAddress = await this.hasExternalControlledAddress();

    // Extra fee: NewEscrowFeeAmount for a new escrow, plus one min fee per MBR payment the wallet
    // makes from an external controlled address (plugin boxes, and the escrow box when new).
    const extraFee = microAlgo(addPluginExtraFee(newEscrow, hasExternalControlledAddress));

    const args: AddPluginArgs = {
      plugin,
      caller: caller!,
      escrow,
      admin,
      delegationType,
      lastValid,
      cooldown,
      methods: transformedMethods,
      useRounds,
      useExecutionKey,
      coverFees,
      canReclaim,
      defaultToEscrow
    }

    const group = this.client.newGroup();

    if (name !== '') {
      group.arc58AddNamedPlugin({
        ...sendParams,
        args: { name, ...args },
        extraFee
      });
    } else {
      group.arc58AddPlugin({
        ...sendParams,
        args,
        extraFee
      });
    }

    if (allowances.length > 0) {

      if (escrow === '') {
        throw new Error('Allowances can only be added to plugins with an escrow');
      }

      group.arc58AddAllowances({
        ...sendParams,
        args: {
          escrow,
          allowances: AllowancesToTuple(allowances)
        },
        // its own MBR payment from an external controlled address
        extraFee: microAlgo(controlledMbrFee(hasExternalControlledAddress))
      });
    }

    // console.log('txns',
    //   (await (await group.composer()).build()).transactions.map(txn => txn.txn)
    // )

    const result = await group.send();

    const postProcess: any[] = []
    // Phase 3: registry writes stop per network once Phase 3 has executed there (spec §7.1).
    if (newEscrow && shouldWriteRegistry(this.network, registerEscrow)) {
      postProcess.push(this.register({ escrow }))
    }

    postProcess.push(this.updateCache(
      { plugin, caller: caller!, escrow },
      allowances.map(allowance => allowance.asset)
    ).catch(error => {
      console.warn('Failed to update plugin cache:', error);
    }));

    await Promise.all(postProcess);

    return result;
  }

  async removePlugin({ sender, signer, ...args }: ContractArgs['arc58_removePlugin(uint64,address,string)void'] & MaybeSigner): Promise<TxnReturn<void>> {

    const sendParams = this.getSendParams({ sender, signer });

    // ACC-05: the wallet now refunds the grant's MBR to an external controlled address
    return await this.client.send.arc58RemovePlugin({
      ...sendParams,
      args,
      extraFee: await this.controlledMbrExtraFee(),
    });
  }

  /** ACC-05: remove a named plugin alias (and its grant, if still installed), refunding their MBR. */
  async removeNamedPlugin({ sender, signer, name }: MaybeSigner & { name: string }): Promise<TxnReturn<void>> {
    const sendParams = this.getSendParams({ sender, signer });
    return await this.client.send.arc58RemoveNamedPlugin({
      ...sendParams,
      args: { name },
      extraFee: await this.controlledMbrExtraFee(),
    });
  }

  /**
   * @internal True when the controlled address is not the wallet app address. The wallet then moves
   * every box MBR with an inner payment from (adds) or to (removes) the controlled address.
   */
  async hasExternalControlledAddress(): Promise<boolean> {
    const controlledAddress = await this.client.state.global.controlledAddress();
    return controlledAddress !== this.client.appAddress.toString();
  }

  /** @internal Extra fee for a call that makes one MBR payment or refund (see `controlledMbrFee`). */
  async controlledMbrExtraFee(): Promise<AlgoAmount> {
    return microAlgo(controlledMbrFee(await this.hasExternalControlledAddress()));
  }

  /**
   * Assign a domain to a passkey address. A key whose domain equals the wallet domain is a
   * co-admin (while the wallet domain is non-empty). Reassigning refunds the old key's MBR
   * before charging the new one. An empty `domain` revokes the key (see `removeDomainKey`).
   */
  async assignDomain({ sender, signer, ...args }: ContractArgs['assignDomain(address,string)void'] & MaybeSigner): Promise<TxnReturn<void>> {

    const sendParams = this.getSendParams({ sender, signer });

    return await this.client.send.assignDomain({
      ...sendParams,
      args,
      extraFee: await this.domainKeyExtraFee(args.caller.toString(), args.domain === '' ? 'remove' : 'assign')
    });
  }

  /**
   * @internal Extra fee for the MBR payments a domain key change makes. These inner payments
   * only happen when the controlled address is not the wallet app address: assigning pays for
   * the new box (and refunds the old one when reassigning), revoking refunds the box.
   */
  async domainKeyExtraFee(caller: string, action: 'assign' | 'remove'): Promise<AlgoAmount> {
    if (!(await this.hasExternalControlledAddress())) {
      return microAlgo(0);
    }

    let payments = action === 'remove' ? 0n : 1n;
    if ((await this.getDomainKey(caller)) !== undefined) {
      payments += 1n;
    }

    return microAlgo(payments * 1_000n);
  }

  async newEscrow({ sender, signer, ...args }: ContractArgs['arc58_newEscrow(string,address)uint64'] & MaybeSigner): Promise<TxnReturn<bigint>> {

    const sendParams = this.getSendParams({ sender, signer });

    return await this.client.send.arc58NewEscrow({
      ...sendParams,
      args,
      extraFee: microAlgo(newEscrowExtraFee(args.address.toString() === ALGORAND_ZERO_ADDRESS_STRING, await this.hasExternalControlledAddress()))
    });
  }

  async toggleEscrowLock({ sender, signer, ...args }: ContractArgs['arc58_toggleEscrowLock(string)(uint64,address,bool)'] & MaybeSigner): Promise<TxnReturn<EscrowInfo>> {

    const sendParams = this.getSendParams({ sender, signer });

    return await this.client.send.arc58ToggleEscrowLock({
      ...sendParams,
      args
    });
  }

  async reclaimFunds({ sender, signer, ...args }: ContractArgs['arc58_reclaim(string,(uint64,uint64,bool)[])void'] & MaybeSigner): Promise<TxnReturn<void>> {

    const sendParams = this.getSendParams({ sender, signer });

    return await this.client.send.arc58Reclaim({
      ...sendParams,
      args
    });
  }

  /**
   * How many plugins and allowances the wallet counts for an escrow. Undefined for an escrow made
   * before the wallet kept this count.
   */
  async getEscrowRefs(escrow: string): Promise<bigint | undefined> {
    try {
      return await this.client.state.box.escrowRefs.value(escrow);
    } catch (error) {
      // only a missing box means "not counted": anything else is a failed read
      if (/box not found|404/i.test(error instanceof Error ? error.message : String(error))) {
        return undefined;
      }
      throw error;
    }
  }

  /**
   * Read everything the chain lists for an escrow: the grants and aliases that name it, its
   * allowances, the assets it holds, and anything that stands in the way of deleting it.
   *
   * The plan's `warnings` say what becomes of the escrow's address after a delete. An app that offers
   * the delete builds its confirmation from this plan and shows every warning prominently in it.
   */
  async getEscrowTeardown(escrow: string): Promise<EscrowTeardown> {
    const { id, address, locked } = await this.getEscrow(escrow);
    if (escrow === '' || address === ALGORAND_ZERO_ADDRESS_STRING) {
      throw new Error(`Escrow '${escrow}' does not exist`);
    }

    const [plugins, named, allowances, account, controlledAddress, factoryAppId] = await Promise.all([
      this.client.state.box.plugins.getMap(),
      this.client.state.box.namedPlugins.getMap(),
      this.client.state.box.allowances.getMap(),
      this.algorand.account.getInformation(address),
      this.client.state.global.controlledAddress(),
      this.client.state.global.escrowFactory(),
    ]);

    const keyOf = (key: PluginKey) => `${key.plugin}|${key.caller}|${key.escrow}`;
    const namesByKey = new Map<string, string[]>();
    for (const [name, key] of named) {
      namesByKey.set(keyOf(key), [...(namesByKey.get(keyOf(key)) ?? []), name]);
    }

    // A grant names the escrow in its key, or, when it defaults to the escrow, by the escrow's app id.
    const refs: EscrowPluginRef[] = [];
    const installed = new Set<string>();
    for (const [key, info] of plugins) {
      installed.add(keyOf(key));
      if (key.escrow === escrow || (key.escrow === '' && id !== 0n && info.escrow === id)) {
        refs.push({ plugin: key.plugin, caller: key.caller, escrow: key.escrow, names: namesByKey.get(keyOf(key)) ?? [] });
      }
    }

    const staleNames = Array.from(named)
      .filter(([, key]) => key.escrow === escrow && !installed.has(keyOf(key)))
      .map(([name]) => name);

    const assets = (account.assets ?? []).map((holding) => holding.assetId);

    const blockers: string[] = [];
    const apps = (account.appsLocalState ?? []).map((state) => state.id);
    if (apps.length > 0) {
      blockers.push(`it is opted in to ${apps.length === 1 ? 'app' : 'apps'} ${apps.join(', ')}: close out of ${apps.length === 1 ? 'it' : 'them'} with the plugin that opted in`);
    }
    if ((account.createdAssets ?? []).length > 0) {
      blockers.push(`it created ${account.createdAssets!.length === 1 ? 'an asset' : 'assets'} that still ${account.createdAssets!.length === 1 ? 'exists' : 'exist'} (${account.createdAssets!.map((asset) => asset.index).join(', ')})`);
    }
    if ((account.createdApps ?? []).length > 0) {
      blockers.push(`it created ${account.createdApps!.length === 1 ? 'an app' : 'apps'} that still ${account.createdApps!.length === 1 ? 'exists' : 'exist'} (${account.createdApps!.map((app) => app.id).join(', ')})`);
    }
    const frozen = (account.assets ?? []).filter((holding) => holding.isFrozen).map((holding) => holding.assetId);
    if (frozen.length > 0) {
      blockers.push(`its holding of ${frozen.join(', ')} is frozen`);
    }
    if (assets.length > 0 && controlledAddress !== undefined) {
      const receiver = await this.algorand.account.getInformation(controlledAddress);
      const receivable = new Set((receiver.assets ?? []).map((holding) => holding.assetId));
      const missing = assets.filter((asset) => !receivable.has(asset));
      if (missing.length > 0) {
        blockers.push(`the wallet's account is not opted in to ${missing.join(', ')}, which the escrow holds: opt it in first`);
      }
    }

    let registered = false;
    if (id !== 0n) {
      if (factoryAppId === undefined) throw new Error('This wallet names no escrow factory');
      const factory = new EscrowFactorySDK({
        algorand: this.algorand,
        factoryParams: { appId: factoryAppId },
        readerAccount: this.readerAccount,
      });
      registered = await factory.exists({ address });
    }

    return {
      escrow,
      id,
      address,
      locked,
      registered,
      counted: await this.getEscrowRefs(escrow),
      plugins: refs,
      staleNames,
      allowances: Array.from(allowances.keys()).filter((key) => key.escrow === escrow).map((key) => key.asset),
      assets,
      blockers,
      warnings: escrowDeleteWarnings(id, address),
    };
  }

  /**
   * Delete an escrow by closing its account out to the wallet. Admin only.
   *
   * The wallet refuses to delete an escrow while a plugin or an allowance still names it, and the
   * network refuses to close an account that holds an asset. So this removes every grant and alias
   * that names the escrow, removes its allowances, closes its assets out to the wallet and deletes
   * it, all in one group: either the whole removal happens or none of it. Only an escrow with more
   * than a group holds (16 calls) is spread over several groups, sent one after another, with the
   * delete in the last.
   *
   * Everything the escrow held comes back to the wallet's account, with what the escrow factory held
   * for its app and the wallet's own storage for it.
   *
   * A locked escrow is not touched unless `unlock` is set: the group then unlocks it first.
   * It throws, sending nothing, when something stands in the way that the wallet cannot undo: the
   * escrow is opted in to an app, or holds an asset the wallet's account cannot receive.
   *
   * An escrow made before the wallet counted plugins and allowances is not checked by the wallet when
   * it is deleted. What this removes for such an escrow is what the chain listed when it was called.
   *
   * What becomes of the escrow's address depends on the kind of escrow, and cannot be undone. The
   * address of an escrow the factory made is under nobody's control afterwards, so funds sent there
   * are lost. An escrow that is an ordinary account rekeyed to the wallet is closed, which ends its
   * rekey: the address then belongs to whoever holds its private key. `getEscrowTeardown` returns
   * this as `warnings`. An app must show them prominently before it asks the person to confirm, and
   * this method does not show or ask anything itself.
   *
   * @returns one entry for each group sent; the last holds the delete
   */
  async deleteEscrow({ sender, signer, escrow, unlock = false }: ContractArgs['arc58_deleteEscrow(string)void'] & MaybeSigner & { unlock?: boolean }): Promise<GroupReturn[]> {

    const sendParams = this.getSendParams({ sender, signer });
    const hasExternalControlledAddress = await this.hasExternalControlledAddress();
    const mbrFee = microAlgo(controlledMbrFee(hasExternalControlledAddress));

    const plan = await this.getEscrowTeardown(escrow);
    assertEscrowCanBeDeleted(plan, unlock);

    type Group = ReturnType<typeof this.client.newGroup>;
    const calls: ((group: Group) => void)[] = [];

    if (plan.locked) {
      calls.push((group) => group.arc58ToggleEscrowLock({ ...sendParams, args: { escrow } }));
    }

    for (const { plugin, caller, escrow: keyEscrow, names } of plan.plugins) {
      if (names.length === 0) {
        calls.push((group) => group.arc58RemovePlugin({ ...sendParams, args: { plugin, caller, escrow: keyEscrow }, extraFee: mbrFee }));
      }
      // the first alias takes the grant with it, the others are only aliases
      for (const name of names) {
        calls.push((group) => group.arc58RemoveNamedPlugin({ ...sendParams, args: { name }, extraFee: mbrFee }));
      }
    }
    for (const name of plan.staleNames) {
      calls.push((group) => group.arc58RemoveNamedPlugin({ ...sendParams, args: { name }, extraFee: mbrFee }));
    }

    for (let i = 0; i < plan.allowances.length; i += RemoveAllowancesPerCall) {
      const assets = plan.allowances.slice(i, i + RemoveAllowancesPerCall);
      calls.push((group) => group.arc58RemoveAllowances({ ...sendParams, args: { escrow, assets }, extraFee: mbrFee }));
    }

    for (let i = 0; i < plan.assets.length; i += ReclaimsPerCall) {
      const assets = plan.assets.slice(i, i + ReclaimsPerCall);
      calls.push((group) => group.arc58Reclaim({
        ...sendParams,
        // nothing is named as an amount: the close-out moves whatever the escrow holds when it runs
        args: { escrow, reclaims: assets.map((asset) => [asset, 0n, true]) },
        extraFee: microAlgo(1_000n * BigInt(assets.length)),
      }));
    }

    calls.push((group) => group.arc58DeleteEscrow({
      ...sendParams,
      args: { escrow },
      extraFee: microAlgo(deleteEscrowExtraFee(plan.id !== 0n, hasExternalControlledAddress, plan.registered)),
    }));

    const sent: GroupReturn[] = [];
    for (let i = 0; i < calls.length; i += MaxGroupSize) {
      const group = this.client.newGroup();
      for (const call of calls.slice(i, i + MaxGroupSize)) call(group);
      sent.push(await group.send({ ...sendParams }));
    }
    return sent;
  }

  async optInEscrow({ sender, signer, ...args }: ContractArgs['arc58_optInEscrow(string,uint64[])void'] & MaybeSigner): Promise<TxnReturn<void>> {

    const sendParams = this.getSendParams({ sender, signer });

    return await this.client.send.arc58OptInEscrow({ ...sendParams, args });
  }

  async addAllowances({ sender, signer, escrow, allowances }: { escrow: string, allowances: AddAllowanceArgs[] } & MaybeSigner): Promise<TxnReturn<void>> {

    const sendParams = this.getSendParams({ sender, signer });

    return await this.client.send.arc58AddAllowances({
      ...sendParams,
      args: {
        escrow,
        allowances: AllowancesToTuple(allowances)
      },
      extraFee: await this.controlledMbrExtraFee()
    });
  }

  async removeAllowances({ sender, signer, ...args }: ContractArgs['arc58_removeAllowances(string,uint64[])void'] & MaybeSigner): Promise<TxnReturn<void>> {

    const sendParams = this.getSendParams({ sender, signer });

    return await this.client.send.arc58RemoveAllowances({
      ...sendParams,
      args,
      extraFee: await this.controlledMbrExtraFee()
    });
  }

  async addExecutionKey({ sender, signer, ...args }: ContractArgs['arc58_addExecutionKey(byte[32],byte[32][],uint64,uint64)void'] & MaybeSigner): Promise<TxnReturn<void>> {

    const sendParams = this.getSendParams({ sender, signer });

    return await this.client.send.arc58AddExecutionKey({
      ...sendParams,
      args,
      extraFee: await this.controlledMbrExtraFee()
    });
  }

  async removeExecutionKey({ sender, signer, ...args }: ContractArgs['arc58_removeExecutionKey(byte[32])void'] & MaybeSigner): Promise<TxnReturn<void>> {

    const sendParams = this.getSendParams({ sender, signer });

    return await this.client.send.arc58RemoveExecutionKey({
      ...sendParams,
      args,
      extraFee: await this.controlledMbrExtraFee()
    });
  }

  readonly build = {

    usePlugin: async ({ firstValid = 0n, windowSize = 0n, consolidateFees = true, skipSignatures = false, adminRekeyMaxFee, ...args }: BuildWalletUsePluginParams): Promise<ExecutionBuildGroup> => {

      const { lease } = args;

      // A wallet administered by an app (e.g. a Guild) may hold no spare ALGO for the rekey's fee while the
      // rekey simulates as its admin: the real sender funds it inside the simulation only, and that payment
      // is dropped from the built group.
      const fundsAdmin = adminRekeyMaxFee !== undefined && !!args.sender;
      const adminFunding = fundsAdmin
        ? [{
          txn: await this.client.algorand.createTransaction.payment({
            sender: args.sender!,
            receiver: (await this.client.state.global.admin())!,
            amount: microAlgo(adminRekeyMaxFee!),
          }),
          signer: makeEmptyTransactionSigner(),
        }]
        : [];
      const rekeyIndex = adminFunding.length;

      const [
        suggestedParams,
        { plugins: _plugins, useRounds, length: _length, group, sendParams },
        admin
      ] = await Promise.all([
        this.client.algorand.getSuggestedParams(),
        this.prepareUsePlugin({ ...args, preTransactions: [...adminFunding, ...(args.preTransactions ?? [])] }),
        this.client.state.global.admin()
      ]);

      const validityPeriod = 1000n;
      const start = firstValid !== 0n ? firstValid : BigInt(suggestedParams.firstValid);

      if (windowSize === 0n) {
        windowSize = BigInt(suggestedParams.lastValid) - BigInt(suggestedParams.firstValid);
      }

      // Cap per-app-call maxFee so the AlgoKit simulate can distribute inner-txn
      // fees up to this limit. 272 × minFee matches the legacy maxFees map and
      // leaves headroom for a fan-out of inner txns during fee pooling.
      //
      // Note: AlgoKit distinguishes `appCall` (raw) from `methodCall` (ABI)
      // at the composer-input level, but both resolve to `TransactionType.appl`
      // transactions and both are subject to the `coverAppCallInnerTransactionFees`
      // maxFee requirement. Cover both input types here or the simulate inside
      // `prepareGroup` will reject with "Please provide a maxFee for each app
      // call transaction" on any group whose plugin path issues an ABI call.
      const MAX_SIM_FEE = BigInt(suggestedParams.minFee) * 272n;
      const composer = await group.composer();
      const internalTxns = (composer as unknown as {
        txns: Array<{ type: string; maxFee?: AlgoAmount }>
      }).txns;
      applyDefaultAppCallMaxFees(internalTxns, microAlgo(MAX_SIM_FEE));
      if (adminRekeyMaxFee !== undefined && internalTxns[rekeyIndex]) internalTxns[rekeyIndex].maxFee = microAlgo(adminRekeyMaxFee);

      // Execution handoff: simulate with admin as sender + empty signer so
      // resources populate as-if admin submitted the group. The real sender
      // is swapped back in per-window below, after the simulate completes.
      // This is the only simulate roundtrip in the whole build.
      // A grant scoped to one caller is keyed by that caller (the rekey's sender), so it simulates as
      // itself; Global and Admin grants resolve their key without the sender.
      const simulateSender = (args.callerType ?? CallerType.Other) === CallerType.Other ? sendParams.sender : admin;
      const prepared = await prepareGroup(composer, {
        sender: simulateSender as string,
        signer: makeEmptyTransactionSigner(),
        ...(adminRekeyMaxFee !== undefined ? { senderIndexes: new Set([rekeyIndex]) } : {}),
      });
      if (fundsAdmin) {
        // the simulation-only funding payment leaves the group; method calls shift down with it
        prepared.transactions = prepared.transactions.slice(rekeyIndex);
        prepared.signers = prepared.signers.slice(rekeyIndex);
        prepared.methodCalls = new Map([...prepared.methodCalls].map(([index, method]) => [index - rekeyIndex, method] as const).filter(([index]) => index >= 0));
      }

      let numGroupsToBuild: number;
      let endTarget: bigint;

      if (useRounds) {
        endTarget = start + windowSize;
        numGroupsToBuild = Math.ceil(Number(windowSize) / Number(validityPeriod));
      } else {
        // Convert seconds to rounds (assuming ~2.7s per round)
        const roundsNeeded = BigInt(Math.ceil(Number(windowSize) / 2.7));
        endTarget = start + roundsNeeded;
        numGroupsToBuild = Math.ceil(Number(roundsNeeded) / Number(validityPeriod));
      }

      // Total fees distributed by the simulate — our consolidation target.
      const baseTotalFees = prepared.transactions.reduce(
        (acc, t) => acc + BigInt(t.fee ?? 0n),
        0n
      );

      // Predict the wallet's ALGO + asset balance delta from the simulate
      // response we just captured inside `prepareGroup` — no extra RTT. The
      // tracked address is the wallet's app account, since that's the
      // balance-holder whose delta downstream callers care about (UI "you
      // will spend X" prompts, pre-flight balance checks, etc.).
      //
      // If the captured response is missing (shouldn't happen under the
      // `populateAppCallResources`/`coverAppCallInnerTransactionFees` path,
      // but guard anyway), fall back to a zero-cost snapshot rather than
      // crashing the build — callers can tell prediction failed by checking
      // for a zero `totalAlgo` against a non-empty group.
      const expectedCost: ExpectedCost = prepared.simulateResponse
        ? computeExpectedCost(
          prepared.simulateResponse,
          this.client.appAddress.toString()
        )
        : { totalAlgo: 0n, networkFees: 0n, subtotals: [], payments: [] };

      // Encoded lease bytes attached to txn[0] of each window (replay-protection
      // + execution-key box lookup).
      const encodedLease = encodeLease(lease)!;

      // Signer baked into each window ATC. `skipSignatures` mode defers signer
      // selection to send() time — we stamp an empty signer here and require
      // `options.signer` when send() fires.
      const windowSigner: algosdk.TransactionSigner = skipSignatures
        ? makeEmptyTransactionSigner()
        : (sendParams.signer);

      // Real sender address the per-window transactions are swapped to.
      // Normalize the sender to the native algosdk Address type.
      const realSenderAddr = sendParams.sender instanceof Address
        ? sendParams.sender
        : typeof sendParams.sender === 'string'
          ? algosdk.Address.fromString(sendParams.sender)
          : algosdk.Address.fromString((sendParams.sender as { toString(): string }).toString());

      const groups: ExecutionBuildGroup = {
        lease: encodedLease,
        firstValid: start,
        lastValid: endTarget,
        useRounds,
        ids: [],
        windows: [],
        expectedCost,
        send: async (options) => {
          // Pick the window whose validity range contains the current round.
          const status = await this.client.algorand.client.algod.status().do();
          const currentRound = BigInt(status.lastRound);

          let selectedIndex = -1;
          for (let i = 0; i < groups.windows.length; i++) {
            const groupStart = groups.firstValid + (BigInt(i) * validityPeriod);
            const groupEnd = i === groups.windows.length - 1
              ? groups.lastValid
              : groupStart + validityPeriod - 1n;

            if (currentRound >= groupStart && currentRound <= groupEnd) {
              selectedIndex = i;
              break;
            }
          }

          if (selectedIndex === -1) {
            throw new Error(
              `No valid group for current round ${currentRound}. ` +
              `Window: ${groups.firstValid}-${groups.lastValid}`
            );
          }

          const window = groups.windows[selectedIndex];

          // If the caller passed a signer at send() time, override the baked-in
          // signer on every txn. Otherwise use the signers already attached to
          // the window (either the build-time signer or an empty signer for
          // `skipSignatures` mode, in which case a caller-supplied signer is
          // required and the wrap path above handles it).
          const providedSigner = options?.signer as unknown as algosdk.TransactionSigner | undefined;
          let signers: algosdk.TransactionSigner[];
          if (skipSignatures) {
            if (!providedSigner) {
              throw new Error('signer is required when skipSignatures is true');
            }
            const wrapped = (providedSigner);
            signers = window.transactions.map(() => wrapped);
          } else if (providedSigner) {
            const wrapped = (providedSigner);
            signers = window.transactions.map(() => wrapped);
          } else {
            signers = window.signers;
          }

          const result = await sendPrepared(
            { ...window, signers },
            this.client.algorand.client.algod,
          );

          return {
            ...result,
            returns: result.returns.filter(({ method }) => method?.returns.type !== 'void'),
          } as unknown as GroupReturn;
        }
      };

      // Build one `PreparedGroup` per validity window by cloning the
      // simulate-populated transactions (msgpack roundtrip gives us fresh
      // mutable instances) and applying per-window overrides: sender swap,
      // firstValid/lastValid, lease, and optional fee consolidation. No
      // additional simulate runs here.
      for (let i = 0; i < numGroupsToBuild; i++) {
        const groupStartRound = start + (BigInt(i) * validityPeriod);
        const groupEndRound = i === (numGroupsToBuild - 1)
          ? endTarget - 1n
          : groupStartRound + validityPeriod - 1n;

        console.log(`Building group ${i + 1}/${numGroupsToBuild} with start: ${groupStartRound}, end: ${groupEndRound}`);

        const windowTxns = prepared.transactions.map((txn, idx) => {
          const bytes = algosdk.encodeUnsignedTransaction(txn);
          const cloned = algosdk.decodeUnsignedTransaction(bytes);
          const t = cloned as unknown as {
            sender: algosdk.Address;
            firstValid: bigint;
            lastValid: bigint;
            lease?: Uint8Array;
            fee: bigint;
            group?: Uint8Array;
          };
          t.group = undefined;
          t.sender = realSenderAddr;
          t.firstValid = groupStartRound;
          t.lastValid = groupEndRound;
          if (idx === 0) {
            t.lease = encodedLease;
          }
          if (consolidateFees) {
            t.fee = idx === 0 ? baseTotalFees : 0n;
          }
          return cloned;
        });

        // Deterministic group ID assignment mirrors what
        // `AtomicTransactionComposer.buildGroup()` used to do here — it hashes
        // the transaction headers and stamps the resulting ID onto each txn.
        algosdk.assignGroupID(windowTxns);

        const window: PreparedGroup = {
          transactions: windowTxns,
          signers: windowTxns.map(() => windowSigner),
          groupId: Buffer.from(windowTxns[0].group!).toString('base64'),
          methodCalls: new Map(prepared.methodCalls),
        };

        groups.ids.push(windowTxns[0].group!);
        groups.windows.push(window);
      }

      return groups;
    }
  }

  async getGlobalState(): Promise<WalletGlobalState> {
    return await this.client.state.global.getAll() as unknown as WalletGlobalState;
  }

  async getAdmin(): Promise<string> {
    return (await this.client.send.arc58GetAdmin()).return as unknown as string;
  }

  async getPlugins(): Promise<ValueMap<PluginKey, PluginInfo>> {
    this.plugins = new ValueMap(
      this.pluginMapKeyGenerator,
      Array.from(
        await this.client.state.box.plugins.getMap(),
        ([key, info]) => {
          return [
            key,
            {
              ...info,
              methods: info.methods.map((method) => ({
                name: method[0],
                cooldown: method[1],
                lastCalled: method[2]
              }))
            }
          ];
        }
      )
    );
    return this.plugins;
  }

  async getPluginByKey(key: PluginKey): Promise<PluginInfo> {
    const orderedKey: PluginKey = { plugin: key.plugin, caller: key.caller, escrow: key.escrow };
    const info = PluginInfoFromTuple((await this.client.send.arc58GetPlugins({
      args: { keys: [[orderedKey.plugin, orderedKey.caller, orderedKey.escrow]] },
    })).return![0])
    const methods = info.methods.map((method) => ({
      name: method[0],
      cooldown: method[1],
      lastCalled: method[2]
    }));

    return { ...info, methods };
  }

  async getNamedPlugins(): Promise<Map<string, PluginKey>> {
    this.namedPlugins = await this.client.state.box.namedPlugins.getMap()
    return this.namedPlugins;
  }

  async getPluginByName(name: string): Promise<PluginInfo> {
    const infos = (await this.client.send.arc58GetNamedPlugins({ args: { names: [name] } })).return!;
    const info = PluginInfoFromTuple(infos[0])
    const methods = info.methods.map((method) => ({
      name: method[0],
      cooldown: method[1],
      lastCalled: method[2]
    }));
    return { ...info, methods };
  }

  async getEscrows(): Promise<Map<string, EscrowInfo>> {
    this.escrows = await this.client.state.box.escrows.getMap()
    return this.escrows
  }

  async getEscrow(escrow: string): Promise<EscrowInfo> {
    return EscrowInfoFromTuple((await this.client.send.arc58GetEscrows({ args: { escrows: [escrow] } })).return![0])
  }

  async getAllowances(): Promise<ValueMap<AllowanceKey, AllowanceInfo>> {
    this.allowances = new ValueMap(
      this.allowanceMapKeyGenerator,
      Array.from(
        await this.client.state.box.allowances.getMap(),
        ([key, info]) => {
          return [
            key,
            AllowanceInfoTranslate(info)
          ];
        }
      )
    );
    return this.allowances;
  }

  async getAllowance(key: AllowanceKey): Promise<AllowanceInfo> {
    // Keep the box key in its declared struct order.
    const orderedKey: AllowanceKey = { escrow: key.escrow, asset: key.asset };
    return AllowanceInfoTranslate((await this.client.state.box.allowances.value(orderedKey))!);
  }

  async getExecutions(): Promise<Map<Uint8Array, ExecutionInfo>> {
    this.executions = await this.client.state.box.executions.getMap();
    return this.executions;
  }

  async getExecution(lease: Uint8Array<ArrayBufferLike>): Promise<ExecutionInfo> {
    return await this.client.state.box.executions.value(lease)! as unknown as ExecutionInfo;
  }

  /** @returns the domain assigned to a passkey address, or undefined if it has none */
  async getDomainKey(address: string): Promise<string | undefined> {
    try {
      return await this.client.state.box.domainKeys.value(address);
    } catch {
      return undefined;
    }
  }

    async getMbr(args: MbrParams): Promise<AbstractAccountBoxMbrData> {
    return await this.mbrClient.mbr({
      args: { appId: this.client.appId, ...args },
      staticFee: microAlgo(2_000),
    });
  }
}
