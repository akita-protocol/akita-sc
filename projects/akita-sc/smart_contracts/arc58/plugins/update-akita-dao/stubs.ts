/* eslint-disable @typescript-eslint/no-unused-vars -- ABI-only template used for typed inner calls. */
import { bytes, err, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import { ExecutionMetadata, ProposalDetails } from '../../dao/types'

/**
 * ABI template of the AkitaDAO methods the Update plugin calls to authenticate an upgrade.
 * Importing the real `AkitaDAO` type would pull its whole contract graph into the plugin's
 * compilation, so the plugin calls through this signature-identical stub. Never deployed.
 *
 * `isUpgradeLease` exists only on this tree's DAO. `mustGetExecution`, `getProposal` and `opUp` exist,
 * with these exact signatures, on the deployed MainNet DAO (HEAD `e7f174ee`, app 3569556034) too, so
 * the plugin can bind upgrades before the DAO itself is upgraded (principal-resolution Phase 2a, §7.1).
 */
export class AkitaDAOExecutionReaderStub extends Contract {
  @abimethod({ readonly: true })
  isUpgradeLease(app: uint64, lease: bytes<32>): boolean {
    err('stub')
  }

  /** `lease -> (proposalID, action index)`, written by `executeProposal` for UpgradeApp actions only. */
  @abimethod({ readonly: true })
  mustGetExecution(lease: bytes<32>): ExecutionMetadata {
    err('stub')
  }

  @abimethod({ readonly: true })
  getProposal(proposalID: uint64): ProposalDetails {
    err('stub')
  }

  opUp(): void { }
}
