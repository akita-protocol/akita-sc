import { microAlgo } from "@algorandfoundation/algokit-utils";
type ReadableAddress = string | import('algosdk').Address;
import { APP_SPEC as GUILD_PLUGIN_SPEC, GuildPluginArgs, GuildPluginClient, GuildPluginFactory } from "../../generated/GuildPluginClient";
import { ABIMethod, base64ToBytes, bytesToBase64, decodeUnsignedTransaction, encodeUnsignedTransaction, getApplicationAddress } from "algosdk";
import { sendPrepared } from "../../simulate/prepare";
import { GuildClient } from "../../generated/GuildClient";
import { GuildFactoryClient } from "../../generated/GuildFactoryClient";
import { BaseSDK } from "../../base";
import { MaybeSigner, NewContractSDKParams, PluginHookParams, PluginSDKReturn, PluginTxn } from "../../types";
import { assertByteArrayLength, randomByteArray } from "../../utils";
import { getTxns } from "../utils";
import { addPluginExtraFee } from "../constants";
import { MAX_UINT64 } from "../../constants";
import type { WalletSDK } from "../index";

type ContractArgs = GuildPluginArgs["obj"];
type ContractMethodArgs<Name extends string> = ContractArgs[Extract<keyof ContractArgs, `${Name}(${string}`>];
type WalletPluginArgs<T> = Omit<T, "wallet" | "rekeyBack"> & MaybeSigner & { rekeyBack?: boolean };
type WithOptionalEvidence<T extends { evidence: Uint8Array }> = Omit<T, "evidence"> & { evidence?: Uint8Array };
/**
 * `maxCost` is the most the wallet may pay the factory or the Guild in the call, in microAlgo. Left out,
 * it is the cost read from the chain when the call is built, so a price that rises afterwards (before the
 * group is sent, or before an approved group runs) fails the call instead of being paid.
 */
type WithOptionalMaxCost<T extends { maxCost: bigint | number }> = Omit<T, "maxCost"> & { maxCost?: bigint | number };

type NewGuildArgs = WalletPluginArgs<WithOptionalMaxCost<ContractMethodArgs<"newGuild">>>;
type ConfigureConsensusArgs = WalletPluginArgs<WithOptionalMaxCost<ContractMethodArgs<"configureConsensus">>>;
type SetupArgs = WalletPluginArgs<WithOptionalMaxCost<Omit<ContractMethodArgs<"setup">, "salt">> & { salt?: Uint8Array }>;
type CreateGuildCallArgs = WalletPluginArgs<WithOptionalMaxCost<Omit<ContractMethodArgs<"createGuild">, "salt">> & { salt?: Uint8Array }>;
type SetProposalSettingsArgs = WalletPluginArgs<ContractMethodArgs<"setProposalSettings">>;
type SetProposalActionLimitArgs = WalletPluginArgs<ContractMethodArgs<"setProposalActionLimit">>;
type SetConsensusActionSettingsArgs = WalletPluginArgs<ContractMethodArgs<"setConsensusActionSettings">>;
type GuildOnlyArgs = WalletPluginArgs<ContractMethodArgs<"initialize">>;
type NewProposalArgs = WalletPluginArgs<WithOptionalMaxCost<WithOptionalEvidence<ContractMethodArgs<"newProposal">>>>;
type EditProposalArgs = WalletPluginArgs<WithOptionalMaxCost<WithOptionalEvidence<ContractMethodArgs<"editProposal">>>>;
/**
 * `feeAsset` and `maxFee` pin the asset and the most the wallet may pay in it. Left out, they are what
 * the Guild charges when the call is built, like `maxCost`.
 */
type WithOptionalFeeQuote<T extends { feeAsset: bigint | number; maxFee: bigint | number }> = Omit<T, "feeAsset" | "maxFee"> & {
  feeAsset?: bigint | number;
  maxFee?: bigint | number;
};
type NewProposalWithFeeAssetArgs = WalletPluginArgs<
  WithOptionalFeeQuote<WithOptionalMaxCost<WithOptionalEvidence<ContractMethodArgs<"newProposalWithFeeAsset">>>>
>;
type EditProposalWithFeeAssetArgs = WalletPluginArgs<
  WithOptionalFeeQuote<WithOptionalMaxCost<WithOptionalEvidence<ContractMethodArgs<"editProposalWithFeeAsset">>>>
>;
type SetFeeAssetArgs = WalletPluginArgs<WithOptionalMaxCost<ContractMethodArgs<"setFeeAsset">>>;
type DeleteProposalArgs = WalletPluginArgs<ContractMethodArgs<"deleteProposal">>;
type SubmitProposalArgs = WalletPluginArgs<WithOptionalEvidence<ContractMethodArgs<"submitProposal">>>;
type VoteProposalArgs = WalletPluginArgs<WithOptionalMaxCost<WithOptionalEvidence<ContractMethodArgs<"voteProposal">>>>;
type FinalizeProposalArgs = WalletPluginArgs<ContractMethodArgs<"finalizeProposal">>;
type CancelProposalArgs = WalletPluginArgs<ContractMethodArgs<"cancelProposal">>;
type CleanupProposalConsensusArgs = WalletPluginArgs<ContractMethodArgs<"cleanupProposalConsensus">>;
type ExecuteProposalArgs = WalletPluginArgs<ContractMethodArgs<"executeProposal">>;
type UsePluginAsSignerArgs = WalletPluginArgs<
  Omit<ContractMethodArgs<"usePluginAsSigner">, "escrow" | "methodOffsets" | "fundsRequest"> & {
    escrow?: string;
    methodOffsets?: bigint[] | number[];
    fundsRequest?: [bigint | number, bigint | number][];
  }
>;
type OpUpArgs = WalletPluginArgs<ContractMethodArgs<"opUp">>;

type ParamsBuilder = (params: Record<string, unknown>) => Promise<Record<string, unknown>>;
/**
 * Reads what a paying call costs right now; `spender` is the wallet account the plugin will pay from. A
 * bigint is the call's `maxCost`; an object names each limit argument it fills.
 */
type CostQuote = (reader: ReadableAddress, spender?: ReadableAddress) => Promise<bigint | Record<string, bigint>>;

/** What a proposal costs now: ALGO `total` (storage, plus the fee when `feeAsset` is 0) and `fee` in `feeAsset`. */
export type GuildProposalQuote = { total: bigint; mbr: bigint; fee: bigint; feeAsset: bigint };

/**
 * Fee room for a simulated cost read: the Guild asks its consensus and wallet factory through inner calls,
 * up to one per proposal action. Simulated only, never paid.
 */
