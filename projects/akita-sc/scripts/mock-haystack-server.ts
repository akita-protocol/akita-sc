#!/usr/bin/env node
/**
 * MOCK Haystack Router API for LocalNet (not Haystack's code; see scripts/lib/mock-haystack.ts).
 *
 *   GET  /api/fetchQuote            ?fromASAID&toASAID&amount&type&maxDepth&referrerAddress…
 *   POST /api/fetchExecuteSwapTxns  {address, txnPayloadJSON, slippage}
 *
 * Point `RouterClient({ apiBaseUrl: 'http://localhost:8787/api', algodUri: 'http://localhost', algodPort: 4001,
 * algodToken: 'a'.repeat(64) })` at it. Only fixed-input quotes. Reads its IDs and relay key from .env.localnet
 * (`npm run deploy:mock-haystack` writes them).
 *
 * Usage: npm run mock-haystack
 */
import http from 'node:http'
import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import algosdk from 'algosdk'
import { MOCK_HAYSTACK_PORT, readEnv } from './deploy-mock-haystack'
import { decodePayload, MockHaystack, minOutForSlippage, quoteResponse } from './lib/mock-haystack'

/** Used when the client sends no referrerAddress; the router only needs some account at arg 8 */
const DEFAULT_REFERRER = algosdk.ALGORAND_ZERO_ADDRESS_STRING

export function createMockHaystackServer(mock: MockHaystack) {
  return http.createServer(async (req, res) => {
    const send = (status: number, body: unknown) => {
      res.writeHead(status, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      })
      res.end(JSON.stringify(body))
    }
    try {
      const url = new URL(req.url ?? '/', 'http://localhost')
      if (req.method === 'OPTIONS') return send(204, {})
      if (req.method === 'GET' && url.pathname === '/api/fetchQuote') {
        const q = url.searchParams
        const type = q.get('type') ?? 'fixed-input'
        if (type !== 'fixed-input') return send(400, { error: 'mock Haystack supports fixed-input only' })
        const route = await mock.route(
          BigInt(q.get('fromASAID') ?? '0'),
          BigInt(q.get('toASAID') ?? '0'),
          BigInt(q.get('amount') ?? '0'),
          Number(q.get('maxDepth') ?? '3'),
        )
        if (!route) return send(400, { error: 'No route found' })
        const referrer = q.get('referrerAddress') || DEFAULT_REFERRER
        console.log(`quote ${route.assetIn}→${route.assetOut} ${route.amountIn}: ${route.amountOut} over ${route.legs.map((l) => l.hops.map((h) => h.key).join('>')).join(' + ')}`)
        return send(200, await quoteResponse(mock.algorand, route, referrer, type))
      }
      if (req.method === 'POST' && url.pathname === '/api/fetchExecuteSwapTxns') {
        const chunks: Buffer[] = []
        for await (const chunk of req) chunks.push(chunk as Buffer)
        const body = JSON.parse(Buffer.concat(chunks).toString())
        const { route, referrer } = decodePayload(body.txnPayloadJSON)
        const minOut = minOutForSlippage(route.amountOut, Number(body.slippage ?? 0))
        console.log(`execute for ${body.address}: min ${minOut} of ${route.amountOut}`)
        return send(200, await mock.executeTxns(route, body.address, minOut, referrer))
      }
      return send(404, { error: 'not found' })
    } catch (error) {
      console.error(error)
      return send(500, { error: error instanceof Error ? error.message : String(error) })
    }
  })
}

async function main() {
  const env = readEnv()
  if (env.ALGORAND_NETWORK !== 'localnet') throw new Error('the mock Haystack runs on LocalNet only')
  for (const key of ['MOCK_HAYSTACK_ROUTER_APP_ID', 'MOCK_HAYSTACK_RELAY_MNEMONIC', 'PLUGIN_DEX_APP_ID']) {
    if (!env[key]) throw new Error(`${key} missing from .env.localnet: run npm run deploy:mock-haystack`)
  }
  const mock = new MockHaystack(AlgorandClient.defaultLocalNet(), {
    routerAppId: BigInt(env.MOCK_HAYSTACK_ROUTER_APP_ID),
    vaultAppId: BigInt(env.PLUGIN_DEX_APP_ID),
    tinymanAppId: BigInt(env.MOCK_TINYMAN_APP_ID ?? '0'),
    relay: algosdk.mnemonicToSecretKey(env.MOCK_HAYSTACK_RELAY_MNEMONIC),
  })
  const port = Number(process.env.MOCK_HAYSTACK_PORT ?? MOCK_HAYSTACK_PORT)
  createMockHaystackServer(mock).listen(port, () => console.log(`🧪 MOCK Haystack Router API on http://localhost:${port}/api`))
}

if (require.main === module) main().catch((error) => {
  console.error(error)
  process.exit(1)
})
