import { AbstractedAccountFactoryArgs, AbstractedAccountFactoryFactory, type AbstractedAccountFactoryClient } from '../generated/AbstractedAccountFactoryClient';
import { NewContractSDKParams, MaybeSigner } from '../types';
import { PluginInstallParams } from './types';
import { WalletSDK } from './index';
import { BaseSDK } from '../base';
import { ENV_VAR_NAMES, shouldWriteRegistry } from '../config';
import { emptySigner } from '../constants';
import { ALGORAND_ZERO_ADDRESS_STRING, Address, TransactionSigner } from 'algosdk';
import { microAlgo } from '@algorandfoundation/algokit-utils';
import { assertByteArrayLength, randomByteArray } from '../utils';

export type WalletFactoryContractArgs = AbstractedAccountFactoryArgs["obj"];

type NewAccountABI = WalletFactoryContractArgs['newAccount(pay,address,address,string,address,byte[32],string,bool,uint64,uint64[],(uint64,address,string,bool,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,bool)[])uint64']

export type NewParams = (
  Omit<NewAccountABI, 'payment' | 'controlledAddress' | 'admin' | 'referrer' | 'salt' | 'bio' | 'automaticUpdates' | 'extraFunding' | 'assets' | 'plugins'> &
  MaybeSigner &
  Partial<Pick<NewAccountABI, 'controlledAddress' | 'admin' | 'referrer' | 'salt' | 'bio' | 'automaticUpdates' | 'extraFunding' | 'assets'>> &
  {
    plugins?: PluginInstallParams[]
    /**
     * SG-04: signer for an external `controlledAddress`. The account must hand itself to the
     * factory (rekey) inside the creation group; the SDK adds that transaction first. If omitted,
     * the AlgorandClient's registered signer for `controlledAddress` is used.
     */
    controlledSigner?: TransactionSigner
  }
)

export class WalletFactorySDK extends BaseSDK<AbstractedAccountFactoryClient> {

  constructor(params: NewContractSDKParams) {
    super({ factory: AbstractedAccountFactoryFactory, ...params }, ENV_VAR_NAMES.WALLET_FACTORY_APP_ID);
  }

