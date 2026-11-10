# On-chain yield, asset management, liquid staking/restaking, RWAs, and payments/treasury: feature survey (November 2026)

Scope: features users expect from yield, vault, staking, RWA, stablecoin, and governance products. The goal is to map each feature to a primitive that an Algorand finance "kernel" must support. The kernel model: pools and wallets are accounts, modules act inside an atomic group, and a settle step checks every touched account at the end of the group.

Source-quality note: most 2026 figures come from secondary aggregators (eco.com, spark.money, datawallet, blog roundups) that cite DefiLlama or rwa.xyz. Figures often conflict by date and by metric. Each conflict is marked. Where I found no source, the item is in Gaps, or it is marked "[background, unsourced]" (my prior knowledge, not checked against a 2026 source in this session).

---

## Q1. Which yield primitives hold the most TVL, and why?

### Takeaway
Liquid staking (Lido first), tokenized treasuries (about $15B), and lending-backed savings rates (Sky, Morpho, Aave) hold the most value. Restaking and synthetic-dollar yields are big but volatile. They have shrunk sharply from their 2025 peaks (Pendle at -92% from its ATH, HLP at -70%, EigenLayer counts disputed). The winners pay a simple, "native" yield (consensus rewards, T-bill rates, borrow interest) through one token that composes elsewhere.

### Cited Findings

