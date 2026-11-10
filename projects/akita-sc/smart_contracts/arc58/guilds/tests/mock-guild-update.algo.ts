import { contract } from '@algorandfoundation/algorand-typescript'
import { abimethod, Contract } from '@algorandfoundation/algorand-typescript/arc4'

/** Minimal replacement bytecode used to exercise the Guild UpdateApplication gate. */
@contract({ avmVersion: 13 })
export class MockGuildUpdateReplacement extends Contract {
  @abimethod({ allowActions: ['UpdateApplication'] })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- the mock preserves the production update ABI
  update(newVersion: string): void {}
}
