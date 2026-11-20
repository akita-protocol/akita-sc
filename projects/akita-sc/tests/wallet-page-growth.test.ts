/**
 * Rollout steps F1 and F2 update live wallets to a program that needs a fifth program page (release
 * 2.0.0, escrow deletion). The wallet factory sends each update and takes no payment for it, and each
 * page a wallet gains raises the factory account's minimum balance by 100,000 µALGO. The two scripts
 * therefore read what the factory lacks and pay it before the first update. This checks the plan they
 * read, and that each script does so before it sends anything. The update itself runs against a wallet
 * on the MainNet program in tests/compat/compat.e2e.spec.ts.
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, test } from 'vitest'
import {
  DEFAULT_WALLET_UPDATE_MAX_FEE,
  approvalProgram,
  clearProgramSize,
  describeTreeGrowth,
  describeWalletGrowth,
  extraPagesNeeded,
  planWalletGrowth,
  walletUpdateParams,
} from '../scripts/lib/wallet-page-growth'
import walletSpec from '../smart_contracts/artifacts/arc58/account/AbstractedAccount.arc56.json'

const treeProgram = approvalProgram(walletSpec)
const treeApproval = treeProgram.length
const treeClear = clearProgramSize(walletSpec)

describe('wallet page growth', () => {
  test('pages are counted as the factory counts them', () => {
    expect(extraPagesNeeded(0, 0)).toBe(0)
    expect(extraPagesNeeded(2_044, 4)).toBe(0)
    expect(extraPagesNeeded(2_045, 4)).toBe(1)
    // the MainNet wallet program: 8,186 bytes and a 4-byte clear program fit four pages
    expect(extraPagesNeeded(8_186, 4)).toBe(3)
    expect(extraPagesNeeded(8_188, 4)).toBe(3)
    expect(extraPagesNeeded(8_189, 4)).toBe(4)
    expect(extraPagesNeeded(16_380, 4)).toBe(7)
    expect(() => extraPagesNeeded(16_381, 4)).toThrow(/at most 8/)
  })

  test('the tree wallet needs a fifth page', () => {
    expect(treeClear).toBe(4)
    expect(extraPagesNeeded(treeApproval, treeClear)).toBe(4)
  })

  test('MainNet as read on 2026-11-20: 73 wallets on four pages and 1,121 µALGO free', () => {
    const wallets = Array.from({ length: 73 }, (_, i) => ({ wallet: BigInt(1_000 + i), extraPages: 3 }))
    const plan = planWalletGrowth({ approvalSize: treeApproval, clearSize: treeClear, wallets, factoryBalance: 167_044_821n, factoryMinBalance: 167_043_700n })
    expect(plan.growing).toHaveLength(73)
    expect(plan.pages).toBe(73)
    expect(plan.required).toBe(7_300_000n)
    expect(plan.free).toBe(1_121n)
    expect(plan.shortfall).toBe(7_298_879n)
    expect(describeWalletGrowth(plan).join('\n')).toMatch(/short by: 7298879 µALGO/)
  })

  test('a wallet that already has the pages costs nothing, and a rerun funds only what is left', () => {
    const wallets = [{ wallet: 1n, extraPages: 4 }, { wallet: 2n, extraPages: 3 }, { wallet: 3n, extraPages: 7 }]
    const plan = planWalletGrowth({ approvalSize: treeApproval, clearSize: treeClear, wallets, factoryBalance: 1_050_000n, factoryMinBalance: 1_000_000n })
    expect(plan.growing).toEqual([{ wallet: 2n, extraPages: 3, added: 1 }])
    expect(plan.required).toBe(100_000n)
    expect(plan.shortfall).toBe(50_000n)

    const funded = planWalletGrowth({ approvalSize: treeApproval, clearSize: treeClear, wallets, factoryBalance: 1_100_000n, factoryMinBalance: 1_000_000n })
    expect(funded.shortfall).toBe(0n)
    expect(describeWalletGrowth(funded).at(-1)).toBe('Wallet factory already holds enough')

    const done = planWalletGrowth({ approvalSize: treeApproval, clearSize: treeClear, wallets: [wallets[0], wallets[2]], factoryBalance: 1_000_000n, factoryMinBalance: 1_000_000n })
    expect(done.pages).toBe(0)
    expect(done.shortfall).toBe(0n)
    expect(describeWalletGrowth(done).at(-1)).toMatch(/needs no funding/)
  })

  test('a wallet can gain more than one page, and a balance below the minimum counts as nothing free', () => {
    const plan = planWalletGrowth({ approvalSize: 12_000, clearSize: 4, wallets: [{ wallet: 9n, extraPages: 3 }], factoryBalance: 900_000n, factoryMinBalance: 1_000_000n })
    expect(plan.neededExtraPages).toBe(5)
    expect(plan.growing).toEqual([{ wallet: 9n, extraPages: 3, added: 2 }])
    expect(plan.free).toBe(0n)
    expect(plan.shortfall).toBe(200_000n)
  })

  test('before the tree wallet is staged, a dry run also says what the update will cost once it is', () => {
    // MainNet before step E7: the factory still stages the 8,186-byte wallet, which grows nothing
    const wallets = [{ wallet: 1n, extraPages: 3 }, { wallet: 2n, extraPages: 3 }]
    const account = { factoryBalance: 1_001_121n, factoryMinBalance: 1_000_000n }
    const stagedNow = new Uint8Array(8_186)
    const now = planWalletGrowth({ approvalSize: stagedNow.length, clearSize: treeClear, wallets, ...account })
    expect(now.pages).toBe(0)
    const later = planWalletGrowth({ approvalSize: treeApproval, clearSize: treeClear, wallets, ...account })
    const lines = describeTreeGrowth(stagedNow, treeProgram, later)
    expect(lines[0]).toMatch(new RegExp(`has not staged this tree's wallet \\(${treeApproval} bytes\\) yet`))
    expect(lines.join('\n')).toMatch(/Wallets that gain pages: 2 \(2 page\(s\) in all\)/)
    expect(lines.join('\n')).toMatch(/short by: 198879 µALGO/)
    // once the tree wallet is staged there is nothing more to say
    expect(describeTreeGrowth(treeProgram, treeProgram, later)).toEqual([])
    // a program of the same length that is not the tree's is still another program
    const other = new Uint8Array(treeProgram)
    other[other.length - 1] ^= 1
    expect(describeTreeGrowth(other, treeProgram, later)).not.toEqual([])
  })

  test('the update call covers the fee of the inner update, under a ceiling', () => {
    const params = walletUpdateParams(7n)
    expect(params.args).toEqual({ wallet: 7n })
    expect(params.coverAppCallInnerTransactionFees).toBe(true)
    expect(params.populateAppCallResources).toBe(true)
    expect(params.maxFee.microAlgos).toBe(DEFAULT_WALLET_UPDATE_MAX_FEE)
    expect(walletUpdateParams(7n, 5_000n).maxFee.microAlgos).toBe(5_000n)
  })

  test.each([
    ['update-dao-wallet.ts', 'fundWalletGrowth(', 'proposeAndExecute('],
    ['update-automatic-wallets.ts', 'fundWalletGrowth(', 'walletFactory.send.updateWallet('],
  ])('%s funds the factory before it sends an update, and a dry run pays nothing', (script, fund, send) => {
    const source = readFileSync(join(__dirname, '../scripts', script), 'utf8')
    const funded = source.indexOf(fund)
    const dryRunReturn = source.indexOf('dryRun) {')
    expect(funded).toBeGreaterThan(-1)
    expect(source.indexOf(send)).toBeGreaterThan(funded)
    // the dry-run branch returns before the payment
    expect(dryRunReturn).toBeGreaterThan(-1)
    expect(dryRunReturn).toBeLessThan(funded)
    expect(source.slice(dryRunReturn, funded)).toMatch(/return\n/)
  })
})
