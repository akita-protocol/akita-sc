/**
 * Principal resolution, wallet track (docs/principal-resolution/PHASE-0-SPEC.md §6.1, §6.10, Phase 3):
 * - the SDK no longer writes the EscrowFactory reverse registry unless the caller opts in;
 * - the wallet and factory ABIs the SDK relies on are unchanged (Q1-A2 needs no ABI change, register stays until Phase 4);
 * - WalletSDK exposes the window hint and predicts the window principal / resources without the registry.
 */
import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { Address, generateAccount, getApplicationAddress } from 'algosdk'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { APP_SPEC as WalletAppSpec } from '../generated/AbstractedAccountClient'
import { APP_SPEC as WalletFactoryAppSpec } from '../generated/AbstractedAccountFactoryClient'
import { APP_SPEC as WelcomeAppSpec } from '../generated/WelcomePluginClient'
import { appAddress, ZERO_ADDRESS } from '../principal'
import { newWallet, WalletFactorySDK } from './factory'
import { REGISTRY_WRITES_STOPPED, registryWritesStopped, shouldWriteRegistry } from '../networks'
import { setCurrentNetwork } from '../config'
import { WalletSDK } from './index'

const signatures = (spec: { methods: { name: string; args: { type: string }[]; returns: { type: string } }[] }) =>
  spec.methods.map((m) => `${m.name}(${m.args.map((a) => a.type).join(',')})${m.returns.type}`)

const OWNER = generateAccount().addr.toString()
const WALLET_ID = 4_321n
const FACTORY_ID = 1_111n
const PLUGIN_ID = 9_999n
const ESCROW_ID = 5_555n

function walletSdk(): WalletSDK {
  vi.stubEnv('ALGORAND_NETWORK', 'localnet')
  vi.stubEnv('WALLET_MBR_APP_ID', '1')
  return new WalletSDK({
    algorand: AlgorandClient.defaultLocalNet(),
    factoryParams: { appId: WALLET_ID, defaultSender: OWNER },
  })
}

/** Minimal algod stub for `algodPrincipalReader`: one app (the wallet) plus account auth addresses. */
function stubAlgod(wallet: WalletSDK, { creator, controlled, referrer, auth = {} }: {
  creator: string
  controlled: string
  referrer: string
  auth?: Record<string, string>
}) {
  const enc = new TextEncoder()
  const globalState = [
    { key: enc.encode('controlled_address'), value: { type: 1, bytes: Address.fromString(controlled).publicKey, uint: 0 } },
    { key: enc.encode('referrer'), value: { type: 1, bytes: Address.fromString(referrer).publicKey, uint: 0 } },
    { key: enc.encode('spending_address'), value: { type: 1, bytes: Address.zeroAddress().publicKey, uint: 0 } },
  ]
  const algod = wallet.client.algorand.client.algod as unknown as Record<string, unknown>
  algod.getApplicationByID = (id: bigint | number) => ({
    do: async () => {
      if (BigInt(id) !== WALLET_ID) throw Object.assign(new Error('application does not exist'), { status: 404 })
      return { params: { creator: Address.fromString(creator), globalState } }
    },
  })
  algod.accountInformation = (address: string) => ({
    exclude: () => ({ do: async () => ({ authAddr: auth[address.toString()] ? Address.fromString(auth[address.toString()]) : undefined }) }),
  })
}

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllEnvs()
})

