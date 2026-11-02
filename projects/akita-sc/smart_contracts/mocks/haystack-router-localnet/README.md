# MOCK Haystack Router (LocalNet only)

A stand-in for [Haystack Router](https://github.com/TxnLab/haystack-router) so the apps' Haystack swap path runs
on LocalNet. **It is not Haystack's code and contains none of it.** It reproduces only the public interface our code
uses:

- the HTTP API of `@txnlab/haystack-router` v2 (MIT): `GET /fetchQuote` and `POST /fetchExecuteSwapTxns`, in the
  SDK's response shapes;
- the finalize call our wallet code reads: selector `c890dc20`, more than 8 app args, arg 2 = output-asset index,
  arg 4 = `itob(minAmountOut)`, arg 6 = beneficiary account index, arg 8 = referrer account index.

The router's own route encoding, the relay key and the plain-JSON `txnPayload` (iv `"mock"`) are mock inventions.

Like Haystack's MainNet router (app 3172554435), the mock's finalize swaps from its own balance and never checks who
funded it. Its routes have the MainNet shape: the user sends the router the input and a 10,000 µALGO payment, and
the relay sends everything else. An Akita wallet re-sends those user transactions from a one-swap temporary account
that its HaystackRouterPlugin funds (`plugin-flow.e2e.spec.ts`, akita-rn `services/haystackPluginSwap.ts`).

## Parts

| Part | File |
|---|---|
| Router app (PuyaTs) | `contract.algo.ts` |
| Routing engine and group builder | `scripts/lib/mock-haystack.ts` |
| HTTP API | `scripts/mock-haystack-server.ts` |
| LocalNet deploy (Tinyman pools, router app, relay) | `scripts/deploy-mock-haystack.ts` |
| End-to-end tests | `mock-haystack.e2e.spec.ts`, `plugin-flow.e2e.spec.ts` (through the HaystackRouterPlugin) |

Venues are every live Plugin DEX pool, quoted with the Vault's `tryQuoteRoute` (swapper = the router app) as
`plugin-dex/INTEGRATION.md` tells aggregators, and Tinyman v2 pools on the vendored fixture. Routes have up to 3
hops and at most 2 split legs over pool-disjoint paths, so the quote equals the execution within a block.

## Use

1. `npm run deploy:mock-haystack` (also run by `deploy:localnet-v2`). It writes `MOCK_TINYMAN_APP_ID`,
   `MOCK_HAYSTACK_ROUTER_APP_ID` and `MOCK_HAYSTACK_API_URL` to `.env.localnet` here and in akita-rn, and
   `MOCK_HAYSTACK_RELAY_MNEMONIC` here only.
2. `npm run mock-haystack` starts the API on `http://localhost:8787/api` (akita-rn `setup-localnet.sh` starts it).
3. The apps use the mock only on LocalNet and only while those keys are set: akita-rn reads them from
   `.env.localnet`; akita-desktop gets them through `next.config.js` when `NEXT_PUBLIC_AKITA_NETWORK=localnet`.
