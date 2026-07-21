import { describe, expect, test, vi } from "vitest";

import type { StakingClient } from "../generated/StakingClient";
import { StakingSDK } from "./index";
import { StakingType } from "./types";

const READER = "YSUC4WOTVEDF5DHRTDZUDJICLZYBQVODWMAZCIMBVYRGEN67QXFMMWYGVM";

describe("StakingSDK reads", () => {
  test("uses readerAccount for soft and app-scoped stake lookups", async () => {
    const stake = {
      amount: 200_000_000_000n,
      lastUpdate: 1n,
      expiration: 0n,
      weightedAge: 0n,
    };
    const weightedStake = { amount: stake.amount, weightedAge: 0n };
    const getInfo = vi.fn().mockResolvedValue(stake);
    const getAppWeightedStake = vi.fn().mockResolvedValue(weightedStake);
    const sdk = Object.create(StakingSDK.prototype) as StakingSDK;

    sdk.readerAccount = READER;
    sdk.sendParams = {};
    sdk.client = {
      getInfo,
      getAppWeightedStake,
    } as unknown as StakingClient;

    await expect(
      sdk.getInfo({
        address: READER,
        stake: { asset: 523_683_256n, type: StakingType.Soft },
      }),
    ).resolves.toEqual(stake);
    await expect(
      sdk.getAppWeightedStake({
        app: 3_569_556_973n,
        address: READER,
        asset: 523_683_256n,
        acceptInherited: true,
      }),
    ).resolves.toEqual(weightedStake);

    expect(getInfo).toHaveBeenCalledWith({
      sender: READER,
      signer: expect.any(Function),
      args: {
        address: READER,
        stake: { asset: 523_683_256n, type: StakingType.Soft },
      },
    });
    expect(getAppWeightedStake).toHaveBeenCalledWith({
      sender: READER,
      signer: expect.any(Function),
      args: {
        app: 3_569_556_973n,
        address: READER,
        asset: 523_683_256n,
        acceptInherited: true,
      },
    });
  });
});
