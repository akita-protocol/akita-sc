import { AbstractAccountBoxMbrData, AbstractedAccountArgs, AbstractedAccountFactory, AllowanceKey, EscrowInfo, PluginKey, type AbstractedAccountClient, ExecutionInfo, AbstractedAccountComposer, PluginInfoFromTuple, EscrowInfoFromTuple } from '../generated/AbstractedAccountClient'
import { AddAllowanceArgs, AddPluginArgs, AllowanceInfo, BuildWalletUsePluginParams, CallerType, CanCallParams, ExecutionBuildGroup, FundsRequest, MbrParams, MethodOffset, PluginInfo, RekeyArgs, WalletAddPluginParams, WalletGlobalState, WalletUsePluginParams } from './types';
import { isPluginSDKReturn, MaybeSigner, NewContractSDKParams, SDKClient, GroupReturn, TxnReturn, hasSenderSigner, ExpandedSendParamsWithSigner, PluginTxn } from '../types';
import { BaseSDK } from '../base';
import { ENV_VAR_NAMES } from '../config';
import algosdk, { Address, ALGORAND_ZERO_ADDRESS_STRING, makeEmptyTransactionSigner } from 'algosdk';
import { MAX_UINT64 } from '../constants';
import { AllowanceInfoTranslate, AllowancesToTuple, domainBoxKey, executionBoxKey, ValueMap } from './utils';
import { wrapUtils10Signer } from '../utils';
import { NewEscrowFeeAmount } from './constants';
import { encodeLease, microAlgo } from '@algorandfoundation/algokit-utils';
import { ABIMethod } from '@algorandfoundation/algokit-utils/abi';
import { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount';
import { BoxIdentifier, BoxReference } from '@algorandfoundation/algokit-utils/types/app-manager';
import { prepareGroup, PreparedGroup, sendPrepared } from '../simulate/prepare';
import { computeExpectedCost, ExpectedCost } from '../simulate/cost';
import { WalletGroupComposer } from './group';

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
  public plugins: ValueMap<PluginKey, PluginInfo> = new ValueMap(this.pluginMapKeyGenerator);
  public namedPlugins: Map<string, PluginKey> = new Map();

  public escrows: Map<string, EscrowInfo> = new Map();

  private allowanceMapKeyGenerator = ({ asset, escrow }: AllowanceKey) => (`${asset}${escrow}`);
  public allowances: ValueMap<AllowanceKey, AllowanceInfo> = new ValueMap(this.allowanceMapKeyGenerator);

  public executions: Map<Uint8Array, ExecutionInfo> = new Map();

  constructor(params: NewContractSDKParams) {
    super({ factory: AbstractedAccountFactory, ...params }, ENV_VAR_NAMES.WALLET_APP_ID);
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
    lease = ''
  }: WalletUsePluginParams): Promise<{ plugins: bigint[], caller: string, useRounds: boolean, length: number, group: AbstractedAccountComposer<[]>, sendParams: ExpandedSendParamsWithSigner }> {

    const sendParams = this.getSendParams({ sender, signer });

    let spendingAddress = (await this.client.state.global.controlledAddress())!
    if (escrow !== '') {
      let id = 0n
      if (this.escrows.has(escrow)) {
        id = this.escrows.get(escrow)!.id
      } else {
        try {
          id = (await this.getEscrow(escrow)).id
        } catch (error) {
          throw new Error(`Escrow with name ${escrow} does not exist`);
        }
      }
      spendingAddress = algosdk.getApplicationAddress(id).toString();
    }

    // Group calls into segments by consecutive appId
    type PluginSegment = { appId: bigint; txns: PluginTxn[]; opUpCount: number };
    const segments: PluginSegment[] = [];

    for (const call of calls) {
      const { appId, getTxns, opUpCount = 0 } = call(spendingAddress);
      const callTxns = await getTxns({ wallet: this.client.appId });
      const last = segments[segments.length - 1];
      if (last && last.appId === appId) {
        last.txns.push(...callTxns);
        last.opUpCount += opUpCount;
      } else {
        segments.push({ appId, txns: callTxns, opUpCount });
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
    let totalOpUpCount = 0;
    let lastUseRounds = false;
    let lastPluginAppId = 0n;

    for (let segIdx = 0; segIdx < segments.length; segIdx++) {
      const segment = segments[segIdx];
      const isFirstSegment = segIdx === 0;
      lastPluginAppId = segment.appId;
      totalOpUpCount += segment.opUpCount;

      // Fetch plugin info and calculate method offsets for this segment
      const key: PluginKey = { plugin: segment.appId, caller, escrow }
      let methods: MethodOffset[] = []
      let useRounds = false;
      let useExecutionKey = false;
      if (this.plugins.has(key)) {
        ({ methods, useRounds, useExecutionKey } = this.plugins.get(key)!);
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

      // Add rekey for this segment
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
          case 'pay': { composer.addPayment(txn); break; }
          case 'assetCreate': { composer.addAssetCreate(txn); break; }
          case 'assetConfig': { composer.addAssetConfig(txn); break; }
          case 'assetFreeze': { composer.addAssetFreeze(txn); break; }
          case 'assetDestroy': { composer.addAssetDestroy(txn); break; }
          case 'assetTransfer': { composer.addAssetTransfer(txn); break; }
          case 'assetOptIn': { composer.addAssetOptIn(txn); break; }
          case 'assetOptOut': { composer.addAssetOptOut(txn); break; }
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
          case 'txnWithSigner': { composer.addTransaction(txn.txn, txn.signer); break; }
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

      // Add verifyAuthAddress after this segment's transactions
      // Note differentiates each verifyAuth so they have unique txn IDs within the group
      group.arc58VerifyAuthAddress({
        ...sendParams,
        args: {},
        ...(segments.length > 1 ? { note: new TextEncoder().encode(`v${segIdx}`) } : {})
      })

    }

    // Calculate actual txn count manually, accounting for companion transactions
    // (ABI method calls with transaction-type args like `pay` expand to multiple txns)
    const ABI_TXN_TYPES = ['txn', 'pay', 'keyreg', 'acfg', 'axfer', 'afrz', 'appl'];
    let actualTxnCount = 0;
    for (const segment of segments) {
      actualTxnCount += 2; // rekey + verifyAuth
      for (const txn of segment.txns) {
        actualTxnCount += 1;
        if (txn.type === 'methodCall') {
          for (const arg of txn.method.args) {
            if (typeof arg.type === 'string' && ABI_TXN_TYPES.includes(arg.type)) {
              actualTxnCount += 1;
            }
          }
        }
      }
    }

    // Add opUp transactions after all segments, using the last segment's appId
    const hasSigner = hasSenderSigner(sendParams);
    const opUpLimit = Math.min(totalOpUpCount, (16 - actualTxnCount));
    if (totalOpUpCount > 0 && hasSigner && opUpLimit > 0) {
      const opUpComposer = await group.composer();
      for (let i = 0; i < opUpLimit; i++) {
        opUpComposer.addAppCallMethodCall({
          sender: sendParams.sender,
          signer: sendParams.signer,
          appId: lastPluginAppId,
          method: ABIMethod.fromSignature('opUp()void'),
          args: [],
          maxFee: microAlgo(1_000),
          note: new TextEncoder().encode(String(i))
        });
      }
    }

    const length = await (await group.composer()).count()
    const plugins = [...new Set(segments.map(s => s.appId))];

    return { plugins, caller, useRounds: lastUseRounds, length, group, sendParams: sendParams as ExpandedSendParamsWithSigner }
  }

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

    return result.map(x => x.status === 'fulfilled' ? x.value : false)
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
    const hasCoverFees = this.plugins.get({ plugin: firstPluginAppId, caller: callerAddr, escrow })?.coverFees ?? false;

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
      // Utils10-native flow: single simulate via `prepareGroup` populates
      // resources and distributes inner-txn fees; we then consolidate onto
      // txn[0] and, when coverFees is on, deflate the fundsRequest from the
      // simulate-only inflated value to the real fee. No extra simulate.
      const composer = await group.composer();
      const internalTxns = (composer as unknown as {
        txns: Array<{ type: string; data: { maxFee?: AlgoAmount } }>
      }).txns;
      for (const ctxn of internalTxns) {
        if (ctxn.type === 'appCall' && ctxn.data.maxFee === undefined) {
          ctxn.data.maxFee = microAlgo(MAX_SIM_FEE);
        }
      }

      // Single simulate + post-build mutations. Sender/signer already match
      // `preparedSendParams` on the composer calls, so no override needed.
      const prepared = await prepareGroup(composer);

      // Sum the fees utils10 just distributed — that's our totalFees cap.
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
    canReclaim = true,
    defaultToEscrow = false,
    allowances = []
  }: WalletAddPluginParams<TClient>): Promise<GroupReturn> {

    const sendParams = this.getSendParams({ sender, signer });

    // Get the plugin app ID from the SDK client
    const plugin = client.appId;

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
    const controlledAddress = await this.client.state.global.controlledAddress();
    const hasExternalControlledAddress = controlledAddress !== this.client.appAddress.toString();

    // Calculate extra fee:
    // - NewEscrowFeeAmount (6000) if creating a new escrow
    // - 1000 if controlled address is external (for MBR transfer inner txn)
    const extraFee = microAlgo((newEscrow ? NewEscrowFeeAmount : 0n) + (hasExternalControlledAddress ? 1000n : 0n));

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
        }
      });
    }

    // console.log('txns',
    //   (await (await group.composer()).build()).transactions.map(txn => txn.txn)
    // )

    const result = await group.send();

    const postProcess: any[] = []
    if (newEscrow) {
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

    return await this.client.send.arc58RemovePlugin({
      ...sendParams,
      args
    });
  }

  async newEscrow({ sender, signer, ...args }: ContractArgs['arc58_newEscrow(string)uint64'] & MaybeSigner): Promise<TxnReturn<bigint>> {

    const sendParams = this.getSendParams({ sender, signer });

    return await this.client.send.arc58NewEscrow({
      ...sendParams,
      args
    });
  }

  async toggleEscrowLock({ sender, signer, ...args }: ContractArgs['arc58_toggleEscrowLock(string)(uint64,bool)'] & MaybeSigner): Promise<TxnReturn<EscrowInfo>> {

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
      }
    });
  }

  async removeAllowances({ sender, signer, ...args }: ContractArgs['arc58_removeAllowances(string,uint64[])void'] & MaybeSigner): Promise<TxnReturn<void>> {

    const sendParams = this.getSendParams({ sender, signer });

    return await this.client.send.arc58RemoveAllowances({
      ...sendParams,
      args
    });
  }

  async addExecutionKey({ sender, signer, lease, groups, firstValid, lastValid }: ContractArgs['arc58_addExecutionKey(byte[32],byte[32][],uint64,uint64)void'] & MaybeSigner): Promise<TxnReturn<void>> {

    const sendParams = this.getSendParams({ sender, signer });

    return await this.client.send.arc58AddExecutionKey({
      ...sendParams,
      args: { lease, groups, firstValid, lastValid }
    });
  }

  async removeExecutionKey({ sender, signer, ...args }: ContractArgs['arc58_removeExecutionKey(byte[32])void'] & MaybeSigner): Promise<TxnReturn<void>> {

    const sendParams = this.getSendParams({ sender, signer });

    return await this.client.send.arc58RemoveExecutionKey({
      ...sendParams,
      args
    });
  }

  readonly build = {

    usePlugin: async ({ firstValid = 0n, windowSize = 0n, consolidateFees = true, skipSignatures = false, ...args }: BuildWalletUsePluginParams): Promise<ExecutionBuildGroup> => {

      const { lease } = args;

      const [
        suggestedParams,
        { plugins: _plugins, useRounds, length: _length, group, sendParams },
        admin
      ] = await Promise.all([
        this.client.algorand.getSuggestedParams(),
        this.prepareUsePlugin(args),
        this.client.state.global.admin()
      ]);

      const validityPeriod = 1000n;
      const start = firstValid !== 0n ? firstValid : BigInt(suggestedParams.firstValid);

      if (windowSize === 0n) {
        windowSize = BigInt(suggestedParams.lastValid) - BigInt(suggestedParams.firstValid);
      }

      // Cap per-app-call maxFee so the utils10 simulate can distribute inner-txn
      // fees up to this limit. 272 × minFee matches the legacy maxFees map and
      // leaves headroom for a fan-out of inner txns during fee pooling.
      //
      // Note: utils10 distinguishes `appCall` (raw) from `methodCall` (ABI)
      // at the composer-input level, but both resolve to `TransactionType.AppCall`
      // transactions and both are subject to the `coverAppCallInnerTransactionFees`
      // maxFee requirement. Cover both input types here or the simulate inside
      // `prepareGroup` will reject with "Please provide a maxFee for each app
      // call transaction" on any group whose plugin path issues an ABI call.
      const MAX_SIM_FEE = BigInt(suggestedParams.minFee) * 272n;
      const composer = await group.composer();
      const internalTxns = (composer as unknown as {
        txns: Array<{ type: string; data: { maxFee?: AlgoAmount } }>
      }).txns;
      for (const ctxn of internalTxns) {
        if ((ctxn.type === 'appCall' || ctxn.type === 'methodCall') && ctxn.data.maxFee === undefined) {
          ctxn.data.maxFee = microAlgo(MAX_SIM_FEE);
        }
      }

      // Execution handoff: simulate with admin as sender + empty signer so
      // resources populate as-if admin submitted the group. The real sender
      // is swapped back in per-window below, after the simulate completes.
      // This is the only simulate roundtrip in the whole build.
      const prepared = await prepareGroup(composer, {
        sender: admin as string,
        signer: makeEmptyTransactionSigner(),
      });

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
        : wrapUtils10Signer(sendParams.signer);

      // Real sender address the per-window transactions are swapped to.
      // Accept: algosdk.Address, string, or v10 `Address & AddressWithSigners`
      // (an Address instance from @algorandfoundation/algokit-common, which is
      // a different class than algosdk's Address so `instanceof` fails). We
      // fall back to .toString() which works for all shapes.
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
          const status = await this.client.algorand.client.algod.status();
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
            const wrapped = wrapUtils10Signer(providedSigner);
            signers = window.transactions.map(() => wrapped);
          } else if (providedSigner) {
            const wrapped = wrapUtils10Signer(providedSigner);
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
            returns: result.returns.filter(({ method }) => method.returns.type !== 'void'),
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
    // Reorder keys to match the struct's declared field order (plugin, caller,
    // escrow). utils10's struct-value → tuple conversion walks
    // `Object.values(value)` positionally, so if a caller passes the object
    // with properties in a different order we silently encode the wrong box
    // key and the lookup fails. Defensively reorder here.
    const orderedKey: PluginKey = { plugin: key.plugin, caller: key.caller, escrow: key.escrow };
    const info = (await this.client.state.box.plugins.value(orderedKey))!
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
    // Reorder keys to match the struct's declared field order (escrow, asset).
    // utils10's struct-value → tuple conversion walks `Object.values(value)`
    // positionally, so mismatched property order in the source object produces
    // "Cannot encode value as string: 0" when the bigint `asset` ends up in the
    // slot reserved for the `escrow` string.
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

  async getMbr(args: MbrParams): Promise<AbstractAccountBoxMbrData> {
    return (await this.client.send.mbr({ args })).return as unknown as AbstractAccountBoxMbrData;
  }
}
