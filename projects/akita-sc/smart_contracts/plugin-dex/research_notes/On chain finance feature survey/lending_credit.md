# On-chain lending, credit, CDP stablecoins and fixed-rate markets (survey as of Nov 2026)

Scope: features and mechanisms of major lending and credit products, and the kernel primitive each one needs. The kernel model is: pools and wallets are accounts, modules act inside one atomic group, and a settle step checks every touched account at the end.

How to read the sources. Live search this session returned mostly secondary news sites and aggregators for 2026 figures, and those figures often conflict. Conflicts are flagged inline. Some mechanism descriptions come from protocol docs I knew before this session and did not re-fetch. Those are tagged **[docs, not re-fetched]**, with the canonical doc URL. Treat them as reliable descriptions of design, but re-check parameter values.

---

## 1. Distinctive features and mechanisms per product (with numbers)

### Takeaway
The market has moved from one shared pool (Aave v3, Compound v2) toward isolated markets plus a liquidity aggregation layer above them (Morpho Blue + vaults, Euler v2 EVK + EVC, Aave v4 hub and spoke, Fluid liquidity layer). Euler's EVC is the closest existing design to the proposed kernel: batches with deferred account and vault checks at the end.

### Cited Findings

**Market size (2026 snapshots, conflicting)**
- DeFi lending hit a record ~$55B TVL, led by Aave, Maple and Morpho (Jan 2026 article) — [The Block](https://www.theblock.co/amp/post/358368/defi-lending-hits-record-55-billion-tvl-as-aave-maple-and-morpho-lead-the-charge); [BlockEden](https://blockeden.xyz/blog/2026/01/20/defi-lending-record-55-billion-tvl-aave-morpho-maple-institutional/)
- April 2026, citing DefiLlama: Aave $25.28B TVL across 22 chains, $17.5B borrowed; Morpho $7.4B TVL, $4.82B borrowed; SparkLend $2.07B — [DexTools](https://www.dextools.io/news/top-5-crypto-lending-platforms-defi-2026)
- May 5, 2026: Aave V3 TVL fell ~38% in 30 days, from $23.75B to $14.73B; borrows down ~$5.0B; Spark TVL rose 45% to $5.53B; Morpho rose 9% to $7.50B (after the Kelp rsETH incident) — [CoinEx feed](https://www.coinex.com/en/mobile/feed/news/69f96d982fc4e696e7627f77)
- Sep 15, 2026, citing DefiLlama: Aave V3 $16.8B, SparkLend $4.9B, Morpho Blue $9.8B; 640+ lending protocols tracked, top ten hold 88% of deposits — [Eco](https://eco.com/support/en/articles/14800882-best-defi-lending-protocols-2026-tvl-rates-risk)
- Morpho TVL ~$11.48B on Oct 5, 2026 (DefiLlama via Eco) — [Eco](https://eco.com/support/en/articles/13064566-what-is-morpho-morpho-blue-vaults-and-tvl-2026); contradicted by ~$6.9B on Jun 21, 2026 — [MEXC](https://www.mexc.com/news/1162625). Likely different scope or date.

**Aave v3**
- Umbrella replaces the legacy Safety Module. Users stake aTokens (aUSDC, aWETH) and GHO. Stakers are slashed automatically when bad debt in a given asset exceeds a preset threshold; no DAO vote is needed — [Aave docs](https://aave.com/docs/aave-v3/umbrella); [CryptoSlate](https://cryptoslate.com/aave-dao-activates-on-chain-slashing-mechanism-with-umbrella-launch/); [LlamaRisk on Umbrella slashing](https://governance.aave.com/t/llamarisk-insights-umbrella-coverage-principles-and-slashing-logic/23527)
- The old Safety Module was never slashed, even after bad-debt events such as the 2022 Curve exploit, because governance chose not to trigger it — [CryptoSlate](https://cryptoslate.com/aave-dao-activates-on-chain-slashing-mechanism-with-umbrella-launch/)
- Umbrella coverage is Ethereum-only by default; other deployments need opt-in by governance — [Forklog](https://forklog.com/en/news/no-safe-harbours-left-in-defi-lessons-from-aave-and-kelp); [ARFC activation](https://governance.aave.com/t/arfc-aave-umbrella-activation/21521)
- Launch date conflict: one glossary says June 5, 2025; a Feb 2026 article reports launch — [Spark glossary](https://www.spark.money/glossary/safety-module); [Blockworks](https://www.blockworks.com/news/umbrella-reshapes-aave-staking)
- Core v3 mechanics **[docs, not re-fetched]** — [Aave v3 docs](https://aave.com/docs/aave-v3/overview):
  - **E-mode**: a category of correlated assets (stables, ETH/LSTs) gets higher LTV and liquidation threshold when the user borrows only inside the category.
  - **Isolation mode**: a new asset can be collateral only alone, can borrow only listed stables, and has a global debt ceiling.
  - **Siloed borrowing**: a risky borrow asset must be the only borrowed asset in the position.
  - Supply caps and borrow caps per asset.
  - **Flash loans**: borrow any amount and repay plus fee in the same transaction.
  - **Credit delegation**: a supplier approves another address to borrow against the supplier's collateral (`approveDelegation`).
  - **Liquidation**: health factor < 1 lets a liquidator repay up to 50% of debt (100% below HF 0.95 or for small positions, after v3.3) and take collateral plus a fixed bonus per asset.
  - **GHO**: a stablecoin minted by Aave itself through "facilitators" with mint caps.
  - **Bad debt deficit tracking (v3.3)**: when a position has no collateral left, its residual debt is recorded as a "deficit" per reserve and can be burned by Umbrella.
  - **Spark** (SparkLend) is an Aave v3 fork run by Sky, with USDS/DAI supplied directly by Sky.

**Aave v4 (hub and spoke)**
- Launched on Ethereum mainnet March 30, 2026. Liquidity is concentrated in hubs that serve many spoke markets through credit lines — [The Block](https://www.theblock.co/post/395617/aave-v4-launches-ethereum-mainnet)
- Genesis config: 3 hubs (Core, Prime, Plus) serving 10 spokes — [Aave governance: v4 adoption paths](https://governance.aave.com/t/aave-v4-adoption-paths/24237)
- Each spoke has its own collateral rules and risk parameters. New spokes were initially gated by DAO governance — [Bitcoin.com](https://news.bitcoin.com/aave-v4-launch-explained-hub-and-spoke-model-new-partners-and-what-changes-for-borrowers); [Bankless](https://www.bankless.com/read/news/aave-labs-launches-v4-hub-and-spoke-lending-markets-on-ethereum.md)
- Initial assets included USDT, USDC, EURC, XAUt, cbBTC, frxUSD, USDG and LST/LRT assets from Lido, EtherFi, Kelp, Ethena, Lombard — [Bitcoin.com](https://news.bitcoin.com/aave-v4-launch-explained-hub-and-spoke-model-new-partners-and-what-changes-for-borrowers)
- Adoption was slow: V3 still held most of Aave's TVL in May 2026 (single secondary source) — [DexTools](https://www.dextools.io/news/aave-v4-hub-spoke-launch-rwa-institutional-lending-pt)
- Avalanche deployment July 15, 2026, one hub with three spokes (secondary source) — [KuCoin blog](https://www.kucoin.com/blog/en-aave-v4-launches-on-avalanche-how-the-new-hub-spoke-defi-architecture-and-13-7b-institutional-rwa-influx-impact-avax-price)

**Compound v3 (Comet)** **[docs, not re-fetched]** — [Compound III docs](https://docs.compound.finance/)
- One market = one borrowable base asset (for example USDC) plus a list of collateral assets. Collateral earns no interest and cannot be borrowed.
- Liquidation is two steps. `absorb()`: the protocol takes the whole underwater account (debt and collateral) onto its own balance sheet; the caller gets gas rewards. `buyCollateral()`: anyone buys the absorbed collateral from protocol reserves at a discount, paid in the base asset. Reserves absorb shortfall.
- Per-collateral caps; one kinked rate curve for supply and one for borrow, both driven by utilization.
- Compound paused some Ethereum markets during the Stream/Elixir event (one secondary source) — [BlockMedia](https://www.blockmedia.co.kr/research-english/1007567)

**Morpho Blue / MetaMorpho / Vaults V2**
- Pre-liquidation: opt-in per borrower. A `preLLTV` threshold below the market's LLTV starts small, incremental partial liquidations ("auto-deleverage") before the hard liquidation zone — [Morpho docs: liquidation](https://docs.morpho.org/learn/concepts/liquidation)
- Vaults V2: curators spread deposits across markets via adapters; adapters can wrap MetaMorpho v1 vaults and Morpho Blue markets. V2 vaults that allocate into legacy v1.1 vaults may not show losses in share price until the v1.1 vault records them — [Morpho help: vaults and liquidity](https://help.morpho.org/en/articles/14779745-morpho-vaults-and-available-liquidity); [Morpho curator tool suite](https://docs.morpho.org/curate/tool-suite/)
- Core design **[docs, not re-fetched]** — [Morpho docs](https://docs.morpho.org/):
  - A market is an immutable tuple (loan token, collateral token, oracle, IRM, LLTV). Anyone can create one with a governance-approved IRM and LLTV.
  - One collateral asset and one loan asset per market. Bad debt is socialized only to that market's suppliers, at the time of liquidation.
  - Liquidation incentive is a function of LLTV (lower LLTV gives a higher bonus, capped at 15%).
  - Built-in free flash loans and callbacks (`onMorphoSupply`, `onMorphoRepay`, etc.) allow one-transaction leverage.
  - Bundler: batch many actions (wrap, supply collateral, borrow, swap) in one tx; now a general multicall with adapters.
  - Authorization: an owner can authorize another address to manage positions.
  - AdaptiveCurveIRM: target utilization 90%; the curve shifts up or down over time while utilization stays off target.

**Euler v2 (EVK + EVC)**
- The EVC defers account liquidity checks and vault status checks to the end of a batch. Transient violations do not fail the batch if the final state is healthy — [Euler docs: EVC](https://docs.euler.finance/concepts/core/evc); [EVC whitepaper](https://docs.euler.finance/developers/core/ethereum-vault-connector/whitepaper)
- Each address has 256 sub-accounts for isolating positions; each sub-account can have one controller at a time — [Euler docs: EVC](https://docs.euler.finance/developers/evc); [WikiDocs (Korean)](https://wikidocs.net/323154)
- Operators: a generalized token approval. An external contract can act for a sub-account — [Euler docs: EVC](https://docs.euler.finance/developers/evc)
- Controller model: when a sub-account borrows, the borrow vault becomes its controller and gains authority over the enabled collateral set. It can block collateral withdrawal and seize collateral with `controlCollateral` during liquidation — [Euler docs: EVC](https://docs.euler.finance/concepts/core/evc)
- Lockdown mode: the owner can restrict all accounts at once — [Euler docs: EVC](https://docs.euler.finance/developers/evc)
- Stream/xUSD: one source says Euler saw no bad debt at that time; another says ~$137M at Euler. Unresolved conflict — [Arbitrum forum](https://forum.arbitrum.foundation/t/update-stream-finance-xusd-situation-and-impact-assessment/30206); [BlockEden](https://blockeden.xyz/blog/2025/11/08/m-defi-contagion/)
- **[docs, not re-fetched]** — [Euler docs](https://docs.euler.finance/introduction): each EVK vault is an ERC-4626 vault with its own oracle router, IRM, LTV table per collateral, and hooks. Liquidation uses a Dutch-auction-like discount that grows with how far the position is underwater. Euler also offers "EulerSwap", an AMM whose reserves are vault deposits that can be borrowed against.

**Fluid**
- One shared liquidity layer holds funds; lending, vaults and the DEX draw from it — [DeFi Saver help](https://help.defisaver.com/protocols/fluid/intro-to-fluid)
- Smart collateral: deposited collateral is DEX liquidity and earns trading fees. Smart debt: debt is a DEX position, so the borrower earns fees on debt. Vault types mix normal and smart collateral/debt (for example wstETH-ETH / wstETH-ETH) — [DeFi Saver vault protocol](https://help.defisaver.com/protocols/fluid/vault-protocol)
- Liquidation takes debt in debt shares; collateral and debt adjust together — [Fluid vault docs](https://docs.fluid.instadapp.io/autogenerated-docs/protocols/vault/interfaces/iVault.sol/interface.IFluidVault.html)
- TVL conflict: ~$828M (May 2026) vs $746M (Oak) vs "$4B+" (DexTools) — [Dextools tutorial](https://www.dextools.io/tutorials/what-is-fluid-protocol-instadapp-lending-dex-guide-2026); [Oak Research](https://oakresearch.io/en/reports/protocols/fluid-new-defi-standard-unify-dex-lending)
- **[docs, not re-fetched]**: Fluid vaults use a tick-based liquidation design that liquidates many positions in one price range at once, which permits very high LTVs (~90%+) — [Fluid docs](https://docs.fluid.instadapp.io/)

**Kamino (Solana)**
- Up to 32 elevation groups per market; each reserve opts into up to 20 groups. Groups are for correlated assets (stables, LST vs SOL, wrapped vs native). Leaving the group or borrowing outside it reverts to reserve defaults — [Kamino docs: elevation groups](https://kamino.com/docs/curators/markets/elevation-groups)
- Kamino holds ~82.6% of Solana's tokenized-stock lending market (~$53M) — [Solana Compass](https://solanacompass.com/news/kamino-lend-holds-826-of-solanas-tokenized-stock-lending-market-at-53m)
- Solana lending reached ~$4.8B (+33%) — [Yahoo Finance](https://finance.yahoo.com/news/solana-lending-soars-33-4-150225509.html) (date not confirmed)
- Drift added yield-bearing margin (yield-bearing assets usable as perp margin) — [Blockworks](https://blockworks.co/news/yield-bearing-margin-arrives-on-drift)

**CDP stablecoins**
- *Liquity v2 (BOLD)*: borrowers set their own annual rate and can change it any time. Redemptions hit troves in order of interest rate, lowest first. Liquidation still depends on LTV — [Liquity BOLD GitHub](https://github.com/liquity/bold/); [Liquity blog](https://www.liquity.org/blog/liquity-v2-enhancing-the-borrowing-experience)
- One collateral "branch" per collateral asset, each with its own troves, stability pool and redemption logic — [Liquity BOLD GitHub](https://github.com/liquity/bold/)
- 75% of each branch's interest revenue goes to its stability pool; 25% to protocol-incentivized liquidity — [Liquity docs](https://docs.liquity.org/v2-faq/bold-and-earn); [DeFi Saver](https://blog.defisaver.com/liqity-v2-is-coming-to-defi-saver/)
- A trove owner can appoint a manager to set the rate or adjust the trove (delegation) — [Liquity BOLD GitHub](https://github.com/liquity/bold/)
- Liquity v1 **[docs, not re-fetched]**: 0% interest, one-time fee, 110% MCR, stability pool absorbs liquidated debt and gets collateral at a discount, then redistribution to other troves as a fallback; redemptions at $1 face value set a hard price floor — [Liquity v1 docs](https://docs.liquity.org/)
- *crvUSD / LLAMMA*: collateral is spread across price bands in a two-token AMM. As price falls, LLAMMA converts collateral to crvUSD; it reverses when price recovers. Losses occur only in soft liquidation. Hard liquidation at 0% health. Max 50 bands; more bands mean smaller losses; positions with 50 bands stayed in soft liquidation for months losing only a small percent of health — [Curve docs: loan concepts](https://resources.curve.finance/crvusd/loan-concepts); [LLAMMA explainer](https://docs.curve.finance/developer/crvusd/llamma-explainer)
- Sideways markets cause "churn" losses in soft liquidation — [Spark glossary](https://www.spark.money/glossary/soft-liquidation)
- *Sky / Maker (USDS, DAI)*: PSM swaps USDC 1:1 for USDS (governance-set fee). Spark PSM on other chains swaps USDS, sUSDS and USDC without slippage — [Eco: SSR deep dive](https://eco.com/support/en/articles/15254003-sky-savings-rate-deep-dive-2026-ssr-susds-usds-mechanics)
- Sky Savings Rate ~3.65% APY on May 20, 2026 (on-chain snapshot); sUSDS totalAssets ~5.82B USDS (~72% of mainnet USDS); mainnet USDS supply ~8.07B — [Eco: SSR deep dive](https://eco.com/support/en/articles/15254003-sky-savings-rate-deep-dive-2026-ssr-susds-usds-mechanics). Other sources say 3.75% or 4.75%. stUSDS (a Sky vault on Aave) showed 6.7%–11% supply APY in Apr–May 2026 — [Aavescan](https://aavescan.com/rates/sky-stusds)
- *Ethena USDe*: on Oct 10, 2025 USDe hit ~$0.65 on Binance only, because Binance priced it from its own order book; it stayed above $0.90 elsewhere and stayed overcollateralized (~$66M surplus) — [Cointelegraph](https://cointelegraph.com/news/usde-depeg-oracle-issues-ethena-founder); [21Shares](https://www.21shares.com//research/why-did-ethenas-stablecoin-remain-stable-onchain-but-depegged-on-binance)
- USDe lost $2.2B–$8.3B of supply after Oct 10 (sources conflict); ~$5.92B supply in Q1 2026 (one source, quality doubtful) — [Traders Union](https://tradersunion.com/news/cryptocurrency-news/show/1140945-the-ethena-usde-lost/); [Stablecoin Insider](https://stablecoininsider.org/ethena-usde-q1-2026-report/)

**Fixed rate and yield tokenization**
- Pendle PT collateral on lending venues topped $3B; Aave held ~$2.46B, Morpho ~$442M, Euler ~$67M (BlockBeats, July; year unclear) — [cnyes/BlockBeats](https://news.cnyes.com/news/id/6073329)
- A YT buy in a $9M Pendle pool moved PT price down 2.8% and liquidated looped positions on a Morpho market with $52M of borrows at 91.5% LLTV. No bad debt — [The Defiant](https://thedefiant.io/news/defi/pendle-oracle-move-liquidates-usd36-million)
- Aave listed a December AUSD PT on Monad with 93% borrowing limit — [Crypto Briefing](https://cryptobriefing.com/?p=390178)
- Pendle runs "PT Looping" incentives: cap raised to $15M for Aug 17–27, 2026, on PT-USD3 (Morpho) and PT-USDG (Aave and Morpho) — [Crypto Briefing](https://cryptobriefing.com/pendle-pt-looping-incentives-15m-cap/)
- LlamaRisk analysis of Aave's PT exposure — [Aave governance](https://governance.aave.com/t/llamarisk-insights-aaves-pt-token-exposure-risk-outlook/22312)
- **[docs, not re-fetched]**: Pendle splits a yield-bearing token (SY) into PT (redeems 1:1 for underlying at maturity, trades at a discount = fixed yield) and YT (all yield until maturity). Its AMM is time-aware: the curve narrows as maturity approaches. Pendle exposes a TWAP oracle for PT — [Pendle docs](https://docs.pendle.finance/). Notional (fCash, fixed-rate lending via AMM, now v3 leveraged vaults), Term Finance (sealed-bid auctions that clear one fixed rate per term), and Spectra (Pendle-like PT/YT with permissionless pools) are the other fixed-rate designs.

**Institutional and undercollateralized credit**
- Maple Syrup: short-duration loans to trading firms and fintechs, overcollateralized by liquid digital assets; underwriting is partly off-chain (Maple Direct) — [AMBCrypto](https://ambcrypto.com/is-syrupusdcs-expansion-a-sign-of-defis-credit-market-evolution/amp/); [Yearn curation report](https://curation.yearn.fi/report/maple-syrupusdc/)
- syrupUSDC ~1.06 USDC by Q1 2026; APY cited 4.89% (Mar 2026) to 6–10% (May 2026). syrupUSDC is collateral on Aave v3 and is looped — [DexTools: Maple guide](https://www.dextools.io/news/what-is-maple-finance-institutional-lending-defi-guide-2026)
- A Cayman court blocked Maple's syrupBTC launch in early 2026 — [DexTools: Maple guide](https://www.dextools.io/news/what-is-maple-finance-institutional-lending-defi-guide-2026)
- Maple TVL $1.37B (+417%) in Jan 2026 vs $272M in another Jan 2026 article (scope conflict) — [BlockEden](https://blockeden.xyz/blog/2026/01/20/defi-lending-record-55-billion-tvl-aave-morpho-maple-institutional/); [KuCoin](https://www.kucoin.com/news/flash/aave-s-defi-lending-market-share-surpasses-51-3-with-3-583b-tvl)
- **[docs, not re-fetched]**: Goldfinch (senior pool + junior backers, off-chain borrowers in emerging markets; suffered defaults 2023), Centrifuge (RWA pools, tranches as tokens, issuer-run), Clearpool (single-borrower permissionless pools, now "Credit Vaults"), Aave credit delegation (on-chain approval, off-chain trust).

**Leverage and looping products**
- **[docs, not re-fetched]**: Gearbox gives each borrower a "credit account" — a separate smart-contract account that holds borrowed funds plus collateral and may only call allowlisted adapters (DEXs, Curve, Pendle). Health is checked after each multicall ("full collateral check" at the end) — [Gearbox docs](https://docs.gearbox.finance/). DeFi Saver and Instadapp provide smart wallets with automation (auto-repay/auto-boost triggers, one-tx leverage via flash loans). Contango builds leverage on top of existing money markets with flash loans.
- I found no source for Gearbox TVL in 2026.

**Algorand: Folks Finance**
- Folks uses Chainlink price feeds for some integrations; in Aug 2026 it integrated DIA price feeds for xChain markets — [IQ.wiki](https://iq.wiki/en/wiki/folks-finance). Another source names Chainlink and Pyth — [gts.ai](https://gts.ai/defi/folks-finance). Conflict on Pyth.
- Expanded to nine chains by early 2026; in April 2026 enabled cross-chain WBTC and WETH on Algorand via xPortal — [IQ.wiki](https://iq.wiki/en/wiki/folks-finance)
- 2026 roadmap: xChain V2 and a $15M incentive program — [KuCoin](https://www.kucoin.com/news/flash/folks-finance-unveils-2026-roadmap-with-xchain-v2-and-15m-incentive-program)
- xChain has a dedicated oracle page in its technical docs (not retrieved) — [Folks xChain docs](https://docs.xapp.folks.finance/support)

### Inferences
- The kernel's "settle checks every touched account" is the same idea as Euler EVC deferred checks and Gearbox's end-of-multicall collateral check. Both prove the model works for lending. The kernel should copy the EVC's two check types: account checks (is this account solvent?) and market/vault checks (are caps and invariants respected?).
- The controller/collateral split (Euler) is a clean way for a lending module to claim authority over a wallet's collateral in other modules (AMM LP, PT) without owning it.
- The industry has converged on "isolated market + aggregation layer". A kernel that offers isolated markets as primitives and lets vaults/hubs allocate across them covers Morpho, Euler, Aave v4 and Fluid shapes.

### Gaps
- No primary-source 2026 numbers for Compound v3, Gearbox, Notional, Term, Spectra, Goldfinch, Centrifuge, Clearpool, MarginFi, Save, Drift lending TVL. Search budget ran out.
- No retrieved data on Aave v4 TVL after May 2026, or whether v4 features (dynamic risk premiums, position managers) work as designed in production.
- Folks Finance oracle design (per-asset sources, staleness rules) not retrieved. No data on other Algorand lenders (for example Messina, Lofty-style RWA lenders) found.
- GHO and Frax 2026 supply not retrieved.

---

## 2. Risk isolation and lessons from failures

### Takeaway
Most large losses came from bad collateral (unbacked, manipulable, or opaque), not from bugs in core lending math. Isolation limits the blast radius, but only if the collateral listing, oracle and caps are per market. A shared pool that lists a bad asset spreads the loss to all suppliers (Aave/Kelp 2026).

### Cited Findings
- **Kelp rsETH / Aave (Apr 18, 2026)**: attacker forged a cross-chain message on Kelp's LayerZero bridge, minted unbacked rsETH (~116,500 rsETH, ~$293M) and borrowed WETH on Aave V3 against it — [CoinDesk](https://www.coindesk.com/tech/2026/04/19/aave-records-usd6-billion-tvl-drop-as-kelp-hack-exposes-structural-risk-at-defi-lender); [Aave governance incident thread](https://governance.aave.com/t/rseth-incident-2026-04-18/24481?page=4)
- Aave's modeled bad debt: $124M–$230M, depending on how Kelp allocates its loss — [The Defiant](https://thedefiant.io/aave-models-usd124m-to-usd230m-in-bad-debt-from-kelp-exploit-layerzero-and-kelp-continue-to); [Unchained](https://unchainedcrypto.com/aave-faces-up-to-230-million-in-losses-after-kelp-dao-exploit-incident-report-finds/)
- Every Kelp source-chain route was 1-of-1 with the same DVN (single verifier) — [Aave governance incident thread](https://governance.aave.com/t/rseth-incident-2026-04-18/24481?page=4)
- Freezes came after the attacker had already borrowed — [Unchained](https://unchainedcrypto.com/aave-faces-up-to-230-million-in-losses-after-kelp-dao-exploit-incident-report-finds/)
- LlamaRisk: ~$181M in Aave treasury available for shortfall; Umbrella backstop much smaller (~$50M estimate) — [Cointelegraph](https://cointelegraph.com/news/aave-s-risk-manager-shares-2-scenarios-to-allocate-losses-from-kelp-dao-hack)
- Deposits fell sharply (one report: $45.6B to $29.2B) — [KuCoin](https://www.kucoin.com/news/flash/aave-loses-200m-in-bad-debt-after-kelpdao-exploit-liquidity-collapses) (secondary)
- Rescue contributors raised ~$163M toward the hole (Chinese-language source) — [OneKey](https://onekey.so/blog/ecosystem/defi-163-aave-20260424113859/)
- **Stream Finance xUSD (Nov 4, 2025)**: an external fund manager lost $93M; Stream halted withdrawals; $285M owed to lending protocols, $68M of it to Elixir. xUSD fell 77%, later to ~$0.10 — [Decrypt](https://decrypt.co/347285/stream-finance-stablecoin-plunges-77-protocol-fund-manager-loses-93-million); [Forklog](https://forklog.com/en/news/collateral-damage-from-stream-finance-hack-estimated-at-285-million)
- Stream held ~90% of deUSD supply (~$75M); Elixir's reserves were mostly Morpho loans to Stream. Elixir sunset deUSD — [The Block](https://www.theblock.co/amp/post/377961/elixir-sunsets-deusd-synthetic-stablecoin-following-stream-finance-unwinding-aims-full-redemptions); [Cointelegraph](https://cointelegraph.com/news/elixir-sunsets-stablecoin-amid-stream-finance-saga)
- Bad debt: ~$15M across Silo xUSD markets; ~$700K in a MEV Capital Morpho vault — [Arbitrum forum](https://forum.arbitrum.foundation/t/update-stream-finance-xusd-situation-and-impact-assessment/30206). Leveraged positions were not unwound in time because the oracle did not reflect the loss.
- deUSD went to zero, leaving $8.6M bad debt at Yei Finance — [BlockEden](https://blockeden.xyz/blog/2025/11/08/m-defi-contagion/)
- **Ethena USDe Binance print (Oct 10, 2025)**: a venue-specific order-book oracle priced USDe at $0.65 while it held >$0.90 elsewhere, causing liquidations on Binance — [Cointelegraph](https://cointelegraph.com/news/usde-depeg-oracle-issues-ethena-founder)
- **Pendle PT / Morpho**: a single YT buy moved PT price 2.8% and liquidated a 91.5% LLTV market; no bad debt — [The Defiant](https://thedefiant.io/news/defi/pendle-oracle-move-liquidates-usd36-million)
- **Older failures [not re-fetched]**:
  - Euler v1 (Mar 2023, ~$197M): `donateToReserves` let an attacker make its own account insolvent without a health check, then self-liquidate at a large discount. Funds were later returned — [rekt.news: Euler](https://rekt.news/euler-rekt/). Lesson: every function that changes a position must run the health check.
  - Mango Markets (Oct 2022, ~$114M): attacker pumped the thin MNGO spot price, which the oracle used, then borrowed against inflated collateral — [rekt.news: Mango](https://rekt.news/mango-markets-rekt/). Lesson: manipulable collateral needs caps and robust oracles.
  - Cream / Compound-v2 forks (2021 onward): "empty market" and exchange-rate donation attacks on newly listed markets with zero supply. Lesson: seed new markets; use virtual shares.
  - Radiant (Oct 2024, ~$50M): multisig signer devices compromised, contracts upgraded maliciously. Lesson: admin and upgrade keys are a risk as large as oracle risk.
  - Venus (BNB Chain): several oracle-related bad-debt events (LUNA 2022, XVS manipulation 2021). Lesson: freeze delisted collateral fast.

### Inferences
- Isolation must cover four things per market: collateral list, oracle, caps, and who absorbs bad debt. Morpho Blue and Liquity v2 branches do all four; Aave v3 shared pool did not, so one listing hurt all suppliers.
- Aggregation layers (MetaMorpho, Vaults V2, Aave v4 hubs, Euler Earn) re-introduce shared exposure. Curator caps per market are the real isolation boundary. Stream showed curators allocating to opaque collateral.
- Speed matters. Kelp showed that freeze after borrow is too late. A kernel should support guardian pause of new borrows per asset that takes effect within the same block, and rate limits on borrow growth (for example borrow caps that refill over time).
- Oracles on "redemption value" (for example xUSD at NAV) hide losses until the issuer reports them. Oracles on "market value" are manipulable for thin assets. Neither is safe alone for opaque collateral.

### Gaps
- No final settlement figure for the Aave Kelp loss (only April 2026 estimates).
- Final Euler exposure to xUSD is contradictory ($0 vs ~$137M).
- Venus and Radiant details are from prior knowledge only.

---

## 3. Liquidation designs and bad-debt handling

### Takeaway
Five designs dominate: fixed-bonus partial liquidation (Aave, Morpho), Dutch auction with rising discount (Euler v2, Maker Clipper), protocol absorb then sell (Compound v3), soft liquidation via AMM bands (crvUSD, Fluid ticks), and pre-liquidation (Morpho, opt-in). Bad debt goes to (a) the market's suppliers, (b) a stability pool or backstop stakers, (c) reserves/treasury, or (d) redistribution to other borrowers.

### Cited Findings
- Morpho pre-liquidation: `preLLTV` below LLTV, partial close in a cushion zone; opt-in per borrower — [Morpho docs](https://docs.morpho.org/learn/concepts/liquidation)
- crvUSD soft liquidation: gradual conversion across bands; losses only in soft liquidation; hard liquidation at 0% health; up to 50 bands — [Curve docs](https://resources.curve.finance/crvusd/loan-concepts)
- Liquity v2: stability pool per branch absorbs liquidated debt; redemptions by lowest rate — [Liquity GitHub](https://github.com/liquity/bold/)
- Aave Umbrella: automatic slashing of stakers when deficit exceeds a threshold — [Aave docs](https://aave.com/docs/aave-v3/umbrella)
- Fluid: debt-share-based liquidation of vault positions — [Fluid vault docs](https://docs.fluid.instadapp.io/autogenerated-docs/protocols/vault/interfaces/iVault.sol/interface.IFluidVault.html)
- Euler controller seizes collateral with `controlCollateral` during liquidation — [Euler docs](https://docs.euler.finance/concepts/core/evc)
- **[docs, not re-fetched]**:
  - Aave v3: close factor 50% (100% when HF < 0.95), fixed bonus per collateral (typically 4–10%), protocol takes a share of the bonus. v3.3 records deficits when collateral reaches zero — [Aave docs](https://aave.com/docs/aave-v3/overview)
  - Morpho Blue: bad debt realized at liquidation and immediately socialized to the market's suppliers (share price drops) — [Morpho docs](https://docs.morpho.org/)
  - Compound v3: `absorb` moves the account to protocol; reserves eat shortfall; `buyCollateral` sells at a discount — [Compound docs](https://docs.compound.finance/)
  - Maker/Sky Liquidations 2.0 (Clipper): Dutch auction starting above market price and falling; keepers can buy with a flash callback; "Kick" incentive; bad debt hits the Surplus Buffer, then debt auctions (MKR/SKY mint) — [Sky docs](https://developers.skyeco.com/)
  - Liquity v1: stability pool first, then redistribution of debt and collateral to all other troves — [Liquity docs](https://docs.liquity.org/)
  - Gearbox: credit account liquidated as a whole; liquidator gets a premium; loss covered by the pool's insurance/treasury then by LP share burn — [Gearbox docs](https://docs.gearbox.finance/)

### Inferences
- The kernel needs liquidation as a module action with a privileged right to move collateral between accounts when the target fails a health check at that moment. Pre-liquidation, Dutch auctions and fixed bonus are then module policies, not kernel code.
- Soft liquidation (LLAMMA, Fluid ticks) needs the lending module to own an AMM-like position for the borrower's collateral. On the kernel, this is "collateral held as an AMM pool account controlled by the lending module".
- Bad-debt handling needs an explicit "deficit" record per market and a hook to a backstop (stability pool, staker pool, reserve). Silent socialization through share price (Morpho) is simplest and keeps accounts honest.
- Liquidation in the same group as an oracle update (Pyth-style pull oracle) is needed to make liquidation fast on Algorand.

### Gaps
- No 2026 aggregate bad-debt dashboard data (Chaos Labs, LlamaRisk) retrieved beyond the incidents above.

---

## 4. Interest-rate models and oracle requirements

### Takeaway
Utilization-kinked curves (Aave, Compound) are still standard; adaptive curves (Morpho AdaptiveCurveIRM, Euler) and governance-set or user-set rates (Sky, Liquity v2) are the alternatives. Fixed rates come from separate instruments (PT, auctions), not from the pool IRM. Oracles must cover market price, exchange-rate (LST/vault) price, PT/time-based price, and pull-based fresh prices inside the same transaction.

### Cited Findings
- Liquity v2: user-set rate; redemption order by rate gives a market-driven rate — [Liquity blog](https://www.liquity.org/blog/liquity-v2-enhancing-the-borrowing-experience)
- Sky: governance-set Sky Savings Rate, encoded as a per-second rate (1.000000001136785…/s ≈ 3.65% APY, May 2026) — [Eco: SSR deep dive](https://eco.com/support/en/articles/15254003-sky-savings-rate-deep-dive-2026-ssr-susds-usds-mechanics)
- Spark borrow rate ~6–7% depending on collateral (secondary source) — [Eco: SSR deep dive](https://eco.com/support/en/articles/15254003-sky-savings-rate-deep-dive-2026-ssr-susds-usds-mechanics)
- Binance's order-book-only oracle mispriced USDe during the crash — [21Shares](https://www.21shares.com//research/why-did-ethenas-stablecoin-remain-stable-onchain-but-depegged-on-binance)
- Pendle PT oracle movement from a single trade liquidated a high-LLTV market — [The Defiant](https://thedefiant.io/news/defi/pendle-oracle-move-liquidates-usd36-million)
- Folks Finance: Chainlink and DIA (Aug 2026), possibly Pyth — [IQ.wiki](https://iq.wiki/en/wiki/folks-finance); [gts.ai](https://gts.ai/defi/folks-finance)
- **[docs, not re-fetched]**:
  - Aave/Compound: two-slope curve with a "kink" at optimal utilization (often 80–92% for stables); reserve factor takes a share of interest — [Aave docs](https://aave.com/docs/aave-v3/overview); [Compound docs](https://docs.compound.finance/)
  - Morpho AdaptiveCurveIRM: target 90% utilization; the curve's level drifts exponentially while utilization is off target — [Morpho docs](https://docs.morpho.org/)
  - Euler v2 oracle router: each vault picks adapters (Chainlink, Pyth, Redstone, Chronicle, Uniswap TWAP, fixed rate, Pendle PT) per pair — [Euler docs](https://docs.euler.finance/)
  - Aave uses CAPO (capped price oracle) for LSTs: exchange-rate growth is capped per year to stop donation-based price jumps — [Aave governance](https://governance.aave.com/)
  - Pendle PT oracles: either Pendle market TWAP or a "linear discount" oracle that moves PT toward par by maturity, ignoring market price — [Pendle docs](https://docs.pendle.finance/)

### Inferences
- The kernel should treat an IRM as a pure function `(utilization, state, dt) -> rate` stored per market, with accrual by index on every touch. Adaptive IRMs need per-market state that updates on touch.
- Oracle primitives needed: (1) push feed read (Chainlink/DIA style), (2) pull feed verified in the same group (Pyth style), (3) exchange-rate adapter reading another account's state (LST, vault share, PT), (4) TWAP from kernel AMM pools, (5) fixed/linear price, (6) caps and staleness/deviation checks. Each market binds one oracle config immutably or under timelock.
- Because the kernel hosts its own AMMs, a TWAP of those pools is cheap to provide, but thin pools are the Mango risk. Use TWAP only with low caps or as a sanity bound against an external feed.

### Gaps
- Algorand oracle availability in 2026 (Pyth pull on Algorand, Chainlink on Algorand, DIA, Gora) not verified this session.

---

## 5. What drives demand

### Takeaway
Most borrowing is leverage on yield: looping LSTs/LRTs against ETH, looping yield-bearing stables (sUSDe, sUSDS, syrupUSDC) and Pendle PTs against stables, and stablecoin borrowing against BTC/ETH. Incentive programs (Pendle PT looping) and correlated-asset modes (e-mode, elevation groups) are what make loops profitable.

### Cited Findings
- PT collateral on lending venues >$3B, with Aave ~$2.46B — [cnyes/BlockBeats](https://news.cnyes.com/news/id/6073329)
- Pendle pays PT looping incentives ($15M cap, Aug 2026) on Morpho and Aave — [Crypto Briefing](https://cryptobriefing.com/pendle-pt-looping-incentives-15m-cap/)
- syrupUSDC is supplied as collateral and looped on Aave — [DexTools: Maple guide](https://www.dextools.io/news/what-is-maple-finance-institutional-lending-defi-guide-2026)
- rsETH was among the most capital-efficient collateral on Aave, showing LRT looping demand — [Unchained](https://unchainedcrypto.com/aaves-6-6-billion-tvl-drop-exposes-structural-risk-from-liquid-restaking-tokens/)
- Kamino elevation groups exist for LST/SOL and stablecoin loops — [Kamino docs](https://kamino.com/docs/curators/markets/elevation-groups)
- Aave v4 targets RWAs and institutional credit lines (USDG, XAUt, frxUSD in genesis) — [Bitcoin.com](https://news.bitcoin.com/aave-v4-launch-explained-hub-and-spoke-model-new-partners-and-what-changes-for-borrowers)
- Tokenized stocks are a small but new collateral class (~$53M on Solana) — [Solana Compass](https://solanacompass.com/news/kamino-lend-holds-826-of-solanas-tokenized-stock-lending-market-at-53m)
- Savings products: sUSDS holds ~72% of mainnet USDS — [Eco: SSR deep dive](https://eco.com/support/en/articles/15254003-sky-savings-rate-deep-dive-2026-ssr-susds-usds-mechanics)

### Inferences
- Looping needs one-transaction leverage: flash borrow, swap, supply collateral, borrow, repay flash, with the health check only at the end. On the kernel this is the core atomic group pattern, and it is the single most important flow to make cheap.
- Correlated-asset modes (e-mode) and exchange-rate oracles are required to make LST and yield-stable loops viable at 90%+ LTV.
- PT collateral requires maturity-aware oracles and an AMM with time decay; the kernel's AMM module set should include a Pendle-like time-aware curve if PT demand is a goal.

### Gaps
- No source gives the share of total borrows that are loops. Blockworks dashboards are paywalled.
- No Algorand-specific demand data (Folks borrow mix) retrieved.

---

## Feature list

One line per feature, with product examples.

1. Pooled multi-asset lending with one cross-collateral account — Aave v3, Spark, Folks Finance, Kamino, MarginFi, Save
2. Single-borrow-asset market (many collaterals, one base) — Compound v3
3. Isolated immutable pair markets (one collateral, one loan, own oracle/IRM/LLTV) — Morpho Blue, Silo, Liquity v2 branches
4. Permissionless market creation from approved parameter sets — Morpho Blue, Euler v2, Silo
5. Curated vaults allocating across markets (caps, queues, timelocks) — MetaMorpho, Morpho Vaults V2, Euler Earn, Kamino vaults
6. Hub-and-spoke liquidity (shared hub, spokes with credit lines and own risk rules) — Aave v4
7. Shared liquidity layer for lending + DEX — Fluid
8. Correlated-asset mode (higher LTV inside a category) — Aave e-mode, Kamino elevation groups
9. Isolation mode with debt ceiling — Aave v3
10. Siloed borrowing — Aave v3
11. Supply and borrow caps — Aave, Compound v3, Morpho vaults, Euler
12. Flash loans — Aave, Morpho (free), Euler, Balancer, Maker flash mint
13. Batch / multicall with deferred health checks — Euler EVC, Gearbox multicall, Morpho bundler
14. Sub-accounts per owner — Euler (256), Gearbox credit accounts, Kamino obligations
15. Operators / position managers / delegated control — Euler operators, Morpho authorization, Liquity v2 trove managers
16. Controller/collateral model (borrow market controls collateral held elsewhere) — Euler v2
17. Credit delegation (borrow against someone else's collateral) — Aave
18. Smart collateral / smart debt (collateral or debt is AMM liquidity) — Fluid, EulerSwap
19. Fixed-bonus partial liquidation with close factor — Aave, Morpho, Kamino
20. Dutch-auction liquidation — Euler v2, Sky Clipper
21. Absorb-then-sell liquidation — Compound v3
22. Soft liquidation via AMM bands or ticks — crvUSD LLAMMA, Fluid
23. Opt-in pre-liquidation / auto-deleverage — Morpho pre-liquidation
24. Automated deleverage/repay triggers — DeFi Saver, Instadapp
25. Bad-debt deficit tracking and socialization — Aave v3.3 deficit, Morpho share-price loss
26. Backstop / insurance stakers with auto-slashing — Aave Umbrella, Liquity stability pool
27. Utilization-kinked IRM — Aave, Compound, Kamino
28. Adaptive IRM — Morpho AdaptiveCurveIRM, Euler
29. Governance-set rate — Sky stability fees and SSR
30. User-set borrow rate with redemption ordering — Liquity v2
31. CDP stablecoin minting against collateral — Sky, Liquity, crvUSD, GHO, Frax
32. Redemptions at face value (price floor) — Liquity v1/v2
33. PSM (1:1 swap with reserve stablecoin) — Sky PSM, Spark PSM, GHO GSM
34. Savings rate token (yield-bearing wrapper) — sUSDS, sDAI, sGHO, sBOLD, sUSDe
35. Delta-neutral synthetic dollar (collateral + short perp) — Ethena USDe
36. Protocol-native stablecoin facilitators with mint caps — Aave GHO
37. Yield tokenization (PT/YT split, maturity) — Pendle, Spectra
38. Fixed-rate lending via AMM — Notional
39. Fixed-rate term auctions — Term Finance
40. PT as collateral with maturity-aware oracle — Aave, Morpho, Euler
41. Permissioned / KYC pools and tranches — Maple, Centrifuge, Goldfinch, Aave Horizon/v4 RWA spokes
42. Off-chain underwritten credit with on-chain pool tokens — Maple Syrup, Clearpool
43. Credit account with allowlisted adapters — Gearbox
44. Leverage via flash-loan loop on existing markets — Contango, DeFi Saver, Instadapp
45. Cross-chain lending (collateral on one chain, borrow on another) — Folks Finance xChain
46. Exchange-rate-capped oracles for LSTs — Aave CAPO
47. Multi-source oracle router per market — Euler oracle router, Folks (Chainlink, DIA)
48. Guardian pause/freeze per asset — Aave, Compound, Morpho vault guardians
49. Yield-bearing margin for perps — Drift

## Kernel requirements

The primitive each feature needs. Numbers refer to the feature list.

| # | Kernel primitive | Needed by features |
|---|------------------|--------------------|
| K1 | **Deferred settle check per touched account**: run each account's health predicate only at end of group; allow transient insolvency inside the group | 12, 13, 18, 43, 44, 3 |
| K2 | **Deferred market/vault invariant check**: caps, debt ceilings, utilization limits checked at settle for every touched market | 9, 11, 36, 48 |
| K3 | **Health predicate registry**: an account's solvency rule is owned by its controlling module(s); kernel calls them at settle | 1, 2, 3, 8, 9, 10, 16 |
| K4 | **Controller/collateral binding**: a lending module can claim control over a wallet's positions held in other modules (AMM LP, PT, vault shares), blocking withdrawal and allowing seizure | 16, 18, 22, 40, 43 |
| K5 | **Sub-accounts**: many isolated positions per owner, cheap to create (box per sub-account on Algorand) | 14, 43 |
| K6 | **Operators / delegation**: scoped authority for another address or module to act for an account, with revocation and lockdown | 15, 17, 24, 30 |
| K7 | **Flash accounting**: modules can pay out before receiving, net balances settle at end; no fee or fee set by module | 12, 13, 44, 20 (flash-buy in auction) |
| K8 | **Share/index accounting**: supply and debt as shares with a per-market index; accrue interest on touch; virtual shares to stop empty-market and donation attacks | 1–7, 25, 34 |
| K9 | **IRM plug-in**: pure rate function plus optional per-market state (adaptive), set immutably or under timelock | 27, 28, 29, 30 |
| K10 | **Oracle layer**: push feeds, pull feeds verified in-group, exchange-rate adapters reading other accounts, TWAP of kernel AMM pools, fixed/linear (PT), caps (CAPO), staleness and deviation checks, multi-source router | 40, 45, 46, 47, all collateral pricing |
| K11 | **Liquidation right**: when a target account fails its health predicate now, a liquidating module may move debt and collateral between accounts; policy (bonus, close factor, auction curve, pre-liquidation thresholds) lives in the module | 19, 20, 21, 22, 23 |
| K12 | **Protocol-owned accounts**: a market or module can hold absorbed positions and reserves as its own account | 21, 25, 26, 33 |
| K13 | **Deficit record and loss routing**: per-market bad-debt counter, with hooks to burn backstop stake, draw reserves, or reduce share price | 25, 26, 31 |
| K14 | **Mint/burn authority with caps**: modules can mint a kernel stablecoin up to a cap (facilitator model) | 31, 33, 36, 35 |
| K15 | **Ordered position index**: sorted structure (by interest rate, by price band, by tick) that a module can walk cheaply | 30, 32, 22 |
| K16 | **AMM-held collateral**: collateral can sit in an AMM pool account controlled by the lending module (bands/ticks) | 18, 22 |
| K17 | **Time and maturity**: reliable timestamp, per-market maturity, time-aware pricing | 37, 38, 39, 40 |
| K18 | **Auction primitive**: sealed-bid or Dutch auction over a period, with clearing at settle | 20, 39 |
| K19 | **Market factory with immutable params**: create a market from an approved IRM/LLTV/oracle set; isolate collateral, oracle, caps and loss per market | 3, 4, 6 |
| K20 | **Allocator / vault module**: an ERC-4626-like share account that allocates across markets with caps, queues, timelocks, and per-market loss realization | 5, 6, 7 |
| K21 | **Access gates**: per-market allowlists (KYC, credential, plugin gate), for supply and/or borrow | 41, 42, 6 |
| K22 | **Correlated-asset categories**: per-market or per-account mode that switches the LTV table when all positions are in one category | 8, 10 |
| K23 | **Adapter allowlist for credit accounts**: borrowed funds may only touch listed modules until debt is repaid | 43 |
| K24 | **Guardian controls**: per-asset freeze of new borrows/supply effective in the same round; borrow-growth rate limits; timelocked parameter changes | 48, lessons from Kelp |
| K25 | **Cross-chain message intake**: verified inbound messages that credit collateral or debt; multi-verifier required (Kelp lesson) | 45 |
| K26 | **Automation hooks**: third-party keepers can call position actions under operator rules, with trigger conditions checked on-chain | 23, 24 |
| K27 | **Cross-module margin**: lending collateral and perp margin share one account health check | 49, 18 |

Algorand notes (inferences, not sourced): positions and sub-accounts map to boxes; settle checks must fit the group opcode budget, so health predicates should be O(positions touched), not O(all positions); pull-oracle verification and settle cost compete for the same budget; ordered indexes (K15) need a box-based sorted structure or bucketed bands.
