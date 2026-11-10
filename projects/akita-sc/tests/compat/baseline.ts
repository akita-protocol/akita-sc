/**
 * Principal-resolution compatibility suite: the BASELINE manifest (PHASE-0-SPEC.md §7.1 "Compatibility
 * baseline = deployed bytecode, not the working tree", §7.2, §7.5 P2-CMP-01 / P2-REF-02).
 *
 * Every MainNet program the compatibility suite treats as "old" is listed here by app id. The programs
 * themselves are fetched read-only (`GET /v2/applications/{id}`, `GET /v2/applications/{id}/box`) by
 * `tests/compat/fetch-mainnet-programs.ts` into `tests/compat/fixtures/mainnet-programs.json`. Nothing in
 * this suite sends a transaction to MainNet or TestNet.
 *
 * Pure data: no algokit import, so the fetch script, the static test and the LocalNet suite share it.
 */

/** The MainNet universe the Phase 2 upgrade targets (akita-sdk/src/networks.ts MAINNET_APP_IDS). */
export const MAINNET_DAO = 3569556034n
export const MAINNET_WALLET_FACTORY = 3569556257n
export const MAINNET_ESCROW_FACTORY = 3569555755n

/** Plugin families whose targets change in Phase 2 (spec §6.11). */
export type Family = 'social' | 'subscriptions' | 'stakingPool' | 'auction' | 'raffle' | 'marketplace' | 'wallet' | 'gate' | 'dao'

export type Role =
  /** a Phase 2 singleton or factory (upgraded in place by Phase 2) */
  | 'target'
  /** a factory's boxed child program (`bc`): what every NEW child the deployed factory creates runs */
  | 'child'
  /** a live child instance (proves the `bc` box is what live children run) */
  | 'liveChild'
  /** a deployed plugin generation */
  | 'plugin'
  /** context only (called by old plugins or by the targets; not upgraded by Phase 2) */
  | 'context'

export type BaselineEntry = {
  /** stable key in the snapshot */
  key: string
  role: Role
  family: Family
  appId: bigint
  /** box name holding the program, for `child` entries (always `bc` on the MainNet factories) */
  box?: string
  /** the working-tree artifact this program is the old generation of (relative to smart_contracts/artifacts) */
  artifact: string
  /** generation label (akita-sdk/src/networks.ts MAINNET_PLUGIN_DEPLOYMENTS) */
  generation?: 'december-2025' | 'may-2026' | 'july-2026-v0.0.2' | 'july-2026-v0.0.3' | 'july-2026'
  /**
   * In scope: the program is bound (its pinned `akita_dao` / factory global) to the MainNet universe that
   * Phase 2 upgrades. December-2025 plugins are bound to the December DAO 3368388956 and its factories,
   * which Phase 2 does not touch; the static test proves this from the recorded globals.
   */
  inScope: boolean
  note?: string
}

const plugin = (
  family: Family,
  key: string,
  appId: bigint,
  artifact: string,
  generation: NonNullable<BaselineEntry['generation']>,
  note?: string,
): BaselineEntry => ({ key, role: 'plugin', family, appId, artifact, generation, inScope: generation !== 'december-2025', note })