  /**
   * Create a wallet. `referrer` (any address, default zero) is stored as the wallet's `referrer` global and
   * is paid its cut of the DAO creation fee by the factory (Q1-A2). The wallet is NOT written into the
   * EscrowFactory reverse registry (principal-resolution Phase 3).
   */
  async new({
    sender,
    signer,
    controlledAddress = ALGORAND_ZERO_ADDRESS_STRING,
    admin = '',
    nickname,
    referrer = ALGORAND_ZERO_ADDRESS_STRING,
    salt = randomByteArray(32),
    bio = '',
    automaticUpdates = true,
    extraFunding = 0n,
    assets = [],
    plugins = [],
    controlledSigner,
  }: NewParams): Promise<WalletSDK> {

    const sendParams = this.getRequiredSendParams({ sender, signer });
    assertByteArrayLength(salt, 'salt', 32);

    const cost = await this.cost({ sender: sendParams.sender })

    // Add extra funding + asset MBR + plugin MBR to the payment
    const assetMBR = BigInt(assets.length) * 100_000n
    const pluginMBR = plugins.reduce((acc, p) => {
      const methodBytes = BigInt(p.methods?.length ?? 0) * 20n * 400n
      const escrowBytes = BigInt(new TextEncoder().encode(p.escrow ?? '').length) * 400n
      return acc + 38_900n + methodBytes + escrowBytes
    }, 0n)

    const totalPayment = cost + BigInt(extraFunding) + assetMBR + pluginMBR

    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      receiver: this.client.appAddress,
      amount: microAlgo(totalPayment),
    })

    if (!admin) {
      admin = typeof sendParams.sender === 'string'
        ? sendParams.sender
        : (sendParams.sender as { toString(): string }).toString();
    }

    // Transform plugin params to ABI tuple format
    const pluginTuples: [bigint | number, string, string, boolean, bigint | number, bigint | number, bigint | number, [Uint8Array, bigint | number][], boolean, boolean, boolean, boolean, boolean][] = plugins.map(p => [
      p.plugin,
      p.caller,
      p.escrow ?? '',
      p.admin ?? false,
      p.delegationType ?? 0,
      p.lastValid ?? BigInt('18446744073709551615'),
      p.cooldown ?? 0n,
      p.methods ?? [],
      p.useRounds ?? false,
      p.useExecutionKey ?? false,
      p.coverFees ?? false,
      p.canReclaim ?? false,
      p.defaultToEscrow ?? false,
    ])

    // maxFee cap per app call — minFee * 272 gives us headroom for a large number
    // of inner transactions whose fees pool up from the outer app call during
    // `coverAppCallInnerTransactionFees` distribution.
    const suggestedParams = await this.client.algorand.getSuggestedParams()
    const MAX_SIM_FEE = BigInt(suggestedParams.minFee) * 272n

    const group = this.client.newGroup()

    // SG-04: an external controlled address proves control by rekeying itself to the factory
    // earlier in the same group (the contract rejects a rekey made in any other group).
    const controlled = controlledAddress.toString()
    if (controlled !== ALGORAND_ZERO_ADDRESS_STRING) {
      const rekeyTxn = await this.client.algorand.createTransaction.payment({
        sender: controlled,
        receiver: controlled,
        amount: microAlgo(0),
        rekeyTo: this.client.appAddress,
        ...(controlledSigner ? { signer: controlledSigner } : {}),
      })
      group.addTransaction(rekeyTxn, controlledSigner)
    }

    group.newAccount({
      ...sendParams,
      args: {
        payment,
        controlledAddress,
        admin,
        nickname,
        referrer,
        salt,
        bio,
        automaticUpdates,
        extraFunding,
        assets,
        plugins: pluginTuples,
      },
      maxFee: microAlgo(MAX_SIM_FEE)
    })

    // The shared composer discovers Access resources and opcode requirements,
    // adding only the carrier calls the simulated path actually needs.
    const results = await (await group.composer()).send({
      coverAppCallInnerTransactionFees: true,
      populateAppCallResources: true,
    })

    const appId = results.returns?.[0]?.returnValue as bigint | undefined

    if (!appId) {
      throw new Error('Failed to create new wallet');
    }

    return new WalletSDK({
      algorand: this.algorand,
      factoryParams: {
        appId,
        defaultSender: sendParams.sender,
        defaultSigner: sendParams.signer
      }
    })
  }

  async get({ appId }: { appId: bigint }): Promise<WalletSDK> {
    return new WalletSDK({
      algorand: this.algorand,
      factoryParams: {
        appId,
        defaultSender: this.sendParams.sender,
        defaultSigner: this.sendParams.signer
      }
    })
  }

  /**
   * The exact payment `newAccount` requires before extras (extra funding, asset opt-ins, plugin boxes).
   * Q1-A2: the creation referral (cut + disbursement MBR) comes out of the DAO's creation fee, so the
   * price is the same for every caller and never depends on the EscrowFactory registry.
   */
  async cost(params?: MaybeSigner): Promise<bigint> {

    const sendParams = this.getSendParams({
      sender: this.readerAccount,
      signer: emptySigner,
      ...params
    });

    const { return: cost } = await this.client.send.cost({
      ...sendParams,
      args: {}
    })

    if (cost === undefined) {
      throw new Error('Failed to get cost for wallet creation');
    }

    return cost;
  }
}

export type NewWalletParams = NewContractSDKParams & NewParams & {
  /**
   * LEGACY. Also write the wallet into the EscrowFactory reverse registry (`register('')`).
   * Default: `!registryWritesStopped(network)` (networks.ts `REGISTRY_WRITES_STOPPED`). Registry writes
   * stop only after the Phase 3 proposal has executed on that network (spec §7.1); until then deployed
   * consumers still read the registry. LocalNet already runs the Phase 3 code, so it defaults to no write.
   * Pass `true` / `false` to force either behaviour (tests of legacy registry semantics pass `true`).
   * Removed in Phase 4.
   */
  register?: boolean
}

export async function newWallet({
  factoryParams,
  algorand,
  readerAccount,
  sendParams,
  sender,
  signer,
  controlledAddress,
  admin,
  nickname,
  referrer,
  salt,
  bio,
  automaticUpdates,
  extraFunding,
  assets,
  plugins,
  controlledSigner,
  register,
}: NewWalletParams): Promise<WalletSDK> {
  const factory = new WalletFactorySDK({ factoryParams, algorand, readerAccount, sendParams });
  const sdk = await factory.new({
    sender, signer, controlledAddress, admin, nickname, referrer,
    salt, bio, automaticUpdates, extraFunding, assets, plugins, controlledSigner,
  });
  if (shouldWriteRegistry(factory.network, register)) {
    await sdk.register({ escrow: '' })
  }
  return sdk;
}
