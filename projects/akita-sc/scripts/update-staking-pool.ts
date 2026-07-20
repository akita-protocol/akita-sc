#!/usr/bin/env node

/**
 * Update Staking Pool Factory Contract Script
 *
 * Updates the StakingPoolFactory app. The child StakingPool contract bytecode
 * is embedded in the factory via compileArc4(), so updating the factory app
 * automatically includes the latest child contract code.
 *
 * Usage:
 *   npm run update:staking-pool -- -n testnet -m "your mnemonic" -v "0.0.2"
 */

import { microAlgo } from '@algorandfoundation/algokit-utils'
import { parseBaseArgs, setupContext, runUpdate, runScript } from './script-base'
import { StakingPoolFactoryFactory } from '../smart_contracts/artifacts/staking-pool/StakingPoolFactoryClient'
import { StakingPoolFactory } from '../smart_contracts/artifacts/staking-pool/StakingPoolClient'

const BOX_MBR_PER_BYTE = 400n

runScript(async () => {
  const options = parseBaseArgs('update-staking-pool.ts')
  console.log(`\nStarting Staking Pool Factory update on ${options.network}...\n`)

  const ctx = await setupContext(options)

  const target = {
    name: 'StakingPoolFactory',
    leasePrefix: 'sp_upg',
    appIdKey: 'stakingPoolFactory',
    createFactory: (p: ConstructorParameters<typeof StakingPoolFactoryFactory>[0]) => new StakingPoolFactoryFactory(p),
    childFactory: (p: ConstructorParameters<typeof StakingPoolFactory>[0]) => new StakingPoolFactory(p),
  }

  // Resizing an existing box increases the app account MBR by 400 microAlgos
  // per added value byte. Both live factories were originally funded to their
  // exact minimum, so determine and supply only the additional MBR required by
  // the newly compiled child before simulating or submitting the update.
  const childFactory = new StakingPoolFactory({
    algorand: ctx.algorand,
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })
  const childCompiled = await childFactory.appFactory.compile()

  const factory = new StakingPoolFactoryFactory({
    algorand: ctx.algorand,
    defaultSender: ctx.sender,
    defaultSigner: ctx.signer,
  })
  const appId = ctx.appIds.stakingPoolFactory
  const factoryClient = factory.getAppClientById({ appId })
  const currentBox = (await factoryClient.state.box.boxedContract()).asByteArray()
  if (currentBox === undefined) {
    throw new Error(`StakingPoolFactory ${appId} does not have an initialized boxed contract`)
  }

  const addedBytes = Math.max(0, childCompiled.approvalProgram.length - currentBox.length)
  const additionalMbr = BigInt(addedBytes) * BOX_MBR_PER_BYTE
  const accountInfo = await ctx.algorand.account.getInformation(factoryClient.appAddress)
  const surplus = BigInt(accountInfo.balance.microAlgos) - BigInt(accountInfo.minBalance.microAlgos)
  const fundingNeeded = additionalMbr > surplus ? additionalMbr - surplus : 0n

  console.log(`Current boxed child: ${currentBox.length} bytes`)
  console.log(`New boxed child: ${childCompiled.approvalProgram.length} bytes`)
  console.log(`Factory MBR funding required: ${fundingNeeded} microAlgo\n`)

  if (fundingNeeded > 0n) {
    if (options.dryRun) {
      console.log(`DRY RUN - Would fund StakingPoolFactory ${appId} with ${fundingNeeded} microAlgo\n`)

      // The real update is fully simulated immediately after the funding
      // payment. Before that payment exists on-chain, compile-only mode avoids
      // a predictable false-negative from the future box-resize MBR check.
      await runUpdate(
        { ...ctx, options: { ...ctx.options, mnemonic: undefined } },
        [target],
      )
      return
    }

    await ctx.algorand.send.payment({
      sender: ctx.sender,
      signer: ctx.signer,
      receiver: factoryClient.appAddress,
      amount: microAlgo(fundingNeeded),
    })
    console.log(`Funded StakingPoolFactory ${appId} with ${fundingNeeded} microAlgo\n`)
  }

  await runUpdate(ctx, [target])
})
