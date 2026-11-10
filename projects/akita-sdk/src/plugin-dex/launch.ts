import { microAlgo } from '@algorandfoundation/algokit-utils';
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk';
import { BaseSDK } from '../base';
import { ENV_VAR_NAMES } from '../config';
import {
  Launch,
  LaunchManagerClient,
  LaunchManagerComposer,
  LaunchManagerFactory,
  LaunchParams,
  LaunchResult,
  TokenParams,
} from '../generated/LaunchManagerClient';
import { MaybeSigner, NewContractSDKParams } from '../types';
import { AntiSnipe } from './constants';

export type { Launch, LaunchParams, LaunchResult, TokenParams } from '../generated/LaunchManagerClient';

/** createToken: the manager's ASA holding MBR and the launch record box, with room to spare (refunded) */
const CREATE_TOKEN_PAYMENT = 1_000_000n;
/** launch: the Vault's createPool cost, hook funding and the dev-buy Rewards costs fit inside this (refunded) */
const LAUNCH_POOL_ESTIMATE = 5_000_000n;
/** opUp carriers the launch call needs for resource references; a dev buy needs two more */
const LAUNCH_CARRIERS = 2;
const DEV_BUY_CARRIERS = 2;

/** Launch defaults: a 1% fee, a 50% → 1% anti-snipe decay over 20 rounds and no taxes */
export const defaultLaunchParams = (
  p: Pick<LaunchParams, 'curveSupply' | 'virtualQuote' | 'virtualToken' | 'graduationThreshold'>,
  overrides: Partial<LaunchParams> = {},
): LaunchParams => ({
  feeBps: 100n,
  snipe: {
    startFeeBps: 5_000n,
    endFeeBps: 100n,
    decayMode: AntiSnipe.DecayExponential,
    decayRounds: 20n,
    startMode: AntiSnipe.StartCreation,
    exempt: ALGORAND_ZERO_ADDRESS_STRING,
  },
  buyTaxBps: 0n,
  sellTaxBps: 0n,
  taxUntilRound: 0n,
  gated: false,
  gatedInitData: new Uint8Array(),
  gatedFunding: 0n,
  devBuy: 0n,
  devVestSeconds: 0n,
  ...p,
  ...overrides,
});

/**
 * SDK for the LaunchManager: fair launches of a new ASA into a PluginDex launch pool (virtual-reserve
 * bonding curve) that graduates once its quote reserve reaches the threshold.
 */
export class LaunchManagerSDK extends BaseSDK<LaunchManagerClient> {
  constructor(params: NewContractSDKParams) {
    super({ factory: LaunchManagerFactory, ...params }, ENV_VAR_NAMES.LAUNCH_MANAGER_APP_ID);
  }

  async getLaunch(launchId: bigint): Promise<Launch> {
    return this.client.getLaunch({ ...this.getReaderSendParams(), args: { launchId } });
  }

  /** The current launch fee and bounty (µALGO) */
  async fees(): Promise<{ launchFee: bigint; bounty: bigint }> {
    const [launchFee, bounty] = await Promise.all([this.client.state.global.launchFee(), this.client.state.global.bounty()]);
    return { launchFee: launchFee ?? 0n, bounty: bounty ?? 0n };
  }

  /** Phase 1: mint the token. Returns the launch id. */
  async createToken({ token, ...signer }: MaybeSigner & { token: TokenParams }): Promise<bigint> {
    const sendParams = this.getRequiredSendParams(signer);
    const { return: launchId } = await this.client.send.createToken({
      ...sendParams,
      args: {
        payment: this.algorand.createTransaction.payment({
          sender: sendParams.sender,
          signer: sendParams.signer,
          receiver: this.client.appAddress,
          amount: microAlgo(CREATE_TOKEN_PAYMENT),
        }),
        t: token,
      },
    });
    if (launchId === undefined) throw new Error('createToken returned no launch id');
    return launchId;
  }

  /**
   * Phase 2 (the token's creator): create and seed the launch pool. The payment covers the fee, the bounty,
   * the pool and any dev buy; the excess is refunded. `maxLaunchFee`/`maxBounty` default to the current fees.
   */
  async launch({
    launchId,
    params,
    maxLaunchFee,
    maxBounty,
    payment,
    ...signer
  }: MaybeSigner & { launchId: bigint; params: LaunchParams; maxLaunchFee?: bigint; maxBounty?: bigint; payment?: bigint }): Promise<LaunchResult> {
    const sendParams = this.getRequiredSendParams(signer);
    const fees = await this.fees();
    const amount = payment ?? fees.launchFee + fees.bounty + LAUNCH_POOL_ESTIMATE + params.devBuy + params.gatedFunding;
    const carriers = LAUNCH_CARRIERS + (params.devBuy > 0n ? DEV_BUY_CARRIERS : 0);

    let group = this.client.newGroup() as LaunchManagerComposer<unknown[]>;
    for (let i = 0; i < carriers; i++) {
      group = group.opUp({ ...sendParams, args: [], note: `launch carrier ${launchId}/${i}` }) as LaunchManagerComposer<unknown[]>;
    }
    const result = await group
      .launch({
        ...sendParams,
        args: {
          payment: this.algorand.createTransaction.payment({
            sender: sendParams.sender,
            signer: sendParams.signer,
            receiver: this.client.appAddress,
            amount: microAlgo(amount),
          }),
          launchId,
          p: params,
          maxLaunchFee: maxLaunchFee ?? fees.launchFee,
          maxBounty: maxBounty ?? fees.bounty,
        },
      })
      .send(sendParams);
    return result.returns[carriers] as unknown as LaunchResult;
  }

  /** Graduate a launch whose pool reached its threshold; the caller earns the bounty */
  async graduate({ launchId, ...signer }: MaybeSigner & { launchId: bigint }): Promise<void> {
    await this.client.send.graduate({ ...this.getRequiredSendParams(signer), args: { launchId } });
  }
}
