import { describe, expect, test, vi } from "vitest";
import { APP_SPEC, GuildPluginClient } from "../../generated/GuildPluginClient";
import { GuildPluginSDK } from "./guild";

const SENDER = "B4NOFTMLUTGTTPBY5NHLW3EHQPB5XCW3BHYDQFMX5XDT2A6Q24Z2HK2WRQ";

describe("GuildPluginSDK", () => {
  test("exposes a hook for every wallet-routed Guild plugin ABI method", () => {
    const walletMethods = APP_SPEC.methods
      .filter(({ args }) => args[0]?.name === "wallet" && args[1]?.name === "rekeyBack")
      .map(({ name }) => name);

    expect(walletMethods).not.toHaveLength(0);
    expect(walletMethods.filter((name) => typeof GuildPluginSDK.prototype[name as keyof GuildPluginSDK] !== "function")).toEqual([]);
  });

  test("builds a new-proposal call with empty evidence and rekey-back defaults", async () => {
    const selector = new Uint8Array([1, 2, 3, 4]);
    const newProposal = vi.fn().mockResolvedValue({ appId: 7n });
    const sdk = Object.create(GuildPluginSDK.prototype) as GuildPluginSDK;
    const signer = vi.fn();
    const cid = new Uint8Array(36);
    const actions: [number, Uint8Array][] = [[81, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 10])]];

    sdk.client = {
      appId: 42n,
      appClient: { getABIMethod: vi.fn().mockReturnValue({ getSelector: () => selector }) },
      params: { newProposal },
    } as unknown as GuildPluginClient;
    sdk.sendParams = { sender: SENDER, signer };

    const hook = sdk.newProposal({ guild: 99n, cid, actions })();
    const txns = await hook.getTxns({ wallet: 55n });

    expect(hook.appId).toBe(42n);
    expect(hook.selectors).toEqual([selector]);
    expect(newProposal).toHaveBeenCalledWith({
      sender: SENDER,
      signer,
      args: {
        wallet: 55n,
        rekeyBack: true,
        guild: 99n,
        cid,
        actions,
        evidence: new Uint8Array(),
      },
    });
    expect(txns).toEqual([{ type: "methodCall", appId: 7n }]);
  });

  test("honors explicit evidence and rekey behavior", async () => {
    const selector = new Uint8Array([5, 6, 7, 8]);
    const voteProposal = vi.fn().mockResolvedValue({ appId: 8n });
    const sdk = Object.create(GuildPluginSDK.prototype) as GuildPluginSDK;
    const signer = vi.fn();
    const evidence = new Uint8Array([9, 10]);

    sdk.client = {
      appId: 42n,
      appClient: { getABIMethod: vi.fn().mockReturnValue({ getSelector: () => selector }) },
      params: { voteProposal },
    } as unknown as GuildPluginClient;
    sdk.sendParams = { sender: SENDER, signer };

    const hook = sdk.voteProposal({
      guild: 99n,
      proposalId: 3n,
      vote: 10,
      evidence,
      rekeyBack: false,
    })();
    await hook.getTxns({ wallet: 55n });

    expect(voteProposal).toHaveBeenCalledWith({
      sender: SENDER,
      signer,
      args: {
        wallet: 55n,
        rekeyBack: false,
        guild: 99n,
        proposalId: 3n,
        vote: 10,
        evidence,
      },
    });
  });

  test("generates and validates a setup salt", async () => {
    const setup = vi.fn().mockResolvedValue({ appId: 9n });
    const sdk = Object.create(GuildPluginSDK.prototype) as GuildPluginSDK;
    const signer = vi.fn();
    sdk.client = {
      appId: 42n,
      appClient: { getABIMethod: vi.fn().mockReturnValue({ getSelector: () => new Uint8Array(4) }) },
      params: { setup },
    } as unknown as GuildPluginClient;
    sdk.sendParams = { sender: SENDER, signer };

    await sdk.setup({ guild: 99n, nickname: "Guild treasury" })().getTxns({ wallet: 55n });
    const call = setup.mock.calls[0][0];
    expect(call.args.salt).toBeInstanceOf(Uint8Array);
    expect(call.args.salt).toHaveLength(32);

    expect(() => sdk.setup({ guild: 99n, nickname: "bad", salt: new Uint8Array(31) })).toThrow(/salt.*32/i);
  });

  test("adds pooled fee credit for nested consensus finalization calls", async () => {
    const finalizeProposal = vi.fn().mockResolvedValue({ appId: 10n });
    const cleanupProposalConsensus = vi.fn().mockResolvedValue({ appId: 11n });
    const sdk = Object.create(GuildPluginSDK.prototype) as GuildPluginSDK;
    sdk.client = {
      appId: 42n,
      appClient: { getABIMethod: vi.fn().mockReturnValue({ getSelector: () => new Uint8Array(4) }) },
      params: { finalizeProposal, cleanupProposalConsensus },
    } as unknown as GuildPluginClient;
    sdk.sendParams = { sender: SENDER, signer: vi.fn() };

    await sdk.finalizeProposal({ guild: 99n, proposalId: 3n })().getTxns({ wallet: 55n });
    await sdk
      .cleanupProposalConsensus({ guild: 99n, proposalId: 3n, voters: [SENDER] })()
      .getTxns({ wallet: 55n });

    expect(finalizeProposal.mock.calls[0][0].extraFee.microAlgos).toBe(1_000n);
    expect(cleanupProposalConsensus.mock.calls[0][0].extraFee.microAlgos).toBe(1_000n);
  });
});
