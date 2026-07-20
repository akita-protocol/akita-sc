#!/usr/bin/env node

/**
 * Update AkitaDAO Contract Script
 *
 * Deploys the immutable proposal validator for the current wallet ABI, points
 * the DAO at it, then updates the AkitaDAO contract via the update plugin.
 *
 * Usage:
 *   npm run update:dao -- -n testnet -m "your mnemonic" -v "1.1.0"
 */

import { parseBaseArgs, recordDaoEscrowActionV2Round, setupContext, runUpdate, runScript } from './script-base'
import { AkitaDaoFactory } from '../smart_contracts/artifacts/arc58/dao/AkitaDAOClient'
import { AkitaDaoProposalValidatorFactory } from '../smart_contracts/artifacts/arc58/dao/AkitaDAOProposalValidatorClient'
import { ProposalActionEnum } from 'akita-sdk/dao'
import { proposeAndExecute } from './utils'

function argValue(name: string): string | undefined {
  const args = process.argv.slice(2)
  const index = args.indexOf(name)
  return index >= 0 ? args[index + 1] : undefined
}

function hasFlag(name: string): boolean {
  return process.argv.slice(2).includes(name)
}

runScript(async () => {
  const options = parseBaseArgs('update-dao.ts', `
DAO interface update options:
  --validator-app-id <id>    Use an already-deployed proposal validator
  --dao-only                 Skip validator deployment and pointer update

Examples:
  npm run update:dao -- -n mainnet -m "$MNEMONIC" -v "1.0.0"
  npm run update:dao -- -n mainnet -m "$MNEMONIC" -v "1.0.0" --validator-app-id 123
  npm run update:dao -- -n mainnet -m "$MNEMONIC" -v "1.0.0" --dao-only
  npm run update:dao -- -n mainnet -m "$MNEMONIC" -v "1.0.0" --dao-only --proposal-id 456
`)
  console.log(`\nStarting AkitaDAO contract update on ${options.network}...\n`)

  const ctx = await setupContext(options)
  const daoOnly = hasFlag('--dao-only')
  const validatorAppIdArg = argValue('--validator-app-id')

  if (daoOnly && validatorAppIdArg !== undefined) {
    throw new Error('--dao-only cannot be combined with --validator-app-id')
  }
  if (options.proposalId !== undefined && !daoOnly) {
    throw new Error('--proposal-id must be combined with --dao-only after the validator pointer update')
  }

  if (!daoOnly) {
    const validatorFactory = new AkitaDaoProposalValidatorFactory({
      algorand: ctx.algorand,
      defaultSender: ctx.sender,
      defaultSigner: ctx.signer,
    })

    console.log('Compiling AkitaDAOProposalValidator...')
    const compiledValidator = await validatorFactory.appFactory.compile()
    console.log(`   Approval: ${compiledValidator.approvalProgram.length} bytes\n`)

    if (options.dryRun) {
      console.log(
        validatorAppIdArg === undefined
          ? 'DRY RUN - Would deploy a new immutable proposal validator and update oal.daoProposalValidator\n'
          : `DRY RUN - Would update oal.daoProposalValidator to ${validatorAppIdArg}\n`,
      )
    } else {
      let validatorAppId: bigint
      if (validatorAppIdArg !== undefined) {
        if (!/^[1-9]\d*$/.test(validatorAppIdArg)) throw new Error('--validator-app-id must be a positive integer')
        validatorAppId = BigInt(validatorAppIdArg)
      } else {
        console.log('Deploying AkitaDAOProposalValidator...')
        const { appClient } = await validatorFactory.send.create.create({ args: {} })
        validatorAppId = appClient.appId
        console.log(`   Validator deployed: ${validatorAppId}\n`)
      }

      const currentApps = await ctx.dao.client.state.global.otherAppList()
      if (currentApps?.daoProposalValidator === validatorAppId) {
        console.log(`DAO already points to validator ${validatorAppId}\n`)
      } else {
        console.log(`Updating DAO proposal validator reference to ${validatorAppId}...`)
        const proposalId = await proposeAndExecute(ctx.algorand, ctx.dao, [
          {
            type: ProposalActionEnum.UpdateFields,
            field: 'oal',
            value: { daoProposalValidator: validatorAppId },
          },
        ])
        console.log(`   Pointer update proposal ${proposalId} executed\n`)

        const updatedApps = await ctx.dao.client.state.global.otherAppList()
        if (updatedApps?.daoProposalValidator !== validatorAppId) {
          throw new Error(`DAO proposal validator pointer did not update to ${validatorAppId}`)
        }
      }
    }
  }

  const [result] = await runUpdate(ctx, [
    {
      name: 'AkitaDAO',
      leasePrefix: 'dao_upg',
      appIdKey: 'dao',
      createFactory: (p) => new AkitaDaoFactory(p),
    },
  ])

  if (!options.dryRun && result?.confirmedRound !== undefined) {
    const block = await ctx.algorand.client.algod.block(result.confirmedRound)
    await recordDaoEscrowActionV2Round(options.network, result.confirmedRound, BigInt(block.block.header.timestamp))
  }
})
