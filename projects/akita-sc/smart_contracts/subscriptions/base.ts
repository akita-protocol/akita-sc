import { Contract, uint64 } from "@algorandfoundation/algorand-typescript";
import { SubscriptionsMBRData } from "./types";
import { BlocksMBR, MAX_PASSES, MinPassesMBR, ServicesListMBR, ServicesMBR, SubscriptionsListMBR, SubscriptionsMBR } from "./constants";
import { AccountLength, BoxCostPerByte } from "../utils/constants";

export class BaseSubscriptions extends Contract {
  protected mbr(): SubscriptionsMBRData {
    return {
      subscriptions: SubscriptionsMBR,
      subscriptionslist: SubscriptionsListMBR,
      services: ServicesMBR,
      serviceslist: ServicesListMBR,
      blocks: BlocksMBR,
      // audit SG-08: per-byte cost of the 2-byte array header + MAX_PASSES addresses
      // ('p' + 32 + 8 key = 41 bytes is covered by MinPassesMBR) → 83_700
      passes: MinPassesMBR + (BoxCostPerByte * (2 + (AccountLength * MAX_PASSES))),
    }
  }
}