#!/usr/bin/env node

/**
 * Setup Subscription Services Script
 *
 * Creates the Akita subscription tiers (Plus, Pro, Ultra) under the main DAO
 * wallet's controlled address (so the subscribe button renders on Akita's
 * social profile) while routing all subscription revenue to the
 * rev_subscriptions escrow via the service `payoutAddress` field.
 *
 * Steps:
 *   1. Install subscriptions plugin on the DAO wallet (global, no escrow)
 *   2. Upload banner images to IPFS and get CIDs
 *   3. Opt the Subscriptions contract into USDC
 *   4. Create the 3 subscription services (USDC denominated) with
 *      `payoutAddress = rev_subscriptions escrow spending address`
 *   5. Install social plugin on DAO wallet
 *   6. Set subscription state modifiers on social impact contract
 *
 * Usage:
 *   npm run setup:subscription-services -- -n localnet
 *   npm run setup:subscription-services -- -n testnet -m "your mnemonic"
 *   npm run setup:subscription-services -- -n mainnet -m "your mnemonic"
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { parseBaseArgs, createAlgorandClient, runScript } from './script-base'
import { proposeAndExecute, getAppFundingNeeded } from './utils'
import { sendPrepared, setCurrentNetwork } from 'akita-sdk'
import { AkitaDaoSDK, ProposalActionEnum } from 'akita-sdk/dao'
import { CallerType, SubscriptionsPluginSDK, SocialPluginSDK } from 'akita-sdk/wallet'
import { SubscriptionsSDK, HighlightMessage } from 'akita-sdk/subscriptions'
import {
  DEFAULT_CREATION,
  DEFAULT_UPGRADE_APP_PROPOSAL_POWER,
  DEFAULT_UPGRADE_APP_VOTING_DURATION,
  DEFAULT_UPGRADE_APP_PARTICIPATION,
  DEFAULT_UPGRADE_APP_APPROVAL,
} from '../smart_contracts/utils/defaults'
import { createHash } from 'crypto'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import algosdk, { makeBasicAccountTransactionSigner } from 'algosdk'
import type { AkitaUniverse } from '../tests/fixtures/dao'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECONDS_PER_MONTH = 30n * 86400n // 30 days
const USDC_DECIMALS = 6

// Must match `MAX_DESCRIPTION_LENGTH` in smart_contracts/subscriptions/constants.ts
const MAX_DESCRIPTION_LENGTH = 3151n
// Per-byte box MBR on AVM
const BOX_BYTE_COST = 400n
// Fixed per-box MBR overhead (key storage + bookkeeping) on AVM
const BOX_FIXED_COST = 2_500n
// Base account min balance (pre-opt-ins, pre-boxes)
const BASE_ACCOUNT_MIN = 100_000n
// Note: `ServicesMBR = 62_500` (smart_contracts/subscriptions/constants.ts) is
// what `newServiceCost` pays toward the service box — it covers the empty-
// description size. Any box-size growth from `setServiceDescription` must be
// covered by the Subscriptions contract's own balance, which is what we pre-
// fund below.
//
// Safety margin so fee / rounding variance doesn't drain either account to
// min-balance failure mid-flow.
const FUNDING_SAFETY_MARGIN = 200_000n // 0.2 ALGO

/** Encode a dollar amount to USDC base units (6 decimals) */
const usdcAmount = (dollars: number) => BigInt(dollars * 10 ** USDC_DECIMALS)

// Banner image paths (relative to akita-rn)
const BANNER_DIR = resolve(__dirname, '../../../../akita-rn/assets/badges')