const COST_READ_EXTRA_FEE = 20_000n;
/** The limits a fee-asset proposal call takes: ALGO, the fee asset, and the most paid in it */
const FEE_QUOTE_KEYS = ["maxCost", "feeAsset", "maxFee"];

/** Wallet-facing hooks for the complete Guild factory and proposal lifecycle. */
export class GuildPluginSDK extends BaseSDK<GuildPluginClient> {
  constructor(params: NewContractSDKParams) {
    super({ factory: GuildPluginFactory, ...params });
  }

  private hook<T extends MaybeSigner & { rekeyBack?: boolean; maxCost?: bigint | number; feeAsset?: bigint | number; maxFee?: bigint | number }>(
    methodName: string,
    args?: T,
    extraFee = 0n,
    quote?: CostQuote,
    quoteKeys: string[] = ["maxCost"],
  ): PluginSDKReturn {
    if (args === undefined) {
      return (_spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns,
      });
    }

    const { sender, signer, rekeyBack = true, ...methodArgs } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const paramsBuilder = (this.client.params as unknown as Record<string, ParamsBuilder>)[methodName];
        // a paying call the caller gave no limit for is held to what it costs now, when it is built
        const limits = methodArgs as Record<string, unknown>;
        const needsQuote = quote !== undefined && quoteKeys.some((key) => limits[key] === undefined);
        const quote_ = needsQuote ? await quote!(sendParams.sender, spendingAddress || undefined) : {};
        const quoted = Object.fromEntries(
          Object.entries(typeof quote_ === "bigint" ? { maxCost: quote_ } : quote_).filter(([key]) => limits[key] === undefined),
        );
        const params = await paramsBuilder({
          ...sendParams,
          args: { wallet, rekeyBack, ...methodArgs, ...quoted },
          ...(extraFee > 0n ? { extraFee: microAlgo(extraFee) } : {}),
        });
        return [{ type: "methodCall", ...params } as PluginTxn];
      },
    });
  }

  /** A Guild client for simulated cost reads sent as `reader` (any funded account; nothing is signed) */
  private guildReader(guild: bigint | number, reader: ReadableAddress): GuildClient {
    return new GuildClient({ algorand: this.algorand, appId: BigInt(guild), defaultSender: reader });
  }

  private readFee() {
    return { extraFee: microAlgo(COST_READ_EXTRA_FEE) };
  }

  /** What the factory charges now to create a Guild with consensus program `consensusName`, in microAlgo. */
  async guildCreationCost(consensusName: string, reader: ReadableAddress = this.readerAccount): Promise<bigint> {
    const factory = await this.client.state.global.factory();
    if (factory === undefined) throw new Error('This GuildPlugin has no Guild factory');
    const client = new GuildFactoryClient({ algorand: this.algorand, appId: factory, defaultSender: reader });
    return (await client.send.cost({ args: { consensusName }, ...this.readFee() })).return ?? 0n;
  }

  /** What storing a draft consensus configuration costs now, in microAlgo. */
  async consensusConfigurationCost(guild: bigint | number, config: Uint8Array, reader: ReadableAddress = this.readerAccount): Promise<bigint> {
    return (await this.guildReader(guild, reader).send.consensusConfigurationMbr({ args: { config }, ...this.readFee() })).return ?? 0n;
  }

  /** What creating the Guild's treasury wallet costs now, in microAlgo. */
  async setupCost(guild: bigint | number, reader: ReadableAddress = this.readerAccount): Promise<bigint> {
    return (await this.guildReader(guild, reader).send.setupCost({ args: [], ...this.readFee() })).return ?? 0n;
  }

  /**
   * What proposing `actions` costs a member now in microAlgo: storage, plus the Guild's fees when it
   * charges them in ALGO (see `proposalQuote` for a fee asset). A draft Guild charges its creator nothing,
   * so for the creator this is an upper bound.
   */
  async proposalCost(guild: bigint | number, actions: [number | bigint, Uint8Array][], reader: ReadableAddress = this.readerAccount): Promise<bigint> {
    const { return: cost } = await this.guildReader(guild, reader).send.proposalCost({ args: { actions: actions as never }, ...this.readFee() });
    return cost?.total ?? 0n;
  }

  /** What proposing `actions` costs now, split by currency: ALGO `total` and `fee` in `feeAsset` (0 = ALGO, included in `total`). */
  async proposalQuote(guild: bigint | number, actions: [number | bigint, Uint8Array][], reader: ReadableAddress = this.readerAccount): Promise<GuildProposalQuote> {
    const { return: cost } = await this.guildReader(guild, reader).send.proposalCost({ args: { actions: actions as never }, ...this.readFee() });
    return { total: cost?.total ?? 0n, mbr: cost?.mbr ?? 0n, fee: cost?.fee ?? 0n, feeAsset: cost?.feeAsset ?? 0n };
  }

  /** What a draft Guild's `setFeeAsset(asset)` pays now: the Guild's and its treasury's opt-ins and the reserve box. */
  async feeAssetCost(guild: bigint | number, asset: bigint | number, reader: ReadableAddress = this.readerAccount): Promise<bigint> {
    return (await this.guildReader(guild, reader).send.feeAssetCost({ args: { asset }, ...this.readFee() })).return ?? 0n;
  }

  /**
   * What replacing a draft's actions with `actions` costs now beyond what it already paid: `total` in
   * microAlgo and `fee` in `feeAsset` (0 when the fee is in ALGO, where it is part of `total`).
   */
  async proposalEditQuote(
    guild: bigint | number,
    proposalId: bigint | number,
    actions: [number | bigint, Uint8Array][],
    reader: ReadableAddress = this.readerAccount,
  ): Promise<{ total: bigint; fee: bigint; feeAsset: bigint }> {
    const [quote, proposal] = await Promise.all([
      this.proposalQuote(guild, actions, reader),
      this.guildReader(guild, reader).send.getProposal({ args: { proposalId } }),
    ]);
    const paid = proposal.return?.feesPaid ?? 0n;
    const tokensPaid = proposal.return?.feeTokensPaid ?? 0n;
    const fee = quote.feeAsset === 0n ? 0n : quote.fee;
    return {
      total: quote.total > paid ? quote.total - paid : 0n,
      fee: fee > tokensPaid ? fee - tokensPaid : 0n,
      feeAsset: quote.feeAsset,
    };
  }

  /** What replacing a draft proposal's actions with `actions` costs now on top of what it already paid. */
  async proposalEditCost(
    guild: bigint | number,
    proposalId: bigint | number,
    actions: [number | bigint, Uint8Array][],
    reader: ReadableAddress = this.readerAccount,
  ): Promise<bigint> {
    const [total, proposal] = await Promise.all([
      this.proposalCost(guild, actions, reader),
      this.guildReader(guild, reader).send.getProposal({ args: { proposalId } }),
    ]);
    const paid = proposal.return?.feesPaid ?? 0n;
    return total > paid ? total - paid : 0n;
  }

  /** What `voter`'s next vote on a proposal costs now: its receipt's storage for a first vote, nothing after. */
  async voteCost(guild: bigint | number, proposalId: bigint | number, voter?: ReadableAddress, reader: ReadableAddress = this.readerAccount): Promise<bigint> {
    const client = this.guildReader(guild, reader);
    const result = voter === undefined
      ? await client.send.voteMbr({ args: [] })
      : await client.send.voteCost({ args: { proposalId, voter: voter.toString() }, ...this.readFee() });
    return result.return ?? 0n;
  }

  newGuild(): PluginSDKReturn;
  newGuild(args: NewGuildArgs): PluginSDKReturn;
  newGuild(args?: NewGuildArgs): PluginSDKReturn {
    return this.hook("newGuild", args, 0n, args && ((reader) => this.guildCreationCost(args.consensusName, reader)));
  }

  configureConsensus(): PluginSDKReturn;
  configureConsensus(args: ConfigureConsensusArgs): PluginSDKReturn;
  configureConsensus(args?: ConfigureConsensusArgs): PluginSDKReturn {
    return this.hook("configureConsensus", args, 0n, args && ((reader) => this.consensusConfigurationCost(args.guild, args.config, reader)));
  }

  setup(): PluginSDKReturn;
  setup(args: SetupArgs): PluginSDKReturn;
  setup(args?: SetupArgs): PluginSDKReturn {
    if (args === undefined) return this.hook("setup");
    const salt = args.salt ?? randomByteArray(32);
    assertByteArrayLength(salt, "salt", 32);
    return this.hook("setup", { ...args, salt }, 0n, (reader) => this.setupCost(args.guild, reader));
  }

  /**
   * Create a Guild and make it ready in one call (the shared plugin only): create it and its consensus,
   * configure the consensus, set up and fund the treasury, and run `actions` as an instant draft proposal.
   * Returns `{ guild, consensus, wallet }`.
   *
   * `maxCost` limits everything the call pays except `funding`. Part of that is storage in a Guild that
   * does not exist yet, so it cannot be read ahead of the call the way the other methods' costs are: pass
   * the figure from a simulated build of the group. Left out, the call has no limit.
   */
  createGuild(): PluginSDKReturn;
  createGuild(args: CreateGuildCallArgs): PluginSDKReturn;
  createGuild(args?: CreateGuildCallArgs): PluginSDKReturn {
    if (args === undefined) return this.hook("createGuild");
    const salt = args.salt ?? randomByteArray(32);
    assertByteArrayLength(salt, "salt", 32);
    return this.hook("createGuild", { ...args, salt, maxCost: args.maxCost ?? MAX_UINT64 });
  }

  setProposalSettings(): PluginSDKReturn;
  setProposalSettings(args: SetProposalSettingsArgs): PluginSDKReturn;
  setProposalSettings(args?: SetProposalSettingsArgs): PluginSDKReturn {
    return this.hook("setProposalSettings", args);
  }

  setProposalActionLimit(): PluginSDKReturn;
  setProposalActionLimit(args: SetProposalActionLimitArgs): PluginSDKReturn;
  setProposalActionLimit(args?: SetProposalActionLimitArgs): PluginSDKReturn {
    return this.hook("setProposalActionLimit", args);
  }

  setConsensusActionSettings(): PluginSDKReturn;
  setConsensusActionSettings(args: SetConsensusActionSettingsArgs): PluginSDKReturn;
  setConsensusActionSettings(args?: SetConsensusActionSettingsArgs): PluginSDKReturn {
    return this.hook("setConsensusActionSettings", args);
  }

  /** Charge a draft Guild's proposal fees in `asset` (0 = ALGO); the wallet pays the opt-ins it needs. */
  setFeeAsset(): PluginSDKReturn;
  setFeeAsset(args: SetFeeAssetArgs): PluginSDKReturn;
  setFeeAsset(args?: SetFeeAssetArgs): PluginSDKReturn {
    return this.hook("setFeeAsset", args, 0n, args && ((reader) => this.feeAssetCost(args.guild, args.asset, reader)));
  }

  lockPluginSet(): PluginSDKReturn;
  lockPluginSet(args: GuildOnlyArgs): PluginSDKReturn;
  lockPluginSet(args?: GuildOnlyArgs): PluginSDKReturn {
    return this.hook("lockPluginSet", args);
  }

  partiallyInitialize(): PluginSDKReturn;
  partiallyInitialize(args: GuildOnlyArgs): PluginSDKReturn;
  partiallyInitialize(args?: GuildOnlyArgs): PluginSDKReturn {
    return this.hook("partiallyInitialize", args);
  }

  initialize(): PluginSDKReturn;
  initialize(args: GuildOnlyArgs): PluginSDKReturn;
  initialize(args?: GuildOnlyArgs): PluginSDKReturn {
    return this.hook("initialize", args);
  }

  newProposal(): PluginSDKReturn;
  newProposal(args: NewProposalArgs): PluginSDKReturn;
  newProposal(args?: NewProposalArgs): PluginSDKReturn {
    if (args === undefined) return this.hook("newProposal");
    return this.hook("newProposal", { evidence: new Uint8Array(), ...args }, 0n, (reader) => this.proposalCost(args.guild, args.actions, reader));
  }

  /** Propose to a Guild that charges its fee in an asset: the wallet pays storage in ALGO and the fee in that asset. */
  newProposalWithFeeAsset(): PluginSDKReturn;
  newProposalWithFeeAsset(args: NewProposalWithFeeAssetArgs): PluginSDKReturn;
  newProposalWithFeeAsset(args?: NewProposalWithFeeAssetArgs): PluginSDKReturn {
    if (args === undefined) return this.hook("newProposalWithFeeAsset");
    return this.hook("newProposalWithFeeAsset", { evidence: new Uint8Array(), ...args }, 0n, async (reader) => {
      const { total, fee, feeAsset } = await this.proposalQuote(args.guild, args.actions, reader);
      return { maxCost: total, maxFee: fee, feeAsset };
    }, FEE_QUOTE_KEYS);
  }

  /** Edit a draft in a Guild that charges its fee in an asset, topping up ALGO and fee tokens as needed. */
  editProposalWithFeeAsset(): PluginSDKReturn;
  editProposalWithFeeAsset(args: EditProposalWithFeeAssetArgs): PluginSDKReturn;
  editProposalWithFeeAsset(args?: EditProposalWithFeeAssetArgs): PluginSDKReturn {
    if (args === undefined) return this.hook("editProposalWithFeeAsset");
    return this.hook("editProposalWithFeeAsset", { evidence: new Uint8Array(), ...args }, 0n, async (reader) => {
      const { total, fee, feeAsset } = await this.proposalEditQuote(args.guild, args.proposalId, args.actions, reader);
      return { maxCost: total, maxFee: fee, feeAsset };
    }, FEE_QUOTE_KEYS);
  }

  editProposal(): PluginSDKReturn;
  editProposal(args: EditProposalArgs): PluginSDKReturn;
  editProposal(args?: EditProposalArgs): PluginSDKReturn {
    if (args === undefined) return this.hook("editProposal");
    return this.hook("editProposal", { evidence: new Uint8Array(), ...args }, 0n, (reader) =>
      this.proposalEditCost(args.guild, args.proposalId, args.actions, reader),
    );
  }

  deleteProposal(): PluginSDKReturn;
  deleteProposal(args: DeleteProposalArgs): PluginSDKReturn;
  deleteProposal(args?: DeleteProposalArgs): PluginSDKReturn {
    return this.hook("deleteProposal", args);
  }

  submitProposal(): PluginSDKReturn;
  submitProposal(args: SubmitProposalArgs): PluginSDKReturn;
  submitProposal(args?: SubmitProposalArgs): PluginSDKReturn {
    return this.hook("submitProposal", args === undefined ? undefined : { evidence: new Uint8Array(), ...args });
  }

  voteProposal(): PluginSDKReturn;
  voteProposal(args: VoteProposalArgs): PluginSDKReturn;
  voteProposal(args?: VoteProposalArgs): PluginSDKReturn {
    if (args === undefined) return this.hook("voteProposal");
    return this.hook("voteProposal", { evidence: new Uint8Array(), ...args }, 0n, (reader, spender) =>
      this.voteCost(args.guild, args.proposalId, spender, reader),
    );
  }

  finalizeProposal(): PluginSDKReturn;
  finalizeProposal(args: FinalizeProposalArgs): PluginSDKReturn;
  finalizeProposal(args?: FinalizeProposalArgs): PluginSDKReturn {
    return this.hook("finalizeProposal", args, 1_000n);
  }

  cleanupProposalConsensus(): PluginSDKReturn;
  cleanupProposalConsensus(args: CleanupProposalConsensusArgs): PluginSDKReturn;
  cleanupProposalConsensus(args?: CleanupProposalConsensusArgs): PluginSDKReturn {
    return this.hook("cleanupProposalConsensus", args, 1_000n);
  }

  /** Abandon an approved, unexecuted proposal this wallet proposed and recover its execution reserve. */
  cancelProposal(): PluginSDKReturn;
  cancelProposal(args: CancelProposalArgs): PluginSDKReturn;
  cancelProposal(args?: CancelProposalArgs): PluginSDKReturn {
    return this.hook("cancelProposal", args, 1_000n);
  }

  executeProposal(): PluginSDKReturn;
  executeProposal(args: ExecuteProposalArgs): PluginSDKReturn;
  executeProposal(args?: ExecuteProposalArgs): PluginSDKReturn {
    return this.hook("executeProposal", args);
  }

  /**
   * Use a plugin the Guild's wallet granted to its fixed-signer consensus, as a signer whose own power
   * meets the threshold. No proposal is involved, so this is the whole action in one send. Each entry of
   * `calls` is the application arguments of one call to `plugin`: the method selector, then the Guild
   * wallet's ID as a uint64, then the rest of that method's arguments; only the last call hands the Guild
   * wallet back. The route carries only plugin methods that take no transaction argument.
   */
  usePluginAsSigner(): PluginSDKReturn;
  usePluginAsSigner(args: UsePluginAsSignerArgs): PluginSDKReturn;
  usePluginAsSigner(args?: UsePluginAsSignerArgs): PluginSDKReturn {
    return this.hook("usePluginAsSigner", args && { escrow: "", methodOffsets: [], fundsRequest: [], ...args });
  }

  sweep(): PluginSDKReturn;
  sweep(args: GuildOnlyArgs): PluginSDKReturn;
  sweep(args?: GuildOnlyArgs): PluginSDKReturn {
    return this.hook("sweep", args, 1_000n);
  }

  opUp(): PluginSDKReturn;
  opUp(args: OpUpArgs): PluginSDKReturn;
  opUp(args?: OpUpArgs): PluginSDKReturn {
    return this.hook("opUp", args);
  }

  /** Deploy a GuildPlugin bound to `guild` (same factory as this one); the creator installs it on their wallet */
  async deployForGuild(guild: bigint, params: MaybeSigner = {}): Promise<GuildPluginSDK> {
    const factory = await this.client.state.global.factory();
    if (factory === undefined) throw new Error('This GuildPlugin has no Guild factory');
    const sendParams = this.getRequiredSendParams(params);
    const { appClient } = await new GuildPluginFactory({ algorand: this.algorand }).send.create.create({
      ...sendParams,
      args: { factory, guild },
    });
    return new GuildPluginSDK({
      algorand: this.algorand,
      factoryParams: { appId: appClient.appId, defaultSender: sendParams.sender, defaultSigner: sendParams.signer },
      readerAccount: this.readerAccount,
      sendParams: this.sendParams,
    });
  }
}


