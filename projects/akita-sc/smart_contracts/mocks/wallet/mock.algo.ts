import { contract, Contract, uint64 } from "@algorandfoundation/algorand-typescript";
import { abimethod } from "@algorandfoundation/algorand-typescript/arc4";

@contract({ avmVersion: 13 })
export class MockAbstractedAccount extends Contract {

    @abimethod({ allowActions: ['UpdateApplication'] })
    update(newVersion: string): void { }

    ping(): uint64 {
        return 4243
    }
}