export const BASELINE: readonly BaselineEntry[] = [
  // ── Phase 2 targets (singletons and factories) ─────────────────────────────────────────────────
  { key: 'AkitaSocial', role: 'target', family: 'social', appId: 3569557130n, artifact: 'social/AkitaSocial.arc56.json', inScope: true },
  { key: 'AkitaSocialGraph', role: 'target', family: 'social', appId: 3569557033n, artifact: 'social/AkitaSocialGraph.arc56.json', inScope: true },
  { key: 'Subscriptions', role: 'target', family: 'subscriptions', appId: 3569556497n, artifact: 'subscriptions/Subscriptions.arc56.json', inScope: true },
  { key: 'StakingPoolFactory', role: 'target', family: 'stakingPool', appId: 3569556570n, artifact: 'staking-pool/StakingPoolFactory.arc56.json', inScope: true },
  { key: 'AuctionFactory', role: 'target', family: 'auction', appId: 3569557408n, artifact: 'auction/AuctionFactory.arc56.json', inScope: true },
  { key: 'RaffleFactory', role: 'target', family: 'raffle', appId: 3569557743n, artifact: 'raffle/RaffleFactory.arc56.json', inScope: true },
  { key: 'Marketplace', role: 'target', family: 'marketplace', appId: 3569557584n, artifact: 'marketplace/Marketplace.arc56.json', inScope: true },
  { key: 'AbstractedAccountFactory', role: 'target', family: 'wallet', appId: MAINNET_WALLET_FACTORY, artifact: 'arc58/account/AbstractedAccountFactory.arc56.json', inScope: true },

  // ── Old children: the program each MainNet factory stages for the children it creates ─────────
  { key: 'StakingPool', role: 'child', family: 'stakingPool', appId: 3569556570n, box: 'bc', artifact: 'staking-pool/StakingPool.arc56.json', inScope: true },
  { key: 'Auction', role: 'child', family: 'auction', appId: 3569557408n, box: 'bc', artifact: 'auction/Auction.arc56.json', inScope: true },
  { key: 'Raffle', role: 'child', family: 'raffle', appId: 3569557743n, box: 'bc', artifact: 'raffle/Raffle.arc56.json', inScope: true },
  { key: 'Listing', role: 'child', family: 'marketplace', appId: 3569557584n, box: 'bc', artifact: 'marketplace/Listing.arc56.json', inScope: true },
  {
    key: 'AbstractedAccount', role: 'child', family: 'wallet', appId: MAINNET_WALLET_FACTORY, box: 'bc', artifact: 'arc58/account/AbstractedAccount.arc56.json', inScope: true,
    note: 'the wallet program every live MainNet wallet runs (new wallets and factory pushes); the principal helpers read its globals',
  },
  // live MainNet listings (marketplace track, 2026-10-04): they must run the `bc` Listing program
  { key: 'Listing.live.3643990817', role: 'liveChild', family: 'marketplace', appId: 3643990817n, artifact: 'marketplace/Listing.arc56.json', inScope: true },
  { key: 'Listing.live.3691743616', role: 'liveChild', family: 'marketplace', appId: 3691743616n, artifact: 'marketplace/Listing.arc56.json', inScope: true },
  // the DAO's own wallet, a live wallet (its program may lag the factory `bc` box)
  { key: 'AbstractedAccount.live.daoWallet', role: 'liveChild', family: 'wallet', appId: 3569559153n, artifact: 'arc58/account/AbstractedAccount.arc56.json', inScope: true },

  // ── Context: called by the old plugins / targets, not upgraded by Phase 2 ─────────────────────
  { key: 'GateV1', role: 'context', family: 'gate', appId: 3569558504n, artifact: 'gates/Gate.arc56.json', inScope: true, note: 'MainNet Gate v1; Gate v2 replaces it as AkitaAppList.gate in Phase 2' },
  { key: 'AkitaDAO', role: 'context', family: 'dao', appId: MAINNET_DAO, artifact: 'arc58/dao/AkitaDAO.arc56.json', inScope: true },
  { key: 'EscrowFactory', role: 'context', family: 'wallet', appId: MAINNET_ESCROW_FACTORY, artifact: 'escrow/EscrowFactory.arc56.json', inScope: true, note: 'immutable; the registry legacy shims read' },

  // ── Deployed plugin generations (akita-sdk/src/networks.ts MAINNET_PLUGIN_DEPLOYMENTS) ─────────
  plugin('social', 'SocialPlugin.december', 3368400007n, 'arc58/plugins/social/AkitaSocialPlugin.arc56.json', 'december-2025'),
  plugin('social', 'SocialPlugin.may', 3569562087n, 'arc58/plugins/social/AkitaSocialPlugin.arc56.json', 'may-2026'),
  plugin('social', 'SocialPlugin.v0.0.2', 3633295088n, 'arc58/plugins/social/AkitaSocialPlugin.arc56.json', 'july-2026-v0.0.2'),
  plugin('social', 'SocialPlugin.v0.0.3', 3643581007n, 'arc58/plugins/social/AkitaSocialPlugin.arc56.json', 'july-2026-v0.0.3'),
  plugin('subscriptions', 'SubscriptionsPlugin.december', 3368399152n, 'arc58/plugins/subscriptions/SubscriptionsPlugin.arc56.json', 'december-2025'),
  plugin('subscriptions', 'SubscriptionsPlugin.may', 3569561107n, 'arc58/plugins/subscriptions/SubscriptionsPlugin.arc56.json', 'may-2026'),
  plugin('stakingPool', 'StakingPoolPlugin.december', 3368400148n, 'arc58/plugins/staking-pool/StakingPoolPlugin.arc56.json', 'december-2025'),
  plugin('stakingPool', 'StakingPoolPlugin.may', 3569562283n, 'arc58/plugins/staking-pool/StakingPoolPlugin.arc56.json', 'may-2026'),
  plugin('stakingPool', 'StakingPoolPlugin.july', 3642438287n, 'arc58/plugins/staking-pool/StakingPoolPlugin.arc56.json', 'july-2026'),
  plugin('auction', 'AuctionPlugin.december', 3368399217n, 'arc58/plugins/auction/AuctionPlugin.arc56.json', 'december-2025'),
  plugin('auction', 'AuctionPlugin.may', 3569561141n, 'arc58/plugins/auction/AuctionPlugin.arc56.json', 'may-2026'),
  plugin('marketplace', 'MarketplacePlugin.december', 3368399474n, 'arc58/plugins/marketplace/MarketplacePlugin.arc56.json', 'december-2025'),
  plugin('marketplace', 'MarketplacePlugin.may', 3569561455n, 'arc58/plugins/marketplace/MarketplacePlugin.arc56.json', 'may-2026'),
  plugin('raffle', 'RafflePlugin.december', 3368399868n, 'arc58/plugins/raffle/RafflePlugin.arc56.json', 'december-2025'),
  plugin('raffle', 'RafflePlugin.may', 3569561863n, 'arc58/plugins/raffle/RafflePlugin.arc56.json', 'may-2026'),
] as const