// GUILD CREATION ---------------------------------------------------------------------------------

/** Default ballot rules for a new Guild: 3-day votes, simple majority of voting power, one approval minimum. */
export const defaultGuildProposalSettings = (overrides: Partial<GuildProposalSettingsConfigEntry> = {}): GuildProposalSettingsConfigEntry => ({
  fee: 0n,
  power: 1n,
  duration: 259_200n,
  participation: 0n,
  approval: 50_000n,
  minimumApprovals: 1n,
  ...overrides,
});

type GuildProposalSettingsConfigEntry = { fee: bigint; power: bigint; duration: bigint; participation: bigint; approval: bigint; minimumApprovals: bigint };

/** `GuildBaseConfig` with the same settings for every built-in action type */
export const defaultGuildBaseConfig = (settings = defaultGuildProposalSettings(), proposalActionLimit = 12n) => ({
  proposalActionLimit,
  proposalSettings: {
    upgradeApp: settings,
    addPlugin: settings,
    removeExecution: settings,
    removePlugin: settings,
    addAllowances: settings,
    removeAllowances: settings,
    newEscrow: settings,
    toggleEscrowLock: settings,
    updateGuild: settings,
  },
});

export type GuildCreationStep = 'newGuild' | 'installGuildPlugin' | 'configureConsensus' | 'setup' | 'initialize';

