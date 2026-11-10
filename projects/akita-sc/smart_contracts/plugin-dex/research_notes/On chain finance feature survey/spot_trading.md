# Spot trading on-chain: AMMs, order books, aggregators, intents/RFQ (as of Nov 2026)

Scope: features users and integrators expect from spot trading, and the kernel primitive each needs. The kernel is an Algorand atomic group where pools and wallets are accounts, modules act inside the group, and a settle step checks every touched account at the end.

Source-quality legend:
- **[fetched]**: read or searched this session (Nov 2026).
- **[canonical, not fetched]**: a mechanism fact from the protocol's own docs or paper, known before this session. The URL is the canonical doc. Treat as reliable for mechanism and unreliable for current numbers. Verify before quoting.
- **[local]**: from this repo's own verified research (`smart_contracts/plugin-dex/research/*.md`).

Most volume figures below come from snapshots between Feb and Oct 2026 and conflict across sources. Dates are given where known.

---

## Per-product features and mechanisms (the objective)

### Takeaway
Every leading venue design reduces to a small set of mechanisms: a singleton vault with net-delta settlement (Uniswap v4, Balancer v3, Fluid, Ambient), a pluggable pricing curve (constant product, StableSwap, CryptoSwap, bins, concentrated ticks, oracle-priced quotes), hook callbacks that can change amounts, and an off-chain auction layer that sends user intents to the best filler (UniswapX, CoW, 1inch Fusion, Jupiter Ultra/JupiterZ). The kernel already has the first two shapes. The gaps are oracle-priced "prop" pools, signed-order settlement, and batch settlement.

### Cited Findings

