import type { WalletSDK } from './index'
import { AbstractedAccountArgs, AbstractedAccountComposer, PluginKey } from '../generated/AbstractedAccountClient'
import { AddAllowanceArgs, AddPluginArgs, CallerType, WalletAddPluginParams, WalletUsePluginParams } from './types'
import { AllowancesToTuple, applyDefaultAppCallMaxFees } from './utils'
import { addPluginExtraFee, controlledMbrFee, newEscrowExtraFee } from './constants'
import { isPluginSDKReturn, MaybeSigner, SDKClient, GroupReturn, ExpandedSendParams, normalizeSigner } from '../types'
import { MAX_UINT64 } from '../constants'
import { shouldWriteRegistry } from '../config'
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { SendParams } from '@algorandfoundation/algokit-utils/types/transaction';

type ContractArgs = AbstractedAccountArgs["obj"]

/**
 * Fluent composer returned by `wallet.group()` that queues wallet operations
 * and resolves them as a single atomic group at `send()` time.
 *
 * Tracks internal state like new escrow creation across operations so that
 * only the first addPlugin with a given escrow pays the NewEscrowFeeAmount.
 */
export class WalletGroupComposer {
  private wallet: WalletSDK
  private resolvers: (() => Promise<void>)[] = []
  private postProcessors: (() => Promise<void>)[] = []
  private newEscrows: Set<string> = new Set()
  /** Tracks `"escrow:asset"` keys to deduplicate allowance additions */
  private newAllowances: Set<string> = new Set()
  private group: AbstractedAccountComposer<[]>

  constructor(wallet: WalletSDK) {
    this.wallet = wallet
    this.group = wallet.client.newGroup()
  }

  private getSendParams({ sender, signer }: MaybeSigner = {}): ExpandedSendParams {
    return {
      ...this.wallet.sendParams,
      ...(sender !== undefined && { sender }),
      ...(signer !== undefined && { signer: normalizeSigner(signer) }),
    }
  }

  // ---------------------------------------------------------------------------
  // Complex methods
  // ---------------------------------------------------------------------------