/** The structural slice of WalletSDK the creation flow needs (kept structural so src and dist builds interoperate) */
export type GuildCreationWallet = {
  usePlugin(params: { callerType?: bigint; calls: PluginSDKReturn[]; consolidateFees?: boolean; preTransactions?: { txn: import('algosdk').Transaction; signer: import('algosdk').TransactionSigner }[] } & MaybeSigner): Promise<{ returns: unknown[] }>;
  addPlugin(params: { client: GuildPluginSDK; callerType: bigint } & MaybeSigner): Promise<unknown>;
  getMbr(args: { escrow: string; methodCount: bigint; plugin: string; groups: bigint }): Promise<{ plugins: bigint }>;
  client: { appId: bigint; appClient: { fundAppAccount(params: { amount: ReturnType<typeof microAlgo> } & MaybeSigner): Promise<unknown> } };
};

export type CreateGuildParams = MaybeSigner & {
  wallet: GuildCreationWallet;
  /** the network's creation-only GuildPlugin (guild = 0), already installed on `wallet` */
  creationPlugin: GuildPluginSDK;
  /** registered consensus program, e.g. 'fixed-signers' */
  consensusName: string;
  /** consensus policy bytes, e.g. `fixedSignerConsensusConfig(threshold)` */
  governanceConfig: Uint8Array;
  /** draft consensus configuration, e.g. `fixedSignerConfiguration(mode, members)` */
  consensusConfiguration: Uint8Array;
  baseConfig?: ReturnType<typeof defaultGuildBaseConfig>;
  /** nickname of the Guild's treasury wallet */
  nickname: string;
  salt?: Uint8Array;
  /** how the Guild-bound plugin is installed on `wallet`; defaults to admin-only */
  callerType?: bigint;
  /** how `creationPlugin` is installed on `wallet`; defaults to `callerType` */
  creationCallerType?: bigint;
  /** end creator control at once (default); false leaves the Guild a draft for `initializeGuild` later */
  initialize?: boolean;
  onStep?: (step: GuildCreationStep) => void;
};

