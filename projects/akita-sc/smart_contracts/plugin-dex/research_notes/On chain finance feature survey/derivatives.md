# On-chain derivatives: perps, options, prediction markets, margin systems (survey as of Nov 2026)

Scope note. This research ran with a budget of about 17 web calls. Figures from fetched or searched sources carry an inline link. Mechanism details that come from protocol docs I know but did not re-fetch in this session sit under "Background (not re-fetched)" sub-headings. The report writer must treat those as "verify before quoting". Volume numbers differ a lot between aggregators (CoinGecko, DefiLlama, Artemis). Open interest (OI) is the more robust metric; some venues inflate volume (zero fees, points programs, suspected wash trading).

## Key question 1: Which designs win on volume, and why (order book vs oracle/pool-based)?

### Takeaway
Central limit order books (CLOBs) with deterministic, low-latency matching win by a wide margin. Hyperliquid alone holds 43% of on-chain perp volume and 57% of OI (4 Nov 2026). The only pool/oracle venue still in the top five is GMX, with a much lower OI-to-volume ratio. RFQ / single-market-maker designs (Variational) are the one non-CLOB model that is gaining share.

### Cited Findings
**Market structure snapshot (Castle Labs, data 4 Nov 2026; volume from CoinGecko, OI from DefiLlama)** — [Castle Labs Perp DEX Rankings](https://castlelabs.io/research/perp-dex-rankings)
- Hyperliquid: 24h vol $12.62B (43%), OI $7.65B (57%), own L1.
- Lighter: $3.29B (11%), OI $725.9M (5.4%), zkLighter + Robinhood Chain.
- Variational: $2.93B (10%), OI $916.1M (6.8%), Arbitrum.
- GMX: $2.58B (8.9%), OI $237.7M (1.8%), Arbitrum + Avalanche (+ GMX Solana in OI).
- Aster: $1.82B (6.3%), OI $1.40B (10%), listed as "Offchain".
- Then: Pacifica $844M, Ondo Perps $548M, edgeX $543M (OI $141M, -40% in 30d), QFEX $498M, GRVT $498M (OI $420M), Extended $488M, ApeX Omni $417M, Antarctic $395M, Nado $393M.
- Long tail: Polymarket Perps $77M vol / $112M OI; dYdX $36.1M vol / $56.9M OI (0.1% share); Derive V3 OI $79.3M; Jupiter Perpetual Exchange OI only $44.1M.
- Castle Labs tracks 48 venues for OI.
- Earlier snapshot from the same tracker (1 Nov 2026) showed different 24h numbers (Hyperliquid $2.33B of $6.97B, 34%), so single-day volume is noisy. — [Castle Labs search snippet](https://castlelabs.io/research/perp-dex-rankings)
- Mid-2026 (DefiLlama via secondary sources): Hyperliquid ~33–37% of 30d perp DEX volume, above 40% in June 2026; Lighter ~$45B 30d vol / ~$700M OI; Aster ~$41.7B 30d vol / ~$1.93B OI (30 Jul 2026). — [BlockEden](https://blockeden.xyz/blog/2026/01/29/perp-dex-wars-2026-hyperliquid-lighter-aster-edgex-paradex-decentralized-derivatives/); [Blockonomi](https://blockonomi.com/dex-statistics-2026-volume-market-share-and-perp-data); [Renesis](https://renesis.fi/articles/best-perp-dex)
- Data quality: DefiLlama delisted Aster volume after finding a near 1:1 correlation with Binance volume (suspected wash trading). Lighter's zero-fee model may inflate volume. — [Renesis](https://renesis.fi/articles/best-perp-dex); [ARX](https://arx.trade/blog/perp-dex-wars-hyperliquid-lighter-aster/)
- Hyperliquid total OI reached $14.3B on 8 Sep 2026, within 3% of the pre-10/10 crash level. — [The Block](https://www.theblock.co/news/ecosystems/2026-09-08-hyperliquid-open-interest-climbs-14-3-billion-hype-hits-all-time-high-413855)
- HIP-3 (builder-deployed perps, 500,000 HYPE stake to deploy) drove growth into commodities, equities and weekend oil trading. HIP-3 OI went from ~$260–280M (Jan 2026) to ~$790M (late Jan) to ~$2.3B (Apr 2026). RWA perp OI on Hyperliquid was $2.65B by May 2026. TradeXYZ held >90% of HIP-3 OI (Apr 2026 snapshot). — [Cointelegraph](https://regional-front.cointelegraph.com/news/hyperliquid-hip-3-open-interest-hits-793m-on-commodities-surge); [BlockEden HIP-3](https://blockeden.xyz/blog/2026/04/29/hyperliquid-hip3-builder-markets-1b-oi-commodities/); [The Defiant](https://thedefiant.io/builder-deployed-perp-markets-push-hyperliquid-to-record-share-of-global-perps-volume)
- By Sep 2026 HIP-3's share of Hyperliquid OI had fallen (no exact figure found). — [The Block](https://www.theblock.co/news/ecosystems/2026-09-08-hyperliquid-open-interest-climbs-14-3-billion-hype-hits-all-time-high-413855)
- Lighter: a sequencer orders transactions in strict price-time order; a prover generates ZK proofs that matching respects price-time priority and that liquidations are fair; proofs are verified on Ethereum. Escape hatch: if a forced priority transaction is not processed within 14 days, anyone can freeze the L1 contract and exit with L1 data. L2Beat flags that the sequencer still controls inclusion/ordering and that Stork oracle signatures are not verified on-chain. — [L2Beat](https://l2beat.com/publications/exchange-risk-and-how-lighter-escapes-it); [zkSecurity](https://blog.zksecurity.xyz/posts/lighter-xyz/index.html)
- On-chain options are ~0.2% of on-chain perp volume (Mar 2026). — [TechFlow](https://techflowpost.com/en-US/article/34541)

### Background (not re-fetched; verify)
- Hyperliquid: HyperBFT consensus; the order book, matching, margin, liquidations and funding are all in the L1 state machine (HyperCore), with HyperEVM sharing state. Docs cite ~0.2 s median end-to-end latency and ~200k orders/s. Cancels and post-only orders get priority ordering inside a block, which protects makers. — [Hyperliquid docs](https://hyperliquid.gitbook.io/hyperliquid-docs)
- dYdX v4: Cosmos app-chain; each validator holds an in-memory order book; the block proposer matches; only fills land in blocks. ~1 s blocks. Volume share collapsed to ~0.1% by Nov 2026 (cited above). — [dYdX docs](https://docs.dydx.xyz)
- Variational: peer-to-peer RFQ perps on Arbitrum; one protocol-run market maker (OLP) quotes all trades; zero trading fees. — [Variational docs](https://docs.variational.io)
- Aster: merged Astherus + APX; offers both an order book "Pro" mode and a one-click oracle-priced mode with very high leverage. Backed by the Binance/YZi ecosystem. — [Aster docs](https://docs.asterdex.com)
- edgeX, Paradex, Extended, GRVT: StarkEx/Starknet/ZK-validium style app-chains with off-chain matching and on-chain proofs of settlement.
- Vertex was shut down in 2025 after its team joined Ink (Kraken's L2); Nado appears to be its successor on Ink. — verify.

### Inferences
- Volume follows four things: (1) maker economics: cheap cancels, priority for cancels, rebates; (2) one shared margin account across all markets; (3) many listings, fast (HIP-3 shows permissionless listing is a growth engine); (4) CEX-like latency (sub-second).
- Pool/oracle perps (GMX, Jupiter) keep a niche: no market makers needed, zero-slippage-ish execution for small and medium size, long-tail assets. Their OI-to-volume ratio is low, and Jupiter OI has shrunk to $44M.
- An Algorand kernel with ~2.8 s rounds cannot match a 0.2 s CLOB on pure latency. It can still host (a) oracle/pool perps, (b) RFQ/intents perps (Variational model), and (c) a batch-auction CLOB per round, which suits block-based finality.

### Gaps
- No primary 30d volume table for Nov 2026 (Castle Labs page shows 24h only).
- Ostium, Synthetix v3 perps (Base/Arbitrum, now mostly Synthetix "Perps on Ethereum mainnet" plans), Drift, Paradex, Aevo current OI: not in the fetched top-25 lists, or not checked. Ostium RWA volume not found.
- No exact Nov 2026 HIP-3 OI figure.

## Key question 2: How do LP-counterparty perps (GMX, JLP, HLP) bound LP losses, and what incidents occurred?

### Takeaway
LP-counterparty designs bound losses with OI caps, max-PnL caps, price impact, borrow fees, ADL and (for Hyperliquid) a curated, validator-voted delisting power. The large incidents in 2025–2026 came from manipulation of thin markets (JELLY), smart-contract accounting bugs (GMX v1), admin-key compromise (Drift), and cascade-time ADL design (10 Oct 2025), not from normal trader PnL.

### Cited Findings
**HLP / JELLY (26 Mar 2025)**
- A trader opened a large short on thin JELLYJELLY and an offsetting long, then withdrew margin so the short was liquidated into HLP (the Hyperliquidity Provider vault). JELLY spot rose ~500%. HLP's peak unrealized loss is reported at $10.6M–$13.5M. — [CoinDesk](https://hotfix.coindesk.com/markets/2025/03/26/hyperliquid-delists-jellyjelly-after-vault-squeezed-in-usd13m-tussle); [FXStreet](https://fxstreet.com/amp/cryptocurrencies/news/hyperliquid-escapes-liquidity-crisis-following-jellyjelly-short-squeeze-delists-token-202503262225)
- The validator set voted to delist JELLY and force-settle at $0.0095, which turned HLP's ~-$10M position into ~+$700k. The Hyper Foundation refunded most other users. — [Decrypt](https://decrypt.co/311713); [CoinDesk](https://hotfix.coindesk.com/markets/2025/03/26/hyperliquid-delists-jellyjelly-after-vault-squeezed-in-usd13m-tussle)
- Fix: the liquidator sub-vault holds a smaller share of HLP account value and rebalances less often. Critics (Arthur Hayes, Bitget CEO) questioned decentralization. — [CoinDesk](https://hotfix.coindesk.com/markets/2025/03/26/hyperliquid-delists-jellyjelly-after-vault-squeezed-in-usd13m-tussle); [The Defiant](https://thedefiant.io/hyperliquid-token-tanks-as-another-vault-attack-sparks-controversy)

**GMX v1 exploit (9 Jul 2025)**
- ~$40–42M lost. Re-entrancy in the v1 OrderBook (executeDecreaseOrder) let the attacker skip the ShortsTracker update of the global average short price. GLP AUM includes trader PnL computed from the average short price, so the attacker inflated GLP price and redeemed GLP at a profit. GMX paused v1; v2 was not affected. ~10,000 ETH (~$30M) was returned after a bounty offer. — [QuillAudits](https://www.quillaudits.com/blog/hack-analysis/how-gmx-lost-42m); [CertiK](https://www-cn.certik.com/blog/gmx-incident-analysis); [The Block](https://www.theblock.co/post/362164/gmx-token-surges-14-after-hacker-begins-returning-funds-from-40-million-exploit); [SolidityScan](https://blog.solidityscan.com/gmx-v1-hack-analysis-ed0ab0c0dd0f/)
- Rekt reports that post-audit changes (keeper callbacks, AUM logic) were not reviewed (single secondary source). — [Rekt](https://alpha.rekt.news/gmx-rekt)

**10–11 Oct 2025 cascade and ADL**
- ~$19B liquidated across venues from ~1.6M traders; Hyperliquid ~$10.1–10.3B; Binance ~$2.4B. CoinShares argues true losses may exceed $50B. — [CryptoSlate](https://cryptoslate.com/?p=502753); [CoinShares](https://coinshares.com/it/insights/knowledge/billions-in-liquidations-what-happened); [Research Square preprint](https://www.researchsquare.com/article/rs-9459584/v1)
- Triggers cited: USDe collateral sell-off exposing Binance's unified-margin oracle (spot-price-based collateral valuation), and order book depth collapse (one measure: -98%, $1.2M to $27k over 40 min). — [tianpan.co](https://tianpan.co/investment-memo/2025/10/16/the-1011-crypto-storm); [Medium / A. Greco](https://medium.com/@Alessandro_Greco/october-10-11-2025-anatomy-of-the-largest-crypto-flash-crash-and-what-it-teaches-engineers-risk-49ea96b6d1c2)
- Hyperliquid's sequence: order-book liquidation, then HLP/backstop vault liquidation, then ADL. Cross-margin ADL fired for the first time in over two years. ~$641M force-sold in one minute. — [Wublock](https://wublock.substack.com/p/hyperliquid-activates-cross-margin); [Sentora](https://sentora.com/research/articles/structural-shifts-in-crypto-the-black-friday-drawdown-and-hyperliquid-s-bid-to-challenge-cexs)
- Shifting ~$576M of forced sales off public order books (to backstop vaults) is credited with avoiding a systemic crash. — [altFINS summary](https://altfins.com/crypto-news/crypto-news-summary/419163)
- ADL queue: winners ranked by a score like unrealized PnL × leverage. — [thogiti](https://thogiti.github.io/2025/12/11/Autodeleveraging-Hyperliquid-653M-debate.html)
- Tarun Chitra (Gauntlet) estimates ~$650M (range $660M simulated to $2.1B realized) was auto-deleveraged from winners, ~28× the potential bad debt; he argues a different ADL algorithm would have done better. Hyperliquid's founder said there was no bad debt and 100% uptime, and that ADL closed profitable shorts at favorable prices. These claims are contested. — [Protos](https://protos.com/outdated-algorithm-caused-650m-excess-losses-on-hyperliquid-report); [cryptonews](https://cryptonews.net/news/market/32117090/); [MEXC (Jeff quote)](https://www.mexc.com/news/127030)

**Drift exploit (1 Apr 2026)**
- ~$270–285M drained in ~12 min over 31 withdrawals (USDC, JLP and others). TVL fell from ~$311M to ~$23M. Cause: compromised admin authority (2-of-5 multisig, no timelock per some reports), attributed to North Korea-linked actors after a months-long social-engineering operation. — [TRM Labs](https://trmlabs.com/resources/blog/north-korean-hackers-attack-drift-protocol-in-285-million-heist); [KuCoin flash](https://www.kucoin.com/news/flash/drift-protocol-exploit-drains-285m-usdc-moved-via-cctp-without-intervention); [Whale Alert](https://whale-alert.io/stories/c0a101b6ab41cc/Drift-Protocol-loses-270M-in-largest-Solanaera-hack-after-sixmonth-inperson-socialengineering-operation)

**GMX v2 loss bounds (forum / third-party)**
- Price impact charges trades that worsen long/short imbalance; funding moves from the dominant to the weaker side based on OI imbalance; borrowing fees scale with OI / pool capacity. ADL triggers when a liquidation would push net OI past a limit. A cap on price impact applied in liquidation checks exists to limit bad debt. — [GMX governance forum](https://gov.gmx.io/t/gmx-v2-x-zero-slippage-max-liquidity-unlimited-open-interest-virtual-order-book/3763); [Chaos Labs GMX risk framework](https://chaoslabs.xyz/resources/chaos_gmx_genesis_risk_framework_methodology.pdf); [LD Capital](https://chaincatcher.com/en/article/2099666)

### Background (not re-fetched; verify)
- GMX v2 (gmx-synthetics): isolated GM pools per market (long token + short token, e.g. ETH/USDC); "max PnL factor" caps trader PnL as a fraction of pool value for pricing GM, for withdrawals, and for ADL; reserve factor and max OI per side; two-step orders (user creates request, keeper executes with signed Chainlink Data Streams prices from after the request block) to stop oracle front-running; adaptive funding rate that ramps while skew persists; GLV vaults route liquidity across GM pools. — [gmx-synthetics README](https://github.com/gmx-io/gmx-synthetics)
- Jupiter Perps / JLP (Solana): one multi-asset pool (SOL, ETH, WBTC, USDC, USDT) is the counterparty; oracle-priced (Edge/Chainlink/Pyth); hourly borrow fee based on utilization; target weights per asset; keeper-executed two-step requests. — [Jupiter docs](https://station.jup.ag/guides/perpetual-exchange/overview)
- HLP: protocol-run market-making + liquidation vault; depositors share PnL; 4-day lockup. Hyperliquid also lets anyone run user vaults (leader takes 10% of profits, must keep ≥5% of vault).
- Synthetix v3: pooled collateral in "vaults" that back markets via a debt-share system; perps markets draw credit from pools; per-market skew-based "velocity" funding; liquidations rate-limited per window.

### Inferences
- The generic loss bounds for an LP-counterparty perp are: (1) per-market and per-side OI caps relative to pool size; (2) a max-PnL factor; (3) skew-based price impact + funding; (4) utilization-based borrow fee; (5) ADL by PnL×leverage ranking; (6) delisting / settlement-price power (governance or validator vote) as a last resort.
- JELLY shows OI caps must scale with real external liquidity, not with pool size. GMX v1 shows pool NAV that includes trader PnL is an attack surface; NAV inputs must be updated atomically with every position change. Drift shows admin keys with no timelock are the largest single risk.
- For a kernel with an end-of-group settle check: re-entrancy is easier to rule out (AVM has no re-entrancy into the same app from inner calls in the classic way), but the NAV-consistency rule still applies: every module that changes pool exposure must update the pool's accounting in the same group, and the settle step should re-derive solvency, not trust cached values.

### Gaps
- Official Hyperliquid post-mortem for 10 Oct 2025 not found.
- Current GMX v2 parameter values (max PnL factor, OI caps) not retrieved.
- No incident data found for Jupiter JLP in 2025–2026 beyond JLP being among Drift-drained assets.
- HLP TVL before/after JELLY ($540M to $150M claim) is unverified.

## Key question 3: What margin and account features do traders consider essential?

### Takeaway
The table stakes in 2026: cross margin by default, isolated margin per position, sub-accounts, multi-asset collateral with haircuts, and (newly) portfolio margin that unifies spot, perps and borrowing in one account. Hyperliquid shipped portfolio margin in stages (USDC borrow Dec 2025, alpha Mar 2026, beta 25 Jun 2026). The 10 Oct 2025 crash showed that collateral valuation (USDe on Binance) is the weak point of unified margin.

### Cited Findings
- Hyperliquid portfolio margin: pre-alpha borrowable asset USDC, collateral HYPE only; BTC and USDH next; USDT borrowable on testnet (May 2026); beta from 25 Jun 2026; eligibility >$5M weighted volume or >$10k account value; per-asset platform-wide and per-user supply/borrow caps; accounts fall back to normal margin when caps hit; idle borrowable assets earn yield automatically. — [KuCoin flash](https://www.kucoin.com/news/flash/hyperliquid-adds-usdt-as-borrowable-asset-on-testnet-mainnet-upgrade-coming); [Buildix guide](https://www.buildix.trade/blog/hyperliquid-portfolio-margin-explained-2026); [Benzinga (Hyperliquid Strategies FY2026)](https://www.benzinga.com/node/61457023); [supa.is](https://supa.is/article/hyperliquid-portfolio-margin-beta-limits-increased-2026)
- stHYPE collateral support was promised for portfolio margin. — [ourcryptotalk](https://ourcryptotalk.com/news/hyperliquid-portfolio-margin-valantis-sthype)
- The USDe sell-off on 10 Oct 2025 exposed Binance's unified-margin oracle (collateral marked to its own thin spot book). — [tianpan.co](https://tianpan.co/investment-memo/2025/10/16/the-1011-crypto-storm)
- Hyperliquid mark price drives margining, liquidations, TP/SL triggers and unrealized PnL. — [Hyperliquid docs: robust price indices](https://hyperliquid.gitbook.io/hyperliquid-docs/trading/robust-price-indices)

### Background (not re-fetched; verify)
- Hyperliquid: cross and isolated margin; "strict isolated" for HIP-3 / high-risk assets; sub-accounts and API (agent) wallets that can trade but not withdraw; maintenance margin = half of initial margin at max leverage; partial liquidation for large positions (20% chunks with cooldown); order types: market, limit (GTC/IOC/ALO), stop/TP/SL, TWAP, scale; reduce-only; builder codes (fee share for front-ends); referral fees; staking-tier fee discounts. — [Hyperliquid docs](https://hyperliquid.gitbook.io/hyperliquid-docs)
- Drift v2: one account holds spot, perps, borrow/lend; cross-margin across all; asset/liability weights per token (IMF scaled with size); "JIT" auction where makers fill taker orders in the first slots; AMM backstop; insurance fund staking; up to 8 sub-accounts; swift (off-chain signed) orders. (Drift's status after the Apr 2026 exploit is unknown.) — [Drift docs](https://docs.drift.trade)
- dYdX v4: cross margin by default, isolated markets (permissionless listing via MegaVault), sub-accounts (128 per address), insurance fund, MegaVault as liquidity vault. — [dYdX docs](https://docs.dydx.xyz)
- Paradex / Derive: portfolio margin across options + perps using scenario (stress-test) margin, as on Deribit.
- Aevo: options + perps on an OP-stack L2, pre-launch perps, standard + portfolio margin.

### Inferences
- Essential account features (ranked by how often venues ship them): cross margin; isolated margin; sub-accounts; trade-only delegated keys (agent wallets); TP/SL/stop/reduce-only; multi-collateral with haircuts; portfolio (risk-based) margin for pros; borrow/lend inside the margin account; vault/copy-trading accounts with profit share; builder/referral fee share.
- Portfolio margin needs a risk engine that evaluates the whole account in one pass. In the kernel this maps naturally onto the end-of-group settle check over every touched account.

### Gaps
- Hyperliquid's exact portfolio-margin formula and haircut tables not retrieved.
- No traders' survey data found; "essential" is inferred from what leading venues ship.

## Key question 4: What does a perps design need from an oracle and from block time / latency?

### Takeaway
Order-book perps need an oracle only for funding, margin marks and liquidations; they need a manipulation-resistant mark built from several sources, updated every few seconds. Pool/oracle perps need much more: low-latency signed prices with timestamps, pulled at execution time, plus a two-step request/execute flow so traders cannot trade against stale prices. Latency matters most for market makers: cancel speed decides whether makers quote tight.

### Cited Findings
- Hyperliquid oracle price: weighted median of CEX spot prices, posted by validators ~every 3 s; used for funding; excludes Hyperliquid's own book to resist manipulation. — [Hyperliquid docs](https://hyperliquid.gitbook.io/hyperliquid-docs/trading/robust-price-indices)
- Hyperliquid mark price = median of: (a) oracle + 150 s EMA of (Hyperliquid mid − oracle); (b) median(best bid, best ask, last trade); (c) weighted median of perp mids on Binance 3, OKX 2, Bybit 2, Gate 1, MEXC 1. If only two inputs exist, a 30 s EMA of the local median is added. EMA decays by exp(−t/2.5 min). — [Hyperliquid docs](https://hyperliquid.gitbook.io/hyperliquid-docs/trading/robust-price-indices)
- Lighter uses Stork prices whose signatures are not verified on-chain (a trust gap flagged by L2Beat). — [L2Beat](https://l2beat.com/publications/exchange-risk-and-how-lighter-escapes-it)
- Binance's unified margin valued USDe from its own spot book during the crash, which amplified liquidations. — [tianpan.co](https://tianpan.co/investment-memo/2025/10/16/the-1011-crypto-storm)
- GMX v1 lost $40M+ because a derived price (GLP NAV via average short price) could be desynchronized. — [CertiK](https://www-cn.certik.com/blog/gmx-incident-analysis)

### Background (not re-fetched; verify)
- Hyperliquid funding: rate = premium index + clamp(interest − premium, −0.05%, +0.05%), interest fixed at 0.01% per 8 h; paid every hour at 1/8 of the 8 h rate; capped at 4% per hour. Premium sampled every 5 s from impact bid/ask vs oracle.
- Chainlink Data Streams: pull-based, sub-second signed reports verified on-chain at execution (GMX v2, Jupiter-adjacent). Pyth: pull oracle with ~400 ms updates and confidence intervals; Pyth Lazer for ~1 ms feeds. Stork: pull oracle with signed low-latency feeds used by Lighter, Paradex and others. Pyth and Stork both support Algorand-like "verify signature in the transaction" flows; Pyth has no native Algorand deployment as far as I know (verify).
- Two-step execution (GMX, Jupiter, Synthetix v3 perps): the trader posts a request; a keeper fills it with a price signed after the request's block/time; stale requests expire. This stops "oracle front-running" when block time is longer than oracle latency.
- Algorand: ~2.8 s rounds with instant finality; groups of up to 16 top-level transactions (more with inner transactions).

### Inferences
- With ~2.8 s rounds, a pure on-chain CLOB on Algorand cannot offer sub-second cancels. Options: (1) per-round batch auction (frequent batch auction removes the latency race and suits block cadence); (2) off-chain matching with on-chain atomic settlement in a group (dYdX/Lighter style); (3) oracle/pool perps with two-step keeper execution.
- The kernel needs an oracle primitive that accepts signed price reports inside the group (verify signature + timestamp + max age), so any module can read the same price in the same group, and the settle step can check margin with it.

### Gaps
- Pyth/Chainlink/Stork current Algorand support not verified this session.
- No measured data on what latency threshold makers require (CEX-grade venues cite <1 s; no rigorous source found).

## Key question 5: Options and prediction markets: distinctive features and numbers

### Takeaway
On-chain options are small but growing, and one venue dominates: Derive held ~88% of Q3 2026 on-chain options notional ($7.52B, +73% QoQ). Prediction markets are the breakout derivative of 2025–2026: Kalshi + Polymarket did a record ~$50.6B in July 2026. Polymarket's CTF + UMA design works for volume but its resolution layer is under strain.

### Cited Findings
**Options**
- On-chain options notional: $7.52B in Q3 2026 (+73% QoQ from $4.35B), two-year high, Derive ~88% share. Market-wide OI peaked ~$2.5B (end Sep 2026), ~$1.75B by 12 Oct, >90% on one platform. — [CryptoRank](https://cryptorank.io/insights/analytics/on-chain-options-volume-hits-a-two-year-high); [AICoin](https://www.aicoin.com/en/article/554896)
- Derive YTD notional ~$14.2B by mid-Oct 2026 (~2.6× all of 2025); OI ~$2.4B (ETH ~$1.09B, new Solana book ~$36.3M); DefiLlama notes Derive's OI is self-reported gross notional. — [ChainCatcher](https://www.chaincatcher.com/en/article/2296365); [Crypto Briefing](https://cryptobriefing.com/derive-dominates-delphi-options-dashboard/); [DefiLlama options dashboard](https://defillama.com/pro/onchain-options-bkus9n)
- Paradex options OI rose from ~0 to >$250M within three weeks of integrating an RFQ network. Hypercall is a new entrant (options on Hyperliquid). — [AICoin](https://www.aicoin.com/en/article/554896); [Cobo](https://www.cobo.com/agentic-wallet/news/on-chain-options-surge-as-derive-paradex-and-hypercall-challenge-deribit)
- Equivalent exposure on Derive costs ~40% more than on Deribit (Alea Research estimate). — [TechFlow](https://techflowpost.com/en-US/article/34541)

**Prediction markets**
- Combined Kalshi + Polymarket (+ Polymarket US) monthly volume: Jan 2026 $26.75B; Feb $23.24B; Mar $24.47B (Kalshi $12.35B, Polymarket $10.15B); Jun $44.8B–$46.95B (source-dependent); Jul $50.6B record, Kalshi $37.7B; World Cup drove the surge. Taker volume is far below notional (Apr: Kalshi $5.42B vs Polymarket $1.99B taker). — [Tangem](https://tangem.com/en/news/markets/35504-prediction-markets-hit-50-6b-record-in-july-2026/); [The Block](https://www.theblock.co/post/406983/kalshi-polymarket-volume-45-billion); [Invezz](https://invezz.com/news/2026/03/30/prediction-markets-surge-as-polymarket-kalshi-hit-record-volumes/); [Parameter](https://parameter.io/kalshi-crushes-records-with-14-81b-april-volume-while-polymarket-slips/)
- Polymarket US is a CFTC-registered DCM; the international book still settles USDC on Polygon via UMA. UMA flow: proposer bonds an outcome; anyone can dispute within 2 h with a $750 counter-bond; disputes go to UMA token vote. The CTF Adapter links UMA to the Gnosis Conditional Token Framework. — [The Defiant](https://thedefiant.io/news/markets/usd85m-polymarket-dispute-over-strategy-s-may-bitcoin-sale-puts-uma-s-token-voting-oracle-on); [NexusFi](https://nexusfi.com/a/prediction-markets/polymarket-uma-oracle-dispute)
- Resolution strain: >1,150 disputed markets in 2026 (more than all of 2025); nine addresses hold ~half of UMA voting power; WSJ links ≥60% of active UMA voters to Polymarket trading accounts; the ~$60–150M "Strategy sells BTC by 31 May 2026" market resolved No despite a later SEC filing showing a 32 BTC sale. — [Finance Magnates](https://www.financemagnates.com/fintech/polymarkets-arbitration-model-faces-conflict-of-interest-questions/); [Cointelegraph](https://cointelegraph.com/news/polymarket-dispute-strategys-bitcoin-sale-resolves-no?rand=50490); [KuCoin (Bloomberg)](https://www.kucoin.com/news/flash/bloomberg-9-whale-wallets-control-over-half-of-polymarket-s-dispute-resolutions)
- Unverified: a ~$520k exploit of a Polymarket UMA CTF Adapter contract on Polygon (single source). — [DEXTools](https://www.dextools.io/news/polymarket-uma-ctf-exploit-polygon)
- Polymarket now runs perps too ($77M 24h vol, $112M OI, 4 Nov 2026). — [Castle Labs](https://castlelabs.io/research/perp-dex-rankings)
- Kalshi on-chain: DFlow's Prediction Markets API (1 Dec 2025) tokenizes Kalshi markets as real SPL tokens on Solana, minted on demand via "concurrent liquidity programs"; Kalshi itself runs off-chain; crypto deposits via ZeroHash on several chains; $2M builder grants. — [Solana](https://solana.com/news/dflow-prediction-markets-api); [The Block](https://www.theblock.co/amp/post/380983/kalshi-tokenizes-thousands-of-its-prediction-markets-using-solana); [QuickNode guide](https://www.quicknode.com/guides/solana-development/3rd-party-integrations/kalshi-prediction-markets-with-dflow)

### Background (not re-fetched; verify)
- Polymarket CLOB: off-chain operator matches EIP-712 signed orders; settlement on-chain via the CTF Exchange contract (atomic swaps of ERC-1155 outcome tokens vs USDC); CTF "split" 1 USDC into YES+NO, "merge" back, "redeem" after resolution; neg-risk adapter for multi-outcome markets (NO on one outcome converts to YES on all others). — [Polymarket docs](https://docs.polymarket.com)
- Limitless (Base): CLOB + AMM prediction markets, short-dated crypto price markets. Azuro: pooled liquidity for sports betting; LPs are the house; data-provider oracles.
- Options designs: Derive: off-chain RFQ + order book on its own OP-stack chain, on-chain settlement, standard and portfolio (scenario) margin, MMs margin with spot/perps. Panoptic: perpetual options built on Uniswap v3/v4 LP positions; option sellers lend LP liquidity, buyers borrow it; "streamia" premium accrues from fees instead of upfront premium; no expiry, no oracle for pricing. Opyn Squeeth: power perp (ETH²) with normalization factor funding; Opyn wound down. Premia v3: concentrated-liquidity option pools + order book. Rysk: covered-call/put vaults priced by RFQ MMs on HyperEVM. Hegic: pool-as-writer, fixed premium. Stryke (ex-Dopex): CLAMM options on concentrated liquidity.

### Inferences
- Options volume follows professional MM liquidity via RFQ (Paradex jump after RFQ), not AMM designs. AMM/LP-based options (Panoptic, Stryke) stay niche.
- Prediction markets need: a split/merge/redeem token primitive for outcome sets, a CLOB or RFQ, and a pluggable resolution oracle with bonds, dispute windows and an escalation path. Resolution integrity is now the main risk, not matching.

### Gaps
- No 2026 Panoptic, Premia, Rysk, Hegic, Stryke metrics found; Aevo and Opyn status not verified.
- Azuro and Limitless 2026 volume not found.
- Aug–Oct 2026 prediction-market monthly totals not found.

# Feature list

- Central limit order book with price-time priority — Hyperliquid, Lighter, dYdX v4, Paradex, edgeX, Aster Pro, Polymarket
- Cancel/post-only priority and cheap cancels — Hyperliquid
- ZK-proven matching + L1 escape hatch — Lighter, edgeX, Paradex (StarkEx/Starknet)
- RFQ / single-market-maker perps — Variational; RFQ options — Derive, Paradex, Rysk
- Oracle-priced pool perps with two-step keeper execution — GMX v2, Jupiter Perps, Synthetix v3, Ostium, Aster one-click
- LP counterparty vault (protocol MM + liquidator) — HLP, JLP, GM/GLV, dYdX MegaVault, Drift insurance + AMM
- Isolated per-market pools — GMX v2 GM pools, dYdX isolated markets, Hyperliquid strict-isolated HIP-3
- Permissionless market listing with deployer stake and deployer-set params — HIP-3 (500k HYPE), dYdX MegaVault listings
- RWA / equity / commodity perps with weekend trading — HIP-3 (TradeXYZ), Ostium, Ondo Perps
- Price impact by skew; adaptive/velocity funding; utilization borrow fee — GMX v2, Synthetix v3, Jupiter
- Max-PnL factor and per-side OI caps — GMX v2, Jupiter (target weights), Hyperliquid OI caps
- Funding from premium + interest with clamp and hourly payment — Hyperliquid, dYdX, most CLOBs
- Mark price as median of oracle+EMA basis, local book, external perps — Hyperliquid
- Cross margin, isolated margin, strict isolated — Hyperliquid, dYdX, Drift, all major venues
- Sub-accounts and trade-only agent keys — Hyperliquid, dYdX, Drift
- Portfolio margin with in-account borrow/lend and idle yield — Hyperliquid (beta Jun 2026), Drift, Derive, Paradex
- Multi-asset collateral with haircuts / asset weights — Drift, Hyperliquid PM, Binance (cautionary USDe case)
- Partial liquidation; backstop liquidation vault; insurance fund — Hyperliquid, Drift, dYdX
- Auto-deleveraging ranked by PnL × leverage — Hyperliquid, GMX v2 (net-OI trigger), Binance
- Governance/validator delisting with forced settlement price — Hyperliquid JELLY
- Order types: market, limit GTC/IOC/ALO, stop, TP/SL, TWAP, scale, reduce-only — Hyperliquid, dYdX
- User vaults / copy trading with leader profit share — Hyperliquid vaults
- Builder codes / referral fee share — Hyperliquid
- Options with portfolio (scenario) margin across perps+options — Derive, Paradex, Aevo
- Perpetual options on LP positions, fee-stream premium — Panoptic
- Power perps — Opyn Squeeth
- Covered-call / option-writing vaults — Rysk, Derive vaults
- Conditional token split/merge/redeem; multi-outcome neg-risk — Polymarket CTF
- Optimistic oracle resolution with bond + dispute window + token vote — Polymarket/UMA
- Tokenized off-chain markets minted on demand — Kalshi via DFlow
- Pooled-liquidity sports betting — Azuro
- Pull-based signed low-latency oracle reports — Chainlink Data Streams (GMX), Pyth (Drift, Jupiter), Stork (Lighter), validator oracle (Hyperliquid)
- Admin timelocks / multisig hardening (lesson) — Drift Apr 2026 exploit

# Kernel requirements

- CLOB / batch auction → a matcher module that writes fills as balance deltas on maker and taker accounts in one group; per-round batch clearing price fits ~2.8 s rounds; order state in boxes keyed by market + price level.
- Cancel priority / anti-latency-race → group-level ordering rule, or per-round batch auction so in-round order does not matter.
- Off-chain matching with on-chain settlement (dYdX/Lighter/Polymarket model) → signed-order verification (ed25519 / secp256k1 / EIP-712) inside the group, nonce/replay tracking per account.
- RFQ perps / options → signed-quote verification + expiry, maker account as counterparty, settle check on maker solvency.
- Oracle → a price-report primitive: verify signature, timestamp, max age, confidence; cache per group so every module reads one price; support median of several feeds and EMA state for mark price.
- Two-step keeper execution → request boxes with creation round; executor must present a price stamped after the request; expiry and refund path.
- LP counterparty vault → a pool account whose NAV includes trader PnL; NAV must be recomputed from positions in the settle step (GMX v1 lesson), never from a cached average that one path can skip.
- OI caps, per-side caps, max-PnL factor → per-market risk params read by the settle step; reject a group that pushes OI or pool PnL past caps.
- Price impact, adaptive funding, borrow fee → per-market accumulator state (cumulative funding index, cumulative borrow index) updated lazily on touch; position stores entry index.
- Funding (premium + interest clamp) → premium sampler state per market + periodic index update callable by anyone.
- Margin modes (cross, isolated, strict isolated) → account sub-ledgers; settle step computes margin per sub-ledger; isolated positions cannot draw from cross collateral.
- Sub-accounts and agent keys → account tree (owner → sub-accounts) and scoped delegated signers (trade-only, no withdraw); maps well to ARC-58 plugins/allowances.
- Multi-collateral with haircuts → per-asset weights (initial/maintenance, size-scaled) applied in the settle step; caps on collateral asset concentration (USDe lesson: value collateral from robust oracle, not own book).
- Portfolio margin + in-account borrow/lend → settle step evaluates net risk across spot, perps, borrows (scenario or weighted); lending module shares the same account; per-asset supply/borrow caps with fallback to standard margin.
- Liquidation engine → permissionless liquidate call when settle-step margin < maintenance; partial liquidation sizing; liquidation fee to keeper.
- Backstop liquidator vault → a designated vault account that can take over positions at mark when the book cannot absorb them.
- Insurance fund → protocol account debited for bad debt before ADL.
- ADL → ranked queue of winning positions (PnL × leverage) per market; forced reduce at mark price in a group; better algorithms (pro-rata) should be pluggable given the Oct 2025 debate.
- Socialized loss → fallback that marks down pool/vault share price when insurance and ADL are exhausted.
- Delisting / force settle → governance action that freezes a market and sets a settlement price; needs timelock and transparent rules.
- Permissionless markets (HIP-3 style) → market factory with deployer stake (slashable), deployer-set oracle and params within kernel bounds, isolated risk.
- Vaults / copy trading → share-token vault account trading via the same kernel, leader profit share and minimum leader stake.
- Builder / referral fees → fee-split field on orders; settle step pays fee recipients.
- Options → instruments with strike/expiry/type; exercise/settle at expiry oracle price; scenario margin for portfolio accounts; option vault module.
- LP-position options (Panoptic) → AMM LP positions as borrowable/lendable objects with fee-stream accrual.
- Prediction markets → outcome-set token primitive (split 1 unit collateral into N outcomes, merge, redeem after resolution) as ASAs or kernel balances; neg-risk conversion.
- Resolution oracle → pluggable resolver interface: proposal + bond + dispute window + escalation; avoid single-token-vote capture.
- Admin safety → timelocks and multisig thresholds on every privileged kernel path (Drift lesson); emergency pause per module.
- Atomic group size → perps actions that touch many accounts (ADL, batch auction) need inner-transaction budgets or multi-group continuation with resumable state.
