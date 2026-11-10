import { GlobalState, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, Contract } from '@algorandfoundation/algorand-typescript/arc4'
import { AbstractAccountGlobalStateKeysUpdateSettings } from '../../arc58/account/constants'
import { FactoryUpdateSettings } from '../../arc58/account/types'

/**
 * TEST-ONLY (ACC-08). An app NOT created by the wallet factory that still looks updatable to it:
 * it exposes `update_settings = { allowed: true, automatic: true }` and accepts
 * `update(string)` as UpdateApplication. The factory must refuse to push wallet code into it.
 * Never deploy outside tests.
 */
export class MockFakeUpdatableWallet extends Contract {
  updateSettings = GlobalState<FactoryUpdateSettings>({ key: AbstractAccountGlobalStateKeysUpdateSettings })

  @abimethod({ onCreate: 'require' })
  create(): void {
    this.updateSettings.value = { allowed: true, automatic: true }
  }

  @abimethod({ allowActions: ['UpdateApplication'] })
  update(version: string): void { }

  ping(): uint64 {
    return 7
  }
}