export type CreatedGuild = { guild: bigint; consensus: bigint; guildWallet: bigint; guildPlugin: GuildPluginSDK };

const lastReturn = <T>(returns: unknown[]): T => {
  const last = [...returns].reverse().find((value) => value !== undefined && value !== null);
  return (typeof last === 'object' && last !== null && 'returnValue' in last ? (last as { returnValue: unknown }).returnValue : last) as T;
};

/** One wallet window on `plugin`, with op-up calls ahead of `call` for opcode budget */
const useGuildPlugin = (
  wallet: Pick<GuildCreationWallet, 'usePlugin'>,
  plugin: GuildPluginSDK,
  call: PluginSDKReturn,
  opUps: number,
  { callerType = 2n, sender, signer }: MaybeSigner & { callerType?: bigint },
) =>
  wallet.usePlugin({
    sender,
    signer,
    callerType,
    consolidateFees: true,
    calls: [...Array.from({ length: opUps }, (_, nonce) => plugin.opUp({ sender, signer, rekeyBack: false, nonce: BigInt(nonce) })), call],
  });

export type GuildDraftParams = MaybeSigner & {
  wallet: Pick<GuildCreationWallet, 'usePlugin'>;
  /** the GuildPlugin bound to `guild` (`CreatedGuild.guildPlugin`) */
  guildPlugin: GuildPluginSDK;
  guild: bigint;
  /** how `guildPlugin` is installed on `wallet`; defaults to admin-only */
  callerType?: bigint;
};

/** End creator control of a draft Guild: from here on its members govern it through proposals. */
export async function initializeGuild({ wallet, guildPlugin, guild, callerType, sender, signer }: GuildDraftParams): Promise<void> {
  await useGuildPlugin(wallet, guildPlugin, guildPlugin.initialize({ sender, signer, guild }), 3, { callerType, sender, signer });
}

/** Op-up calls a one-call Guild creation carries for opcode budget (about 40 members fit) */
const CREATE_GUILD_OP_UPS = 6;

/**
 * Op-up calls a draft proposal group carries for opcode budget. With the rekey, the proposal, its
 * execution and the hand-back that is 14 transactions, leaving 2 of the group's 16 for payments.
 */
const DRAFT_PROPOSAL_OP_UPS = 10;
const DRAFT_PROPOSAL_PAYMENT_SLOTS = 2;

/**
 * A draft Guild charges its creator nothing for proposals, so the proposal's box storage comes from the
 * Guild's own balance. What it is short of that storage, in microAlgo.
 */
async function draftProposalStorageShortfall({
  guildPlugin,
  guild,
  actions,
  sender,
}: {
  guildPlugin: GuildPluginSDK;
  guild: bigint;
  actions: [number | bigint, Uint8Array][];
  sender: ReadableAddress;
}): Promise<bigint> {
  const { algorand } = guildPlugin;
  const client = new GuildClient({ algorand, appId: guild, defaultSender: sender });
  const { return: cost } = await client.send.proposalCost({
    args: { actions: actions as never },
    // it asks the consensus app for its ballot MBR
    extraFee: microAlgo(1_000),
  });
  const account = await algorand.account.getInformation(client.appAddress);
  return (cost?.mbr ?? 0n) - (account.balance.microAlgo - account.minBalance.microAlgo);
}

/** A payment to place ahead of a draft proposal in its group, e.g. storage for the Guild's wallet */
export type DraftProposalTopUp = { receiver: ReadableAddress; amount: bigint };

/**
 * While the Guild is a draft its creator's proposals are approved on creation: propose `actions` and execute
 * them at once (e.g. `addPluginAction` to configure the Guild's wallet), in one group under one signature.
 * The group also pays the Guild's proposal storage when it is short, and any `topUps`. Returns the
 * proposal id.
 */
