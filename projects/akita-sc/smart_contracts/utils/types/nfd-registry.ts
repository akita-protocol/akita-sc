import { Account, Contract, gtxn, uint64 } from '@algorandfoundation/algorand-typescript'

export type PriceInfo = {
    oneYearPrice: uint64
    carryCost: uint64
    exists: boolean
    isExpired: boolean
    inAuction: boolean
}

export type LinkOnMintExtraMbrCosts = {
    linkingNfdMbrCost: uint64
    linkingRegistryMbrCost: uint64
}

export class NFDRegistry extends Contract {
    getPrice(nfdName: string, caller: Account): PriceInfo {
        return {
            oneYearPrice: 0,
            carryCost: 0,
            exists: false,
            isExpired: false,
            inAuction: false
        }
    }

    getNfdLinkOnMintExtraMbrCost(address: Account): LinkOnMintExtraMbrCosts {
        return {
            linkingNfdMbrCost: 0,
            linkingRegistryMbrCost: 0
        }
    }

    mintNfd(purchaseTxn: gtxn.PaymentTxn, nfdName: string, reservedFor: Account, linkOnMint: boolean): uint64 {
        return 0
    }

    // {
    //   "name": "isValidNfdAppId",
    //   "args": [
    //     {
    //       "name": "nfdName",
    //       "type": "string"
    //     },
    //     {
    //       "name": "nfdAppId",
    //       "type": "uint64"
    //     }
    //   ],
    //   "returns": {
    //     "type": "bool"
    //   },
    //   "actions": {
    //     "create": [],
    //     "call": [
    //       "NoOp"
    //     ]
    //   }
    // },
    isValidNfdAppId(nfdName: string, nfdAppId: uint64): boolean {
        return false
    }


}
