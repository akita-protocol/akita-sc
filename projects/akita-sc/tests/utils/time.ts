import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import crypto from "crypto";

export class TimeWarp {
  public algorand: AlgorandClient;

  constructor(algorand: AlgorandClient) {
    this.algorand = algorand;
  }

  private async getLastRound(): Promise<bigint> {
    return (await this.algorand.client.algod.status().do()).lastRound;
  }

  private async getLatestTimestamp(): Promise<bigint> {
    const lastRound = await this.getLastRound();
    const block = await this.algorand.client.algod.block(lastRound).do();
    return block.block.header.timestamp;
  }

  async warpForwardRounds(rounds: bigint): Promise<void> {
    this.algorand.setSuggestedParamsCacheTimeout(0);
    const dispenser = await this.algorand.account.dispenserFromEnvironment();
    for (let i = 0; i < rounds; i++) {
      await this.algorand.send.payment({
        sender: dispenser.addr,
        signer: dispenser.signer,
        receiver: dispenser.addr,
        amount: (0).microAlgo(),
        // adding a random note to avoid transaction duplicates
        note: new Uint8Array(crypto.randomBytes(16)),
      });
    }
  }

  async roundWarp(rounds: bigint = 0n): Promise<void> {
    this.algorand.setSuggestedParamsCacheTimeout(0);
    const dispenser = await this.algorand.account.dispenserFromEnvironment();
    let nRounds;
    if (rounds !== 0n) {
      const lastRound = await this.getLastRound();

      if (rounds < lastRound) {
        throw new Error(`Cannot warp to a previous round. Current: ${lastRound}, Target: ${rounds}`);
      }

      nRounds = rounds - lastRound;
    } else {
      nRounds = 1;
    }

    for (let i = 0; i < nRounds; i++) {
      await this.algorand.send.payment({
        sender: dispenser.addr,
        signer: dispenser.signer,
        receiver: dispenser.addr,
        amount: (0).microAlgo(),
        // adding a random note to avoid transaction duplicates
        note: new Uint8Array(crypto.randomBytes(16)),
      });
    }
  }

  async timeWarp(seconds: bigint): Promise<void> {
    this.algorand.setSuggestedParamsCacheTimeout(0);
    if (seconds < 0n) throw new Error('Cannot warp backwards in time');

    // Dev mode offsets the next block relative to the current chain timestamp.
    const algod = this.algorand.client.algod;
    await algod.setBlockOffsetTimestamp(seconds).do();
    try {
      await this.warpForwardRounds(1n);
    } finally {
      await algod.setBlockOffsetTimestamp(0).do();
    }
  }

  async resetTimeWarp(): Promise<void> {
    await this.algorand.client.algod.setBlockOffsetTimestamp(0).do();
  }
}