describe('Phase 3: SDK registry writes stop (spec §6.10)', () => {
  test('newWallet does not register the wallet by default on LocalNet (Phase 3 code deployed)', async () => {
    const register = vi.fn().mockResolvedValue(undefined)
    vi.spyOn(WalletFactorySDK.prototype, 'new').mockResolvedValue({ register } as unknown as WalletSDK)
    vi.stubEnv('ALGORAND_NETWORK', 'localnet')
    setCurrentNetwork('localnet')

    await newWallet({
      algorand: AlgorandClient.defaultLocalNet(),
      factoryParams: { appId: FACTORY_ID, defaultSender: OWNER },
      nickname: 'no-registry',
    })

    expect(register).not.toHaveBeenCalled()
  })

  test('newWallet registers only when the caller opts into legacy registry semantics', async () => {
    const register = vi.fn().mockResolvedValue(undefined)
    vi.spyOn(WalletFactorySDK.prototype, 'new').mockResolvedValue({ register } as unknown as WalletSDK)
    vi.stubEnv('ALGORAND_NETWORK', 'localnet')

    await newWallet({
      algorand: AlgorandClient.defaultLocalNet(),
      factoryParams: { appId: FACTORY_ID, defaultSender: OWNER },
      nickname: 'legacy',
      register: true,
    })

    expect(register).toHaveBeenCalledTimes(1)
    expect(register).toHaveBeenCalledWith({ escrow: '' })
  })

  // Review fix (rollout order §7.1): registry writes stop per network, only once Phase 3 has executed there.
  test('registry writes continue on TestNet/MainNet until the Phase 3 proposal executes', () => {
    expect(REGISTRY_WRITES_STOPPED).toEqual({ localnet: true, testnet: false, mainnet: false })
    expect(registryWritesStopped('localnet')).toBe(true)
    expect(registryWritesStopped('testnet')).toBe(false)
    expect(registryWritesStopped('mainnet')).toBe(false)
  })

  test('shouldWriteRegistry: an explicit flag wins, otherwise the network switch decides', () => {
    expect(shouldWriteRegistry('localnet')).toBe(false)
    expect(shouldWriteRegistry('testnet')).toBe(true)
    expect(shouldWriteRegistry('mainnet')).toBe(true)
    for (const network of ['localnet', 'testnet', 'mainnet'] as const) {
      expect(shouldWriteRegistry(network, true)).toBe(true)
      expect(shouldWriteRegistry(network, false)).toBe(false)
    }
  })

  test('the network switch is honoured both ways (stopped and not stopped)', () => {
    const saved = { ...REGISTRY_WRITES_STOPPED }
    try {
      REGISTRY_WRITES_STOPPED.mainnet = true
      expect(shouldWriteRegistry('mainnet')).toBe(false)
      expect(shouldWriteRegistry('mainnet', true)).toBe(true)
      REGISTRY_WRITES_STOPPED.localnet = false
      expect(shouldWriteRegistry('localnet')).toBe(true)
      expect(shouldWriteRegistry('localnet', false)).toBe(false)
    } finally {
      Object.assign(REGISTRY_WRITES_STOPPED, saved)
    }
  })

  for (const network of ['mainnet', 'testnet'] as const) {
    test(`newWallet still registers by default on ${network} before Phase 3 executes`, async () => {
      const register = vi.fn().mockResolvedValue(undefined)
      vi.spyOn(WalletFactorySDK.prototype, 'new').mockResolvedValue({ register } as unknown as WalletSDK)
      // The SDK pins the first resolved network module-wide (resolveAppIdWithClient), so set it explicitly.
      setCurrentNetwork(network)

      try {
        await newWallet({
          algorand: AlgorandClient.defaultLocalNet(),
          factoryParams: { appId: FACTORY_ID, defaultSender: OWNER },
          nickname: 'pre-phase-3',
        })
      } finally {
        setCurrentNetwork('localnet')
      }

      expect(register).toHaveBeenCalledTimes(1)
      expect(register).toHaveBeenCalledWith({ escrow: '' })
    })

    test(`newWallet({ register: false }) skips the registry on ${network}`, async () => {
      const register = vi.fn().mockResolvedValue(undefined)
      vi.spyOn(WalletFactorySDK.prototype, 'new').mockResolvedValue({ register } as unknown as WalletSDK)
      // The SDK pins the first resolved network module-wide (resolveAppIdWithClient), so set it explicitly.
      setCurrentNetwork(network)

      try {
        await newWallet({
          algorand: AlgorandClient.defaultLocalNet(),
          factoryParams: { appId: FACTORY_ID, defaultSender: OWNER },
          nickname: 'forced-off',
          register: false,
        })
      } finally {
        setCurrentNetwork('localnet')
      }

      expect(register).not.toHaveBeenCalled()
    })
  }

  test('the legacy register entry points stay in the wallet ABI until Phase 4', () => {
    expect(signatures(WalletAppSpec)).toContain('register(string)void')
  })
})