/**
 * For each family: the working-tree programs an OLD plugin's calls land on after Phase 2 (the upgraded
 * singleton and the NEW child), and the old child program a NEW plugin must still drive (spec §7.2
 * "Mixed generations of children").
 */
export const FAMILY_TARGETS: Record<'social' | 'subscriptions' | 'stakingPool' | 'auction' | 'raffle' | 'marketplace', {
  /** working-tree artifacts the family's plugins call (singletons + new child) */
  upgraded: string[]
  /** snapshot keys of the deployed programs at the same positions (singletons + old child) */
  deployed: string[]
  /** snapshot key of the old child program, when the family has children */
  oldChild?: string
  /** working-tree artifact of the new child */
  newChild?: string
  /** working-tree artifact of the NEW plugin version (Phase 3) */
  newPlugin: string
  /** the ABI marker a new plugin reads on a child to pick the hinted ABI (spec §7.2) */
  marker?: string
}> = {
  social: {
    upgraded: ['social/AkitaSocial.arc56.json', 'social/AkitaSocialGraph.arc56.json'],
    deployed: ['AkitaSocial', 'AkitaSocialGraph'],
    newPlugin: 'arc58/plugins/social/AkitaSocialPlugin.arc56.json',
  },
  subscriptions: {
    upgraded: ['subscriptions/Subscriptions.arc56.json'],
    deployed: ['Subscriptions'],
    newPlugin: 'arc58/plugins/subscriptions/SubscriptionsPlugin.arc56.json',
  },
  stakingPool: {
    upgraded: ['staking-pool/StakingPoolFactory.arc56.json', 'staking-pool/StakingPool.arc56.json'],
    deployed: ['StakingPoolFactory', 'StakingPool'],
    oldChild: 'StakingPool',
    newChild: 'staking-pool/StakingPool.arc56.json',
    newPlugin: 'arc58/plugins/staking-pool/StakingPoolPlugin.arc56.json',
    marker: 'pv',
  },
  auction: {
    upgraded: ['auction/AuctionFactory.arc56.json', 'auction/Auction.arc56.json'],
    deployed: ['AuctionFactory', 'Auction'],
    oldChild: 'Auction',
    newChild: 'auction/Auction.arc56.json',
    newPlugin: 'arc58/plugins/auction/AuctionPlugin.arc56.json',
    marker: 'seller_referrer',
  },
  raffle: {
    upgraded: ['raffle/RaffleFactory.arc56.json', 'raffle/Raffle.arc56.json'],
    deployed: ['RaffleFactory', 'Raffle'],
    oldChild: 'Raffle',
    newChild: 'raffle/Raffle.arc56.json',
    newPlugin: 'arc58/plugins/raffle/RafflePlugin.arc56.json',
    marker: 'seller_referrer',
  },
  marketplace: {
    upgraded: ['marketplace/Marketplace.arc56.json', 'marketplace/Listing.arc56.json'],
    deployed: ['Marketplace', 'Listing'],
    oldChild: 'Listing',
    newChild: 'marketplace/Listing.arc56.json',
    newPlugin: 'arc58/plugins/marketplace/MarketplacePlugin.arc56.json',
    // the singleton serves every Listing generation, so the plugin needs no marker (spec §6.11)
  },
}

/** Every artifact path whose method signatures name selectors in the snapshot (current + git history). */
export const CATALOG_ARTIFACTS: readonly string[] = Array.from(new Set([
  ...BASELINE.map((e) => e.artifact),
  ...Object.values(FAMILY_TARGETS).flatMap((t) => [...t.upgraded, t.newPlugin]),
  'gates/sub-gates/subscription/SubscriptionGate.arc56.json',
  'gates/sub-gates/akita-referrer/AkitaReferrerGate.arc56.json',
  'social/AkitaSocialImpact.arc56.json',
  'social/AkitaSocialModeration.arc56.json',
  'escrow/Escrow.arc56.json',
  'arc58/plugins/update-akita-dao/UpdateAkitaDAOPlugin.arc56.json',
  'arc58/plugins/welcome/WelcomePlugin.arc56.json',
  'rewards/Rewards.arc56.json',
  'prize-box/PrizeBox.arc56.json',
  'prize-box/PrizeBoxFactory.arc56.json',
  'arc58/account/AbstractedAccountMBR.arc56.json',
]))

export const MAINNET_ALGOD = 'https://mainnet-api.4160.nodely.dev'
