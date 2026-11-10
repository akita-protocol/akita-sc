import { abimethod, Contract } from "@algorandfoundation/algorand-typescript";
import { HashesMBR, MetaMerkleHyperSwapDataMBR, MetaMerkleHyperSwapRootMBR, OffersMBR, OfferRefundsMBR, OfferRegistryMBR, ParticipantsMBR } from "./constants";
import { HyperSwapMBRData } from "./types";

export class BaseHyperSwap extends Contract {
  /** Shared storage costs for HyperSwap and its plugin using the current Meta layout. */
  @abimethod({ readonly: true })
  mbr(): HyperSwapMBRData {
    return {
      offers: OffersMBR + OfferRefundsMBR + OfferRegistryMBR,
      participants: ParticipantsMBR,
      hashes: HashesMBR,
      mm: {
        root: MetaMerkleHyperSwapRootMBR,
        data: MetaMerkleHyperSwapDataMBR,
      }
    }
  }
}