export async function runDraftProposal({
  wallet,
  guildPlugin,
  guild,
  actions,
  cid = new Uint8Array(36),
  callerType,
  sender,
  signer,
  storagePayer,
  topUps = [],
}: GuildDraftParams & {
  actions: [number | bigint, Uint8Array][];
  cid?: Uint8Array;
  /** pays the storage shortfall and `topUps`; defaults to `sender` */
  storagePayer?: MaybeSigner;
  topUps?: DraftProposalTopUp[];
}): Promise<bigint> {
  if (!sender) throw new Error('A sender is required for a draft Guild proposal');
  const { algorand } = guildPlugin;
  const payer = storagePayer?.sender ? storagePayer : { sender, signer };
  const payerSigner = payer.signer ?? algorand.account.getSigner(payer.sender!);
  const shortfall = await draftProposalStorageShortfall({ guildPlugin, guild, actions, sender });
  const payments = [
    ...(shortfall > 0n ? [{ receiver: getApplicationAddress(guild), amount: shortfall }] : []),
    ...topUps.filter((topUp) => topUp.amount > 0n),
  ];
  if (payments.length > DRAFT_PROPOSAL_PAYMENT_SLOTS) {
    throw new Error(`A draft proposal group fits at most ${DRAFT_PROPOSAL_PAYMENT_SLOTS} payments`);
  }
  const preTransactions = await Promise.all(
    payments.map(async ({ receiver, amount }) => ({
      txn: await algorand.createTransaction.payment({ sender: payer.sender!, receiver, amount: microAlgo(amount) }),
      signer: payerSigner,
    })),
  );
  // In draft only the creator proposes, so the new proposal takes the Guild's next id: propose and
  // execute it in one group.
  const proposalId = BigInt((await algorand.app.getGlobalState(guild)).proposal_id?.value ?? 1n);
  await wallet.usePlugin({
    sender,
    signer,
    callerType,
    consolidateFees: true,
    preTransactions,
    calls: [
      ...Array.from({ length: DRAFT_PROPOSAL_OP_UPS }, (_, nonce) => guildPlugin.opUp({ sender, signer, rekeyBack: false, nonce: BigInt(nonce) })),
      // only the last call hands the wallet back; a draft charges its creator nothing for a proposal
      guildPlugin.newProposal({ sender, signer, guild, cid, actions: actions as never, rekeyBack: false, maxCost: 0n }),
      guildPlugin.executeProposal({ sender, signer, guild, proposalId }),
    ],
  });
  return proposalId;
}

// ACTIVE GUILDS: MEMBER PROPOSALS ------------------------------------------------------------------

/** Op-up calls a member's proposal group carries for opcode budget */
const MEMBER_PROPOSAL_OP_UPS = 10;
/** Op-up calls a vote carries */
const VOTE_OP_UPS = 2;

/**
 * Propose `actions` to an active Guild from a member's wallet and submit them for a vote, in one group
 * under one signature. The new proposal takes the Guild's next id; if another member proposes first in the
 * same round the group fails and can simply be retried. Returns the proposal id.
 */
export async function proposeToGuild({
  wallet,
  guildPlugin,
  guild,
  actions,
  cid = new Uint8Array(36),
  evidence = new Uint8Array(),
  callerType,
  sender,
  signer,
}: GuildDraftParams & {
  actions: [number | bigint, Uint8Array][];
  cid?: Uint8Array;
  /** proof of the proposer's voting power, for consensus programs that need it */
  evidence?: Uint8Array;
}): Promise<bigint> {
  const proposalId = BigInt((await guildPlugin.algorand.app.getGlobalState(guild)).proposal_id?.value ?? 1n);
  const { feeAsset } = await guildPlugin.proposalQuote(guild, actions, sender);
  const propose = { sender, signer, guild, cid, actions: actions as never, evidence, rekeyBack: false };
  await wallet.usePlugin({
    sender,
    signer,
    callerType,
    consolidateFees: true,
    calls: [
      ...Array.from({ length: MEMBER_PROPOSAL_OP_UPS }, (_, nonce) => guildPlugin.opUp({ sender, signer, rekeyBack: false, nonce: BigInt(nonce) })),
      // a Guild that charges its fee in an asset takes it in a separate asset transfer
      feeAsset === 0n ? guildPlugin.newProposal(propose) : guildPlugin.newProposalWithFeeAsset({ ...propose, feeAsset }),
      guildPlugin.submitProposal({ sender, signer, guild, proposalId, evidence }),
    ],
  });
  return proposalId;
}

/** Vote on a Guild proposal from a member's wallet: one group, one signature */
export async function voteOnGuildProposal({
  wallet,
  guildPlugin,
  guild,
  proposalId,
  vote,
  evidence = new Uint8Array(),
  callerType,
  sender,
  signer,
}: GuildDraftParams & { proposalId: bigint; vote: number; evidence?: Uint8Array }): Promise<void> {
  await wallet.usePlugin({
    sender,
    signer,
    callerType,
    consolidateFees: true,
    calls: [
      ...Array.from({ length: VOTE_OP_UPS }, (_, nonce) => guildPlugin.opUp({ sender, signer, rekeyBack: false, nonce: BigInt(nonce) })),
      guildPlugin.voteProposal({ sender, signer, guild, proposalId, vote: vote as never, evidence }),
    ],
  });
}

/**
 * Close a proposal's vote once voting has ended (`finalize`) and run its actions when it passed (`execute`):
 * one group, one signature. Finalizing a rejected proposal returns the proposer's reserve; an approved one
 * finalized earlier only needs `execute`.
 */
export async function finishGuildProposal({
  wallet,
  guildPlugin,
  guild,
  proposalId,
  finalize = true,
  execute,
  callerType,
  sender,
  signer,
}: GuildDraftParams & { proposalId: bigint; finalize?: boolean; execute: boolean }): Promise<void> {
  await wallet.usePlugin({
    sender,
    signer,
    callerType,
    consolidateFees: true,
    calls: [
      ...Array.from({ length: MEMBER_PROPOSAL_OP_UPS }, (_, nonce) => guildPlugin.opUp({ sender, signer, rekeyBack: false, nonce: BigInt(nonce) })),
      // only the last call hands the wallet back
      ...(finalize ? [guildPlugin.finalizeProposal({ sender, signer, guild, proposalId, rekeyBack: !execute })] : []),
      ...(execute ? [guildPlugin.executeProposal({ sender, signer, guild, proposalId })] : []),
    ],
  });
}

/** LocalNet runs in dev mode: a round per transaction, so rounds cannot be predicted from time */
const DEV_MODE_GENESIS_IDS = new Set(['dockernet-v1']);

/**
 * The round about `seconds` from now, from the network's recent block times. In dev mode, the current
 * round.
 */
export async function estimateRoundAfter(
  algod: import('algosdk').Algodv2,
  seconds: bigint,
  sampleRounds = 1_000n,
): Promise<bigint> {
  const status = await algod.status().do();
  const current = BigInt(status.lastRound);
  const { genesisID } = await algod.getTransactionParams().do();
  if (DEV_MODE_GENESIS_IDS.has(genesisID) || seconds <= 0n) return current;
  const from = current > sampleRounds ? current - sampleRounds : 1n;
  const [latest, earlier] = await Promise.all([algod.block(current).do(), algod.block(from).do()]);
  const elapsed = BigInt(latest.block.header.timestamp) - BigInt(earlier.block.header.timestamp);
  if (elapsed <= 0n) return current;
  return current + (seconds * (current - from)) / elapsed;
}