**Liquid staking and restaking**
- Lido: about $18.0B TVL on 27 July 2026 per DefiLlama, more than double the second-place Binance staked ETH (about $7.2B). Other snapshots: $17.7B mid-August 2026, $27.6B early 2026 (spread is wide, mostly ETH price) — [Koinly / roundups via search](https://koinly.io/blog/best-liquid-staking-protocols/); [defi-intel](https://defi-intel.com/best-liquid-staking-protocols/)
- Liquid staking category: about $39.4B mid-2026, with Lido at about half — [coincub](https://coincub.com/blog/liquid-staking/)
- EigenLayer (rebranded EigenCloud): about $5.0B live TVL on DefiLlama in July 2026; other sources say about $15B early 2026 and about $18.4B "aggregated". The gap comes from double counting of ETH that passes through liquid restaking tokens (LRTs). EigenLayer holds about 94% of Ethereum restaking — [protofire](https://protofire.io/guides/restaking-protocols/); [coincraft on double counting](https://coincraft.io/en/blog/restaking-tvl-double-counting-verification-2026)
- Symbiotic: about $329M base-layer TVL on DefiLlama (July 2026) vs about $550M self-reported. On 1 July 2026 it launched Core V2 and repositioned from restaking to "collateral markets" — [protofire](https://protofire.io/guides/restaking-protocols/); [spark.money](https://www.spark.money/tools/restaking-protocol-comparison)
- Babylon (native BTC staking): about $3.3B per DefiLlama in July 2026; one site claims over $4B natively staked BTC — [protofire](https://protofire.io/guides/restaking-protocols/)

**Savings rates and synthetic dollars**
- Sky Savings Rate (sUSDS): 3.60% with $4.83B deposited on 7 October 2026 (Datawallet). Other 2026 articles cite 3.75%. Sky lending allocations cited at $5.34B–$5.6B TVL on DefiLlama — [datawallet](https://www.datawallet.com/crypto/best-stablecoin-interest-rates); [eco.com sUSDe vs sUSDS](https://eco.com/support/en/articles/15253993-susde-vs-susds-vs-sdai-2026-yield-bearing-stablecoins-compared)
- Ethena sUSDe: one October 2026 table lists 4.96% APY with $1.2B TVL (DefiLlama). Another article says 9.40%. Lifetime average about 10.5% (historical). Total USDe supply about $4.7B on 15 September 2026 — [eco.com Ethena](https://eco.com/support/en/articles/15254002-ethena-usde-and-susde-2026-delta-neutral-yield). Background: USDe supply was much larger in 2025, so this is a large drawdown [background, unsourced].
- Morpho: Morpho Blue at about $8B TVL in May 2026; curated USDC vaults paid about 3.5%–5% in early October 2026 (4.1%–6.8% in May). Named curators: Steakhouse Financial, Gauntlet, MEV Capital, Re7 Labs. One article puts Morpho vault TVL at about $4B (April 2026), which conflicts with the $8B Blue figure (likely vaults vs. all markets) — [eco.com USDC yield platforms](https://eco.com/support/en/articles/15253991-best-usdc-yield-platforms-2026-aave-morpho-sky-compared); [eco.com lending protocols](https://eco.com/support/en/articles/15254000-best-defi-lending-protocols-2026-tvl-rates-risk-compared)

**Yield trading and perp-DEX vaults**
- Pendle: about $1.071B TVL on 29 October 2026 per DefiLlama, -15.6% over 30 days. All-time high $13.391B on 19 September 2025. Real-world credit strategies were 82% of TVL at end of September 2026 — [DefiLlama Pendle](https://defillama.com/protocol/pendle); [Crypto Briefing on Centrifuge+Pendle](https://cryptobriefing.com/centrifuge-pendle-fixed-rate-rwa-markets-base)
- Pendle Boros (funding-rate trading) launched August 2025; $21.2B notional volume in its first year — [coinpaprika](https://coinpaprika.com/education/pendle-finance-rwa-yield)
- Pendle RWA TVL passed $1B (date not confirmed) — [TokenPost](https://www.tokenpost.com/news/business/30019)
- Hyperliquid HLP vault: about $187M TVL on 17 August 2026 (DefiLlama via eco.com), -25.7% over 30 days; peak about $604M in September 2025 — [eco.com HLP](https://eco.com/support/en/articles/15197987-hyperliquid-vault-strategies-2026-hlp-and-user-vaults-explained); [datawallet HLP](https://www.datawallet.com/crypto/hyperliquid-hlp-explained)

**Tokenized treasuries** (see Q2 for detail)
- About $14.7B on 27 September 2026, about $15B on 7 October 2026 (109 assets, 86,281 holders), $15.86B on 22 July 2026 — [stobox State of RWA](https://www.stobox.io/reports/state-of-rwa-2026); [KuCoin flash](https://www.kucoin.com/news/flash/tokenized-treasuries-dip-to-34-67-billion-as-rwa-sector-expands)

### Inferences
- The highest-TVL primitives have three traits: (1) the yield source is outside DeFi and durable (consensus rewards, T-bills, borrow demand); (2) one receipt token represents the position and grows in value by exchange rate (stETH-style rebasing is the exception); (3) the receipt is accepted as collateral elsewhere. The kernel must make "receipt token with a rising share price, accepted as collateral" a first-class pattern.
- Yields that depend on leverage demand (sUSDe, HLP, Pendle points trades) shrink fast when markets cool. The kernel should not hard-code one strategy type; it needs generic vault accounting plus oracle-priced receipts.
- On Algorand, consensus staking is non-custodial and auto-compounding in the wallet (see Q-Staking below). That changes the LST design: an LST mainly adds liquidity and composability, not access to yield.

### Gaps
- No primary DefiLlama snapshot for November 2026 was fetched; all TVLs above are secondary citations with dates from May–October 2026.
- Aave TVL and Aave savings (sGHO / Umbrella) figures were not found in this session.
- Yearn v3, Veda/BoringVault, Enzyme, Sommelier, Lagoon TVLs: no 2026 figures found.

---

## Q2. What do RWA issuers require from a venue to list or accept their tokens as collateral?

### Takeaway
Issuers require (1) holder allowlists that the issuer controls (KYC at subscription), (2) the ability to freeze and force-transfer (clawback), (3) a NAV oracle or issuer-published price, (4) redemption that runs through the issuer on a schedule (cut-off times, T+0/T+1), and (5) liquidators and other counterparties who are also allowlisted. Aave Horizon is the reference design: permissioned RWA collateral pools next to permissionless stablecoin liquidity.

### Cited Findings

**Market size and leaders**
- Total tokenized RWAs (excluding stablecoins) about $38.6B on 27 September 2026, up from $33.5B in July (rwa.xyz) — [stobox](https://www.stobox.io/reports/state-of-rwa-2026)
- Metric conflict: rwa.xyz "represented" value (counting underlying assets the tokens reference) is reported as $369B; Figure's HELOC token alone is reported at $20.1B, inflating that total. CoinGecko gave $19.32B market cap in March 2026 — [stobox](https://www.stobox.io/reports/state-of-rwa-2026); [eco.com RWA size](https://eco.com/support/en/articles/15254020-tokenized-rwa-market-size-2026-20b-aum-growth-trajectory)
- BlackRock BUIDL: about $2.00B on 3 November 2026 per rwa.xyz, $1.00 NAV, -10.9% over 30 days. Mid-2026 sources gave about $2.87–2.9B across 8–9 chains — [rwa.xyz BUIDL](https://app.rwa.xyz/assets/BUIDL); [spark.money tokenized fund shares](https://www.spark.money/research/tokenized-fund-shares-settlement-efficiency); [Yahoo Finance](https://finance.yahoo.com/markets/crypto/articles/blackrocks-buidl-nears-1-billion-140715821.html)
- Mid-2026 estimates: Circle USYC about $3.0B, Franklin BENJI about $2.0B, Ondo OUSG about $407M (secondary) — [spark.money](https://www.spark.money/research/tokenized-fund-shares-settlement-efficiency)
- A CryptoSlate article claims Circle (USYC) overtook BlackRock in the tokenized treasury market for "one mechanical reason" (title only seen; likely instant USDC redemption) — [CryptoSlate](https://cryptoslate.com/blackrock-just-lost-control-of-the-10b-tokenized-treasury-market-to-circle-for-one-simple-mechanical-reason/)

**Issuer requirements, by mechanism**
- Access: BUIDL is limited to US Qualified Purchasers with a $5M minimum (in USDC) — [spark.money](https://www.spark.money/research/tokenized-fund-shares-settlement-efficiency)
- Redemption windows: BUIDL redemption goes through Securitize. Tokens must reach the transfer agent's redemption wallet before 3:00 PM ET; USD is wired to instructions on file — [rwa.xyz BUIDL](https://app.rwa.xyz/assets/BUIDL)
- BUIDL as reserve: Ethena's USDtb uses BUIDL as its primary reserve asset — [spark.money](https://www.spark.money/research/tokenized-fund-shares-settlement-efficiency)
- Aave Horizon (permissioned Aave V3 instance): only verified participants can supply RWA collateral; stablecoin liquidity stays permissionless. After an investor completes the issuer's subscription/KYC, the issuer allowlists the wallet. Launch collateral: Superstate USTB and USCC, Centrifuge JTRSY and JAAA; Circle USYC "soon"; VanEck VBILL listed in one source — [Aave blog: Horizon launch](https://aave.com/blog/horizon-launch); [Aave: built for institutions](https://aave.com/blog/horizon-built-for-institutions); [The Block](https://www.theblock.co/post/368440/aave-labs-horizon-stablecoin-borrowing-tokenized-rwas)
- Liquidators on Horizon often need KYC/KYB approval (single secondary source, unverified) — [Sentora](https://sentora.com/research/articles/aave-horizon-pushes-deeper-into-institutional-credit)
- Horizon deposits about $550M (April 2026, secondary) — [BlockEden](https://blockeden.xyz/blog/2026/04/21/aave-horizon-550m-institutional-rwa-deposits-permissioned-defi-tradfi/)

**Tokenized stocks**
- Market size estimates vary: $487M at end of Q1 2026 (CoinGecko RWA report), $3.09B week ending 18 October 2026, $2.76B across 250 tokens in a November 2026 tracker — [CoinGecko](https://www.coingecko.com/learn/what-are-tokenized-stocks); [castlelabs tracker](https://castlelabs.io/research/tokenized-stocks); [TechFlow](https://www.techflowpost.com/en-US/article/34904)
- Ondo Global Markets (rebranded "Ondo Stocks" July 2026, per one source): 450+ tokenized stocks/ETFs, $1.32B value locked in one source vs $831.9M on-chain value in another. Onboarding limited to institutions; retail is waitlisted (per one source) — [datawallet](https://www.datawallet.com/crypto/best-tokenized-stock-trading-exchanges); [castlelabs](https://castlelabs.io/research/tokenized-stocks)
- Backed xStocks: $858.1M issued across eight chains (29 September 2026); non-US retail via Kraken, Bybit, OKX — [castlelabs](https://castlelabs.io/research/tokenized-stocks); [coinpaprika](https://coinpaprika.com/education/buy-tokenized-stocks)
- Robinhood stock tokens: about $156.4M on-chain; issued by Robinhood Europe (Lithuania) to EU retail on an Arbitrum-based L2 — [castlelabs](https://castlelabs.io/research/tokenized-stocks); [coinpedia](https://coinpedia.org/news/robinhood-tokenized-stocks-enters-a-race-thats-already-crowded/)
- One tracker lists Binance "bStocks" as largest issuer at $1.2B (single source) — [castlelabs](https://castlelabs.io/research/tokenized-stocks)

**Async vault standard for RWAs**
- ERC-7540 extends ERC-4626 with request-based deposits and redemptions (request → pending → claimable → claim through the 4626 functions). Pending requests may not earn yield and may not have a fixed exchange rate — [ERC-7540 spec](https://ercs.ethereum.org/ERCS/erc-7540)
- Centrifuge vaults use ERC-4626, ERC-7540 (AsyncVault) and ERC-7575 (one share token, several accepted deposit assets) — [Centrifuge docs](https://docs.centrifuge.io/developer/protocol/architecture/vaults/)
- Centrifuge runs ERC-7540 vaults across more than $1.6B of RWA pools; USDai, Nashpoint, Cove, Nest (Plume) and Lagoon shipped ERC-7540 vaults (OpenZeppelin + Tokenized Vault Foundation, 23 July 2026) — [OpenZeppelin](https://www.openzeppelin.com/news/tokenized-vault-foundation-and-openzeppelin-bring-erc-7540-asynchronous-vaults-to-onchain-funds)

**Algorand RWAs and compliance tooling**
- ASAs (Algorand Standard Assets) have native freeze and clawback addresses. ARC-20 "Smart ASA" (status Final) puts an ASA under a controlling app: the app is the clawback address and runs transfers, freezes, and supply through inner transactions. ARC-20 v2.0.0 moves state from local state to boxes, redefines the freeze model, adds extension points for custom transfer rules and circulating-supply definitions, and renames mint/burn to issue/redeem. Integrators must regenerate clients from ARC-56 app specs — [ARC-20](https://arc.algorand.foundation/ARCs/arc-0020); [ARC-20 v2.0.0 release](https://github.com/algorandfoundation/arc20/releases/tag/v2.0.0)
- ARC-18 (royalty enforcement) pattern: ASA is default-frozen and the clawback (an app account) moves it between wallets — [ARC-18 article](https://developer.algorand.org/articles/royalty-payments-using-arc18)
- ARC-89 adds a metadata flag to declare an ASA as an ARC-20 Smart ASA, so wallets can discover the controlling app — [ARC-89](https://dev.algorand.co/arc-standards/arc-0089/)
- Lofty (tokenized real estate on Algorand): 180+ US properties, first international property (Dominican Republic); daily rent paid in USDC; $5.2M+ cumulative rent to 40,000+ investors (property counts conflict: 150+ / 180+ / 280+ across sources) — [Lofty review 2026](https://www.crowdfundedwealth.com/reviews/lofty-review); [KuCoin Algorand RWA insight](https://www.kucoin.com/news/insight/ALGO/6aba02db74fd460007c5cc7c)
- Exodus tokenized Class A shares (EXOD) on Algorand; dividends paid in USDC (figure in source is about 18 months old) — [KuCoin Algorand RWA insight](https://www.kucoin.com/news/insight/ALGO/6aba02db74fd460007c5cc7c)
- Claim: Algorand had "70% market share" with $425M+ tokenized assets as of mid-2025 — vendor-style claim, unverified — [KuCoin](https://www.kucoin.com/news/insight/ALGO/6aba02db74fd460007c5cc7c)
- Algorand Foundation tokenization pages (marketing) — [algorand.co/solutions/tokenization](https://algorand.co/solutions/tokenization); [RWA guide](https://algorand.co/learn/real-world-asset-tokenization-a-comprehensive-guide)

### Inferences
- The kernel must treat "the issuer can freeze or claw back this asset at any time" as normal, not as an attack. A clawback can remove assets from a pool account between groups. So pool invariants must tolerate a balance drop that no module caused. The settle step should check invariants against actual balances, and pool state must allow a "reconcile" (re-sync stored reserves to real balances).
- Default-frozen ASAs (ARC-18/ARC-20 style) move only through the issuer's app. A pool that holds them must route transfers through that app. The kernel needs a per-asset "transfer adapter" hook, not only plain axfer.
- Async redemption (ERC-7540 style) is necessary for any vault that holds RWAs with cut-off windows. The kernel needs a request/claim queue with per-request state and an epoch-based settlement price.
- Liquidation of RWA collateral may need allowlisted liquidators. The kernel's liquidation path must accept a gate (per-asset "who may receive this asset" check). Akita already has gate plugins; they fit this.
- Allowlists live at the issuer level (issuer whitelists the wallet). On Algorand, ASA opt-in + default-frozen + issuer unfreeze is the native allowlist. A kernel pool account must itself be unfrozen/allowlisted by each issuer before it can hold the asset.

### Gaps
- No issuer-filing-level redemption terms found for BENJI, OUSG, or USDY (only BUIDL's 3 PM ET cut-off).
- No primary source on which venues accept BUIDL as collateral besides Ethena USDtb reserves (background: Crypto.com and Deribit announced BUIDL as collateral in 2025 [background, unsourced]).
- No current figures on Algorand total RWA value from rwa.xyz; no confirmation whether PYUSD is issued on Algorand (I found none).
- No 2026 data on Franklin BENJI on Algorand (background: BENJI expanded to several chains; Algorand status not checked).
- No source fetched on an "ARC-4626" Algorand vault standard. I found no evidence that an Algorand equivalent of ERC-4626 or ERC-7540 exists as a Final ARC.

---

## Q3. Which composability standards matter, and what is the Algorand equivalent?

### Takeaway
ERC-4626 (sync vault), ERC-7540 (async requests), and ERC-7575 (multi-asset / external share token) are the standards that RWA and curator vaults now ship. Algorand has strong asset-level standards (ASA freeze/clawback, ARC-20 Smart ASA, ARC-89 discovery, ARC-56 app specs), but I found no Final vault-interface standard. The kernel can define one.

### Cited Findings
- ERC-7540 adds requestDeposit / requestRedeem plus pending/claimable views on top of ERC-4626; claim uses the existing 4626 deposit/mint/withdraw/redeem — [ERC-7540](https://ercs.ethereum.org/ERCS/erc-7540)
- ERC-7575 lets one share token be exchanged for several accepted assets (Centrifuge uses it) — [Centrifuge docs](https://docs.centrifuge.io/developer/protocol/architecture/vaults/)
- OpenZeppelin and the Tokenized Vault Foundation published ERC-7540 tooling for on-chain funds (23 July 2026) — [OpenZeppelin](https://www.openzeppelin.com/news/tokenized-vault-foundation-and-openzeppelin-bring-erc-7540-asynchronous-vaults-to-onchain-funds)
- ERC-4626 explainer (2026) — [eco.com ERC-4626](https://eco.com/support/en/articles/12068953-erc-4626-explained-the-tokenized-vault-standard)
- Algorand: ARC-20 Smart ASA (controlled asset), ARC-89 (flag to discover the controller app), ARC-56 (app specs that clients generate from) — [ARC-20](https://arc.algorand.foundation/ARCs/arc-0020); [ARC-89](https://dev.algorand.co/arc-standards/arc-0089/); [ARC-20 v2 release](https://github.com/algorandfoundation/arc20/releases/tag/v2.0.0)

### Inferences
- An Algorand "kernel vault interface" should mirror ERC-4626 method names and semantics (totalAssets, convertToShares/Assets, previewDeposit/Redeem, maxDeposit/Withdraw) as ABI read-only methods, so aggregators like Haystack Router can quote them. Add the ERC-7540 request/claim methods as an optional extension.
- Algorand's atomic groups give a natural "sync" path (deposit + share mint in one group). Async is needed only when the asset leaves the chain (RWA redemption, unbonding).
- Shares should be ASAs (so wallets display them and other protocols accept them), with the vault app as clawback/manager only if the vault needs transfer rules. Default plain ASAs are more composable.

### Gaps
- No search confirmed a draft ARC for tokenized vaults. The coordinator should check the ARC repo directly.

---

## Category detail: vaults and asset management

### Takeaway
The vault market split into (a) curator vaults on isolated lending markets (Morpho, Euler), (b) strategy/allocator vaults (Yearn v3, Veda BoringVault, Lagoon, Enzyme, Sommelier), (c) protocol savings tokens (sUSDS, sUSDe), and (d) perp-DEX LP vaults (HLP, user vaults). All of them reduce to: deposit asset, mint shares at a share price, a manager moves assets under rules, fees accrue, withdraw at share price (sync or queued).

### Cited Findings
- Morpho curators (Steakhouse, Gauntlet, MEV Capital, Re7) run USDC vaults at about 3.5%–5% (October 2026) — [eco.com](https://eco.com/support/en/articles/15253991-best-usdc-yield-platforms-2026-aave-morpho-sky-compared)
- Sky Savings Rate 3.60%, $4.83B deposited (7 October 2026) — [datawallet](https://www.datawallet.com/crypto/best-stablecoin-interest-rates)
- sUSDe yield comes from delta-neutral basis (long spot / short perp funding) — [eco.com Ethena](https://eco.com/support/en/articles/15254002-ethena-usde-and-susde-2026-delta-neutral-yield)
- Hyperliquid HLP: protocol market-making/liquidation vault; user vaults let a leader trade depositor funds (copy-trading) — [eco.com HLP](https://eco.com/support/en/articles/15197987-hyperliquid-vault-strategies-2026-hlp-and-user-vaults-explained); [datawallet HLP](https://www.datawallet.com/crypto/hyperliquid-hlp-explained)

### Inferences (mechanics partly from background knowledge, marked)
- Curator vault features [background, unsourced, standard Morpho/Euler design]: supply caps per market, allocator role vs curator role vs guardian (veto), timelocks on risk-increasing changes, performance + management fees taken as share dilution, withdraw queue across markets.
- Yearn v3 [background]: an allocator vault holds a list of ERC-4626 strategies, a debt-allocator role, profit unlocking over time (to stop sandwiching of harvests), and role-based access.
- Veda BoringVault [background]: a minimal vault that holds assets; a separate Manager executes calls allowed by a Merkle tree of permitted (target, selector, args) leaves; a Teller handles deposit/withdraw; an Accountant sets the exchange rate with bounds and pause. This "Merkle-allowlisted manager calls" pattern maps well to Akita ARC-58 plugins with method allowlists.
- Enzyme [background]: on-chain fund with policies (allowed assets, max concentration, allowed depositors) and fees; Sommelier [background]: off-chain strategist proposes, validators relay. Lagoon: ERC-7540 async vaults for curators (cited above via OpenZeppelin).
- HLP-style vaults need a lock-up (background: HLP has a 4-day lock-up [unsourced]) and the vault account trades as a normal account in the perp engine. The kernel's "pool is an account" model supports this directly.

### Gaps
- No 2026 figures fetched for Yearn, Veda, Enzyme, Sommelier, Euler, Lagoon TVL.

---

## Category detail: liquid staking and restaking, including Algorand

### Takeaway
Ethereum LSTs (Lido stETH/wstETH, Rocket Pool rETH) and Solana LSTs (Jito JitoSOL with MEV) are exchange-rate tokens. Restaking (EigenLayer, Symbiotic, Babylon) adds slashing to secure other services; it is shrinking or pivoting. On Algorand, consensus rewards began in 2025, pay directly to the proposing account, and need no lock. That makes Algorand LSTs (xALGO, tALGO, cAlgo, mALGO) mostly liquidity and DeFi-collateral wrappers.

### Cited Findings
- Algorand staking rewards: minimum 30,000 ALGO online stake to earn (set by community vote in Governance Period 10); maximum 70M ALGO per account. Block reward = 50% of transaction fees + Foundation bonus that starts at 10 ALGO per block and decays 1% every millionth block; funded for about 24 months. Rewards go to the proposer account when its block is written (about every 2.8 s); staked ALGO stays in the user's wallet; no lock — [algorand.co/staking-rewards](https://algorand.co/staking-rewards); [Algorand blog: staking rewards live](https://algorand.co/blog/algorands-staking-rewards-are-live)
- Governance rewards ended; the staking program replaced governance in 2025; Folks relaunched xALGO for consensus rewards. gALGO was the governance-era token — [99bitcoins](https://99bitcoins.com/cryptocurrency/best-crypto-staking-coins/algorand/); [Folks Medium](https://folksfinance.medium.com/folks-finance-launches-algorand-liquid-staking-solution-xalgo-8a266f5bf9d4)
- xALGO (Folks Finance): rate = xALGO circulating / (total active stake + total rewards − unclaimed fees). Mint = stake × rate × (1 − premium); the premium offsets the 320-round delay before new stake earns. Fee: 10% of staking rewards to the community treasury. Redeem any time. "Ultrastake" adds leverage (Variable or Stable APY) — [Folks docs](https://docs.folks.finance/functionalities/xalgo-liquid-staking)
- tALGO (Tinyman): about 4.78% APY (aggregator, may be stale), 3% commission on rewards; stALGO = re-staked tALGO earning TINY rewards — [stakingrewards.com tALGO](https://www.stakingrewards.com/asset/talgo)
- Other Algorand options listed: mALGO, Pact consensus-compatible pools, cAlgo (CompX) — [99bitcoins](https://99bitcoins.com/cryptocurrency/best-crypto-staking-coins/algorand/)
- Valar: delegated staking (managed nodes, user keeps custody) — [Algorand blog](https://algorand.co/blog/algorands-staking-rewards-are-live)
- Restaking numbers: see Q1. Symbiotic pivot to "collateral markets" (Core V2, 1 July 2026) — [protofire](https://protofire.io/guides/restaking-protocols/)

### Inferences
- Key Algorand detail for the kernel: a pool or vault account that is online (has participation keys registered, balance at least 30,000 ALGO) earns consensus rewards directly to its balance. So any ALGO-holding pool account in the kernel could earn staking yield. The kernel then needs (a) a keyreg action under governed control, (b) accounting that treats unexplained ALGO balance growth as yield (not as a donation exploit), and (c) the 320-round "new stake does not earn yet" delay in the LST mint price.
- The 1%-per-million-block decay and 24-month funding window mean the Foundation bonus falls over time; fee-share becomes the main source. Rates will drift down. Vaults need a variable-rate accounting model, not a fixed APR.
- Restaking on Algorand would mean slashable collateral for other services. No native slashing exists in Algorand consensus [background]. Any "restaking" is a contract-level pledge; the kernel would need a lock-with-slasher primitive.
- Jito-style MEV sharing has no direct Algorand analog [background]; skip.

### Gaps
- No current APY for xALGO, cAlgo, Valar; no TVL for Algorand LSTs.
- Rocket Pool and Jito 2026 figures not fetched.

---

## Category detail: structured products

### Takeaway
Options vaults (Ribbon → Aevo) faded; basis/delta-neutral vaults (Ethena-style), yield tokenization (Pendle PT/YT), funding-rate trading (Pendle Boros), and fixed-rate RWA markets are the active forms in 2026.

### Cited Findings
- Pendle splits yield-bearing tokens into Principal Tokens (fixed yield to maturity) and Yield Tokens (floating yield); Boros trades perp funding rates; Pendle's H2 2026 roadmap focuses on RWAs and institutions — [bingx Pendle guide](https://bingx.com/en/learn/article/what-is-pendle-finance-v2-yield-tokenization-and-boros-yield-trading); [Bitget roadmap](https://www.bitget.com/news/detail/12560605533510)
- Centrifuge and Pendle launched fixed-rate markets on tokenized RWAs on Base; real-world credit was 82% of Pendle TVL at end of September 2026 — [Crypto Briefing](https://cryptobriefing.com/centrifuge-pendle-fixed-rate-rwa-markets-base)
- Pendle TVL $1.07B (Oct 2026) vs $13.39B ATH (Sep 2025) — [DefiLlama](https://defillama.com/protocol/pendle)
- Example Pendle pool with a 5 Nov 2026 maturity: 24.08% APY, $1.13M TVL (single data point) — [aprscope](https://aprscope.com/yields/pool/pendle-ethereum-apxusd-for-lp-maturity-05nov2026/)

### Inferences
- PT/YT needs: a wrapper that splits a share-price token into two ASAs at a maturity, a time-decaying AMM curve, and a redeem-at-maturity path. The kernel needs a reliable "share price of underlying vault at time t" read and per-pool maturity time.
- Principal-protected notes = PT (or T-bill) + option/YT exposure; leveraged tokens = vault that rebalances a perp position to a target leverage. Both need keeper-triggered rebalance actions inside a group plus oracle-checked bounds.
- Ribbon-style covered-call vaults need epoch rounds, an auction step, and queued deposits/withdrawals between epochs (the same async queue as ERC-7540).

### Gaps
- No 2026 data on Ribbon/Aevo vaults, principal-protected notes, or leveraged-token TVLs.

---

## Category detail: stablecoin rails and payments; regulation

### Takeaway
GENIUS Act (US) and MiCA (EU) both stop the stablecoin issuer from paying interest on the payment stablecoin. Third-party DeFi yield is outside the statute's text, but a March 2026 proposed rule would presume that yield routed through an affiliate or third party breaks the ban. MiCA pushed major exchanges to drop USDT for EU users. For a kernel, this means: keep the payment stablecoin non-yielding and put yield in separate vault shares; support issuer freeze/blocklists.

### Cited Findings
- GENIUS Act Section 4 bars permitted issuers from paying interest or yield to holders (CRS summary quotes the text) — [Congress.gov CRS IF13174](https://www.congress.gov/crs-product/IF13174)
- MiCA works the same way, to stop payment stablecoins acting as unregulated deposits; MiCA's third-party-benefit rules complicate routing EU clients into DeFi yield; the European Commission's 2026 MiCA review covers DeFi and the interest ban — [Legal500](https://www.legal500.com/intelligence/united-states/technology/why-does-mica-and-the-genius-act-ban-stablecoin-interest); [Oxford Business Law Blog, March 2026](https://blogs.law.ox.ac.uk/oblb/blog-post/2026/03/stablecoin-interest-crossroads-micas-prohibition-and-us-regulatory-maze)
- Statute does not explicitly cover affiliates/third parties; a March 2026 proposed rule would presume third-party yield routing violates the ban (OCC/FDIC proposals described similarly) — [spark.money GENIUS](https://www.spark.money/research/genius-act-stablecoin-regulation-explained); [orochi](https://orochi.network/blog/2026-stablecoin-regulatory-expectations-the-future-of-global-payments)
- Tether has no MiCA authorization; Binance, Coinbase, Kraken, Crypto.com removed USDT EU pairs; the transition deadline was 1 July 2026; self-custody and P2P are unaffected — [coinpaprika](https://coinpaprika.com/education/global-stablecoin-regulation-wave/); [tech-insider](https://tech-insider.org/genius-act-vs-mica/)
- Lofty and Exodus pay rent/dividends in USDC on Algorand (payments-as-distribution example) — [KuCoin Algorand RWA](https://www.kucoin.com/news/insight/ALGO/6aba02db74fd460007c5cc7c)

### Inferences
- USDC is the safe default stablecoin for a US/EU-facing Algorand venue. USDT works for non-EU users only. Both are ASAs with issuer freeze/clawback [background], so the same "external balance change" handling from Q2 applies.
- Products that pay yield on stablecoins must present it as a separate vault share (sUSDC-style), not as interest on USDC. Yield sourced from lending/AMM fees, not the issuer, is the defensible path under the current text, but the March 2026 rule may tighten affiliate cases.
- Payment features users expect: recurring payments/subscriptions, streaming/drip allowances, batched payouts (rent, dividends), invoices. Akita already has allowances (flat/window/drip) and a subscriptions plugin; these map directly.

### Gaps
- No 2026 USDC/USDT supply figures on Algorand were found.
- No confirmation that PayPal PYUSD is issued on Algorand (found nothing).
- Final status of the March 2026 GENIUS implementing rules not confirmed.

---

## Category detail: governance and token features

### Takeaway
ve-tokenomics (lock for voting power that directs emissions) plus bribe markets remain the main liquidity-direction tool, but the flagship ve(3,3) DEX (Aerodrome) shows a large TVL drop in late 2026 and is changing its emission system. Fee switches and buybacks replaced pure emissions as the 2025–2026 value-accrual norm [background, partly unsourced].

### Cited Findings
- veAERO: lock AERO to get veAERO; vote on pools; earn fees and bribes. About 1.4B AERO circulating with 600M locked as veAERO (May 2026) — [Agnostic Research](https://agnosticresearch.substack.com/p/aerodrome-takes-flight); [wublock](https://wublock.substack.com/p/2-billion-tvl-in-one-day-a-detailed)
- Aerodrome Slipstream TVL $95.75M on 30 October 2026, -58.1% over 30 days; March–April 2026 analysis had $413M–$517M. A "Predictive Allocation" incentive system and Velodrome merger were reported in July 2026 (single source) — [DefiLlama Slipstream](https://defillama.com/protocol/aerodrome-slipstream); [DefiLlama Aerodrome](https://defillama.com/protocol/aerodrome?tvl=true)

### Inferences
- ve-features need: time-locked balances with linearly decaying voting power, per-epoch gauge votes, emission split by votes, bribe deposits claimable by voters pro rata. All are per-account state plus an epoch clock; they do not need atomic-group settlement but do need cheap per-account checkpoints.
- Fee switch / buyback: protocol fee accrual into a treasury account, plus a governed swap action. Akita has a DAO and revenue manager plugin; the kernel only needs a protocol-fee field per pool and a withdraw-to-treasury action.
- Points programs: off-chain-friendly; the kernel only needs events/logs with account, module, amount, and time, so indexers can compute points.

### Gaps
- No primary 2026 data on Curve/Convex/Votium bribes, or on fee switches (e.g. Uniswap fee switch status).

---

## Category detail: account features

### Takeaway
Users expect a portfolio view across positions, auto-compounding, copy-trading vaults, recurring buys (DCA), and a savings account. Most are wallet/indexer features, but auto-compounding, copy trading, and DCA need on-chain hooks.

### Cited Findings
- Hyperliquid user vaults: a leader trades depositor funds and takes a profit share (copy trading) — [eco.com HLP and user vaults](https://eco.com/support/en/articles/15197987-hyperliquid-vault-strategies-2026-hlp-and-user-vaults-explained)
- Algorand consensus rewards auto-compound in the wallet with no lock — [algorand.co/staking-rewards](https://algorand.co/staking-rewards)
- Savings-account products: Sky Savings Rate, Morpho/Aave USDC vaults (rates above) — [datawallet](https://www.datawallet.com/crypto/best-stablecoin-interest-rates)

### Inferences
- Portfolio views need every module to expose read-only "position of account X" ABI methods (value in a quote asset), so a wallet can sum them. ERC-4626-style previewRedeem gives this for vaults.
- DCA and recurring buys = scheduled, permissionless execution against a user's pre-approved allowance. Akita's execution keys and drip allowances already cover the authorization side.
- Auto-compounding = a keeper action "harvest + redeposit" with a caller reward and price bounds checked at settle.

### Gaps
- No 2026 user-adoption figures for portfolio/DCA features.

---

## Feature list

One line per feature, with product examples.

1. Sync tokenized vault (deposit → shares at share price, redeem at share price) — ERC-4626 vaults, Yearn v3, Morpho vaults, sUSDS, sUSDe
2. Async vault requests (request → pending → claimable → claim, epoch pricing) — ERC-7540: Centrifuge, Lagoon, Nest, USDai
3. Multi-asset entry to one share token — ERC-7575: Centrifuge
4. Curator / allocator vault over many markets with supply caps and a withdraw queue — Morpho, Euler
5. Role separation (owner, curator, allocator, guardian) and timelocked risk changes — Morpho, Yearn v3
6. Allowlisted manager calls (Merkle or method allowlist) — Veda BoringVault, Enzyme policies
7. Exchange-rate oracle with bounds and pause for off-chain-valued vaults — Veda Accountant, RWA NAV feeds
8. Performance and management fees as share dilution; profit unlock over time — Yearn v3, Morpho, Enzyme
9. Deposit allowlists and caps per vault — Enzyme, permissioned RWA vaults, Aave Horizon
10. Savings rate token (protocol-set rate on a stablecoin) — Sky sUSDS
11. Delta-neutral basis vault (spot long + perp short) — Ethena sUSDe
12. Perp-DEX LP / market-making vault with lock-up — Hyperliquid HLP
13. Copy-trading leader vaults with profit share — Hyperliquid user vaults
14. Liquid staking token with rising exchange rate and a mint premium — xALGO, tALGO, wstETH, rETH, JitoSOL
15. Native consensus rewards on any online account (no lock, auto-compound) — Algorand staking rewards
16. Delegated staking (managed node, user keeps custody) — Valar
17. Restaking / slashable collateral pledges — EigenLayer, Symbiotic (now "collateral markets"), Babylon
18. Leveraged staking loops — Folks Ultrastake
19. Yield tokenization (PT/YT split, maturity, time-decay AMM) — Pendle V2
20. Funding-rate trading — Pendle Boros
21. Fixed-rate RWA markets — Centrifuge + Pendle
22. Options/covered-call epoch vaults with auctions — Ribbon/Aevo
23. Leveraged tokens / target-leverage rebalancing vaults — various
24. Principal-protected notes (PT/T-bill + upside) — various
25. Tokenized treasury / money-market fund shares with NAV and redemption cut-offs — BUIDL, BENJI, OUSG, USYC, USTB
26. Tokenized stocks (issuer-backed, regional access rules) — Ondo Global Markets, xStocks, Robinhood, bStocks
27. Tokenized real estate with stablecoin rent distribution — Lofty (Algorand)
28. Tokenized company shares with stablecoin dividends — Exodus EXOD (Algorand)
29. Issuer allowlists (KYC at subscription), freeze, clawback — BUIDL/Securitize, Horizon assets, Algorand ASAs, ARC-20
30. Permissioned collateral pools beside permissionless stablecoin liquidity — Aave Horizon
31. Allowlisted liquidators for RWA collateral — Aave Horizon (unverified)
32. RWA as stablecoin reserve / collateral — BUIDL in Ethena USDtb
33. Non-yielding payment stablecoin plus separate yield wrapper (regulatory split) — USDC + vault shares (GENIUS, MiCA)
34. Regional stablecoin restrictions — USDT off EU exchanges (MiCA)
35. Recurring payments, subscriptions, streaming allowances, batched payouts — Akita subscriptions/allowances, Lofty rent
36. Vote-escrow locks, gauge voting, bribes — Curve/Votium, Aerodrome veAERO
37. Fee switch and buybacks to treasury — DAO revenue managers
38. Points programs (indexed activity) — Ethena, EigenLayer, many
39. Portfolio view across modules — wallets, aggregators
40. Auto-compounding harvest — Yearn, Beefy-style vaults
41. Recurring buys (DCA) — wallets, aggregators

## Kernel requirements

The primitive each feature (by number above) needs.

1. Share accounting module: shares as ASA, totalAssets / totalShares, convertTo / preview read-only ABI methods, rounding in favor of the vault; settle checks share price never drops inside a group except by declared loss. (1, 4, 10, 14, 40)
2. Request/claim queue: per-request box (account, amount, epoch), epoch close with a settlement price, claim later in a separate group; pending requests excluded from share price. (2, 22, 25)
3. Multi-asset entry: per-vault list of accepted assets, each with an oracle price into the share unit. (3, 21)
4. Role registry per vault: owner, curator, allocator, guardian, with timelocked parameter changes and guardian veto. Map to ARC-58 plugin/escrow permissions. (4, 5, 9)
5. Allowlisted call surface: the vault account may only call modules/methods on an allowlist (Merkle root or box set). Akita ARC-58 plugin method allowlists fit this. (6, 13)
6. Oracle primitive with staleness, bounds, and pause; NAV feeds pushed by issuers; read inside the group and re-checked at settle. (7, 11, 19, 25, 26, 30)
7. Fee accrual: management fee by time, performance fee over a high-water mark, minted as shares to a fee account; profit unlock schedule (linear release of harvested gains). (8, 40)
8. Account gates: deposit / receive / liquidate gates per asset or per vault, checked at settle (Akita gate plugins). (9, 29, 30, 31, 34)
9. Reconcile step for external balance changes: pool state syncs to actual ASA/ALGO balances, so issuer freeze/clawback and consensus rewards do not break invariants or open donation exploits. Settle compares stored reserves vs real balances with a declared policy (yield vs loss vs reject). (14, 15, 25-29, 33)
10. Asset transfer adapters: per-asset hook so the kernel moves default-frozen / ARC-20 Smart ASAs through the issuer's app instead of plain axfer; pool accounts must be opted in and allowlisted by each issuer. (25-29)
11. Perp/margin engine accounts: a vault account can hold perp positions like any user; lock-up windows on withdrawals; leader profit share. (11, 12, 13, 23)
12. Online-stake control for pool accounts: governed keyreg (register/deregister participation keys), track the 30k ALGO minimum and 70M maximum, and the 320-round earning delay in LST mint pricing. (14, 15, 16, 18)
13. Lock-with-slasher: time-locked collateral with a named slasher module and a slashing proof check. (17)
14. Flash-style intra-group credit with settle-time solvency: leverage loops and rebalances run inside one group and settle checks every touched account's health. (18, 23)
15. Maturity and time primitives: per-pool maturity timestamp, time-decaying curve, redeem-at-maturity path; reliable round/timestamp reads. (19, 20, 21, 24)
16. Epoch/auction module: rounds with start/end, sealed or Dutch auction, and queued entries between rounds. (22, 36)
17. Issuer redemption bridge: queued redemption that releases the RWA token to the issuer's redemption address and records the expected off-chain payout (for cut-offs like BUIDL's 3 PM ET). (25)
18. Permissioned + permissionless market split: one market can have gated collateral assets and open borrowable assets. (30, 31)
19. Separate yield wrapper over payment stablecoins: the kernel never alters the stablecoin itself; yield accrues only to vault shares. (33, 10)
20. Scheduled execution with allowances: permissionless keeper calls bounded by a user's allowance (flat / window / drip) and price bounds checked at settle. Akita execution keys + allowances. (35, 40, 41)
21. Batched distributions: pay a stablecoin pro rata to many holders, via a claimable index (cumulative reward per share) instead of pushing to each holder. (27, 28, 36)
22. Vote-escrow and gauges: locked balance with decaying weight, per-epoch votes, emission split, bribe pools claimable by voters. (36)
23. Protocol fee field per pool and a governed withdraw-to-treasury + swap action. (37)
24. Structured events/logs per action (account, module, asset, amount, round) for points, portfolio views, and audits. (38, 39)
25. Standard read-only position ABI per module ("value of account X in quote asset Y"), discoverable through ARC-56 specs, so wallets and aggregators can build portfolio views and quotes. (39, 1)