  addPlugin<TClient extends SDKClient>(params: WalletAddPluginParams<TClient>): this {
    this.resolvers.push(async () => {
      const {
        sender, signer, name = '', client, caller: rawCaller,
        callerType = CallerType.Other, methods = [], escrow = '', admin = false,
        delegationType = 0n, lastValid = MAX_UINT64, cooldown = 0n,
        useRounds = false, useExecutionKey = false, coverFees = false,
        canReclaim = false, defaultToEscrow = false, allowances = [], registerEscrow
      } = params as WalletAddPluginParams<TClient> & { caller?: string; callerType?: bigint }

      let caller = rawCaller
      const sendParams = this.getSendParams({ sender, signer })
      const plugin = client.appId

      if (callerType === CallerType.Global) {
        caller = ALGORAND_ZERO_ADDRESS_STRING
      } else if (callerType === CallerType.Admin) {
        caller = algosdk.getApplicationAddress(this.wallet.appId).toString()
      }

      // Transform methods
      let transformedMethods: [Uint8Array<ArrayBufferLike>, number | bigint][] = []
      if (methods.length > 0) {
        transformedMethods = methods.reduce<[Uint8Array<ArrayBufferLike>, number | bigint][]>(
          (acc, method) => {
            if (isPluginSDKReturn(method.name)) {
              const selectors = method.name().selectors ?? []
              selectors.forEach((selector) => acc.push([selector, method.cooldown]))
            } else {
              method.name.forEach(x => acc.push([x, method.cooldown]))
            }
            return acc
          },
          []
        )
      }

      // Check escrow — both SDK cache and this group's new escrows
      const isNewEscrow = escrow !== ''
        && !this.wallet.escrows.get(escrow)
        && !this.newEscrows.has(escrow)

      if (isNewEscrow) {
        this.newEscrows.add(escrow)
      }

      // Check if controlled address differs from app address — requires extra fee
      const hasExternalControlledAddress = await this.wallet.hasExternalControlledAddress()
      const extraFee = microAlgo(addPluginExtraFee(isNewEscrow, hasExternalControlledAddress))

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

      if (name !== '') {
        this.group.arc58AddNamedPlugin({
          ...sendParams,
          args: { name, ...args },
          extraFee
        })
      } else {
        this.group.arc58AddPlugin({
          ...sendParams,
          args,
          extraFee
        })
      }

      if (allowances.length > 0) {
        if (escrow === '') {
          throw new Error('Allowances can only be added to plugins with an escrow')
        }
        // Deduplicate: skip allowances whose (escrow, asset) pair was already queued
        const dedupedAllowances = allowances.filter((a: AddAllowanceArgs) => {
          const key = `${escrow}:${a.asset}`
          if (this.newAllowances.has(key)) return false
          this.newAllowances.add(key)
          return true
        })
        if (dedupedAllowances.length > 0) {
          this.group.arc58AddAllowances({
            ...sendParams,
            args: {
              escrow,
              allowances: AllowancesToTuple(dedupedAllowances)
            },
            // its own MBR payment from an external controlled address
            extraFee: microAlgo(controlledMbrFee(hasExternalControlledAddress))
          })
        }
      }

      // Queue post-processing (runs after the group is sent)
      const pluginKey: PluginKey = { plugin, caller: caller!, escrow }
      const allowanceAssets = allowances.map((a: AddAllowanceArgs) => a.asset)
      this.postProcessors.push(async () => {
        // Phase 3: registry writes stop per network once Phase 3 has executed there (spec §7.1).
        if (isNewEscrow && shouldWriteRegistry(this.wallet.network, registerEscrow)) {
          await this.wallet.register({ sender, signer, escrow })
        }
        await this.wallet.updateCache(pluginKey, allowanceAssets).catch(error => {
          console.warn('Failed to update plugin cache:', error)
        })
      })
    })
    return this
  }

  usePlugin(params: WalletUsePluginParams): this {
    this.resolvers.push(async () => {
      // Merge the native ATC while preserving its ABI method metadata.
      const { group: tempGroup } = await this.wallet.prepareUsePlugin(params)
      const tempComposer = await tempGroup.composer()
      const mainComposer = await this.group.composer()
      const source = tempComposer as unknown as { txns: unknown[] };
      const target = mainComposer as unknown as { txns: unknown[] };
      target.txns.push(...source.txns);
    })
    return this
  }

  // ---------------------------------------------------------------------------
  // Simple methods
  // ---------------------------------------------------------------------------

  /**
   * @deprecated LEGACY registry write (EscrowFactory reverse registry). The SDK no longer registers
   * wallets or escrows on its own (principal-resolution Phase 3); use this only to keep legacy registry
   * semantics working. Removed in Phase 4.
   */
  register({ sender, signer, ...args }: ContractArgs['register(string)void'] & MaybeSigner): this {
    this.resolvers.push(async () => {
      this.group.register({ ...this.getSendParams({ sender, signer }), args })
    })
    return this
  }

  changeRevocationApp({ sender, signer, app }: MaybeSigner & { app: bigint }): this {
    this.resolvers.push(async () => {
      this.group.setRevocationApp({ ...this.getSendParams({ sender, signer }), args: { app } })
    })
    return this
  }

  setNickname({ sender, signer, nickname }: MaybeSigner & { nickname: string }): this {
    this.resolvers.push(async () => {
      this.group.setNickname({ ...this.getSendParams({ sender, signer }), args: { nickname } })
    })
    return this
  }

  setAvatar({ sender, signer, avatar }: MaybeSigner & { avatar: bigint }): this {
    this.resolvers.push(async () => {
      this.group.setAvatar({ ...this.getSendParams({ sender, signer }), args: { avatar } })
    })
    return this
  }