/** Validity windows (1000 rounds each, about 47 minutes on MainNet) an approved group stays runnable for */
export const GUILD_EXECUTION_WINDOWS = 24n;
/** Max fee for the rekey while an execution group is simulated as the Guild: the call and its inner rekey payment */
const GUILD_EXECUTION_REKEY_MAX_FEE = 4_000n;
/** Rounds the run window opens before the estimated end of voting, so block-time drift cannot skip it */
const EXECUTION_START_SLACK_ROUNDS = 2_000n;

/**
 * Build the group a member proposes to run on the Guild's wallet (`treasury`) with `calls`, through the
 * wallet's any-caller execution grant for the plugin. It becomes runnable when voting ends, for about
 * `windows` × 1000 rounds. Only `sender` can sign it later, so keep it (see `guildExecutionRecord`).
 */
export async function buildGuildExecution({
  treasury,
  calls,
  lease,
  votingSeconds,
  escrow = '',
  windows = GUILD_EXECUTION_WINDOWS,
  sender,
  signer,
}: MaybeSigner & {
  treasury: WalletSDK;
  calls: PluginSDKReturn[];
  /** unique per proposal, at most 32 characters */
  lease: string;
  votingSeconds: bigint;
  escrow?: string;
  windows?: bigint;
}) {
  const algod = treasury.client.algorand.client.algod;
  const votingEnd = await estimateRoundAfter(algod, votingSeconds);
  const current = BigInt((await algod.status().do()).lastRound);
  const start = votingEnd - EXECUTION_START_SLACK_ROUNDS > current ? votingEnd - EXECUTION_START_SLACK_ROUNDS : current;
  // any-caller execution grants count windows in seconds, at 2.7 s per round
  return treasury.build.usePlugin({
    sender,
    signer,
    lease,
    escrow,
    firstValid: start,
    windowSize: windows * 2_700n,
    callerType: 1n,
    // only the rekey simulates as the Guild (the wallet's admin), which keeps little spare ALGO for fees
    adminRekeyMaxFee: GUILD_EXECUTION_REKEY_MAX_FEE,
    calls,
  });
}

/** An approved group kept until it runs: each window's unsigned transactions, base64 msgpack */
export type GuildExecutionRecord = {
  lease: string;
  firstValid: string;
  lastValid: string;
  windows: { firstValid: string; lastValid: string; transactions: string[] }[];
};


export function guildExecutionRecord(execution: {
  lease: Uint8Array;
  firstValid: bigint;
  lastValid: bigint;
  windows: { transactions: import('algosdk').Transaction[] }[];
}): GuildExecutionRecord {
  return {
    lease: bytesToBase64(execution.lease),
    firstValid: execution.firstValid.toString(),
    lastValid: execution.lastValid.toString(),
    windows: execution.windows.map((window) => ({
      firstValid: window.transactions[0].firstValid.toString(),
      lastValid: window.transactions[0].lastValid.toString(),
      transactions: window.transactions.map((txn) => bytesToBase64(encodeUnsignedTransaction(txn))),
    })),
  };
}

/** The 32-byte execution key of a kept group */
export const guildExecutionKey = (record: GuildExecutionRecord) => base64ToBytes(record.lease);

/**
 * Sign and send the window of a kept, approved group that is valid now. `signer` must sign for the
 * account that built it. Returns the transaction ids.
 */
export async function sendGuildExecution({
  algod,
  record,
  signer,
}: {
  algod: import('algosdk').Algodv2;
  record: GuildExecutionRecord;
  signer: import('algosdk').TransactionSigner;
}): Promise<string[]> {
  const round = BigInt((await algod.status().do()).lastRound) + 1n;
  const window = record.windows.find((entry) => BigInt(entry.firstValid) <= round && round <= BigInt(entry.lastValid));
  if (!window) {
    const opens = BigInt(record.firstValid);
    throw new Error(round < opens ? `This can run from round ${opens}.` : 'The time to run this has passed.');
  }
  const transactions = window.transactions.map((txn) => decodeUnsignedTransaction(base64ToBytes(txn)));
  const result = await sendPrepared(
    {
      transactions,
      signers: transactions.map(() => signer),
      groupId: bytesToBase64(transactions[0].group ?? new Uint8Array()),
      methodCalls: new Map(),
    },
    algod,
  );
  return result.txIds;
}

/** One plugin grant: who may call the plugin, optionally only some methods and only until `lastValid` */
export type FundedPluginGrant = {
  caller: string;
  /** selectors the caller may use; all methods when empty */
  methods?: Uint8Array[];
  /** unix seconds after which the grant stops working */
  lastValid?: bigint;
  coverFees?: boolean;
};

/**
 * Install `plugin` on `wallet` with `grants` in one atomic group with the payment for their boxes, so the
 * admin approves a single signature.
 */
export async function installFundedPlugin({
  wallet,
  plugin,
  grants,
  sender,
  signer,
}: {
  wallet: WalletSDK;
  plugin: bigint;
  grants: FundedPluginGrant[];
} & MaybeSigner): Promise<void> {
  if (!sender) throw new Error('The wallet admin must sign the plugin install');
  const external = await wallet.hasExternalControlledAddress();
  let funding = 0n;
  for (const grant of grants) {
    const mbr = await wallet.getMbr({ escrow: '', methodCount: BigInt(grant.methods?.length ?? 0), plugin: '', groups: 0n });
    funding += mbr.plugins;
  }
  const group = wallet.client.newGroup().addTransaction(
    await wallet.client.algorand.createTransaction.payment({ sender, receiver: wallet.client.appAddress, amount: microAlgo(funding) }),
    signer,
  );
  for (const grant of grants) {
    group.arc58AddPlugin({
      sender,
      signer,
      args: {
        plugin,
        caller: grant.caller,
        escrow: '',
        admin: false,
        delegationType: 0n,
        lastValid: grant.lastValid ?? MAX_UINT64,
        cooldown: 0n,
        methods: (grant.methods ?? []).map((selector) => [selector, 0n] as [Uint8Array, bigint]),
        useRounds: false,
        useExecutionKey: false,
        coverFees: grant.coverFees ?? true,
        canReclaim: false,
        defaultToEscrow: false,
      },
      extraFee: microAlgo(addPluginExtraFee(false, external)),
    });
  }
  await group.send();
}

type PreTransaction = { txn: import('algosdk').Transaction; signer: import('algosdk').TransactionSigner };
type AddPluginClient = {
  createTransaction: {
    arc58AddPlugin(params: Record<string, unknown>): Promise<{ transactions: import('algosdk').Transaction[] }>;
  };
};