**Uniswap v4 (EVM)**
- Hooks have 10 call permissions (`beforeInitialize`/`afterInitialize`, `before/afterAddLiquidity`, `before/afterRemoveLiquidity`, `before/afterSwap`, `before/afterDonate`) and 4 return-delta permissions (`beforeSwapReturnDelta`, `afterSwapReturnDelta`, `afterAddLiquidityReturnDelta`, `afterRemoveLiquidityReturnDelta`) — [Uniswap v4 hooks docs](http://developers.uniswap.org/llms.mdx/docs/protocols/v4/concepts/hooks) [fetched]
- Permissions are encoded as bits in the hook contract's 20-byte address. Deployers mine a CREATE2 salt to get the right bits. If a flag bit is missing, the PoolManager never calls that function, and the logic "silently does nothing" — [Uniswap v4 hooks docs](http://developers.uniswap.org/llms.mdx/docs/protocols/v4/concepts/hooks) [fetched]
- Return-delta permissions let a hook adjust balances. This is how custom curves (a hook that takes the whole swap and returns its own delta, "NoOp"/custom-accounting hooks) and hook fees work — [Uniswap v4 hooks docs](http://developers.uniswap.org/llms.mdx/docs/protocols/v4/concepts/hooks) [fetched]; custom-curve use from [Uniswap v4 overview](https://docs.uniswap.org/contracts/v4/overview) [canonical, not fetched]
- Singleton PoolManager holds all pools. Flash accounting: inside `unlock()`, every action updates a per-currency transient delta; the call must end with all deltas at zero (`settle`/`take`/`sync`). Multi-hop swaps move only net amounts. ERC-6909 claim tokens let users keep balances inside the PoolManager instead of transferring tokens. Native ETH is supported without WETH. Dynamic fees: a pool flagged dynamic-fee lets the hook set the LP fee per swap (`updateDynamicLPFee` or a fee override returned from `beforeSwap`) — [Uniswap v4 overview](https://docs.uniswap.org/contracts/v4/overview) [canonical, not fetched]
- v4 cumulative volume about $355B (about $190B Ethereum, $70B Unichain), 30-day volume about $25B, TVL about $615M after passing $1B 177 days after launch (Datawallet, June 2026, citing DefiLlama) — [Datawallet](https://www.datawallet.com/fr/crypto/uniswap-v4-explained) [fetched]. A Feb 2026 risk page lists v4 TVL $647M — [Uniswap V4 risk page](https://debian.jerboa-frog.ts.net/dexes/uniswap-v4.md) [fetched, low-quality mirror]
- TVL dropped partly because Bunni, the largest hook-based LP venue, shut down — [Datawallet (zh)](https://www.datawallet.com/zh/隐蔽性/uniswap-v4-explained) [fetched]
- Hook share of v4 volume rose from single-digit to double-digit percent during summer and early fall 2026 — [KuCoin blog](https://www.kucoin.com/blog/en-uniswap-v4-captures-arc-and-robinhood-chain-volume-as-hooks-drive-liquidity) [fetched, exchange blog]
- Hook count: 23,138 hooks initialized (Jan 2026 page) versus "over 150 hooks deployed by community" (risk page). The two count different things — [portfolio page](https://portfolio-indiebuidl.vercel.app/blog/uniswap_uni_x); [risk page](https://debian.jerboa-frog.ts.net/dexes/uniswap-v4.md) [fetched, both low quality]

**UniswapX**
- Signed off-chain orders (Permit2) filled by competing fillers via Dutch auctions (price decays over time from a start to an end amount). Supports exclusive RFQ ("exclusive filler" window, then open auction), gasless swaps (filler pays gas), MEV protection (no public mempool swap), and cross-chain fills. Fillers can use any on-chain liquidity or private inventory — [UniswapX overview](https://docs.uniswap.org/contracts/uniswapx/overview) [canonical, not fetched]
- No reliable 2026 UniswapX volume-share figure found. A Steemit claim of "15–20% of Uniswap routing" is low quality — see Gaps.

**Curve**
- StableSwap: an invariant that blends constant-sum and constant-product, set by an amplification coefficient `A`. Low slippage near the peg — [StableSwap whitepaper](https://curve.fi/files/stableswap-paper.pdf) [canonical, not fetched]
- CryptoSwap (tricrypto, twocrypto): concentrates liquidity around an internal EMA price oracle and repegs automatically when accumulated profit allows. Dynamic fee between `mid_fee` and `out_fee` set by distance from balance — [CryptoSwap whitepaper](https://classic.curve.fi/files/crypto-pools-paper.pdf) [canonical, not fetched]
- stableswap-ng: rate-oracle tokens (ERC-4626 or custom oracle rate per coin), dynamic fee that rises off-peg (`offpeg_fee_multiplier`), built-in EMA price oracle per pool, and `exchange_received` (swap tokens already sent to the pool, so aggregators save a transfer) — [Curve stableswap-ng docs](https://docs.curve.fi/stableswap-exchange/stableswap-ng/overview/) [canonical, not fetched]

**Balancer v3**
- Single Vault holds all tokens. Hooks framework extends pool behavior. The Immunefi scope excludes issues that need users to interact with malicious hooks (that is, hook trust is the user's risk) — [Immunefi Balancer](https://immunefi.com/bounty/balancer) [fetched]
- Boosted pools: pools of ERC-4626 yield-bearing tokens (for example stataDAI/stataUSDC), so idle liquidity earns lending yield. Any pool type can be boosted. Yield tokens can make up 25% to 100% of a pool — [Balancer boosted pools (aggregators)](https://docs.balancer.fi/integration-guides/aggregators/boosted-pools.html); [Boosted pool concept](https://docs.balancer.fi/concepts/explore-available-balancer-pools/boosted-pool.html) [fetched]
- Liquidity buffers: a Vault-internal pairing of an underlying token and its ERC-4626 wrapper. A swap that needs the underlying uses the buffer instead of wrapping through the lending protocol. Buffers are not pools, earn no fees, and are not tokenized. They price at `previewDeposit`/`previewMint` — [Balancer buffer docs](https://docs.balancer.fi/concepts/vault/buffer.html); [v3 buffer page](https://docs-v3.balancer.fi/concepts/vault/buffer.html) [fetched]
- Transient accounting ("till"/credit-debt model like v4), hook flags including `shouldCallComputeDynamicSwapFee`, and hooks that can adjust amounts (`enableHookAdjustedAmounts`) — [Balancer v3 hooks docs](https://docs.balancer.fi/concepts/core-concepts/hooks.html) [canonical, not fetched]

**Fluid DEX (Instadapp)**
- Smart Collateral: LP positions are also lending collateral, so LPs earn swap fees plus lending yield. Smart Debt: borrowed amounts are deployed as DEX liquidity, and swap fees reduce the borrower's debt — [Fluid DEX on DefiLlama / guide](https://www.dextools.io/tutorials/what-is-fluid-protocol-instadapp-lending-dex-guide-2026) [fetched, secondary]
- About $3.87B DEX volume in the trailing 30 days; Fluid DEX TVL $229.71M (DefiLlama, rolling, date not shown) — [DefiLlama Fluid DEX](https://defillama.com/protocol/fluid-dex) [fetched]
- Self-reported: "#2 DEX by daily volume and fees on Ethereum" — [Fluid PR toolkit](https://fluid-instadapp.notion.site/Fluid-PR-Toolkit-271ced1dcc21806ead66e151f17b44dc) [fetched, self-reported]; stated goal "#1 DEX by volume and fees in 2026" — [Fluid Q4 2025 update](https://cdn.instadapp.io/docs/Fluid_2025_Q4_update.pdf) [fetched]

**Maverick, Ambient, Trader Joe (LFJ) Liquidity Book**
- Liquidity Book: discrete price bins, each bin is constant-sum (zero slippage inside a bin). Fee = base fee + variable fee driven by a volatility accumulator across bins crossed — [LFJ Liquidity Book docs](https://docs.lfj.gg/concepts/concentrated-liquidity) [canonical, not fetched]
- Maverick v2: bins with programmable "modes" (static, move right, move left, move both) that shift liquidity with price automatically. v2 adds programmable pools, where an accessor contract controls who can swap or add — [Maverick docs](https://docs.mav.xyz) [canonical, not fetched]
- Ambient (CrocSwap): a single contract holds all pools, mixing ambient (full-range) and concentrated liquidity in the same pool. It has internal surplus balances (like ERC-6909 claims), "long-form" multi-step commands in one call, and knockout liquidity (range orders that leave the pool when crossed, which act as on-chain limit orders) — [Ambient docs](https://docs.ambient.finance) [canonical, not fetched]

**Solana: Jupiter**
- Jupiter is said to handle about 95% of Solana aggregator volume and over 50% of Solana DEX volume (secondary source, undated) — [eco.com review](https://eco.com/support/en/articles/13314092-best-dex-aggregators-in-2026-1inch-jupiter-paraswap-and-more) [fetched, secondary]
- JupiterZ is the RFQ engine: market makers quote and fill off-chain-priced orders — [Jupiter agent skill / docs](https://skills.cat/skills/jup-ag/agent-skills/integrating-jupiter) [fetched]
- Limit orders execute against on-chain liquidity from many DEXes. Limit Order V2 triggers on a token's USD price or market cap — [Jupiter limit orders](https://docs.jup.ag/user-docs/trade/swap/limit-orders) [fetched]
- Recurring (DCA) V2 replaces V1; new V1 orders are disabled. Fee 0.03% for stable/pegged pairs and 0.1% for others, plus an Ultra routing fee of 0–0.5% — [Jupiter recurring orders](https://docs.jup.ag/user-docs/trade/swap/recurring-orders) [fetched]
- API shape: `POST /trigger/v1/createOrder` → sign → `POST /trigger/v1/execute`; recurring uses the same pattern — [Jupiter dev docs](https://dev.jup.ag/llms.txt) [fetched]
- Ultra: Jupiter's managed swap path. It quotes across its router and JupiterZ RFQ, handles slippage and priority fees, and lands transactions itself (gasless for some pairs) — [Jupiter Ultra docs](https://dev.jup.ag/docs/ultra-api) [canonical, not fetched]

**Solana: prop AMMs (HumidiFi, SolFi, Tessera V, BisonFi, GoonFi)**
- Prop AMMs held about 71% of Solana DEX volume in Feb 2026 (Syndica estimate) — [SolanaFloor / Syndica via search](https://solanafloor.com/news/prop-amms-on-solana-bison-fi-ends-humidi-fi-s-dominance-with-11-5-b-volume) [fetched]
- Solana prop AMMs did $19.8B volume in March 2026. BisonFi led prop AMM volume for 9 straight weeks — [SolanaFloor](https://solanafloor.com/news/bison-fi-leads-prop-amm-volume-for-9-straight-weeks) [fetched]
- Share shifts fast: late 2025 HumidiFi about 65%, Tessera 18%, GoonFi 7%; early 2026 BisonFi above 34–35% versus HumidiFi about 26–36% (down from over 68% a month before); Tessera above 15%; SolFi's SOL-USD share fell to 21.4% — [Step Data](https://stepdata.substack.com/p/prop-amms-on-solana-bisonfi-ends); [SolanaFloor](https://solanafloor.com/news/prop-amm-bison-fi-continues-to-lead-solana-weekly-dex-trading-volume) [fetched; sources conflict on exact shares]
- Tessera V: $4.089B DEX volume over 30 days (DefiLlama, rolling) — [DefiLlama Tessera V](https://defillama.com/protocol/tessera-v) [fetched]
- HumidiFi is reported to be run by Temporal — [DL News](https://dlnews.com/articles/defi/temporal-said-to-be-behind-solana-prop-amm-humidifi/) [fetched, more than six months old]
- Mechanism: the operator's own program holds inventory and an internal price. The operator pushes frequent, cheap price-update transactions (very low compute units, often prioritized or bundled at the top of the block). There is no public LP and no public curve. Swaps arrive almost only through aggregators (Jupiter, etc.), so quote accuracy and freshness, not TVL, decide flow — [Blockworks: Solana DEX winners, order flow](https://app.blockworksresearch.com/unlocked/solana-dex-winners-all-about-order-flow) [search snippet only; fetch failed with HTTP 429]; [Solana Compass: How HumidiFi became Solana's largest prop AMM](https://solanacompass.com/learn/Lightspeed/how-humidifi-became-solanas-largest-prop-amm) [search snippet only]

**Solana: Orca, Meteora, Raydium, Phoenix**
- Orca Whirlpools: concentrated liquidity (ticks); one venue table lists Orca fees as dynamic 1–200 bps and Raydium CLMM 1–100 bps. Sources disagree on Raydium fee tiers — [Venum Solana DEX comparison](https://docs.venum.dev/guide/solana-dex-comparison) [fetched, secondary]
- Meteora DLMM: bins (Liquidity-Book style) with a volatility-driven dynamic fee; the docs publish the formula — [Meteora DLMM dynamic fees](https://docs.meteora.ag/product-overview/dlmm-overview/dynamic-fees) [fetched]
- Meteora DAMM v2: on-chain fee scheduler (fee decays over time after launch) plus dynamic fee, as part of the Anti-Sniper Suite (A.S.S.) — [DAMM v2 overview](https://docs.meteora.ag/product-overview/damm-v2-overview); [Fee scheduler](https://docs.meteora.ag/meteoras-anti-sniper-suite-a.s.s./meteoras-anti-sniper-suite/fee-scheduler) [fetched]
- DAMM v2: $23.06M TVL and $307.39M 30-day volume as of Oct 20 2026 — [DefiLlama DAMM V2](https://defillama.com/protocol/6288) [fetched]
- Raydium: constant-product AMM v4 (historically shared liquidity with the OpenBook order book), CLMM, and CPMM (Token-2022 support); LaunchLab bonding curves graduate tokens to pools — [Raydium docs](https://docs.raydium.io) [canonical, not fetched]
- Phoenix (Ellipsis Labs): fully on-chain CLOB with no crank; trades settle atomically in the taker's transaction. Supports limit, post-only, IOC, fill-or-kill style orders, and seat-gated makers — [Phoenix v1 repo](https://github.com/Ellipsis-Labs/phoenix-v1) [canonical, not fetched]

**Hyperliquid spot and dYdX**
- Hyperliquid spot: fully on-chain CLOB on its own L1, price-time priority, one-block finality. HIP-1 is the token standard and spot deploy auction. HIP-2 "Hyperliquidity" is a protocol-run automated market-making strategy that seeds every HIP-1 book, secured by the same consensus — [Hyperliquid HIP-2 docs](https://hyperliquid.gitbook.io/hyperliquid-docs/hyperliquid-improvement-proposals-hips/hip-2-hyperliquidity) [fetched]
- Spot order book: $3.612B 30-day volume and $152.09M TVL as of Oct 29 2026 — [DefiLlama Hyperliquid Spot Orderbook](https://defillama.com/protocol/hyperliquid-spot-orderbook?denomination=HYPE) [fetched]
- Spot plus HIP-1 is about 6.1% of Hyperliquid fees; total Q1 2026 volume (perps plus spot) over $633B — [Datawallet Hyperliquid stats](https://www.datawallet.com/crypto/hyperliquid-statistics); [21Shares H1 2026](https://21shares.com/en-eu/insights/hyperliquid-fees-revenue-h1-2026) [fetched]
- dYdX v4: app-chain (Cosmos SDK) with an off-chain in-memory order book run by validators and on-chain settlement of matched trades. Spot is not its main product (perps are) — [dYdX docs](https://docs.dydx.exchange) [canonical, not fetched]

**Aggregators and intents**
- Ethereum aggregator share, April 2026: Kyber about 31%, CoW 22%, 1inch fell from about 30% to 15% after its incentives ended — [The Block](https://www.theblock.co/news/defi/2026-04-15-ethereum-dex-aggregator-competitive-kyber-cowswap-gain-397278) [fetched]
- Cross-chain aggregator share, May 2026 (CoW self-report): 0x API 18.7%, CoW 16.8%, KyberSwap 16.6%, 1inch Fusion 14.2% — [CoW DAO monthly recap May 2026](https://cowfi-hvnftpxt1-cowswap.vercel.app/learn/cow-dao-monthly-recap-may-2026) [fetched, self-reported, preview URL]
- CoW about $2.88B monthly volume and 15.1% share (#3) in Aug 2026 — [Startupik](https://startupik.com/?p=8880) [fetched, not verified against a primary source]
- 1inch hit 60% share in May 2025 after Solana expansion, from 32% in March 2025 — [The Block](https://www.theblock.co/post/356650/1inch-dex-aggregator-60-market-share-solana-expansion) [fetched, older]
- CoW Protocol: batch auctions with uniform clearing prices per batch; solvers compete to settle the batch; coincidence of wants (CoW) matches users directly before touching AMMs. Every winning solution must include at least one user or CoW AMM order; surplus shifting between orders that share a token can be penalized and lead to slashing — [CoW competition rules](https://docs.cow.fi/cow-protocol/reference/core/auctions/competition-rules) [fetched]
- CoW AMM: solvers bid to rebalance the pool when an arbitrage exists; the bid giving the most surplus to the pool wins. Surplus is measured against limit amounts like any order. CoW DAO claims over $100,000 surplus captured for LPs (undated) — [CoW AMM docs](https://docs.cow.fi/cow-amm); [CoW AMM for solvers](https://docs.cow.fi/cow-amm/tutorials/cow-amm-for-solvers) [fetched]
- LVR (loss-versus-rebalancing) is the cost CPMM LPs pay to arbitrageurs, defined in Milionis et al. — [arXiv 2208.06046 via CoW grant proposal](https://forum.cow.fi/t/grant-proposal-surplus-capturing-amm-study/1357) [fetched]
- 1inch Fusion: signed orders filled by "resolvers" in a Dutch auction; resolvers pay gas; Fusion+ adds cross-chain atomic swaps with hashlocks/escrows. 1inch Limit Order Protocol supports partial fills, predicates (conditions such as time or oracle price), and pre/post interaction hooks — [1inch Fusion docs](https://portal.1inch.dev/documentation/fusion/introduction) [canonical, not fetched]
- 0x: Swap API and RFQ (market makers sign quotes); Permit2/"gasless" API; settler contracts — [0x docs](https://0x.org/docs) [canonical, not fetched]
- Velora (ex-ParaSwap): Delta, an intent mode where agents compete to fill; also classic routing — [Velora docs](https://doc.velora.xyz) [canonical, not fetched]
- Bebop: RFQ with market makers, many-to-one and one-to-many trades in one quote (JAM settlement); Odos: multi-input, multi-output "Smart Order Routing" in a single path solve — [Bebop docs](https://docs.bebop.xyz); [Odos docs](https://docs.odos.xyz) [canonical, not fetched]
- Across: cross-chain intents; relayers front the funds on the destination chain and are repaid later via an optimistic oracle (UMA) — [Across docs](https://docs.across.to) [canonical, not fetched]

**DODO PMM, Lifinity, TWAMM**
- DODO Proactive Market Maker: an oracle-aided pricing formula that concentrates liquidity around an external price — [QuickNode builders guide](https://www.quicknode.com/builders-guide/tools/dodo-by-dodo-foundation) [fetched, old profile]
- Lifinity (Solana): oracle-priced PMM with concentrated liquidity and automatic rebalancing to reduce impermanent loss; said to be 5th of 14 pool providers on Jupiter and above $1B total volume (undated) — [Lifinity deep dive](https://iwritestuff.substack.com/p/to-lifinity-and-beyond-a-deep-dive) [fetched, undated, likely 2022–2023]
- TWAMM: Paradigm's time-weighted AMM splits a large order into infinitely many small virtual orders executed against the pool over time, with lazy evaluation on each interaction — [Paradigm TWAMM](https://www.paradigm.xyz/2021/07/twamm) [canonical, not fetched; 2021]. Uniswap v4 shipped a TWAMM example hook — [v4-periphery TWAMM](https://github.com/Uniswap/v4-periphery) [canonical, not fetched]

**Algorand: Tinyman v2, Pact, Humble, Folks, Haystack**
- Tinyman TVL about $5.03M as of Oct 29 2026 (down 23% in 30 days); 30-day volume $14.15M on one DefiLlama page versus $4.43M on the chain table (conflict) — [DefiLlama Tinyman](https://defillama.com/dex/tinyman); [DefiLlama Algorand DEXes](https://defillama.com/dexs/chain/algorand) [fetched]
- Algorand 30-day DEX volume about $16.8M with Tinyman about $13M (Oct 2026, citing DefiLlama) — [Hokanews](https://www.hokanews.com/2026/10/algorand-dex-trading-volume-reaches-619.html) [fetched, secondary]
- Pact 30-day volume about $590K (DefiLlama chain table) versus about $3.8M (Hokanews): conflict. Humble shows no figures on DefiLlama — [DefiLlama Algorand DEXes](https://defillama.com/dexs/chain/algorand) [fetched]
- Tinyman roadmap lists "Adjustable Trading Fees" for Q3 2026 — [Tinyman](https://tinyman.org/) [fetched]
- Tinyman v2: constant product; fee `total_fee_share` bps on input (default 30, ALGO/USDC 36); pool is a logicsig whose address is a pure function of (app, asset1, asset2), so on-chain discovery needs no registry; supports fixed-input and fixed-output swaps; built-in flash loan and flash swap. Pact: constant product and stableswap pools, fee on output, factory registry in boxes — [local: research/venues.md](../../research/venues.md) [local, verified]
- Haystack Router: off-chain smart order routing across Algorand DEXes and LST protocols; executes atomic multi-venue swaps; routes are outer transactions with a signed payload. Akita already integrates it as an ARC-58 plugin — [local: research/router.md](../../research/router.md); Haystack Router skill description [local]
- Folks Finance: no evidence found this session of a native Folks spot DEX in 2026 — see Gaps.

### Inferences
- The 2025–2026 venue winners differ by chain, but all of them move complexity out of the pool and into a shared vault plus pluggable logic. The kernel's "pools are accounts, settle checks at the end" shape matches v4/Balancer v3/Ambient flash accounting.
- Algorand spot volume (about $15–17M per 30 days) is tiny next to Solana prop AMMs ($19.8B in one month). So the kernel should first be easy for aggregators (Haystack) to quote and route, because aggregators carry nearly all flow on high-volume chains.

### Gaps
- No reliable 2026 UniswapX volume or share figure.
- No current Curve, Balancer v3, Maverick, Ambient, LFJ, Orca, Raydium, Phoenix, or Lifinity volume figure was fetched this session (the search budget was used on higher-priority items).
- Blockworks prop AMM article could not be fetched (HTTP 429); prop AMM mechanism details rely on snippets and prior knowledge.
- No 2026 data on whether Ambient and Lifinity are still active; Ambient's team moved focus to other chains in 2025 (unverified).
- Folks Finance swap product: not found.
- Humble DEX: no volume or TVL figures.

---

## Which features drive the most volume and user preference today?

### Takeaway
Order flow, not liquidity design, decides volume. On Solana, oracle-priced proprietary AMMs that update quotes every block took about 71% of DEX volume (Feb 2026), all via aggregators. On Ethereum, aggregator and intent front-ends (Kyber, CoW, 0x, 1inch) carry most retail flow, and concentrated liquidity plus hooks (v4) and lending-integrated liquidity (Fluid) lead the AMM side.

### Cited Findings
- Prop AMMs = 71% of Solana DEX volume (Feb 2026, Syndica) — [SolanaFloor](https://solanafloor.com/news/prop-amms-on-solana-bison-fi-ends-humidi-fi-s-dominance-with-11-5-b-volume)
- $19.8B prop AMM volume in March 2026 — [SolanaFloor](https://solanafloor.com/news/bison-fi-leads-prop-amm-volume-for-9-straight-weeks)
- Prop AMM leadership changed within one month (HumidiFi over 68% to about 26–36%; BisonFi to over 34%) — [Step Data](https://stepdata.substack.com/p/prop-amms-on-solana-bisonfi-ends). This shows flow follows the best quote, with no LP loyalty.
- Blockworks frames Solana DEX winners as "all about order flow" — [Blockworks Research](https://app.blockworksresearch.com/unlocked/solana-dex-winners-all-about-order-flow) [title/snippet only]
- Jupiter about 95% of Solana aggregator volume — [eco.com](https://eco.com/support/en/articles/13314092-best-dex-aggregators-in-2026-1inch-jupiter-paraswap-and-more) [secondary]
- Ethereum aggregator share is contested (Kyber 31%, CoW 22%, 1inch 15% in Apr 2026) — [The Block](https://www.theblock.co/news/defi/2026-04-15-ethereum-dex-aggregator-competitive-kyber-cowswap-gain-397278)
- Incentives move aggregator share quickly: 1inch 32% → 60% (Mar → May 2025) and then down to 15% once incentives ended — [The Block 2025](https://www.theblock.co/post/356650/1inch-dex-aggregator-60-market-share-solana-expansion); [The Block 2026](https://www.theblock.co/news/defi/2026-04-15-ethereum-dex-aggregator-competitive-kyber-cowswap-gain-397278)
- Fluid DEX (lending-integrated liquidity) self-reports #2 on Ethereum by daily volume and fees — [Fluid PR toolkit](https://fluid-instadapp.notion.site/Fluid-PR-Toolkit-271ced1dcc21806ead66e151f17b44dc)
- Hooks went from single-digit to double-digit percent of v4 volume in mid/late 2026 — [KuCoin](https://www.kucoin.com/blog/en-uniswap-v4-captures-arc-and-robinhood-chain-volume-as-hooks-drive-liquidity) [low-medium quality]
- Hyperliquid spot CLOB: $3.6B per 30 days (Oct 2026), small next to its perps — [DefiLlama](https://defillama.com/protocol/hyperliquid-spot-orderbook?denomination=HYPE)

### Inferences
- The two features with the clearest volume pull are (1) oracle- or operator-priced quotes that refresh cheaply every block and (2) aggregator/intent front-ends. Both need the venue to be quotable off-chain and fillable atomically on-chain.
- Concentrated or binned liquidity remains the default for long-tail and volatile pairs (Meteora DLMM for memecoins, Orca for majors).
- Lending-integrated liquidity (Fluid smart collateral/debt, Balancer boosted pools) is a real differentiator on EVM. It needs the kernel to let one account be both a lending position and pool inventory in the same settle.

### Gaps
- No per-feature volume split (for example share of v4 volume by hook type, or Jupiter volume by RFQ vs AMM routes).

---

## What do aggregators need from a venue?

### Takeaway
Aggregators need deterministic, cheap, simulatable quotes; exact-in and exact-out swaps with min-out/max-in limits; low and predictable fees and compute; no extra transfers (swap-what-was-sent); and composability inside one atomic route. RFQ and intent systems add signed quotes with expiries and partial fills.

### Cited Findings
- Jupiter limit and recurring orders use a create → sign → execute API pattern — [Jupiter dev docs](https://dev.jup.ag/llms.txt)
- Balancer publishes a dedicated aggregator integration guide for boosted pools and buffers; buffers price at `previewDeposit`/`previewMint` so routers can quote wrap/unwrap legs exactly — [Balancer aggregators guide](https://docs.balancer.fi/integration-guides/aggregators/boosted-pools.html); [buffer](https://docs-v3.balancer.fi/concepts/vault/buffer.html)
- Curve stableswap-ng `exchange_received` lets a router send tokens first and swap after, saving a transfer — [Curve stableswap-ng docs](https://docs.curve.fi/stableswap-exchange/stableswap-ng/overview/) [canonical, not fetched]
- v4 flash accounting settles only net deltas, so multi-hop routes move tokens once — [Uniswap v4 overview](https://docs.uniswap.org/contracts/v4/overview) [canonical, not fetched]
- Prop AMMs win aggregator flow by keeping quotes fresh; they get almost all volume via aggregators — [Solana Compass HumidiFi](https://solanacompass.com/learn/Lightspeed/how-humidifi-became-solanas-largest-prop-amm) [snippet]
- CoW scores solutions by surplus against signed limit amounts — [CoW AMM for solvers](https://docs.cow.fi/cow-amm/tutorials/cow-amm-for-solvers)
- Tinyman v2 on Algorand: pool address derivable on-chain from the asset pair (no registry), fixed-input and fixed-output, and inner transactions with `Fee: 0` covered by group fee pooling. Each leg costs about 3 inner transactions with an inlined venue library; the 16-inner-per-call budget gives about 8 Tinyman legs per 3-transaction group — [local: research/venues.md](../../research/venues.md)
- Haystack routes on Algorand are outer transactions with a signed payload — [local: research/router.md](../../research/router.md)
- Uniswap v4 permissions live in the hook address, so a router can tell which callbacks a pool's hook runs from the address alone — [Uniswap v4 hooks docs](http://developers.uniswap.org/llms.mdx/docs/protocols/v4/concepts/hooks)

### Inferences
- Concrete venue checklist for the kernel: (1) a read-only quote method that is bit-exact with execution (simulate-able with `simulate`); (2) exact-in and exact-out entry points with `minOut`/`maxIn` and a deadline; (3) pool and hook discovery from on-chain data; (4) hook permissions readable before routing, so a router can skip pools whose hooks may revert or charge surprise fees; (5) a fixed, documented opcode/inner-transaction/reference budget per leg; (6) swap-from-credit (pay-in already counted in the group's deltas) so legs chain without extra transfers; (7) stable app IDs and a public SDK/quote endpoint.
- RFQ and intent integrators also need signature checks (ed25519 on Algorand), nonces/replay protection, expiries, and partial fill accounting.

### Gaps
- No primary source with a formal aggregator "venue requirements" list was found. The checklist above is synthesized.

---

## What LP-protection features exist?

### Takeaway
LP protection falls into five families: dynamic fees (volatility, off-peg, time-decay), oracle-priced or operator-priced quotes (DODO, Lifinity, prop AMMs, CryptoSwap internal oracle), arbitrage auctions that return LVR to LPs (CoW AMM, auction-managed AMM designs), batch auctions with uniform prices (CoW), and launch/sniper protection (Meteora fee schedulers). Prop AMMs show the strongest version: a private quote updated each block avoids most LVR.

### Cited Findings
- LVR is defined in Milionis et al. (arXiv 2208.06046) — [CoW grant proposal](https://forum.cow.fi/t/grant-proposal-surplus-capturing-amm-study/1357)
- CoW AMM: solvers bid surplus to the pool for the right to rebalance it; claims over $100K surplus captured for LPs — [CoW AMM docs](https://docs.cow.fi/cow-amm)
- Meteora DLMM volatility-based dynamic fee with a published formula — [Meteora dynamic fees](https://docs.meteora.ag/product-overview/dlmm-overview/dynamic-fees)
- Meteora DAMM v2 fee scheduler and anti-sniper suite (fees start high at launch and decay) — [Meteora fee scheduler](https://docs.meteora.ag/meteoras-anti-sniper-suite-a.s.s./meteoras-anti-sniper-suite/fee-scheduler)
- Orca Whirlpools dynamic fees 1–200 bps — [Venum comparison](https://docs.venum.dev/guide/solana-dex-comparison) [secondary]
- v4 dynamic-fee pools let a hook set the fee per swap — [Uniswap v4 hooks docs](http://developers.uniswap.org/llms.mdx/docs/protocols/v4/concepts/hooks) (lists dynamic fees as a hook use)
- DODO PMM and Lifinity price from an external oracle — [QuickNode](https://www.quicknode.com/builders-guide/tools/dodo-by-dodo-foundation); [Lifinity deep dive](https://iwritestuff.substack.com/p/to-lifinity-and-beyond-a-deep-dive)
- Curve CryptoSwap uses an internal EMA oracle and dynamic `mid_fee`/`out_fee`; stableswap-ng raises fees off-peg — [Curve docs](https://docs.curve.fi/stableswap-exchange/stableswap-ng/overview/) [canonical, not fetched]
- Liquidity Book variable fee grows with a volatility accumulator — [LFJ docs](https://docs.lfj.gg/concepts/concentrated-liquidity) [canonical, not fetched]
- Hyperliquid HIP-2 runs a protocol-owned market-making strategy, so new books have liquidity without third-party LPs — [HIP-2 docs](https://hyperliquid.gitbook.io/hyperliquid-docs/hyperliquid-improvement-proposals-hips/hip-2-hyperliquidity)
- Balancer boosted pools add lending yield to LP returns, and Fluid smart collateral/debt stack swap fees on lending yield — [Balancer boosted](https://docs.balancer.fi/concepts/explore-available-balancer-pools/boosted-pool.html); [Fluid guide](https://www.dextools.io/tutorials/what-is-fluid-protocol-instadapp-lending-dex-guide-2026) — these offset LVR rather than reduce it.
- Bunni (v4 hook LP venue with rebalancing/"surge" fees) shut down in 2026, cutting v4 TVL — [Datawallet (zh)](https://www.datawallet.com/zh/隐蔽性/uniswap-v4-explained). This shows complex hook LP logic carries real risk.

### Inferences
- The kernel needs: a hook that sets the fee before the swap (from volatility state, time since last trade, oracle deviation, or launch schedule); trusted price inputs (oracle account read or operator-signed price); and a way to give the first trade of a block/round to an auction winner whose bid goes to LPs (an "arb slot" or batch).
- On Algorand there is no mempool priority auction in the Solana/EVM sense, and blocks are about 2.8s with instant finality. So "first trade per round" logic can key off the round number. A per-round state slot in the pool is cheap.

### Gaps
- No 2026 data on how much LVR prop AMMs or CoW AMM actually save versus CPMMs.
- No fetched source on Uniswap Foundation/Sorella "Angstrom" or auction-managed AMM (am-AMM) live status in 2026.

---

## Which order types exist on-chain?

### Takeaway
All of these exist on-chain today: market (exact-in, exact-out), limit (on-chain book, keeper-triggered, or range/"knockout" liquidity), stop/trigger (keeper-triggered on USD price or market cap), TWAP/DCA (keeper-split or TWAMM virtual orders), RFQ (signed maker quotes), Dutch-auction intents (UniswapX, 1inch Fusion), batch auctions (CoW), and cross-chain intents (Across, Fusion+). Native CLOBs (Phoenix, Hyperliquid) add post-only, IOC and FOK flags.

### Cited Findings
- Limit orders with price or market-cap triggers; DCA V2 with 0.03%/0.1% fees — [Jupiter limit](https://docs.jup.ag/user-docs/trade/swap/limit-orders); [Jupiter recurring](https://docs.jup.ag/user-docs/trade/swap/recurring-orders)
- RFQ: JupiterZ — [Jupiter skill](https://skills.cat/skills/jup-ag/agent-skills/integrating-jupiter); 0x RFQ, Bebop — [0x docs](https://0x.org/docs); [Bebop docs](https://docs.bebop.xyz) [canonical, not fetched]
- Dutch-auction intents with exclusive RFQ window: UniswapX — [UniswapX overview](https://docs.uniswap.org/contracts/uniswapx/overview) [canonical, not fetched]; 1inch Fusion — [1inch docs](https://portal.1inch.dev/documentation/fusion/introduction) [canonical, not fetched]
- Batch auctions with uniform clearing price and solver competition: CoW — [CoW competition rules](https://docs.cow.fi/cow-protocol/reference/core/auctions/competition-rules)
- On-chain CLOB with price-time priority: Hyperliquid spot — [DefiLlama/Hyperliquid](https://defillama.com/protocol/hyperliquid-spot-orderbook?denomination=HYPE); Phoenix — [Phoenix repo](https://github.com/Ellipsis-Labs/phoenix-v1) [canonical, not fetched]
- TWAMM virtual orders — [Paradigm](https://www.paradigm.xyz/2021/07/twamm) [canonical, not fetched; 2021]
- Range orders as limit orders: Ambient knockout liquidity — [Ambient docs](https://docs.ambient.finance) [canonical, not fetched]; one-sided bin liquidity in DLMM/Liquidity Book acts the same way when price crosses the bin — [Meteora DLMM](https://docs.meteora.ag/product-overview/dlmm-overview/dynamic-fees) [fetched, inferred use]
- 1inch Limit Order Protocol: partial fills, predicates, pre/post interactions — [1inch docs](https://portal.1inch.dev/documentation/fusion/introduction) [canonical, not fetched]

### Inferences
- Most "order types" off a CLOB are signed orders plus a keeper/filler plus an atomic settle check. One kernel primitive covers limit, stop, TWAP slices, RFQ and Dutch auctions: "verify signed order, compute allowed amount for now, move funds, check limits at settle".
- ARC-58 wallets with execution keys and allowances (already in Akita) are a natural fit for keeper-triggered limit/DCA: the user pre-authorizes a bounded plugin call instead of signing each slice.

### Gaps
- No 2026 volume figures for on-chain limit/DCA order flow (Jupiter trigger/recurring) or TWAMM hooks.

---

## Feature list

One line per feature, with product examples.

1. Exact-in swap with min-out and deadline — every AMM/aggregator (Uniswap, Curve, Tinyman, Jupiter).
2. Exact-out swap with max-in — Uniswap v4, Balancer v3, Tinyman v2 (fixed-output), Jupiter ExactOut.
3. Multi-hop routing with net settlement — Uniswap v4 flash accounting, Balancer v3 Vault, Ambient long-form, Odos.
4. Multi-input / multi-output swaps — Odos, Bebop JAM, Balancer batch swaps.
5. Singleton vault with internal claims (no token moves between hops) — Uniswap v4 ERC-6909, Balancer v3, Ambient surplus balances.
6. Native gas token without wrapping — Uniswap v4 native ETH; Algorand ALGO in Tinyman/Pact.
7. Constant-product pools — Uniswap v2-style, Tinyman v2, Pact, Raydium AMM/CPMM.
8. Stable-curve pools (amplified) — Curve StableSwap/stableswap-ng, Pact stableswap.
9. Volatile-pair repegging curves with internal oracle — Curve CryptoSwap/tricrypto.
10. Concentrated liquidity (ticks) — Uniswap v3/v4, Orca Whirlpools, Raydium CLMM.
11. Binned liquidity with constant-sum bins — LFJ Liquidity Book, Meteora DLMM, Maverick.
12. Auto-moving liquidity (bin modes, rebalancing) — Maverick modes, Lifinity rebalancing, Bunni (closed).
13. Mixed ambient + concentrated liquidity in one pool — Ambient.
14. Custom curves via hooks (hook takes the swap, returns its own delta) — Uniswap v4 return-delta hooks, Balancer v3 hook-adjusted amounts.
15. Hook callbacks on initialize/add/remove/swap/donate — Uniswap v4, Balancer v3.
16. Hook permission discovery before routing — Uniswap v4 address-encoded flags.
17. Dynamic fees (volatility) — Meteora DLMM, LFJ, Orca, Uniswap v4 dynamic-fee hooks.
18. Dynamic fees (off-peg / imbalance) — Curve stableswap-ng, CryptoSwap.
19. Time-scheduled fees and anti-sniper launch protection — Meteora DAMM v2 fee scheduler.
20. Hook/protocol fees taken on swap — Uniswap v4 hook fees, Tinyman protocol share, Pact treasury fee.
21. Oracle-priced pools (external price) — DODO PMM, Lifinity.
22. Operator-priced proprietary AMMs (private quote updated every block) — HumidiFi, BisonFi, Tessera V, SolFi, GoonFi.
23. Rate-provider / yield-bearing tokens in pools — Curve stableswap-ng rate oracles, Balancer boosted pools.
24. Wrap/unwrap buffers for yield tokens inside the vault — Balancer v3 liquidity buffers.
25. Lending-integrated liquidity (LP as collateral, debt as liquidity) — Fluid smart collateral / smart debt.
26. Flash loans and flash swaps — Uniswap v4 (unlock), Balancer v3, Tinyman v2.
27. Donate to in-range LPs — Uniswap v4 `donate`.
28. Swap-from-prepaid-input (no extra transfer) — Curve `exchange_received`, Uniswap v4 `sync`/`settle`.
29. Read-only quote that matches execution — all aggregator-friendly venues; Tinyman on-chain quote verified in local research.
30. Aggregator / smart order routing — Jupiter, 1inch, 0x, Kyber, Velora, Odos, Haystack Router.
31. RFQ with market-maker signed quotes — JupiterZ, 0x RFQ, Bebop, UniswapX exclusive fills.
32. Dutch-auction intents with filler competition — UniswapX, 1inch Fusion.
33. Gasless swaps (filler/relayer pays fees) — UniswapX, 1inch Fusion, Jupiter Ultra, 0x gasless.
34. Batch auctions with uniform clearing price and coincidence of wants — CoW Protocol.
35. LVR-capturing AMM (arb rights auctioned, surplus to LPs) — CoW AMM.
36. MEV protection (private orderflow, no public sandwichable swap) — CoW, UniswapX, 1inch Fusion, MEV Blocker.
37. On-chain limit orders (keeper-triggered on price or market cap) — Jupiter Trigger, 1inch Limit Order Protocol.
38. Range/knockout liquidity as limit orders — Ambient knockout, one-sided bins in DLMM/LB.
39. Stop / trigger orders — Jupiter Trigger V2 (USD price / market cap), 1inch predicates.
40. DCA / recurring orders — Jupiter Recurring V2.
41. TWAMM (continuous virtual order execution) — Paradigm TWAMM, Uniswap v4 TWAMM hook.
42. Partial fills — 1inch LOP, CLOBs (Phoenix, Hyperliquid), UniswapX (some order types).
43. On-chain CLOB with price-time priority, post-only/IOC/FOK — Phoenix, Hyperliquid spot.
44. Protocol-run market maker seeding new books — Hyperliquid HIP-2.
45. Token launch / bonding curves that graduate to pools — Meteora DBC, Raydium LaunchLab, Hyperliquid HIP-1 deploy auction.
46. Cross-chain intents — Across, 1inch Fusion+, UniswapX cross-chain.
47. Permissioned / programmable pools (who can swap or add) — Maverick v2 programmable pools, Uniswap v4 hooks (`beforeSwap` allowlist).
48. Price oracle output from the pool (TWAP/EMA) — Curve EMA oracle, Uniswap oracle hooks.

## Kernel requirements

The primitive each feature needs, mapped to the Algorand kernel (atomic group, pools and wallets as accounts, modules act, settle checks every touched account at the end). Numbers refer to the Feature list.

- **K1 Net-delta ledger per (account, asset) across the group, checked at settle** — needed by 3, 4, 5, 26, 28, 34. Every module writes credits/debits; settle asserts each touched account ends solvent and each pool's invariant/limits hold. This is the v4/Balancer v3 "flash accounting" equivalent.
- **K2 Internal claim balances (ERC-6909-style) held in the vault/escrow** — needed by 5, 28, 30. Lets routers and frequent traders skip ASA transfers and opt-in costs between hops.
- **K3 Exact-in and exact-out swap entry with `minOut`/`maxIn`, deadline (round or timestamp)** — needed by 1, 2, 29, 30. Exact-out needs each curve to expose an inverse quote.
- **K4 Pluggable curve interface (quoteIn, quoteOut, apply) per pool** — needed by 7–13, 21, 22. Includes constant product, stableswap (A param), CryptoSwap-like repeg, ticks, bins.
- **K5 Hook callbacks with permission flags readable on-chain** — needed by 14, 15, 16, 47. Before/after for initialize, add, remove, swap, donate; flags stored in pool state (Algorand has no address mining; store a bitmask and expose it in the quote method).
- **K6 Hook return deltas (hook may change amounts in/out and charge its own fee)** — needed by 14, 20, 24, 35. Bounded by settle: a hook's delta must be backed by a real account balance by the end of the group.
- **K7 Fee override per swap from a hook (dynamic fee)** — needed by 17, 18, 19. Inputs: volatility accumulator, time since last trade, oracle deviation, launch schedule, pool imbalance.
- **K8 Per-pool mutable state slots for hooks/curves (volatility accumulator, last round, EMA price)** — needed by 9, 17, 19, 41, 48. Boxes keyed by pool; cheap per-round writes.
- **K9 Trusted price input: oracle account read and/or operator-signed price update** — needed by 21, 22, 35, 39. Prop AMM support needs a very cheap "update price" call by the operator and a check that the price is from this round (staleness bound).
- **K10 Signed-order verification (ed25519) with nonce/replay protection, expiry, and partial-fill tracking** — needed by 31, 32, 33, 37, 39, 40, 42. One primitive covers RFQ, limit, stop, DCA slices and Dutch auctions: verify signature, compute the amount allowed now (decay curve, slice schedule), move funds, record filled amount.
- **K11 Delegated execution / keeper authority with bounds** — needed by 33, 37, 39, 40, 41. On Akita this is ARC-58 execution keys and allowances; the filler pays fees via group fee pooling (gasless for the user).
- **K12 Batch settlement: many orders, one uniform clearing price per pair, matched before AMM legs** — needed by 34, 36. The settle step verifies each order's limit is met at the batch price and that net flows balance; the solver is chosen off-chain.
- **K13 Arb-right auction / first-trade-per-round slot with proceeds to LPs** — needed by 35, 36. Pool records the round of its last rebalance; only the auction winner (signed by the pool's auction contract) trades first in a round, and the bid is donated to LPs.
- **K14 Donate to LPs** — needed by 27, 35. Credit fees or auction proceeds to the pool's LP accounting without a swap.
- **K15 Lazy time-based execution (TWAMM virtual orders) evaluated on next touch** — needed by 41. Pool state stores sell rates per direction and the last evaluated round; every interaction first settles accrued virtual trades.
- **K16 Range/one-sided liquidity that converts and can be withdrawn as filled** — needed by 11, 38. Bins/ticks with one-sided deposits; a "knockout" flag that removes liquidity once crossed.
- **K17 Order book matching module (price-time priority, post-only/IOC/FOK, partial fills, cancel)** — needed by 42, 43. Optional; Algorand box limits and opcode budgets make a full CLOB expensive, but a small per-pair book with maker escrow is possible.
- **K18 Yield-bearing token rate providers and wrap/unwrap buffers** — needed by 23, 24. Curve reads a rate per coin; buffer modules convert at the lending protocol's exchange rate inside the same group.
- **K19 Cross-module account sharing (an LP account is also a lending position)** — needed by 25. The settle step must check both the pool invariant and the lending health factor on the same account.
- **K20 Flash loan/flash swap (take now, repay by settle)** — needed by 26. Falls out of K1 if settle is the only solvency check.
- **K21 Deterministic read-only quote methods that match execution, plus a fixed resource budget per leg** — needed by 29, 30. Must work under `simulate`; publish opcode, inner-transaction (16 per app call, 256 per group) and reference counts per leg; on-chain pool discovery from asset pair.
- **K22 Fee and protocol-fee routing (LP fee, protocol share, hook fee, router/referral fee)** — needed by 20, 30. Jupiter's 0–0.5% Ultra fee and Tinyman/Pact protocol shares show integrators expect a referral/fee slot.
- **K23 Native ALGO as a first-class asset (no wrapped ALGO)** — needed by 6. MBR-aware: settle must keep every account above its minimum balance.
- **K24 Pool access control hook (allowlist, KYC gate, launch window)** — needed by 19, 45, 47. Akita gates fit here.
- **K25 Launch curves that graduate to a standard pool** — needed by 45. A bonding-curve module plus a migrate step that seeds a pool atomically.
- **K26 Pool price oracle output (EMA/TWAP) readable by other modules** — needed by 9, 48, and by lending/perps modules that price collateral from the DEX.
- **K27 Cross-chain intent settlement (escrow + hashlock or relayer repayment)** — needed by 46. Out of scope for a single-chain kernel, but signed orders (K10) and escrow accounts make it possible later.