describe('Q1-A2 keeps the factory and welcome ABIs (spec §6.1, §6.11)', () => {
  test('newAccount and cost keep their selectors (no referral cost selector)', () => {
    const sigs = signatures(WalletFactoryAppSpec)
    expect(sigs).toContain(
      'newAccount(pay,address,address,string,address,byte[32],string,bool,uint64,uint64[],(uint64,address,string,bool,uint8,uint64,uint64,(byte[4],uint64)[],bool,bool,bool,bool,bool)[])uint64',
    )
    expect(sigs).toContain('cost()uint64')
    expect(sigs.some((s) => s.startsWith('cost(address'))).toBe(false)
    expect(WalletFactoryAppSpec.methods.find((m) => m.name === 'cost')?.readonly).toBe(true)
  })

  test('WelcomePlugin methods keep their ABI', () => {
    const sigs = signatures(WelcomeAppSpec)
    expect(sigs).toContain('sponsor(uint64,bool,address,string,byte[32],bool,uint64)uint64')
    expect(sigs).toContain('sendToAnyone(uint64,bool,address,string,byte[32],bool,uint64,uint64,uint64)uint64')
  })
})

describe('WalletSDK principal helpers (spec §3.6, §3.8 rule 6)', () => {
  test('windowHint is the wallet app id', () => {
    expect(walletSdk().windowHint).toBe(WALLET_ID)
  })

  test('default window: principal is the wallet address, only P(W) is needed', async () => {
    const wallet = walletSdk()
    const walletAddress = getApplicationAddress(WALLET_ID).toString()
    const referrer = generateAccount().addr.toString()
    stubAlgod(wallet, { creator: appAddress(FACTORY_ID), controlled: walletAddress, referrer })
    vi.spyOn(wallet.client.state.global, 'controlledAddress').mockResolvedValue(walletAddress)
    wallet.plugins.set({ plugin: PLUGIN_ID, caller: ZERO_ADDRESS, escrow: '' }, { escrow: 0n } as never)

    const p = await wallet.predictPrincipal({ plugin: PLUGIN_ID, caller: ZERO_ADDRESS, walletFactory: FACTORY_ID })
    expect(p).toMatchObject({ wallet: WALLET_ID, principal: walletAddress, spender: walletAddress, referrer, viaPlugin: true })

    const refs = await wallet.principalResources({ spender: walletAddress })
    expect(refs).toEqual([{ appIndex: WALLET_ID }])
  })

  test('defaultToEscrow window: the spender is the grant escrow and A(W.address) is seeded', async () => {
    const wallet = walletSdk()
    const walletAddress = getApplicationAddress(WALLET_ID).toString()
    const escrowAddress = getApplicationAddress(ESCROW_ID).toString()
    stubAlgod(wallet, {
      creator: appAddress(FACTORY_ID),
      controlled: walletAddress,
      referrer: ZERO_ADDRESS,
      auth: { [escrowAddress]: walletAddress },
    })
    vi.spyOn(wallet.client.state.global, 'controlledAddress').mockResolvedValue(walletAddress)
    wallet.plugins.set({ plugin: PLUGIN_ID, caller: ZERO_ADDRESS, escrow: '' }, { escrow: ESCROW_ID } as never)

    const p = await wallet.predictPrincipal({ plugin: PLUGIN_ID, caller: ZERO_ADDRESS, walletFactory: FACTORY_ID })
    // the escrow window resolves to the wallet's controlled address while W.address is not rekeyed
    expect(p).toMatchObject({ principal: walletAddress, spender: escrowAddress, origin: walletAddress })

    const refs = await wallet.principalResources({ spender: escrowAddress })
    expect(refs.map((r) => (r.address ? r.address.toString() : r.appIndex))).toEqual([WALLET_ID, walletAddress])
  })

  test('a wallet from another factory is not genuine for the pinned factory (prediction throws errHnwl)', async () => {
    const wallet = walletSdk()
    const walletAddress = getApplicationAddress(WALLET_ID).toString()
    stubAlgod(wallet, { creator: appAddress(FACTORY_ID + 1n), controlled: walletAddress, referrer: ZERO_ADDRESS })
    vi.spyOn(wallet.client.state.global, 'controlledAddress').mockResolvedValue(walletAddress)
    wallet.plugins.set({ plugin: PLUGIN_ID, caller: ZERO_ADDRESS, escrow: '' }, { escrow: 0n } as never)

    await expect(wallet.predictPrincipal({ plugin: PLUGIN_ID, caller: ZERO_ADDRESS, walletFactory: FACTORY_ID }))
      .rejects.toMatchObject({ code: 'errHnwl' })
  })
})
