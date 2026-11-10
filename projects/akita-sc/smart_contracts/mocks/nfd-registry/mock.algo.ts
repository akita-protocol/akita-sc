import {
  Contract,
  Global,
  GlobalState,
  loggedAssert,
  Txn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'

/**
 * Test-only registry with two explicit valid name/app ID pairs. Named apart from
 * `mocks/nfd/contract.algo.ts`'s `MockNfdRegistry`: generated clients share one flat SDK directory.
 */
export class MockNfdPairRegistry extends Contract {
  firstName = GlobalState<string>({ key: 'firstName' })
  firstAppId = GlobalState<uint64>({ key: 'firstAppId' })
  secondName = GlobalState<string>({ key: 'secondName' })
  secondAppId = GlobalState<uint64>({ key: 'secondAppId' })
  checkCount = GlobalState<uint64>({ key: 'checkCount' })
  lastCheckedAppId = GlobalState<uint64>({ key: 'lastChecked' })

  @abimethod({ onCreate: 'require' })
  create(): void {
    this.firstName.value = ''
    this.firstAppId.value = 0
    this.secondName.value = ''
    this.secondAppId.value = 0
    this.checkCount.value = 0
    this.lastCheckedAppId.value = 0
  }

  configure(
    firstName: string,
    firstAppId: uint64,
    secondName: string,
    secondAppId: uint64,
  ): void {
    loggedAssert(Txn.sender === Global.creatorAddress, 'errNotCreator')
    this.firstName.value = firstName
    this.firstAppId.value = firstAppId
    this.secondName.value = secondName
    this.secondAppId.value = secondAppId
  }

  isValidNfdAppId(nfdName: string, nfdAppId: uint64): boolean {
    this.checkCount.value += 1
    this.lastCheckedAppId.value = nfdAppId

    return (
      (nfdName === this.firstName.value && nfdAppId === this.firstAppId.value) ||
      (nfdName === this.secondName.value && nfdAppId === this.secondAppId.value)
    )
  }
}
