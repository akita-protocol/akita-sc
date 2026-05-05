import { AbstractedAccountFactoryArgs, AbstractedAccountFactoryFactory, type AbstractedAccountFactoryClient } from '../generated/AbstractedAccountFactoryClient';
import { NewContractSDKParams, MaybeSigner } from '../types';
import { PluginInstallParams } from './types';
import { WalletSDK } from './index';
import { BaseSDK } from '../base';
import { ENV_VAR_NAMES } from '../config';
import { emptySigner } from '../constants';
import { ALGORAND_ZERO_ADDRESS_STRING, Address } from 'algosdk';
import { microAlgo } from '@algorandfoundation/algokit-utils';
import { assertByteArrayLength, randomByteArray } from '../utils';

export type WalletFactoryContractArgs = AbstractedAccountFactoryArgs["obj"];

type NewAccountABI = WalletFactoryContractArgs['newAccount(pay,address,address,string,address,byte[32],string,uint64,uint64[],(uint64,address,string,bool,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,bool)[])uint64']

export type NewParams = (
  Omit<NewAccountABI, 'payment' | 'controlledAddress' | 'admin' | 'referrer' | 'salt' | 'bio' | 'extraFunding' | 'assets' | 'plugins'> &
  MaybeSigner &
  Partial<Pick<NewAccountABI, 'controlledAddress' | 'admin' | 'referrer' | 'salt' | 'bio' | 'extraFunding' | 'assets'>> &
  { plugins?: PluginInstallParams[] }
)

export class WalletFactorySDK extends BaseSDK<AbstractedAccountFactoryClient> {

  constructor(params: NewContractSDKParams) {
    super({ factory: AbstractedAccountFactoryFactory, ...params }, ENV_VAR_NAMES.WALLET_FACTORY_APP_ID);
  }

  async new({
    sender,
    signer,
    controlledAddress = ALGORAND_ZERO_ADDRESS_STRING,
    admin = '',
    nickname,
    referrer = ALGORAND_ZERO_ADDRESS_STRING,
    salt = randomByteArray(32),
    bio = '',
    extraFunding = 0n,
    assets = [],
    plugins = []
  }: NewParams): Promise<WalletSDK> {

    const sendParams = this.getRequiredSendParams({ sender, signer });
    assertByteArrayLength(salt, 'salt', 32);

    const cost = await this.cost()

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
      p.canReclaim ?? true,
      p.defaultToEscrow ?? false,
    ])

    // maxFee cap per app call — minFee * 272 gives us headroom for a large number
    // of inner transactions whose fees pool up from the outer app call during
    // `coverAppCallInnerTransactionFees` distribution.
    const suggestedParams = await this.client.algorand.getSuggestedParams()
    const MAX_SIM_FEE = BigInt(suggestedParams.minFee) * 272n

    const group = this.client.newGroup()

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
        extraFunding,
        assets,
        plugins: pluginTuples,
      },
      maxFee: microAlgo(MAX_SIM_FEE)
    })

    // Scale opUps: each inner call needs opcode budget
    const hasSetup = plugins.length > 0 || assets.length > 0 || bio
    const innerCallCount = plugins.length
      + (assets.length > 0 ? assets.length + 1 : 0)
      + (bio ? 1 : 0)
      + (hasSetup ? 1 : 0)
    const opUpCount = Math.max(1, innerCallCount)
    for (let i = 0; i < opUpCount; i++) {
      group.opUp({ args: {}, note: String(i), maxFee: microAlgo(MAX_SIM_FEE) })
    }

    // utils10 composer.send() runs a single simulate internally (via
    // `analyzeGroupRequirements`) that both populates app-call resources and
    // distributes fees to cover inner transactions, up to the `maxFee` set on
    // each call above. No legacy ATC round-trip needed.
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
  extraFunding,
  assets,
  plugins,
}: NewContractSDKParams & NewParams): Promise<WalletSDK> {
  const factory = new WalletFactorySDK({ factoryParams, algorand, readerAccount, sendParams });
  const sdk = await factory.new({
    sender, signer, controlledAddress, admin, nickname, referrer,
    salt, bio, extraFunding, assets, plugins,
  });
  await sdk.register({ escrow: '' })
  return sdk;
}
