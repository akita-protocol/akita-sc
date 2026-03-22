#!/usr/bin/env node

/**
 * Update DAO App List Script
 *
 * Updates a field in one of the DAO's app lists (aal, sal, pal, oal) via
 * a DAO proposal. Use this after deploying non-upgradeable contracts that
 * get new app IDs (gates, hyper-swap, etc.)
 *
 * Usage:
 *   npm run update:dao-app-list -- -n testnet -m "MNEMONIC" --list aal --field hyperSwap --value 757503297
 *   npm run update:dao-app-list -- -n testnet -m "MNEMONIC" --list sal --field impact --value 12345
 *   npm run update:dao-app-list -- -n testnet -m "MNEMONIC" --list pal --field revenueManager --value 12345
 */

import { parseBaseArgs, setupContext, runScript } from './script-base'
import { proposeAndExecute } from './utils'
import { ProposalActionEnum } from 'akita-sdk/dao'

runScript(async () => {
  let list: string | undefined
  let field: string | undefined
  let value: bigint | undefined

  const args = process.argv.slice(2)
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--list') { list = args[++i] }
    else if (args[i] === '--field') { field = args[++i] }
    else if (args[i] === '--value') { value = BigInt(args[++i]) }
  }

  const options = parseBaseArgs('update-dao-app-list.ts', `
  --list <aal|sal|pal|oal>      Which app list to update (required)
  --field <name>                Field name within the list (required)
  --value <appId>               New app ID value (required)`)

  if (!list || !field || value === undefined) {
    console.error('Error: --list, --field, and --value are all required')
    process.exit(1)
  }

  if (!['aal', 'sal', 'pal', 'oal'].includes(list)) {
    console.error(`Error: --list must be one of: aal, sal, pal, oal (got "${list}")`)
    process.exit(1)
  }

  console.log(`\nUpdating DAO ${list}.${field} = ${value} on ${options.network}...\n`)

  const ctx = await setupContext(options)

  if (options.dryRun) {
    console.log(`DRY RUN - Would create proposal to set ${list}.${field} = ${value}\n`)
    return
  }

  const proposalId = await proposeAndExecute(ctx.algorand, ctx.dao, [
    {
      type: ProposalActionEnum.UpdateFields,
      field: list,
      value: { [field]: value },
    },
  ])

  console.log('='.repeat(80))
  console.log('DAO APP LIST UPDATE COMPLETE!')
  console.log('='.repeat(80))
  console.log(`
Summary:
  Network: ${options.network}
  List: ${list}
  Field: ${field}
  Value: ${value}
  Proposal ID: ${proposalId}
`)
})