  setBanner({ sender, signer, banner }: MaybeSigner & { banner: bigint }): this {
    this.resolvers.push(async () => {
      this.group.setBanner({ ...this.getSendParams({ sender, signer }), args: { banner } })
    })
    return this
  }

  setBio({ sender, signer, bio }: MaybeSigner & { bio: string }): this {
    this.resolvers.push(async () => {
      this.group.setBio({ ...this.getSendParams({ sender, signer }), args: { bio } })
    })
    return this
  }

  changeAdmin({ sender, signer, newAdmin }: MaybeSigner & { newAdmin: string }): this {
    this.resolvers.push(async () => {
      this.group.arc58ChangeAdmin({ ...this.getSendParams({ sender, signer }), args: { newAdmin } })
    })
    return this
  }

  verifyAuthAddress(params?: MaybeSigner): this {
    this.resolvers.push(async () => {
      this.group.arc58VerifyAuthAddress({ ...this.getSendParams(params), args: {} })
    })
    return this
  }

  rekeyTo({ sender, signer, ...args }: MaybeSigner & ContractArgs['arc58_rekeyTo(address,bool)void']): this {
    this.resolvers.push(async () => {
      this.group.arc58RekeyTo({ ...this.getSendParams({ sender, signer }), args })
    })
    return this
  }

  canCall({ sender, signer, ...args }: ContractArgs['arc58_canCall(uint64,uint64,address,string,byte[4])bool'] & MaybeSigner): this {
    this.resolvers.push(async () => {
      this.group.arc58CanCall({ ...this.getSendParams({ sender, signer }), args })
    })
    return this
  }

  assignDomain({ sender, signer, ...args }: ContractArgs['assignDomain(address,string)void'] & MaybeSigner): this {
    this.resolvers.push(async () => {
      const extraFee = await this.wallet.domainKeyExtraFee(args.caller.toString(), args.domain === '' ? 'remove' : 'assign')
      this.group.assignDomain({ ...this.getSendParams({ sender, signer }), args, extraFee })
    })
    return this
  }

  /** ACC-06: revoke a co-admin key (on-chain `assignDomain(address, '')`). */
  removeDomainKey({ sender, signer, address }: MaybeSigner & { address: string }): this {
    return this.assignDomain({ sender, signer, caller: address, domain: '' })
  }

  removePlugin({ sender, signer, ...args }: ContractArgs['arc58_removePlugin(uint64,address,string)void'] & MaybeSigner): this {
    this.resolvers.push(async () => {
      this.group.arc58RemovePlugin({ ...this.getSendParams({ sender, signer }), args, extraFee: await this.wallet.controlledMbrExtraFee() })
    })
    return this
  }

  newEscrow({ sender, signer, ...args }: ContractArgs['arc58_newEscrow(string,address)uint64'] & MaybeSigner): this {
    this.resolvers.push(async () => {
      const mintsEscrow = args.address.toString() === ALGORAND_ZERO_ADDRESS_STRING
      const extraFee = microAlgo(newEscrowExtraFee(mintsEscrow, await this.wallet.hasExternalControlledAddress()))
      this.group.arc58NewEscrow({ ...this.getSendParams({ sender, signer }), args, extraFee })
      this.newEscrows.add(args.escrow)
    })
    return this
  }

  toggleEscrowLock({ sender, signer, ...args }: ContractArgs['arc58_toggleEscrowLock(string)(uint64,address,bool)'] & MaybeSigner): this {
    this.resolvers.push(async () => {
      this.group.arc58ToggleEscrowLock({ ...this.getSendParams({ sender, signer }), args })
    })
    return this
  }

  reclaimFunds({ sender, signer, ...args }: ContractArgs['arc58_reclaim(string,(uint64,uint64,bool)[])void'] & MaybeSigner): this {
    this.resolvers.push(async () => {
      this.group.arc58Reclaim({ ...this.getSendParams({ sender, signer }), args })
    })
    return this
  }

