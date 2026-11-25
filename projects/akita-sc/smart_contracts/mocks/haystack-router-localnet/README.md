# MOCK Haystack Router (LocalNet only)

A stand-in for [Haystack Router](https://github.com/TxnLab/haystack-router) so the apps' Haystack swap path runs
on LocalNet. **It is not Haystack's code and contains none of it.** It reproduces only the public interface our code
uses:

- the HTTP API of `@txnlab/haystack-router` v2 (MIT): `GET /fetchQuote` and `POST /fetchExecuteSwapTxns`, in the
  SDK's response shapes;
- the route shape and finalize call of Haystack's ORDER_ROUTER v4 (MainNet app 3757715482), as the live API
  returns them: prefix calls (selector `a83187ea`) and a finalize call (selector `871a0354`) sent by a fresh
  per-swap account whose key goes out as a `secret_key` signature, with the user's input (a pay/axfer to the router)
  right before finalize and carrying every fee of the group. Finalize arg 1 holds the input and output asset ids
  (after a uint16 length), arg 4 is 93 bytes of terms (input index, output index and mode in the first three
  bytes, minAmountOut at 3, expected output at 11, beneficiary at 29, referrer at 61).

The router's own route encoding (arg 3) and the plain-JSON `txnPayload` (iv `"mock"`) are mock inventions.

Like Haystack's router, the mock's finalize takes its input from the transaction right before it (to the router,
no close-out or clawback, any sender) and pays the output to the beneficiary. An Akita wallet re-sends that input
from Haystack's per-swap account, which its HaystackRouterPlugin funds (`plugin-flow.e2e.spec.ts`, akita-rn
`services/haystackPluginSwap.ts`, akita-desktop `services/swap/haystack-plugin.ts`).

## Parts

| Part | File |
|---|---|
| Router app (PuyaTs) | `contract.algo.ts` |
| Routing engine and group builder | `scripts/lib/mock-haystack.ts` |
| HTTP API | `scripts/mock-haystack-server.ts` |
| LocalNet deploy (Tinyman pools, router app) | `scripts/deploy-mock-haystack.ts` |
| End-to-end tests | `mock-haystack.e2e.spec.ts`, `plugin-flow.e2e.spec.ts` (through the HaystackRouterPlugin) |

Venues are the Tinyman v2 pools on the vendored fixture between ALGO, AKTA, USDC and any asset ids listed in
`MOCK_HAYSTACK_ASSETS`, quoted with exact off-chain Tinyman math. Routes have up to 3 hops and at most 2 split
legs over pool-disjoint paths, so the quote equals the execution within a block.

## Use

1. `npm run deploy:mock-haystack` (also run by `deploy:localnet-v2`). It writes `MOCK_TINYMAN_APP_ID`,
   `MOCK_HAYSTACK_ROUTER_APP_ID` and `MOCK_HAYSTACK_API_URL` to `.env.localnet` here and in akita-rn.
2. `npm run mock-haystack` starts the API on `http://localhost:8787/api` (akita-rn `setup-localnet.sh` starts it).
3. The apps use the mock only on LocalNet and only while those keys are set: akita-rn reads them from
   `.env.localnet`; akita-desktop gets them through `next.config.js` when `NEXT_PUBLIC_AKITA_NETWORK=localnet`.
