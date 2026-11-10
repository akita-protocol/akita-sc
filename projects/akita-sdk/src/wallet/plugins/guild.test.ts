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

    const hook = sdk.newProposal({ guild: 99n, cid, actions, maxCost: 52_000n })();
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
        maxCost: 52_000n,
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
      maxCost: 22_500n,
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
        maxCost: 22_500n,
      },
    });
  });

  // AUD-C3: the contract reads each cost when the call runs and fails it above `maxCost`.
  test("holds a paying call to the cost read when it is built", async () => {
    const SPENDER = "Y76M3MSY6DKBRHBL7C3NNDXGS5IIMQVQVUAB6MP4XEMMGVF2QWNPL226CA";
    const builders = {
      newGuild: vi.fn().mockResolvedValue({}),
      configureConsensus: vi.fn().mockResolvedValue({}),
      setup: vi.fn().mockResolvedValue({}),
      newProposal: vi.fn().mockResolvedValue({}),
      editProposal: vi.fn().mockResolvedValue({}),
      voteProposal: vi.fn().mockResolvedValue({}),
    };
    const sdk = Object.create(GuildPluginSDK.prototype) as GuildPluginSDK;
    sdk.client = {
      appId: 42n,
      appClient: { getABIMethod: vi.fn().mockReturnValue({ getSelector: () => new Uint8Array(4) }) },
      params: builders,
    } as unknown as GuildPluginClient;
    sdk.sendParams = { sender: SENDER, signer: vi.fn() };
    const quotes = {
      guildCreationCost: vi.spyOn(sdk, "guildCreationCost").mockResolvedValue(1n),
      consensusConfigurationCost: vi.spyOn(sdk, "consensusConfigurationCost").mockResolvedValue(2n),
      setupCost: vi.spyOn(sdk, "setupCost").mockResolvedValue(3n),
      proposalCost: vi.spyOn(sdk, "proposalCost").mockResolvedValue(4n),
      proposalEditCost: vi.spyOn(sdk, "proposalEditCost").mockResolvedValue(5n),
      voteCost: vi.spyOn(sdk, "voteCost").mockResolvedValue(6n),
    };
    const cid = new Uint8Array(36);
    const actions: [number, Uint8Array][] = [[81, new Uint8Array(8)]];
    const config = new Uint8Array([1]);
    const baseConfig = {} as never;

    await sdk.newGuild({ consensusName: "fixed-signers", baseConfig, governanceConfig: config })(SPENDER).getTxns({ wallet: 55n });
    await sdk.configureConsensus({ guild: 99n, config })(SPENDER).getTxns({ wallet: 55n });
    await sdk.setup({ guild: 99n, nickname: "Guild treasury" })(SPENDER).getTxns({ wallet: 55n });
    await sdk.newProposal({ guild: 99n, cid, actions })(SPENDER).getTxns({ wallet: 55n });
    await sdk.editProposal({ guild: 99n, proposalId: 3n, cid, actions })(SPENDER).getTxns({ wallet: 55n });
    await sdk.voteProposal({ guild: 99n, proposalId: 3n, vote: 10 })(SPENDER).getTxns({ wallet: 55n });

    expect(Object.values(builders).map((builder) => builder.mock.calls[0][0].args.maxCost)).toEqual([1n, 2n, 3n, 4n, 5n, 6n]);
    // read as the account that sends the group; the vote is priced for the wallet account that casts it
    expect(quotes.guildCreationCost).toHaveBeenCalledWith("fixed-signers", SENDER);
    expect(quotes.consensusConfigurationCost).toHaveBeenCalledWith(99n, config, SENDER);
    expect(quotes.setupCost).toHaveBeenCalledWith(99n, SENDER);
    expect(quotes.proposalCost).toHaveBeenCalledWith(99n, actions, SENDER);
    expect(quotes.proposalEditCost).toHaveBeenCalledWith(99n, 3n, actions, SENDER);
    expect(quotes.voteCost).toHaveBeenCalledWith(99n, 3n, SPENDER, SENDER);

    // a limit the caller gives is passed through unread, zero included
    await sdk.newProposal({ guild: 99n, cid, actions, maxCost: 0n })(SPENDER).getTxns({ wallet: 55n });
    expect(builders.newProposal.mock.calls[1][0].args.maxCost).toBe(0n);
    expect(quotes.proposalCost).toHaveBeenCalledTimes(1);
  });

  test("a one-call Guild creation has no limit unless the caller gives one", async () => {
    const createGuild = vi.fn().mockResolvedValue({});
    const sdk = Object.create(GuildPluginSDK.prototype) as GuildPluginSDK;
    sdk.client = {
      appId: 42n,
      appClient: { getABIMethod: vi.fn().mockReturnValue({ getSelector: () => new Uint8Array(4) }) },
      params: { createGuild },
    } as unknown as GuildPluginClient;
    sdk.sendParams = { sender: SENDER, signer: vi.fn() };
    const args = {
      consensusName: "fixed-signers",
      baseConfig: {} as never,
      governanceConfig: new Uint8Array(),
      consensusConfig: new Uint8Array(),
      nickname: "Guild treasury",
      funding: 0n,
      actions: [],
    };

    await sdk.createGuild(args)().getTxns({ wallet: 55n });
    await sdk.createGuild({ ...args, maxCost: 7n })().getTxns({ wallet: 55n });

    expect(createGuild.mock.calls[0][0].args.maxCost).toBe(2n ** 64n - 1n);
    expect(createGuild.mock.calls[1][0].args.maxCost).toBe(7n);
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

    await sdk.setup({ guild: 99n, nickname: "Guild treasury", maxCost: 1n })().getTxns({ wallet: 55n });
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