const SERVICES = [
  {
    title: 'Plus',
    price: usdcAmount(20),
    interval: SECONDS_PER_MONTH,
    highlightMessage: HighlightMessage.None,
    highlightColor: '#3EE1A1',
    modifier: 3n,
    agentAccessTier: 'Core agent access',
    banner: resolve(BANNER_DIR, 'akita_plus_banner.png'),
    description: [
      'Boost your social impact and unlock gated experiences across the Akita ecosystem.',
      '',
      '- Social impact boost',
      '- Core agent access',
      '- Exclusive Plus badge',
      '- Gated staking pools, auctions, and raffles',
      '- Customizable gallery',
    ].join('\n'),
  },
  {
    title: 'Pro',
    price: usdcAmount(60),
    interval: SECONDS_PER_MONTH,
    highlightMessage: HighlightMessage.Popular,
    highlightColor: '#4BC9FF',
    modifier: 2n,
    agentAccessTier: 'Expanded agent access',
    banner: resolve(BANNER_DIR, 'akita_pro_banner.png'),
    description: [
      'Enhanced social impact with everything in Plus, Pro-exclusive events, and a custom app theme.',
      '',
      '- Enhanced social impact boost',
      '- Expanded agent access',
      '- Exclusive Pro badge',
      '- Everything in Plus',
      '- Pro-exclusive staking pools, auctions, and raffles',
      '- Custom app theme',
    ].join('\n'),
  },
  {
    title: 'Ultra',
    price: usdcAmount(100),
    interval: SECONDS_PER_MONTH,
    highlightMessage: HighlightMessage.None,
    highlightColor: '#D16BA5',
    modifier: 1n,
    agentAccessTier: 'Priority agent access',
    banner: resolve(BANNER_DIR, 'akita_ultra_banner.png'),
    description: [
      'Maximum social impact with everything in Pro, Ultra-exclusive events, and early access to new features.',
      '',
      '- Maximum social impact boost',
      '- Priority agent access',
      '- Exclusive Ultra badge',
      '- Everything in Pro',
      '- Ultra-exclusive staking pools, auctions, and raffles',
      '- Early access to new features',
    ].join('\n'),
  },
] as const

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Convert a hex color string (#RRGGBB) to a 3-byte Uint8Array */
function hexColorToBytes(hex: string): Uint8Array {
  const h = hex.replace('#', '')
  return new Uint8Array([
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ])
}

/**
 * Decode a base32-lower (RFC 4648) CID string to raw bytes.
 * The string must start with 'b' (multibase prefix for base32lower).
 */
function decodeCidString(cidString: string): Uint8Array {
  const ALPHABET = 'abcdefghijklmnopqrstuvwxyz234567'
  const lookup: Record<string, number> = {}
  for (let i = 0; i < ALPHABET.length; i++) lookup[ALPHABET[i]] = i

  const chars = cidString.slice(1) // strip 'b' multibase prefix
  let bits = 0
  let value = 0
  const bytes: number[] = []
  for (const c of chars) {
    value = (value << 5) | lookup[c]
    bits += 5
    while (bits >= 8) {
      bits -= 8
      bytes.push((value >> bits) & 0xff)
      value &= (1 << bits) - 1
    }
  }
  return new Uint8Array(bytes)
}

/**
 * Calculate a CIDv1 (raw codec, SHA-256) from file data.
 * Returns 36 bytes: [version:1][codec:1][hash_fn:1][hash_len:1][digest:32]
 * Only valid for files small enough to be a single IPFS chunk (<256KB).
 */
function calculateCIDv1(data: Buffer): Uint8Array {
  const digest = createHash('sha256').update(data).digest()
  const cid = new Uint8Array(36)
  cid[0] = 0x01 // CID version 1
  cid[1] = 0x55 // raw codec
  cid[2] = 0x12 // SHA-256
  cid[3] = 0x20 // 32 bytes
  cid.set(digest, 4)
  return cid
}

/**
 * Upload a file to IPFS and return the CID bytes (36 bytes).
 *
 * Uploads directly to the local Kubo node (port 5001) with CIDv1 + raw-leaves.
 * Uses the CID returned by IPFS rather than calculating it locally, since
 * files larger than the IPFS chunk size (~256KB) produce a dag-pb CID that
 * differs from a simple raw SHA-256 hash.
 */
async function uploadBannerToIPFS(filePath: string, network: string): Promise<Uint8Array> {
  const data = readFileSync(filePath)
  const fileName = filePath.split('/').pop()
  console.log(`   Uploading ${fileName} to IPFS...`)

  // Upload to Kubo API directly — this ensures the content is actually stored
  // and we get back the real CID (which may differ from a local SHA-256 for large files).
  const ipfsApiBase = network === 'localnet'
    ? 'http://localhost:5001'
    : (process.env.IPFS_API_URL || 'http://localhost:5001')
  const ipfsApiUrl = `${ipfsApiBase}/api/v0/add?cid-version=1&raw-leaves=true&pin=true`

  try {
    const formData = new FormData()
    formData.append('file', new Blob([data]), fileName)

    const response = await fetch(ipfsApiUrl, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`IPFS add returned ${response.status}`)
    }

    const result = await response.json() as { Hash: string }
    const cidString = result.Hash
    console.log(`   → CID: ${cidString}`)

    // Decode the CID string to raw bytes for the contract
    const cidBytes = decodeCidString(cidString)
    if (cidBytes.length !== 36) {
      console.warn(`   CID decoded to ${cidBytes.length} bytes (expected 36), falling back to calculated CID`)
      return calculateCIDv1(data)
    }
    return cidBytes
  } catch (err) {
    console.warn(`   IPFS upload failed: ${err}, falling back to calculated CID`)
    return calculateCIDv1(data)
  }
}