  optInEscrow({ sender, signer, ...args }: ContractArgs['arc58_optInEscrow(string,uint64[])void'] & MaybeSigner): this {
    this.resolvers.push(async () => {
      this.group.arc58OptInEscrow({ ...this.getSendParams({ sender, signer }), args })
    })
    return this
  }

  addAllowances({ sender, signer, escrow, allowances }: { escrow: string; allowances: AddAllowanceArgs[] } & MaybeSigner): this {
    this.resolvers.push(async () => {
      this.group.arc58AddAllowances({
        ...this.getSendParams({ sender, signer }),
        args: { escrow, allowances: AllowancesToTuple(allowances) },
        extraFee: await this.wallet.controlledMbrExtraFee()
      })
    })
    return this
  }

  removeAllowances({ sender, signer, ...args }: ContractArgs['arc58_removeAllowances(string,uint64[])void'] & MaybeSigner): this {
    this.resolvers.push(async () => {
      this.group.arc58RemoveAllowances({ ...this.getSendParams({ sender, signer }), args, extraFee: await this.wallet.controlledMbrExtraFee() })
    })
    return this
  }

  addExecutionKey({ sender, signer, ...args }: ContractArgs['arc58_addExecutionKey(byte[32],byte[32][],uint64,uint64)void'] & MaybeSigner): this {
    this.resolvers.push(async () => {
      this.group.arc58AddExecutionKey({ ...this.getSendParams({ sender, signer }), args, extraFee: await this.wallet.controlledMbrExtraFee() })
    })
    return this
  }

  removeExecutionKey({ sender, signer, ...args }: ContractArgs['arc58_removeExecutionKey(byte[32])void'] & MaybeSigner): this {
    this.resolvers.push(async () => {
      this.group.arc58RemoveExecutionKey({ ...this.getSendParams({ sender, signer }), args, extraFee: await this.wallet.controlledMbrExtraFee() })
    })
    return this
  }

  // ---------------------------------------------------------------------------
  // Terminal
  // ---------------------------------------------------------------------------

  async send(params?: SendParams): Promise<GroupReturn> {
    // Resolve all queued operations (builds the atomic group)
    for (const resolver of this.resolvers) {
      await resolver()
    }

    // Ensure every queued app call has a maxFee cap. AlgoKit's inner-fee
    // distribution requires one when `coverAppCallInnerTransactionFees` is
    // enabled; without it group preparation throws. We mutate the
    // composer's internal `txns` array directly (same shape it reads in
    // the native composer) rather than threading a maxFee default through
    // every resolver and through `prepareUsePlugin`'s sub-group builder.
    //
    // minFee * 272 matches the factory cap — plenty of headroom for the
    // deepest plugin call chain. Only set when missing so explicit per-call
    // maxFees (e.g. user overrides) are preserved.
    const suggestedParams = await this.wallet.client.algorand.getSuggestedParams()
    const MAX_SIM_FEE = microAlgo(BigInt(suggestedParams.minFee) * 272n)
    const composer = await this.group.composer()
    const internalTxns = (composer as unknown as {
      txns: Array<{ type: string; maxFee?: typeof MAX_SIM_FEE }>
    }).txns
    applyDefaultAppCallMaxFees(internalTxns, MAX_SIM_FEE)

    // Single simulate + send via AlgoKit native path. Flags default to true
    // (populate resources, cover inner fees) unless the caller explicitly
    // disables them via `params`.
    const result = await composer.send({
      ...params,
      populateAppCallResources: params?.populateAppCallResources ?? true,
      coverAppCallInnerTransactionFees: params?.coverAppCallInnerTransactionFees ?? true,
    }) as unknown as GroupReturn

    // Run post-processors (update caches; register escrows only when opted in)
    for (const postProcessor of this.postProcessors) {
      await postProcessor()
    }

    return result
  }
}
