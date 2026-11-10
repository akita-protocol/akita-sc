import * as algokit from '@algorandfoundation/algokit-utils'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { SigningAccount, TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account';
import { Address } from 'algosdk';
import { beforeAll, describe, expect, test } from 'vitest'
import { PrizeBoxSDK } from 'akita-sdk/prize-box'
import algosdk from 'algosdk'
import { AkitaUniverse, buildAkitaUniverse } from '../../tests/fixtures/dao'
import {
    getAccountBalance,
} from '../../tests/utils/balance'
import { expectContractError } from '../../tests/utils/errors'

algokit.Config.configure({ populateAppCallResources: true })

const fixture = algorandFixture()

describe('Prize Box SDK', () => {
    let deployer: TransactionSignerAccount
    let creator: TransactionSignerAccount
    let recipient: TransactionSignerAccount
    let akitaUniverse: AkitaUniverse
    let prizeBoxSDK: PrizeBoxSDK
    let testAssetId: bigint
    let testAssetId2: bigint
    let dispenser: import('@algorandfoundation/algokit-utils/types/account').TransactionSignerAccount & {
        account: SigningAccount;
    }
    let algorand: import('@algorandfoundation/algokit-utils').AlgorandClient

    beforeAll(async () => {
        await fixture.newScope()
        algorand = fixture.context.algorand
        dispenser = await algorand.account.dispenserFromEnvironment()

        const ctx = fixture.context
        deployer = await ctx.generateAccount({ initialFunds: algokit.microAlgos(2_000_000_000) })
        creator = await ctx.generateAccount({ initialFunds: algokit.microAlgos(500_000_000) })
        recipient = await ctx.generateAccount({ initialFunds: algokit.microAlgos(100_000_000) })

        await algorand.account.ensureFunded(deployer.addr, dispenser.addr, (2000).algo())
        await algorand.account.ensureFunded(creator.addr, dispenser.addr, (500).algo())
        await algorand.account.ensureFunded(recipient.addr, dispenser.addr, (100).algo())

        // Build the full Akita DAO universe (includes prizeBoxFactory)
        akitaUniverse = await buildAkitaUniverse({
            fixture,
            sender: deployer.addr,
            signer: deployer.signer,
            apps: {},
        })

        // Create test ASAs for prize box contents
        const assetCreate1 = await algorand.send.assetCreate({
            sender: deployer.addr,
            signer: deployer.signer,
            total: 1_000_000n,
            decimals: 0,
            assetName: 'Prize Token 1',
            unitName: 'PT1',
        })
        testAssetId = BigInt(assetCreate1.confirmation.assetIndex!)

        const assetCreate2 = await algorand.send.assetCreate({
            sender: deployer.addr,
            signer: deployer.signer,
            total: 1_000_000n,
            decimals: 6,
            assetName: 'Prize Token 2',
            unitName: 'PT2',
        })
        testAssetId2 = BigInt(assetCreate2.confirmation.assetIndex!)

        // Opt accounts into assets
        for (const account of [creator, recipient]) {
            await algorand.send.assetOptIn({
                sender: account.addr,
                signer: account.signer,
                assetId: testAssetId,
            })
            await algorand.send.assetOptIn({
                sender: account.addr,
                signer: account.signer,
                assetId: testAssetId2,
            })
        }

        // Transfer assets to creator
        await algorand.send.assetTransfer({
            sender: deployer.addr,
            signer: deployer.signer,
            assetId: testAssetId,
            amount: 1000n,
            receiver: creator.addr,
        })
        await algorand.send.assetTransfer({
            sender: deployer.addr,
            signer: deployer.signer,
            assetId: testAssetId2,
            amount: 1_000_000n,
            receiver: creator.addr,
        })

        // Fund the prize box factory to cover MBR
        await algorand.account.ensureFunded(akitaUniverse.prizeBoxFactory.client.appAddress, dispenser.addr, (100).algo())
    })

    describe('PrizeBoxFactorySDK', () => {
        describe('cost()', () => {
            test('should return the cost to create a prize box', () => {
                const cost = akitaUniverse.prizeBoxFactory.cost()
                expect(cost).toBeGreaterThan(0n)
                expect(cost).toBe(328_500n) // PB-02: + funder bytes slot (50_000)
            })
        })

        describe('mint()', () => {
            test('should create a new prize box', async () => {
                const balanceBefore = await getAccountBalance(algorand, creator.addr.toString())
                const cost = akitaUniverse.prizeBoxFactory.cost()

                prizeBoxSDK = await akitaUniverse.prizeBoxFactory.mint({
                    sender: creator.addr,
                    signer: creator.signer,
                    owner: creator.addr.toString(),
                })

                expect(prizeBoxSDK).toBeInstanceOf(PrizeBoxSDK)
                expect(prizeBoxSDK.client.appId).toBeGreaterThan(0n)

                // Verify cost was deducted
                const balanceAfter = await getAccountBalance(algorand, creator.addr.toString())
                expect(balanceBefore - balanceAfter).toBeGreaterThanOrEqual(cost)
            })
        })

        describe('get()', () => {
            test('should return PrizeBoxSDK for existing prize box', () => {
                const existingBox = akitaUniverse.prizeBoxFactory.get({ appId: prizeBoxSDK.client.appId })
                expect(existingBox).toBeInstanceOf(PrizeBoxSDK)
                expect(existingBox.client.appId).toBe(prizeBoxSDK.client.appId)
            })
        })
    })

    describe('PrizeBoxSDK', () => {
        describe('state()', () => {
            test('should return the current prize box state', async () => {
                const state = await prizeBoxSDK.state()
                expect(state.owner).toBe(creator.addr.toString())
                expect(state.optinCount).toBe(0n)
            })
        })

        describe('owner()', () => {
            test('should return the owner address', async () => {
                const owner = await prizeBoxSDK.owner()
                expect(owner).toBe(creator.addr.toString())
            })
        })

        describe('optIn()', () => {
            test('should opt prize box into an asset', async () => {
                await prizeBoxSDK.optIn({
                    sender: creator.addr,
                    signer: creator.signer,
                    asset: testAssetId,
                })

                const state = await prizeBoxSDK.state()
                expect(state.optinCount).toBe(1n)
            })

            test('should allow opting into multiple assets', async () => {
                await prizeBoxSDK.optIn({
                    sender: creator.addr,
                    signer: creator.signer,
                    asset: testAssetId2,
                })

                const state = await prizeBoxSDK.state()
                expect(state.optinCount).toBe(2n)
            })
        })

        describe('transfer()', () => {
            test('should transfer ownership to new owner', async () => {
                await prizeBoxSDK.transfer({
                    sender: creator.addr,
                    signer: creator.signer,
                    newOwner: recipient.addr.toString(),
                })

                const owner = await prizeBoxSDK.owner()
                expect(owner).toBe(recipient.addr.toString())
            })

            test('should allow new owner to manage prize box', async () => {
                // Transfer back to creator for remaining tests
                await prizeBoxSDK.transfer({
                    sender: recipient.addr,
                    signer: recipient.signer,
                    newOwner: creator.addr.toString(),
                })

                const owner = await prizeBoxSDK.owner()
                expect(owner).toBe(creator.addr.toString())
            })
        })

        describe('withdraw()', () => {
            test('should withdraw assets from prize box', async () => {
                // First deposit some assets
                await algorand.send.assetTransfer({
                    sender: creator.addr,
                    signer: creator.signer,
                    assetId: testAssetId,
                    amount: 100n,
                    receiver: prizeBoxSDK.client.appAddress,
                })

                const creatorBalanceBefore = await algorand.asset.getAccountInformation(
                    creator.addr,
                    testAssetId
                )

                await prizeBoxSDK.withdraw({
                    sender: creator.addr,
                    signer: creator.signer,
                    assets: [{ asset: testAssetId, amount: 50n }],
                })

                const creatorBalanceAfter = await algorand.asset.getAccountInformation(
                    creator.addr,
                    testAssetId
                )

                expect(BigInt(creatorBalanceAfter.balance) - BigInt(creatorBalanceBefore.balance)).toBe(50n)
            })
        })

        describe('delete()', () => {
            test('should delete empty prize box', async () => {
                // Create a new empty prize box for deletion test
                const emptyBox = await akitaUniverse.prizeBoxFactory.mint({
                    sender: creator.addr,
                    signer: creator.signer,
                    owner: creator.addr.toString(),
                })

                await emptyBox.delete({
                    sender: creator.addr,
                    signer: creator.signer,
                })

                // Trying to access the deleted box should fail
                await expect(emptyBox.state()).rejects.toThrow()
            })
        })
    })

    describe('DAO Integration', () => {
        test('should verify prize box factory is registered in DAO', async () => {
            // The prize box factory should be registered in the DAO's akitaAppList
            const daoState = await akitaUniverse.dao.client.state.global.getAll()
            expect(daoState.akitaAppList?.prizeBox).toBe(akitaUniverse.prizeBoxFactory.client.appId)
        })
    })

    describe('Audit regressions (PB-01, PB-02, M-3)', () => {
        const freeBalance = async (address: string | Address): Promise<bigint> => {
            const info = await algorand.client.algod.accountInformation(address.toString()).do()
            return BigInt(info.amount) - BigInt(info.minBalance)
        }

        test('PB-01: opting into the same asset twice is rejected and the count stays exact', async () => {
            const box = await akitaUniverse.prizeBoxFactory.mint({ sender: creator.addr, signer: creator.signer, owner: creator.addr.toString() })
            await box.optIn({ sender: creator.addr, signer: creator.signer, asset: testAssetId })
            await expectContractError(
                box.optIn({ sender: creator.addr, signer: creator.signer, asset: testAssetId }),
                'errAopt'
            )
            expect((await box.state()).optinCount).toBe(1n)
        })

        test('M-3: clawback-enabled assets cannot be put in a prize box', async () => {
            const res = await algorand.send.assetCreate({
                sender: deployer.addr, signer: deployer.signer, total: 100n, decimals: 0,
                assetName: 'Clawable', unitName: 'CLAW', clawback: deployer.addr,
            })
            const claw = BigInt(res.confirmation.assetIndex!)
            const box = await akitaUniverse.prizeBoxFactory.mint({ sender: creator.addr, signer: creator.signer, owner: creator.addr.toString() })
            await expectContractError(
                box.optIn({ sender: creator.addr, signer: creator.signer, asset: claw }),
                'errClwa'
            )
        })

        test('PB-02: deletion goes through the factory; minter gets the creation MBR, owner gets the box balance', async () => {
            const factory = akitaUniverse.prizeBoxFactory.client.appAddress
            const freeBefore = await freeBalance(factory)

            // creator mints a box owned by recipient
            const box = await akitaUniverse.prizeBoxFactory.mint({ sender: creator.addr, signer: creator.signer, owner: recipient.addr.toString() })
            expect(akitaUniverse.prizeBoxFactory.cost()).toBe(await akitaUniverse.prizeBoxFactory.client.mintCost())

            // the owner cannot bypass the factory any more
            await expectContractError(
                box.client.send.delete.deleteApplication({ sender: recipient.addr, signer: recipient.signer, args: { caller: recipient.addr.toString() } }),
                'errMbff'
            )

            const minterBefore = await getAccountBalance(algorand, creator.addr.toString())
            await box.delete({ sender: recipient.addr, signer: recipient.signer })
            const minterAfter = await getAccountBalance(algorand, creator.addr.toString())

            await expect(box.state()).rejects.toThrow()
            // creation MBR = 1 page + 1 uint + 2 bytes = 228,500
            expect(minterAfter - minterBefore).toBe(228_500n)
            expect(await freeBalance(factory)).toBe(freeBefore)
        })
    })
})