// ---------------------------------------------------------------------------
// Exported setup function (used by deploy-universe and standalone CLI)
// ---------------------------------------------------------------------------

interface SetupSubscriptionServicesParams {
  algorand: import('@algorandfoundation/algokit-utils').AlgorandClient
  universe: AkitaUniverse
  sender: string
  signer: algosdk.TransactionSigner
  network: string
}

export async function setupSubscriptionServices({
  algorand,
  universe,
  sender,
  signer,
  network,
}: SetupSubscriptionServicesParams): Promise<void> {
  console.log('\n📦 Setting up subscription services...\n')

  const dao = universe.dao
  // Reset sendParams to ensure deployer is the sender (buildAkitaUniverse may change it)
  dao.setSendParams({ sender, signer })

  const daoWallet = await dao.getWallet()

  // Debug: check DAO app balance
  const daoInfo = await algorand.account.getInformation(dao.client.appClient.appAddress.toString())
  console.log(`   DAO app balance: ${BigInt(daoInfo.balance.microAlgos) / 1_000_000n} ALGO (min: ${BigInt(daoInfo.minBalance.microAlgos) / 1_000_000n})`)

  // Resolve the rev_subscriptions escrow spending address — we set this as the
  // `payoutAddress` on every service so subscription revenue is redirected from
  // the service recipient (DAO wallet's controlled address) to the rev escrow.
  const revSubEscrowInfo = await daoWallet.getEscrow('rev_subscriptions')
  const revSubPayoutAddress = algosdk.getApplicationAddress(revSubEscrowInfo.id).toString()
  console.log(`   rev_subscriptions payout address: ${revSubPayoutAddress}`)

  // ─── Step 1: Install subscriptions plugin on the DAO wallet (global) ────
  // Installing with `escrow: ''` means `arc58_rekeyToPlugin` sets
  // `spendingAddress = controlledAddress` (the DAO wallet's own app address).
  // As a result `newService` is called by the DAO wallet's controlled address,
  // so services are created under that address and the RN app's subscribe
  // button — which queries `getServiceList({ address: daoWalletAddress })` —
  // will render on Akita's social profile.
  console.log('   [1/6] Installing subscriptions plugin on DAO wallet (global)...')

  const mbr = await daoWallet.getMbr({ escrow: '', methodCount: 0n, plugin: '', groups: 0n })
  const walletFunding = await getAppFundingNeeded(
    algorand, daoWallet.client.appAddress.toString(), mbr.plugins
  )
  if (walletFunding > 0n) {
    await daoWallet.client.appClient.fundAppAccount({ amount: microAlgo(walletFunding) })
  }

  const subscriptionsPluginSdk = universe.subscriptionsPlugin

  // No `methods` restriction — `useExecutionKey: true` already restricts plugin
  // usage via proposal approval, so the additional per-method allowlist is
  // redundant.
  await proposeAndExecute(algorand, dao, [
    {
      type: ProposalActionEnum.AddPlugin,
      client: subscriptionsPluginSdk,
      callerType: CallerType.Global,
      escrow: '',
      sourceLink: 'https://github.com/kylebee/akita-sc',
      useExecutionKey: true,
      fee: DEFAULT_CREATION,
      power: DEFAULT_UPGRADE_APP_PROPOSAL_POWER,
      duration: DEFAULT_UPGRADE_APP_VOTING_DURATION,
      participation: DEFAULT_UPGRADE_APP_PARTICIPATION,
      approval: DEFAULT_UPGRADE_APP_APPROVAL,
    },
  ])

  // ─── Step 2: Upload banners to IPFS ────────────────────────────────────
  console.log('   [2/6] Uploading banner images to IPFS...')
  const bannerCIDs: Uint8Array[] = []
  for (const service of SERVICES) {
    const cid = await uploadBannerToIPFS(service.banner, network)
    bannerCIDs.push(cid)
  }

  // ─── Step 3: Opt the Subscriptions contract into USDC ──────────────────
  console.log('   [3/6] Opting Subscriptions contract into USDC...')

  // Resolve USDC asset ID — from universe if available, else from env
  const usdcAssetId = universe.usdcAssetId && universe.usdcAssetId > 0n
    ? universe.usdcAssetId
    : BigInt(process.env.USDC_ASSET_ID || '0')
  if (!usdcAssetId || usdcAssetId === 0n) {
    throw new Error('USDC asset ID not configured. Set USDC_ASSET_ID environment variable.')
  }

  // Fund the subscriptions plugin app account.
  //
  // The plugin allocates a single `description` box (key 'd') on its own app
  // account via `initDescription(size)`, resizing it for each service. At max
  // description length (MAX_DESCRIPTION_LENGTH bytes) the box MBR is:
  //   BOX_FIXED_COST + BOX_BYTE_COST × (1 + MAX_DESCRIPTION_LENGTH)
  // Plus the base account min balance, plus a safety margin for fees.
  const pluginDescriptionBoxMbr =
    BOX_FIXED_COST + BOX_BYTE_COST * (1n + MAX_DESCRIPTION_LENGTH)
  const pluginFundingMicroAlgos =
    BASE_ACCOUNT_MIN + pluginDescriptionBoxMbr + FUNDING_SAFETY_MARGIN
  console.log(`         Funding subscriptions plugin with ${Number(pluginFundingMicroAlgos) / 1e6} ALGO (covers max ${MAX_DESCRIPTION_LENGTH} byte description box)`)
  await algorand.send.payment({
    sender,
    signer,
    receiver: subscriptionsPluginSdk.client.appAddress,
    amount: microAlgo(pluginFundingMicroAlgos),
  })

  // Fund the DAO wallet's controlled app address (= service creator, since the
  // plugin is installed globally). This account pays service-creation MBR
  // (`newServiceCost`) and the subscribe-path MBR on each `newService` call.
  await algorand.send.payment({
    sender,
    signer,
    receiver: daoWallet.client.appAddress,
    amount: (303).algos(),
  })

  // Fund the Subscriptions contract app account.
  //
  // The Subscriptions contract stores each service (including its description)
  // in a `services` box. `newServiceCost` only pays the *empty*-description
  // MBR (`ServicesMBR = 62_500`); any growth from `setServiceDescription`
  // must be covered by the contract's own balance.
  //
  // We intentionally do NOT pre-fund the USDC opt-in MBR here — the payment
  // sent with `Subscriptions.optIn` below covers both the contract's own
  // opt-in and the downstream escrow + split-recipient opt-ins.
  //
  //   - Per-service shortfall at max description size:
  //       BOX_BYTE_COST × MAX_DESCRIPTION_LENGTH
  //   - Plus base account min
  //   - Plus a safety margin
  const subscriptionsSdk = universe.subscriptions
  const perServiceDescriptionShortfall =
    BOX_BYTE_COST * MAX_DESCRIPTION_LENGTH
  const subscriptionsFundingMicroAlgos =
    BASE_ACCOUNT_MIN +
    perServiceDescriptionShortfall * BigInt(SERVICES.length) +
    FUNDING_SAFETY_MARGIN
  console.log(`         Funding subscriptions contract with ${Number(subscriptionsFundingMicroAlgos) / 1e6} ALGO (covers ${SERVICES.length} services at max ${MAX_DESCRIPTION_LENGTH} byte description)`)
  await algorand.send.payment({
    sender,
    signer,
    receiver: subscriptionsSdk.client.appAddress,
    amount: microAlgo(subscriptionsFundingMicroAlgos),
  })

  // Opt the subscriptions contract AND the rev_subscriptions escrow (plus
  // each revenue-split recipient) into USDC.
  //
  // `Subscriptions.optIn` overrides the base fee-generator `optIn` to actually
  // perform the downstream opt-ins — not just pre-fund the MBR for them. It:
  //   1. opts the contract in directly (1 inner assetTransfer)
  //   2. rekeys the DAO wallet to the revenue-manager plugin, calls
  //      `RevenueManager.optIn` to opt the dedicated escrow in, then rekeys
  //      back (4 composed inners + their nested inners)
  //
  // Doing this up front is required because `newService` /
  // `createAsaSubscription` run inside the subscriptions plugin rekey, and
  // nesting a second plugin rekey (to the revenue manager) is not allowed.
  //
  // Must be called directly by an EOA — NOT via `SubscriptionsPlugin.optIn`
  // — for the same nesting reason.
  //
  // `optInCost` = `assetOptInMinBalance * (1 + splitOptInCount(...))`, which
  // covers: the contract's opt-in + the escrow's opt-in + MBR pre-funding for
  // each split recipient (their actual opt-ins happen lazily inside
  // `processEscrowAllocation`).
  console.log(`         Opting subscriptions contract + rev_subscriptions escrow into USDC (${usdcAssetId})...`)
  // SDK's `optIn` builds the payment internally, adds opUp calls for extra
  // reference slots (needed because the on-chain `optIn` fans out many inner
  // app calls for the escrow + split-recipient opt-ins), and sends with
  // `populateAppCallResources` + `coverAppCallInnerTransactionFees`.
  await subscriptionsSdk.optIn({
    sender,
    signer,
    asset: usdcAssetId,
  })

  // ─── Step 4: Create subscription services ──────────────────────────────
  console.log('   [4/6] Creating subscription services...')

  const serviceIds: bigint[] = []
  const daoWalletAddress = daoWallet.client.appAddress.toString()

  for (let i = 0; i < SERVICES.length; i++) {
    const service = SERVICES[i]
    console.log(`         ${service.title} ($${Number(service.price) / 10 ** USDC_DECIMALS} USDC/month)...`)

    const execution = await daoWallet.build.usePlugin({
      sender,
      signer,
      lease: `new_service_${service.title.toLowerCase()}_${Date.now() % 1_000_000}`,
      windowSize: 2000n,
      callerType: CallerType.Global,
      // No escrow → plugin runs against the DAO wallet's controlled address
      calls: subscriptionsPluginSdk.newServiceWithDescription({
        sender,
        signer,
        description: service.description,
        interval: service.interval,
        asset: usdcAssetId,
        amount: service.price,
        passes: 0n,
        gate: 0n,
        // Route subscription revenue to the rev_subscriptions escrow.
        // The subscribe / triggerPayment paths pay to this address instead
        // of the service recipient when it's non-zero.
        payoutAddress: revSubPayoutAddress,
        title: service.title,
        bannerImage: bannerCIDs[i],
        highlightMessage: service.highlightMessage,
        highlightColor: hexColorToBytes(service.highlightColor),
      }),
    })

    await proposeAndExecute(algorand, dao, [
      {
        type: ProposalActionEnum.ExecutePlugin,
        plugin: subscriptionsPluginSdk.appId,
        caller: sender,
        escrow: '',
        executionKey: execution.lease,
        groups: execution.ids,
        firstValid: execution.firstValid,
        lastValid: execution.lastValid,
      },
    ])

    for (const window of execution.windows) {
      await sendPrepared(window, algorand.client.algod)
    }

    // Services are now created under the DAO wallet's controlled address.
    const serviceCount = await subscriptionsSdk.getServiceList({ address: daoWalletAddress })
    serviceIds.push(serviceCount)
  }

  // ─── Step 5: Install social plugin on DAO wallet ───────────────────────
  console.log('   [5/6] Installing social plugin on DAO wallet...')

  const socialPluginSdk = universe.socialPlugin

  const socialMbr = await daoWallet.getMbr({ escrow: '', methodCount: 1n, plugin: '', groups: 1n })
  const socialFunding = await getAppFundingNeeded(
    algorand, daoWallet.client.appAddress.toString(), socialMbr.plugins + socialMbr.executions
  )
  if (socialFunding > 0n) {
    await daoWallet.client.appClient.fundAppAccount({ amount: microAlgo(socialFunding) })
  }

  await proposeAndExecute(algorand, dao, [
    {
      type: ProposalActionEnum.AddPlugin,
      client: socialPluginSdk,
      callerType: CallerType.Global,
      escrow: '',
      sourceLink: 'https://github.com/kylebee/akita-sc',
      useExecutionKey: true,
      fee: DEFAULT_CREATION,
      power: DEFAULT_UPGRADE_APP_PROPOSAL_POWER,
      duration: DEFAULT_UPGRADE_APP_VOTING_DURATION,
      participation: DEFAULT_UPGRADE_APP_PARTICIPATION,
      approval: DEFAULT_UPGRADE_APP_APPROVAL,
    },
  ])

  // ─── Step 6: Set subscription state modifiers ──────────────────────────
  console.log('   [6/6] Setting subscription state modifiers...')

  for (let i = 0; i < SERVICES.length; i++) {
    const service = SERVICES[i]
    const serviceId = serviceIds[i]

    const execution = await daoWallet.build.usePlugin({
      sender,
      signer,
      lease: `set_modifier_${service.title.toLowerCase()}_${Date.now() % 1_000_000}`,
      windowSize: 2000n,
      callerType: CallerType.Global,
      calls: [
        socialPluginSdk.updateSubscriptionStateModifier({
          sender,
          signer,
          subscriptionIndex: serviceId,
          newModifier: service.modifier,
        }),
      ],
    })

    await proposeAndExecute(algorand, dao, [
      {
        type: ProposalActionEnum.ExecutePlugin,
        plugin: socialPluginSdk.appId,
        caller: sender,
        escrow: '',
        executionKey: execution.lease,
        groups: execution.ids,
        firstValid: execution.firstValid,
        lastValid: execution.lastValid,
      },
    ])

    for (const window of execution.windows) {
      await sendPrepared(window, algorand.client.algod)
    }
  }

  console.log(`\n   ✅ Subscription services created:`)
  for (let i = 0; i < SERVICES.length; i++) {
    console.log(`      ${SERVICES[i].title} — $${Number(SERVICES[i].price) / 10 ** USDC_DECIMALS}/month (${SERVICES[i].agentAccessTier}, serviceId=${serviceIds[i]}, modifier=${SERVICES[i].modifier})`)
  }
  console.log()
}

