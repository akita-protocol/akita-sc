import { BoxMap, bytes, clone, Contract, uint64 } from "@algorandfoundation/algorand-typescript";
import { abimethod } from "@algorandfoundation/algorand-typescript/arc4";
import { UpgradeLease } from "../../arc58/dao/types";

export class MockAkitaDAO extends Contract {

    /** Same box map as AkitaDAO.upgradeLeases: boxes survive the code swap, so the mock can still
     *  authorize the governed restore through the Update plugin. */
    upgradeLeases = BoxMap<uint64, UpgradeLease[]>({ keyPrefix: 'u' })

    @abimethod({ allowActions: ['UpdateApplication'] })
    update(newVersion: string): void { }

    ping(): uint64 {
        return 1337
    }

    @abimethod({ readonly: true })
    isUpgradeLease(app: uint64, lease: bytes<32>): boolean {
        if (!this.upgradeLeases(app).exists) {
            return false
        }
        const entries = clone(this.upgradeLeases(app).value)
        for (let i: uint64 = 0; i < entries.length; i++) {
            if (entries[i].lease === lease) {
                return true
            }
        }
        return false
    }

    opUp(): void { }
}
