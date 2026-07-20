import { Contract } from "@algorandfoundation/algorand-typescript";
import { StakingMBRData } from "./types";
import { AppStakesMBR, HeartbeatsMBR, SettingsMBR, StakesMBR } from "./constants";

export class BaseStaking extends Contract {
  protected mbr(): StakingMBRData {
    return {
      stakes: StakesMBR,
      appStakes: AppStakesMBR,
      heartbeats: HeartbeatsMBR,
      settings: SettingsMBR
    }
  }
}