// ---------------------------------------------------------------------------
// CLI entry point (for standalone use on testnet/mainnet)
// ---------------------------------------------------------------------------

// Only run as CLI when executed directly (not imported by deploy-universe)
if (require.main === module) {
  runScript(async () => {
    const options = parseBaseArgs('setup-subscription-services.ts')
    console.log(`\nSetting up Akita subscription services on ${options.network}...\n`)

    if (options.dryRun) {
      console.log('DRY RUN - Steps that would be performed:\n')
      console.log('   1. Install subscriptions plugin on DAO wallet (global)')
      console.log('   2. Upload banner images to IPFS')
      console.log('   3. Opt Subscriptions contract into USDC')
      console.log('   4. Create 3 subscription services (Plus $20, Pro $60, Ultra $100) in USDC')
      console.log('      with agent access tiers: Core, Expanded, Priority')
      console.log('      with payoutAddress = rev_subscriptions escrow')
      console.log('   5. Install social plugin on DAO wallet')
      console.log('   6. Set subscription state modifiers (3, 2, 1)\n')
      return
    }

    // Manual context setup (setupContext requires UpdateAkitaDAOPlugin which we don't need)
    const algorand = createAlgorandClient(options.network, options.algodToken)
    let sender: string
    let signer: algosdk.TransactionSigner

    if (options.network === 'localnet') {
      const fixture = algorandFixture()
      await fixture.newScope()
      const account = fixture.context.testAccount as algosdk.Account
      sender = account.addr.toString()
      signer = (account as any).signer

      const dispenser = await algorand.account.dispenserFromEnvironment()
      await algorand.account.ensureFunded(sender, dispenser, (500).algos())
    } else if (options.mnemonic) {
      const account = algosdk.mnemonicToSecretKey(options.mnemonic)
      sender = account.addr.toString()
      signer = makeBasicAccountTransactionSigner(account)
    } else {
      throw new Error('Mnemonic is required for non-localnet networks')
    }

    setCurrentNetwork(options.network)

    const dao = new AkitaDaoSDK({
      algorand,
      factoryParams: { defaultSender: sender, defaultSigner: signer },
    })
    console.log(`DAO: ${dao.appId}`)

    // Create SDK instances that resolve app IDs from env vars / network config
    const subscriptionsPluginSdk = new SubscriptionsPluginSDK({
      algorand,
      factoryParams: { defaultSender: sender, defaultSigner: signer },
    })
    const socialPluginSdk = new SocialPluginSDK({
      algorand,
      factoryParams: { defaultSender: sender, defaultSigner: signer },
    })
    const subscriptionsSdk = new SubscriptionsSDK({
      algorand,
      factoryParams: { defaultSender: sender, defaultSigner: signer },
    })

    // Build a minimal universe-like object for the shared function
    const universe = {
      dao,
      subscriptions: subscriptionsSdk,
      subscriptionsPlugin: subscriptionsPluginSdk,
      socialPlugin: socialPluginSdk,
    } as unknown as AkitaUniverse

    await setupSubscriptionServices({ algorand, universe, sender, signer, network: options.network })
  })
}
