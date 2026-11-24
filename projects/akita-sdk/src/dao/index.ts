import { AkitaDaoArgs, AkitaDaoClient, AkitaDaoFactory, ProposalCostInfo, ProposalDetails, ProposalVoteTotals } from '../generated/AkitaDAOClient'
import {
  AkitaDaoTypesClient,
  ProposalAddAllowances,
  ProposalAddNamedPlugin,
  ProposalAddPlugin,
  ProposalChangeAdmin,
  ProposalDeleteEscrow,
  ProposalExecutePlugin,
  ProposalNewEscrow,
  ProposalReclaim,
  ProposalRemoveAllowances,
  ProposalRemoveExecutePlugin,
  ProposalRemoveNamedPlugin,
  ProposalRemovePlugin,
  ProposalToggleEscrowLock,
  ProposalUpdateField,
  ProposalUpgradeApp
} from '../generated/AkitaDAOTypesClient'
import { BaseSDK } from "../base";
import { ENV_VAR_NAMES } from "../config";
import { GroupReturn, isPluginSDKReturn, MaybeSigner, NewContractSDKParams, SDKClient, TxnReturn } from "../types";
import { CallerType, WalletSDK } from "../wallet";
import { AkitaDaoGlobalState, DecodedProposal, DecodedProposalAction, EditProposalParams, NewProposalParams, ProposalAction, ProposalAddPluginArgs, SplitsToTuples } from "./types";
import { DAOBootstrapKeyBoxPrefix, ProposalActionEnum } from "./constants";
import { decodeVoteReceipt, DecodedVoteReceipt, voteCost, voteReceiptBoxName } from "./votes";
import { ABIStructValue, assertByteArrayLength, decodeABIValue as getABIDecodedValue, encodeABIValue as getABIEncodedValue, randomByteArray } from "../utils";
import algosdk, { ALGORAND_ZERO_ADDRESS_STRING, encodeUint64 } from "algosdk";
import { AppReturn } from "@algorandfoundation/algokit-utils/types/app";
import { microAlgo } from "@algorandfoundation/algokit-utils";
import { prepareGroup, sendPrepared } from "../simulate/prepare";
import { emptySigner, MAX_UINT64 } from "../constants";
import { EMPTY_CID } from "./constants"
import { AllowancesToTuple, assertEscrowCanBeDeleted } from '../wallet/utils';
import { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount';
import { getDaoEscrowActionV2Cutover } from '../networks';
import { decodeLegacyProposalNewEscrow, usesLegacyEscrowActionShape } from './legacy';

export * from './constants';
export * from "./errors";
export * from "./types";
export * from './legacy';
export * from './votes';

type ContractArgs = AkitaDaoArgs["obj"]
type SetupArgs = (
  Omit<ContractArgs['setup(string,byte[32])uint64'], 'nickname' | 'salt'> &
  Partial<Pick<ContractArgs['setup(string,byte[32])uint64'], 'nickname' | 'salt'>> &
  MaybeSigner
)

export class AkitaDaoSDK extends BaseSDK<AkitaDaoClient> {

  typeClient: AkitaDaoTypesClient
  private _wallet: WalletSDK | null = null;
  private _walletInitPromise: Promise<WalletSDK> | null = null;
  private _constructorParams: NewContractSDKParams;

  constructor(params: NewContractSDKParams) {
    super({ factory: AkitaDaoFactory, ...params }, ENV_VAR_NAMES.DAO_APP_ID);
    this.typeClient = new AkitaDaoTypesClient({ algorand: this.algorand, appId: 0n });
    this._constructorParams = params;
  }

  /**
   * Get the wallet SDK associated with this DAO.
   * Lazily fetches the wallet app ID from the DAO's global state on first access.
   */
  async getWallet(): Promise<WalletSDK> {
    if (this._wallet) {
      return this._wallet;
    }

    // Use a promise to prevent multiple concurrent initializations
    if (!this._walletInitPromise) {
      this._walletInitPromise = this._initializeWallet();
    }

    return this._walletInitPromise;
  }

  private async _initializeWallet(): Promise<WalletSDK> {
    // Fetch wallet app ID from DAO global state
    const walletAppId = await this.client.state.global.wallet();
    if (!walletAppId) {
      throw new Error('Could not read wallet app ID from DAO global state. Has the DAO been set up?');
    }

    this._wallet = new WalletSDK({
      ...this._constructorParams,
      factoryParams: {
        ...this._constructorParams.factoryParams,
        appId: walletAppId,
        defaultSender: this.sendParams.sender,
        defaultSigner: this.sendParams.signer
      }
    });

    return this._wallet;
  }

  /**
   * @deprecated Use getWallet() instead for proper async initialization.
   * This getter exists for backwards compatibility but will throw if the wallet
   * hasn't been initialized yet via getWallet() or setup().
   */
  get wallet(): WalletSDK {
    if (!this._wallet) {
      throw new Error(
        'Wallet not initialized. Call "await dao.getWallet()" first to initialize the wallet SDK, ' +
        'or use "await dao.setup()" to create a new DAO with its wallet.'
      );
    }
    return this._wallet;
  }

  /**
   * Allows setting the wallet directly (used by setup() and for testing)
   */
  set wallet(wallet: WalletSDK) {
    this._wallet = wallet;
    this._walletInitPromise = Promise.resolve(wallet);
  }

  private async prepProposalActions<TClient extends SDKClient>(actions: ProposalAction<TClient>[]): Promise<any> {
    // Only fetch wallet when needed for validation (ExecutePlugin, RemoveExecutePlugin, RemovePlugin, RemoveNamedPlugin)
    const needsWallet = actions.some(a => 
      a.type === ProposalActionEnum.ExecutePlugin ||
      a.type === ProposalActionEnum.RemoveExecutePlugin ||
      a.type === ProposalActionEnum.RemovePlugin ||
      a.type === ProposalActionEnum.RemoveNamedPlugin
    );
    const wallet = needsWallet ? await this.getWallet() : null;
    
    // parse args & rebuild
    const preppedActions: [number | bigint, Uint8Array<ArrayBufferLike>][] = []
    for (let i = 0; i < actions.length; i++) {
      const typedAction = actions[i]
      let abiAction: ABIStructValue
      let structType: string = ''

      switch (typedAction.type) {
        case ProposalActionEnum.UpgradeApp: {
          const { type, ...action } = typedAction

          abiAction = action
          structType = 'ProposalUpgradeApp'
          break;
        }
        case ProposalActionEnum.AddPlugin:
        case ProposalActionEnum.AddNamedPlugin: {
          const { type: actionType, ...action } = typedAction

          let {
            name = '',
            client,
            caller,
            callerType: pluginCallerType = CallerType.Other,
            methods = [],
            escrow = '',
            delegationType = 0n,
            lastValid = MAX_UINT64,
            cooldown = 0n,
            useRounds = false,
            useExecutionKey = false,
            coverFees = false,
            defaultToEscrow = false,
            sourceLink = '',
            allowances = []
          } = action;

          // Default the conditional properties
          let fee = 0n;
          let power = 0n;
          let duration = 0n;
          let participation = 0n;
          let approval = 0n;

          // Narrow the type and extract execution key props
          if (action.useExecutionKey) {
            fee = action.fee;
            power = action.power;
            duration = action.duration;
            participation = action.participation;
            approval = action.approval;

            // Move the validation inside the narrowed block
            if (duration === 0n || participation === 0n || approval === 0n) {
              throw new Error('Proposal Settings must be set when using execution key');
            }
          }

          const plugin = client.appId;

          if (pluginCallerType === CallerType.Global) {
            caller = ALGORAND_ZERO_ADDRESS_STRING
          } else if (pluginCallerType === CallerType.Admin) {
            caller = algosdk.getApplicationAddress(client.appId).toString()
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

          const args: ProposalAddPluginArgs = {
            plugin,
            caller: caller!,
            escrow,
            delegationType,
            lastValid,
            cooldown,
            methods: transformedMethods,
            useRounds,
            useExecutionKey,
            coverFees,
            defaultToEscrow,
            fee,
            power,
            duration,
            participation,
            approval,
            sourceLink,
            allowances: AllowancesToTuple(allowances)
          }

          if (name) {
            abiAction = { name, ...args };
            structType = 'ProposalAddNamedPlugin';
          } else {
            abiAction = args;
            structType = 'ProposalAddPlugin';
          }

          break;
        }
        case ProposalActionEnum.ExecutePlugin: {
          const { type, ...action } = typedAction
          const { plugin, escrow } = action

          if (!wallet!.plugins.has({ plugin, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow })) {
            try {
              await wallet!.getPluginByKey({ plugin, caller: ALGORAND_ZERO_ADDRESS_STRING, escrow })
            } catch (e) {
              throw new Error(`Plugin: ${plugin} for escrow: ${escrow} not found`);
            }
          }

          abiAction = action;
          structType = 'ProposalExecutePlugin';
          break;
        }
        case ProposalActionEnum.RemoveExecutePlugin: {
          const { type, ...action } = typedAction

          if (!wallet!.executions.has(action.executionKey)) {
            try {
              await wallet!.getExecution(action.executionKey)
            } catch (e) {
              throw new Error(`Execution with key: ${action.executionKey} not found`);
            }
          }

          abiAction = action;
          structType = 'ProposalRemoveExecutePlugin';
          break;
        }
        case ProposalActionEnum.RemovePlugin: {
          const { type, ...action } = typedAction
          const { plugin, caller, escrow } = action;

          if (!wallet!.plugins.has({ plugin, caller, escrow })) {
            try {
              await wallet!.getPluginByKey({ plugin, caller, escrow })
            } catch (e) {
              throw new Error(`Plugin: ${plugin} with caller: ${caller} for escrow: ${escrow} not found`);
            }
          }

          abiAction = action;
          structType = 'ProposalRemovePlugin';
          break;
        }
        case ProposalActionEnum.RemoveNamedPlugin: {
          const { name } = typedAction;
          // Resolve the current alias so the voted payload commits the exact registration.
          const key = await wallet!.client.arc58GetNamedPluginKey({ args: { name } });
          abiAction = { name, plugin: key.plugin, caller: key.caller, escrow: key.escrow };
          structType = 'ProposalRemoveNamedPlugin';
          break;
        }
        case ProposalActionEnum.AddAllowances: {
          const { escrow, allowances } = typedAction

          abiAction = { escrow, allowances: AllowancesToTuple(allowances) };
          structType = 'ProposalAddAllowances';
          break;
        }
        case ProposalActionEnum.RemoveAllowances: {
          const { type, ...action } = typedAction

          abiAction = action;
          structType = 'ProposalRemoveAllowances';
          break;
        }
        case ProposalActionEnum.NewEscrow: {
          const { type, ...action } = typedAction

          abiAction = action;
          structType = 'ProposalNewEscrow';
          break;
        }
        case ProposalActionEnum.ToggleEscrowLock: {
          const { type, ...action } = typedAction

          abiAction = action;
          structType = 'ProposalToggleEscrowLock';
          break;
        }
        case ProposalActionEnum.Reclaim: {
          const { escrow, reclaims } = typedAction

          abiAction = { escrow, reclaims: reclaims.map(({ asset, amount, closeOut }) => [asset, amount, closeOut]) };
          structType = 'ProposalReclaim';
          break;
        }
        case ProposalActionEnum.DeleteEscrow: {
          const { type, ...action } = typedAction

          abiAction = action;
          structType = 'ProposalDeleteEscrow';
          break;
        }
        case ProposalActionEnum.ChangeAdmin: {
          const { type, ...action } = typedAction

          abiAction = action;
          structType = 'ProposalChangeAdmin';
          break;
        }
        case ProposalActionEnum.UpdateFields: {
          const { type, ...action } = typedAction

          let data: Uint8Array<ArrayBufferLike>
          switch (action.field) {
            case 'content_policy': {
              data = action.value
              break;
            }
            case 'proposal_action_limit':
            case 'min_rewards_impact': {
              data = encodeUint64(action.value)
              break;
            }
            case 'aal': {
              const currentApps = await this.client.state.global.akitaAppList()

              const {
                staking = currentApps?.staking ?? 0n,
                rewards = currentApps?.rewards ?? 0n,
                pool = currentApps?.pool ?? 0n,
                prizeBox = currentApps?.prizeBox ?? 0n,
                subscriptions = currentApps?.subscriptions ?? 0n,
                gate = currentApps?.gate ?? 0n,
                auction = currentApps?.auction ?? 0n,
                hyperSwap = currentApps?.hyperSwap ?? 0n,
                raffle = currentApps?.raffle ?? 0n,
                metaMerkles = currentApps?.metaMerkles ?? 0n,
                marketplace = currentApps?.marketplace ?? 0n,
                wallet = currentApps?.wallet ?? 0n,
              } = action.value;

              const abiData = {
                staking,
                rewards,
                pool,
                prizeBox,
                subscriptions,
                gate,
                auction,
                hyperSwap,
                raffle,
                metaMerkles,
                marketplace,
                wallet,
              };

              data = getABIEncodedValue(abiData, 'AkitaAppList', this.client.appClient.appSpec.structs)
              break;
            }
            case 'sal': {
              const currentApps = await this.client.state.global.akitaSocialAppList()

              const {
                social = currentApps?.social ?? 0n,
                graph = currentApps?.graph ?? 0n,
                impact = currentApps?.impact ?? 0n,
                moderation = currentApps?.moderation ?? 0n
              } = action.value;

              const abiData = {
                social,
                graph,
                impact,
                moderation
              };

              data = getABIEncodedValue(abiData, 'AkitaSocialAppList', this.client.appClient.appSpec.structs)
              break;
            }
            case 'pal': {
              const currentApps = await this.client.state.global.pluginAppList()

              const {
                optin = currentApps?.optin ?? 0n,
                revenueManager = currentApps?.revenueManager ?? 0n,
                update = currentApps?.update ?? 0n
              } = action.value;

              data = getABIEncodedValue({ optin, revenueManager, update }, 'PluginAppList', this.client.appClient.appSpec.structs)
              break;
            }
            case 'oal': {
              const currentApps = await this.client.state.global.otherAppList()

              const {
                vrfBeacon = currentApps?.vrfBeacon ?? 0n,
                nfdRegistry = currentApps?.nfdRegistry ?? 0n,
                assetInbox = currentApps?.assetInbox ?? 0n,
                escrow = currentApps?.escrow ?? 0n,
                poll = currentApps?.poll ?? 0n,
                akitaNfd = currentApps?.akitaNfd ?? 0n,
                daoProposalValidator = currentApps?.daoProposalValidator ?? 0n
              } = action.value;

              const abiData = {
                vrfBeacon,
                nfdRegistry,
                assetInbox,
                escrow,
                poll,
                akitaNfd,
                daoProposalValidator
              };

              data = getABIEncodedValue(abiData, 'OtherAppList', this.client.appClient.appSpec.structs)
              break;
            }
            case 'wallet_fees': {

              const currentFees = await this.client.state.global.walletFees()

              const {
                createFee = currentFees?.createFee ?? 0n,
                referrerPercentage = currentFees?.referrerPercentage ?? 0n,
              } = action.value;

              data = getABIEncodedValue({ createFee, referrerPercentage }, 'WalletFees', this.client.appClient.appSpec.structs)
              break;
            }
            case 'guild_fees': {
              const currentFees = await this.client.state.global.guildFees()
              const { createFee = currentFees?.createFee ?? 0n } = action.value
              data = getABIEncodedValue({ createFee }, 'GuildFees', this.client.appClient.appSpec.structs)
              break
            }
            case 'social_fees': {
              const currentFees = await this.client.state.global.socialFees()

              const {
                postFee = currentFees?.postFee ?? 0n,
                reactFee = currentFees?.reactFee ?? 0n,
                impactTaxMin = currentFees?.impactTaxMin ?? 0n,
                impactTaxMax = currentFees?.impactTaxMax ?? 0n
              } = action.value;

              const abiData = {
                postFee,
                reactFee,
                impactTaxMin,
                impactTaxMax
              };

              data = getABIEncodedValue(abiData, 'SocialFees', this.client.appClient.appSpec.structs)
              break;
            }
            case 'staking_fees': {
              const currentFees = await this.client.state.global.stakingFees()

              const {
                creationFee = currentFees?.creationFee ?? 0n,
                impactTaxMin = currentFees?.impactTaxMin ?? 0n,
                impactTaxMax = currentFees?.impactTaxMax ?? 0n
              } = action.value;

              const abiData = {
                creationFee,
                impactTaxMin,
                impactTaxMax
              };

              data = getABIEncodedValue(abiData, 'StakingFees', this.client.appClient.appSpec.structs)
              break;
            }
            case 'subscription_fees': {
              const currentFees = await this.client.state.global.subscriptionFees()

              const {
                serviceCreationFee = currentFees?.serviceCreationFee ?? 0n,
                paymentPercentage = currentFees?.paymentPercentage ?? 0n,
                triggerPercentage = currentFees?.triggerPercentage ?? 0n,
              } = action.value;

              const abiData = {
                serviceCreationFee,
                paymentPercentage,
                triggerPercentage
              };

              data = getABIEncodedValue(abiData, 'SubscriptionFees', this.client.appClient.appSpec.structs)
              break;
            }
            case 'nft_fees': {
              const currentFees = await this.client.state.global.nftFees()

              const {
                marketplaceSalePercentageMin = currentFees?.marketplaceSalePercentageMin ?? 0n,
                marketplaceSalePercentageMax = currentFees?.marketplaceSalePercentageMax ?? 0n,
                marketplaceComposablePercentage = currentFees?.marketplaceComposablePercentage ?? 0n,
                marketplaceRoyaltyDefaultPercentage = currentFees?.marketplaceRoyaltyDefaultPercentage ?? 0n,
                shuffleSalePercentage = currentFees?.shuffleSalePercentage ?? 0n,
                omnigemSaleFee = currentFees?.omnigemSaleFee ?? 0n,
                auctionCreationFee = currentFees?.auctionCreationFee ?? 0n,
                auctionSaleImpactTaxMin = currentFees?.auctionSaleImpactTaxMin ?? 0n,
                auctionSaleImpactTaxMax = currentFees?.auctionSaleImpactTaxMax ?? 0n,
                auctionComposablePercentage = currentFees?.auctionComposablePercentage ?? 0n,
                auctionRafflePercentage = currentFees?.auctionRafflePercentage ?? 0n,
                raffleCreationFee = currentFees?.raffleCreationFee ?? 0n,
                raffleSaleImpactTaxMin = currentFees?.raffleSaleImpactTaxMin ?? 0n,
                raffleSaleImpactTaxMax = currentFees?.raffleSaleImpactTaxMax ?? 0n,
                raffleComposablePercentage = currentFees?.raffleComposablePercentage ?? 0n,
              } = action.value;

              const abiData = {
                marketplaceSalePercentageMin,
                marketplaceSalePercentageMax,
                marketplaceComposablePercentage,
                marketplaceRoyaltyDefaultPercentage,
                shuffleSalePercentage,
                omnigemSaleFee,
                auctionCreationFee,
                auctionSaleImpactTaxMin,
                auctionSaleImpactTaxMax,
                auctionComposablePercentage,
                auctionRafflePercentage,
                raffleCreationFee,
                raffleSaleImpactTaxMin,
                raffleSaleImpactTaxMax,
                raffleComposablePercentage
              };

              data = getABIEncodedValue(abiData, 'NFTFees', this.client.appClient.appSpec.structs)
              break;
            }
            case 'swap_fees': {
              const currentFees = await this.client.state.global.swapFees()

              const {
                impactTaxMin = currentFees?.impactTaxMin ?? 0n,
                impactTaxMax = currentFees?.impactTaxMax ?? 0n
              } = action.value;

              const abiData = {
                impactTaxMin,
                impactTaxMax
              };

              data = getABIEncodedValue(abiData, 'SwapFees', this.client.appClient.appSpec.structs)
              break;
            }
            case 'inference_fees': {
              const currentFees = await this.client.state.global.inferenceFees()

              const {
                chargePercentage = currentFees?.chargePercentage ?? 0n,
                providerBond = currentFees?.providerBond ?? 0n
              } = action.value;

              data = getABIEncodedValue({ chargePercentage, providerBond }, 'InferenceFees', this.client.appClient.appSpec.structs)
              break;
            }
            case 'akita_assets': {
              const currentAssets = await this.client.state.global.akitaAssets()

              const {
                akta = currentAssets?.akta ?? 0n,
                bones = currentAssets?.bones ?? 0n
              } = action.value;

              data = getABIEncodedValue({ akta, bones }, 'AkitaAssets', this.client.appClient.appSpec.structs)
              break;
            }
            case 'upgrade_app_ps':
            case 'add_plugin_ps':
            case 'remove_plugin_ps':
            case 'add_allowance_ps':
            case 'remove_allowance_ps':
            case 'new_escrow_ps':
            case 'remove_execute_plugin_ps':
            case 'toggle_escrow_lock_ps':
            case 'update_fields_ps': {
              data = getABIEncodedValue(action.value, "ProposalSettings", this.client.appClient.appSpec.structs)
              break;
            }
            case 'revenue_splits': {
              data = getABIEncodedValue(SplitsToTuples(action.value), '((uint64,string),uint8,uint64)[]', this.client.appClient.appSpec.structs)
              break;
            }
            default:
              throw new Error(`Unsupported field`);
          }

          abiAction = { field: action.field, value: data }
          structType = 'ProposalUpdateField';
          break;
        }
        case ProposalActionEnum.UpdateWallet: {
          // No data needed — the DAO contract calls factory.updateWallet(wallet) directly
          preppedActions.push([typedAction.type, new Uint8Array()])
          continue;
        }
        default: {
          throw new Error(`Unsupported proposal action type`);
        }
      }

      preppedActions.push([
        typedAction.type,
        getABIEncodedValue(abiAction, structType, this.typeClient.appClient.appSpec.structs)
      ])
    }

    return preppedActions;
  }

  async initialize(params?: MaybeSigner): Promise<TxnReturn<void>> {

    const sendParams = this.getSendParams(params);

    return await this.client.send.initialize({
      ...sendParams,
      args: {}
    })
  }

  async setup(params: SetupArgs = {}): Promise<GroupReturn> {

    const sendParams = this.getSendParams(params);
    const { nickname = 'Akita DAO', salt = randomByteArray(32) } = params;
    assertByteArrayLength(salt, 'salt', 32);

    const group = this.client.newGroup()

    group.setup({
      ...sendParams,
      args: { nickname, salt },
    })

    const result = await group.send({ ...sendParams })

    if (result.returns === undefined) {
      throw new Error('Failed to setup Akita DAO');
    }

    this._wallet = new WalletSDK({
      algorand: this.algorand,
      factoryParams: {
        appId: result.returns[0] as bigint,
        defaultSender: sendParams.sender,
        defaultSigner: sendParams.signer
      }
    })
    this._walletInitPromise = Promise.resolve(this._wallet)

    return result;
  }

  async newProposal<TClient extends SDKClient>({
    sender,
    signer,
    cid = EMPTY_CID,
    actions,
    consolidateFees = true
  }: NewProposalParams<TClient>): Promise<{
    groupId: string;
    confirmedRound: bigint;
    txIDs: string[];
  } & AppReturn<bigint | undefined>> {

    const sendParams = this.getRequiredSendParams({ sender, signer });

    const preppedActions = await this.prepProposalActions<TClient>(actions)

    const group = this.client.newGroup()

    const { total } = await this.client.proposalCost({
      ...sendParams,
      args: { actions: preppedActions },
    })
    const payment = this.client.algorand.createTransaction.payment({
      ...sendParams,
      receiver: this.client.appAddress.toString(),
      amount: microAlgo(total),
    })

    group.newProposal({
      ...sendParams,
      args: {
        payment,
        cid,
        actions: preppedActions
      },
      maxFee: microAlgo(257_000n)
    })

    // Single simulate via AlgoKit's `prepareGroup` populates resources and
    // distributes inner-txn fees; optional fee consolidation onto txn[0] is
    // an in-memory mutation after simulate (no extra roundtrip).
    const prepared = await prepareGroup(
      await group.composer(),
      consolidateFees ? { consolidateFees: true } : {},
    )

    const { groupId, txIds, confirmedRound, returns } = await sendPrepared(
      prepared,
      this.client.algorand.client.algod,
    )

    return {
      groupId,
      confirmedRound,
      txIDs: txIds,
      return: returns && returns.length > 0 ? returns[0].returnValue as bigint : undefined
    }
  }

  async editProposal<TClient extends SDKClient>({
    sender,
    signer,
    id,
    cid,
    actions
  }: EditProposalParams<TClient>): Promise<TxnReturn<void>> {

    const sendParams = this.getRequiredSendParams({ sender, signer });

    const preppedActions = await this.prepProposalActions<TClient>(actions)

    const req = await Promise.allSettled([
      this.client.state.box.proposals.value(id),
      this.client.proposalCost({ args: { actions: preppedActions } })
    ])

    if (req[0].status === 'rejected' || req[0].value === undefined) {
      throw new Error(`Proposal with id: ${id} not found`);
    }

    const { feesPaid } = req[0].value;

    if (req[1].status === 'rejected') {
      throw new Error(`Failed to calculate proposal cost: ${req[1].reason}`);
    }

    const results = req[1].value;
    const cost = results.total ?? 0n;

    let paymentRequired = feesPaid < cost;

    if (paymentRequired) {
      const payment = this.client.algorand.createTransaction.payment({
        ...sendParams,
        receiver: this.client.appAddress.toString(),
        amount: microAlgo(cost - feesPaid),
      })

      return await this.client.send.editProposalWithPayment({
        ...sendParams,
        args: {
          payment,
          id,
          cid,
          actions: preppedActions,
        }
      })
    } else {
      return await this.client.send.editProposal({
        ...sendParams,
        args: {
          id,
          cid,
          actions: preppedActions
        }
      })
    }
  }

  async submitProposal({ sender, signer, proposalId }: ContractArgs['submitProposal(uint64)void'] & MaybeSigner): Promise<TxnReturn<void>> {

    const sendParams = this.getRequiredSendParams({ sender, signer });

    return await this.client.send.submitProposal({
      ...sendParams,
      args: { proposalId }
    })
  }

  async voteProposal({ proposalId, vote, sender, signer }: ContractArgs['voteProposal(pay,uint64,uint8)void'] & MaybeSigner): Promise<TxnReturn<void>> {

    const sendParams = this.getRequiredSendParams({ sender, signer });
    const { payment } = await this.voteCost({ proposalId: BigInt(proposalId), voter: sendParams.sender.toString() })

    const mbrPayment = this.client.algorand.createTransaction.payment({
      ...sendParams,
      receiver: this.client.appAddress.toString(),
      amount: microAlgo(payment),
    });

    return await this.client.send.voteProposal({
      ...sendParams,
      args: { mbrPayment, proposalId, vote }
    })
  }

  async finalizeProposal({ sender, signer, proposalId }: ContractArgs['finalizeProposal(uint64)void'] & MaybeSigner): Promise<TxnReturn<void>> {

    const sendParams = this.getRequiredSendParams({ sender, signer });

    return await this.client.send.finalizeProposal({
      ...sendParams,
      args: { proposalId }
    })
  }

  async executeProposal({ proposalId, sender, signer }: ContractArgs['executeProposal(uint64)void'] & MaybeSigner): Promise<TxnReturn<void>> {

    const sendParams = this.getRequiredSendParams({ sender, signer });

    return await this.client.send.executeProposal({
      ...sendParams,
      args: { proposalId }
    })
  }

  /**
   * Build the actions that delete an escrow of the DAO wallet, in the order the wallet needs them,
   * from what the chain lists for the escrow: unlock it if asked, remove every grant and alias that
   * names it, remove its allowances, close its assets out to the wallet, then delete it.
   *
   * Put them in one proposal so the whole removal runs in one transaction group. When they are more
   * than the DAO's action limit allows, split them over proposals in this order and execute those in
   * order: the wallet refuses the delete while a plugin or an allowance still names the escrow.
   *
   * It throws when something stands in the way that no action can undo: the escrow is opted in to
   * an app, or holds an asset the wallet's account cannot receive. An alias whose grant is already
   * gone does not stand in the way and is left alone.
   *
   * What becomes of the escrow's address afterwards cannot be undone, and differs with the kind of
   * escrow. Before an app lets a person create this proposal, it shows the `warnings` of
   * `(await dao.getWallet()).getEscrowTeardown(escrow)` prominently.
   */
  async deleteEscrowActions({ escrow, unlock = false }: { escrow: string; unlock?: boolean }): Promise<ProposalAction<SDKClient>[]> {
    const plan = await (await this.getWallet()).getEscrowTeardown(escrow);
    assertEscrowCanBeDeleted(plan, unlock);

    const actions: ProposalAction<SDKClient>[] = [];
    if (plan.locked) actions.push({ type: ProposalActionEnum.ToggleEscrowLock, escrow });
    for (const { plugin, caller, escrow: keyEscrow, names } of plan.plugins) {
      if (names.length === 0) actions.push({ type: ProposalActionEnum.RemovePlugin, plugin, caller, escrow: keyEscrow });
      for (const name of names) actions.push({ type: ProposalActionEnum.RemoveNamedPlugin, name });
    }
    if (plan.allowances.length > 0) {
      actions.push({ type: ProposalActionEnum.RemoveAllowances, escrow, assets: plan.allowances });
    }
    if (plan.assets.length > 0) {
      actions.push({
        type: ProposalActionEnum.Reclaim,
        escrow,
        reclaims: plan.assets.map((asset) => ({ asset, amount: 0n, closeOut: true })),
      });
    }
    actions.push({ type: ProposalActionEnum.DeleteEscrow, escrow });
    return actions;
  }

  /**
   * Delete one of your proposals (draft, rejected, executed, cancelled, or a leftover bootstrap proposal).
   * Voted proposals require every vote receipt to be cleared first (`deleteProposalVotes`).
   */
  async deleteProposal({ sender, signer, proposalId }: ContractArgs['deleteProposal(uint64)void'] & MaybeSigner): Promise<TxnReturn<void>> {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    return await this.client.send.deleteProposal({ ...sendParams, args: { proposalId } })
  }

  /** Delete vote receipts of a finished proposal; each voter is refunded their receipt deposit. */
  async deleteProposalVotes({ sender, signer, proposalId, voters }: ContractArgs['deleteProposalVotes(uint64,address[])void'] & MaybeSigner): Promise<TxnReturn<void>> {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    return await this.client.send.deleteProposalVotes({ ...sendParams, args: { proposalId, voters } })
  }

  /** Proposer-only: abandon an approved proposal that has not executed. */
  async cancelProposal({ sender, signer, proposalId }: ContractArgs['cancelProposal(uint64)void'] & MaybeSigner): Promise<TxnReturn<void>> {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    return await this.client.send.cancelProposal({ ...sendParams, args: { proposalId } })
  }

  /**
   * Voting-rule snapshot of a submitted proposal: duration, participation, approval, outstanding vote
   * receipts, base units locked at submit (the quorum denominator) and locked base units that voted.
   */
  async getProposalTally(proposalId: bigint) {
    return await this.client.getProposalTally({ ...this.getReaderSendParams(), args: { proposalId } })
  }

  /** `account`'s governance participation (last vote time and proposal, distinct proposals voted on); zeros if it never voted. */
  async getGovernanceParticipation(account: string) {
    return await this.client.getGovernanceParticipation({ ...this.getReaderSendParams(), args: { account } })
  }

  /** `voter`'s receipt on a proposal ('w', or a legacy 'v' receipt with weight 0), or undefined. */
  async getVoteReceipt({ proposalId, voter }: { proposalId: bigint; voter: string }): Promise<DecodedVoteReceipt | undefined> {
    for (const legacy of [false, true]) {
      const value = await this.readBox(voteReceiptBoxName(proposalId, voter, legacy))
      if (value) return decodeVoteReceipt(value, legacy)
    }
    return undefined
  }

  /** The exact deposit `voteProposal` requires from `voter`, and what the DAO refunds in the same call. */
  async voteCost({ proposalId, voter }: { proposalId: bigint; voter: string }): Promise<{ payment: bigint; refund: bigint }> {
    const [receipt, legacyReceipt, participation] = await Promise.all([
      this.readBox(voteReceiptBoxName(proposalId, voter)),
      this.readBox(voteReceiptBoxName(proposalId, voter, true)),
      this.getGovernanceParticipation(voter),
    ])
    return voteCost({ receipt: receipt !== undefined, legacyReceipt: legacyReceipt !== undefined, participation: participation.votes > 0n })
  }

  private async readBox(name: Uint8Array): Promise<Uint8Array | undefined> {
    try {
      return await this.algorand.app.getBoxValue(this.client.appId, name)
    } catch (error) {
      if (error instanceof Error && error.message.toLowerCase().includes('box not found')) return undefined
      throw error
    }
  }

  /** Leases of bootstrap execution keys the DAO still tracks (must be cleared before `initialize`). */
  async getBootstrapKeys(): Promise<Uint8Array[]> {
    const names = await this.algorand.app.getBoxNames(this.client.appId)
    return names
      .filter(({ nameRaw }) => nameRaw.length === 33 && nameRaw[0] === DAOBootstrapKeyBoxPrefix.charCodeAt(0))
      .map(({ nameRaw }) => nameRaw.slice(1))
  }

  /**
   * Caller-scoped plugin grants added by bootstrap proposals that are still installed: the pre-launch
   * automation the DAO starts with. They survive `initialize`; a RemovePlugin proposal removes one.
   */
  async getBootstrapGrants(): Promise<{ plugin: bigint; caller: string; escrow: string }[]> {
    return Array.from((await this.client.state.box.bootstrapGrants.getMap()).keys())
  }

  /**
   * Stop tracking bootstrap execution keys, revoking any that are still live in the DAO wallet.
   * Anyone may clear used or expired keys; only the creator may revoke an unexpired one.
   * Defaults to every tracked key.
   */
  async clearBootstrapKeys({ sender, signer, leases }: { leases?: Uint8Array[] } & MaybeSigner = {}): Promise<TxnReturn<void> | undefined> {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const toClear = leases ?? await this.getBootstrapKeys()
    if (toClear.length === 0) return undefined
    return await this.client.send.clearBootstrapKeys({ ...sendParams, args: { leases: toClear } })
  }

  async getGlobalState(): Promise<AkitaDaoGlobalState> {
    return await this.client.state.global.getAll() as unknown as AkitaDaoGlobalState;
  }

  async setupCost(params?: MaybeSigner): Promise<bigint> {

    const sendParams = this.getSendParams({
      sender: this.readerAccount,
      signer: emptySigner,
      ...params
    });

    const cost = await this.client.setupCost({
      ...sendParams,
      args: {}
    });

    return cost;
  }

  async proposalCost<TClient extends SDKClient>({ sender, signer, actions }: { actions: ProposalAction<TClient>[] } & MaybeSigner): Promise<ProposalCostInfo> {

    const sendParams = this.getSendParams({
      sender: sender ?? this.readerAccount,
      signer: signer ?? emptySigner
    });

    const requirements = await this.client.proposalCost({
      ...sendParams,
      args: { actions: await this.prepProposalActions(actions) },
    });

    return requirements
  }

  /**
   * Maps proposal action type enum to its corresponding struct type name
   */
  private getActionStructType(actionType: number): string {
    switch (actionType) {
      case ProposalActionEnum.UpgradeApp:
        return 'ProposalUpgradeApp';
      case ProposalActionEnum.AddPlugin:
        return 'ProposalAddPlugin';
      case ProposalActionEnum.AddNamedPlugin:
        return 'ProposalAddNamedPlugin';
      case ProposalActionEnum.ExecutePlugin:
        return 'ProposalExecutePlugin';
      case ProposalActionEnum.RemoveExecutePlugin:
        return 'ProposalRemoveExecutePlugin';
      case ProposalActionEnum.RemovePlugin:
        return 'ProposalRemovePlugin';
      case ProposalActionEnum.RemoveNamedPlugin:
        return 'ProposalRemoveNamedPlugin';
      case ProposalActionEnum.AddAllowances:
        return 'ProposalAddAllowances';
      case ProposalActionEnum.RemoveAllowances:
        return 'ProposalRemoveAllowances';
      case ProposalActionEnum.NewEscrow:
        return 'ProposalNewEscrow';
      case ProposalActionEnum.ToggleEscrowLock:
        return 'ProposalToggleEscrowLock';
      case ProposalActionEnum.Reclaim:
        return 'ProposalReclaim';
      case ProposalActionEnum.DeleteEscrow:
        return 'ProposalDeleteEscrow';
      case ProposalActionEnum.UpdateFields:
        return 'ProposalUpdateField';
      case ProposalActionEnum.UpdateWallet:
        return '';  // No struct — empty data
      case ProposalActionEnum.ChangeAdmin:
        return 'ProposalChangeAdmin';
      default:
        throw new Error(`Unknown proposal action type: ${actionType}`);
    }
  }

  /**
   * Decodes the raw action bytes into their typed struct representation
   */
  private decodeProposalAction(actionType: number, actionData: Uint8Array, useLegacyEscrowShape = false): DecodedProposalAction {
    const structType = this.getActionStructType(actionType);
    const structs = this.typeClient.appClient.appSpec.structs;

    switch (actionType) {
      case ProposalActionEnum.UpgradeApp: {
        const decoded = getABIDecodedValue(actionData, structType, structs) as ProposalUpgradeApp;
        return { type: ProposalActionEnum.UpgradeApp, ...decoded };
      }
      case ProposalActionEnum.AddPlugin: {
        const decoded = getABIDecodedValue(actionData, structType, structs) as ProposalAddPlugin;
        return { type: ProposalActionEnum.AddPlugin, ...decoded };
      }
      case ProposalActionEnum.AddNamedPlugin: {
        const decoded = getABIDecodedValue(actionData, structType, structs) as ProposalAddNamedPlugin;
        return { type: ProposalActionEnum.AddNamedPlugin, ...decoded };
      }
      case ProposalActionEnum.ExecutePlugin: {
        const decoded = getABIDecodedValue(actionData, structType, structs) as ProposalExecutePlugin;
        return { type: ProposalActionEnum.ExecutePlugin, ...decoded };
      }
      case ProposalActionEnum.RemoveExecutePlugin: {
        const decoded = getABIDecodedValue(actionData, structType, structs) as ProposalRemoveExecutePlugin;
        return { type: ProposalActionEnum.RemoveExecutePlugin, ...decoded };
      }
      case ProposalActionEnum.RemovePlugin: {
        const decoded = getABIDecodedValue(actionData, structType, structs) as ProposalRemovePlugin;
        return { type: ProposalActionEnum.RemovePlugin, ...decoded };
      }
      case ProposalActionEnum.RemoveNamedPlugin: {
        const decoded = getABIDecodedValue(actionData, structType, structs) as ProposalRemoveNamedPlugin;
        return { type: ProposalActionEnum.RemoveNamedPlugin, ...decoded };
      }
      case ProposalActionEnum.AddAllowances: {
        const decoded = getABIDecodedValue(actionData, structType, structs) as ProposalAddAllowances;
        return { type: ProposalActionEnum.AddAllowances, ...decoded };
      }
      case ProposalActionEnum.RemoveAllowances: {
        const decoded = getABIDecodedValue(actionData, structType, structs) as ProposalRemoveAllowances;
        return { type: ProposalActionEnum.RemoveAllowances, ...decoded };
      }
      case ProposalActionEnum.NewEscrow: {
        if (useLegacyEscrowShape) {
          try {
            const decoded = decodeLegacyProposalNewEscrow(actionData);
            return { type: ProposalActionEnum.NewEscrow, ...decoded };
          } catch {
            // Proposal edits retain the original creation timestamp. If an old
            // proposal was edited after cutover, its replacement action is v2.
          }
        }
        const decoded = getABIDecodedValue(actionData, structType, structs) as ProposalNewEscrow;
        return { type: ProposalActionEnum.NewEscrow, ...decoded };
      }
      case ProposalActionEnum.ToggleEscrowLock: {
        const decoded = getABIDecodedValue(actionData, structType, structs) as ProposalToggleEscrowLock;
        return { type: ProposalActionEnum.ToggleEscrowLock, ...decoded };
      }
      case ProposalActionEnum.Reclaim: {
        const decoded = getABIDecodedValue(actionData, structType, structs) as ProposalReclaim;
        return { type: ProposalActionEnum.Reclaim, ...decoded };
      }
      case ProposalActionEnum.DeleteEscrow: {
        const decoded = getABIDecodedValue(actionData, structType, structs) as ProposalDeleteEscrow;
        return { type: ProposalActionEnum.DeleteEscrow, ...decoded };
      }
      case ProposalActionEnum.ChangeAdmin: {
        const decoded = getABIDecodedValue(actionData, structType, structs) as ProposalChangeAdmin;
        return { type: ProposalActionEnum.ChangeAdmin, ...decoded };
      }
      case ProposalActionEnum.UpdateFields: {
        const decoded = getABIDecodedValue(actionData, structType, structs) as ProposalUpdateField;
        return { type: ProposalActionEnum.UpdateFields, ...decoded };
      }
      case ProposalActionEnum.UpdateWallet: {
        return { type: ProposalActionEnum.UpdateWallet };
      }
      default:
        throw new Error(`Unknown proposal action type: ${actionType}`);
    }
  }

  /**
   * Fetches a proposal by ID and decodes all action data into typed structs
   */
  async getProposal(proposalId: bigint): Promise<DecodedProposal> {
    const proposal = await this.client.getProposal({ args: { proposalId } });

    if (!proposal) {
      throw new Error(`Proposal with id: ${proposalId} not found`);
    }

    const escrowActionV2Cutover = getDaoEscrowActionV2Cutover(this.network);
    const useLegacyEscrowShape = usesLegacyEscrowActionShape(proposal.created, escrowActionV2Cutover?.timestamp);
    const decodedActions: DecodedProposalAction[] = proposal.actions.map(([actionType, actionData]) => {
      return this.decodeProposalAction(actionType, actionData, useLegacyEscrowShape);
    });

    return {
      status: proposal.status,
      cid: proposal.cid,
      votes: proposal.votes,
      creator: proposal.creator,
      votingTs: proposal.votingTs,
      created: proposal.created,
      feesPaid: proposal.feesPaid,
      actions: decodedActions
    };
  }
}
