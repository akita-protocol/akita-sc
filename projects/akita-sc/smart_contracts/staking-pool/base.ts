import { Contract, abimethod, uint64 } from "@algorandfoundation/algorand-typescript";
import { BoxCostPerByte } from "../utils/constants";
import { MinPoolRewardsMBR, PoolDisbursementSMBR, PoolEntriesBaseMBR, PoolEntriesByAddressExactMBR, PoolRewardWinningTicketBytes, PoolUniquesMBR } from "./constants";
import { StakingPoolMBRData } from "./types";

export class BaseStakingPool extends Contract {
  
  protected rewardsMbr(winningTickets: uint64): uint64 {
    return MinPoolRewardsMBR + (BoxCostPerByte * PoolRewardWinningTicketBytes * winningTickets)
  }

  /**
   * @returns the mbr created for each boxmap entry. `entries` is the exact MBR of an entry stored
   * without gate args (Q14); a gated entry adds 400 µA per encoded gate-arg byte beyond the empty
   * array. Quote real entries with the pool's `enterCost`.
   */
  @abimethod({ readonly: true })
  mbr(winningTickets: uint64): StakingPoolMBRData {
    return {
      entries: PoolEntriesBaseMBR,
      uniques: PoolUniquesMBR,
      entriesByAddress: PoolEntriesByAddressExactMBR,
      rewards: this.rewardsMbr(winningTickets),
      disbursements: PoolDisbursementSMBR
    }
  }
}