/** Selectors of the GuildPlugin methods named `names` */
export function guildPluginSelectors(names: string[]): Uint8Array[] {
  return GUILD_PLUGIN_SPEC.methods
    .filter((method) => names.includes(method.name))
    .map((method) => new ABIMethod({ name: method.name, args: method.args.map((arg) => ({ type: arg.type })), returns: { type: method.returns.type } }).getSelector());
}

/**
 * Create, configure and initialize a Guild from an Akita wallet, in the order the Guild requires:
 * `newGuild` through the creation-only plugin, then a GuildPlugin bound to the new Guild is deployed and
 * installed on the wallet, which configures the consensus draft, sets up the Guild's treasury wallet and
 * initializes it. Each step is its own wallet window; `onStep` reports progress for a UI.
 */
export async function createGuild({
  wallet,
  creationPlugin,
  consensusName,
  governanceConfig,
  consensusConfiguration,
  baseConfig = defaultGuildBaseConfig(),
  nickname,
  salt,
  callerType = 2n,
  creationCallerType = callerType,
  initialize = true,
  onStep,
  sender,
  signer,
}: CreateGuildParams): Promise<CreatedGuild> {
  const use = (plugin: GuildPluginSDK, call: PluginSDKReturn, opUps: number) =>
    wallet.usePlugin({
      sender,
      signer,
      callerType: plugin === creationPlugin ? creationCallerType : callerType,
      consolidateFees: true,
      calls: [...Array.from({ length: opUps }, (_, nonce) => plugin.opUp({ sender, signer, rekeyBack: false, nonce: BigInt(nonce) })), call],
    });

  onStep?.('newGuild');
  const created = await use(creationPlugin, creationPlugin.newGuild({ sender, signer, consensusName, baseConfig, governanceConfig }), 5);
  const deployment = lastReturn<{ guild: bigint; consensus: bigint } | [bigint, bigint]>(created.returns);
  const guild = Array.isArray(deployment) ? deployment[0] : deployment.guild;
  const consensus = Array.isArray(deployment) ? deployment[1] : deployment.consensus;

  onStep?.('installGuildPlugin');
  const guildPlugin = await creationPlugin.deployForGuild(guild, { sender, signer });
  const mbr = await wallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n });
  await wallet.client.appClient.fundAppAccount({ sender, signer, amount: microAlgo(mbr.plugins) });
  await wallet.addPlugin({ sender, signer, client: guildPlugin, callerType });

  onStep?.('configureConsensus');
  await use(guildPlugin, guildPlugin.configureConsensus({ sender, signer, guild, config: consensusConfiguration }), 5);

  onStep?.('setup');
  const setup = await use(guildPlugin, guildPlugin.setup({ sender, signer, guild, nickname, ...(salt ? { salt } : {}) }), 8);
  const guildWallet = BigInt(lastReturn<bigint>(setup.returns));

  if (initialize) {
    onStep?.('initialize');
    await initializeGuild({ wallet, guildPlugin, guild, callerType, sender, signer });
  }

  return { guild, consensus, guildWallet, guildPlugin };
}

/** What `createGuildInOneCall` made */
export type CreatedGuildInOneCall = { guild: bigint; consensus: bigint; guildWallet: bigint };

/**
 * Create a Guild and make it ready in one group, so the wallet's admin approves once: through the shared
 * GuildPlugin (installed on `wallet`), create the Guild and its consensus, configure the consensus (e.g. a
 * member list), set up the treasury, fund it with `funding`, and run `actions` as the creator's instant
 * draft proposal (e.g. `addPluginAction` grants on the treasury). The Guild stays a draft.
 */
export async function createGuildInOneCall({
  wallet,
  plugin,
  consensusName,
  governanceConfig,
  consensusConfiguration,
  baseConfig = defaultGuildBaseConfig(),
  nickname,
  salt,
  funding = 0n,
  actions = [],
  maxCost,
  callerType = 2n,
  sender,
  signer,
}: MaybeSigner & {
  wallet: Pick<GuildCreationWallet, 'usePlugin'>;
  /** the shared GuildPlugin (bound to no Guild) */
  plugin: GuildPluginSDK;
  consensusName: string;
  governanceConfig: Uint8Array;
  consensusConfiguration: Uint8Array;
  baseConfig?: ReturnType<typeof defaultGuildBaseConfig>;
  nickname: string;
  salt?: Uint8Array;
  funding?: bigint;
  actions?: [number | bigint, Uint8Array][];
  /** the most the wallet may pay besides `funding`, in microAlgo; no limit when left out (see `GuildPluginSDK.createGuild`) */
  maxCost?: bigint;
  callerType?: bigint;
}): Promise<CreatedGuildInOneCall> {
  const result = await wallet.usePlugin({
    sender,
    signer,
    callerType,
    consolidateFees: true,
    calls: [
      ...Array.from({ length: CREATE_GUILD_OP_UPS }, (_, nonce) => plugin.opUp({ sender, signer, rekeyBack: false, nonce: BigInt(nonce) })),
      plugin.createGuild({
        sender,
        signer,
        consensusName,
        baseConfig,
        governanceConfig,
        consensusConfig: consensusConfiguration,
        nickname,
        ...(salt ? { salt } : {}),
        funding,
        actions: actions as never,
        ...(maxCost !== undefined ? { maxCost } : {}),
      }),
    ],
  });
  const created = lastReturn<{ guild: bigint; consensus: bigint; wallet: bigint } | [bigint, bigint, bigint]>(result.returns);
  return Array.isArray(created)
    ? { guild: created[0], consensus: created[1], guildWallet: created[2] }
    : { guild: created.guild, consensus: created.consensus, guildWallet: created.wallet };
}

/**
 * The GuildPlugin bound to `guild` among a wallet's installed plugin apps (each bound plugin stores its
 * Guild in its `guild` global), or undefined. Lets an app reopen a draft Guild it created earlier.
 */
export async function findGuildPlugin({
  algorand,
  pluginAppIds,
  guild,
  sendParams,
}: {
  algorand: NewContractSDKParams['algorand'];
  pluginAppIds: Iterable<bigint>;
  guild: bigint;
  sendParams?: MaybeSigner;
}): Promise<GuildPluginSDK | undefined> {
  for (const appId of new Set(pluginAppIds)) {
    const plugin = new GuildPluginSDK({ algorand, factoryParams: { appId, defaultSender: sendParams?.sender, defaultSigner: sendParams?.signer } });
    const bound = await plugin.client.state.global.guild().catch(() => undefined);
    if (bound === guild) return plugin;
  }
  return undefined;
}
