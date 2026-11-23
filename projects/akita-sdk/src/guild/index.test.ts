import { ABIType } from 'algosdk';
import algosdk from "algosdk";
import { describe, expect, it, test } from "vitest";
import {
  changeAdminAction,
  guildBallotOutcome,
  consensusAction,
  encodeConsensusActionData,
  FixedSignerConsensusAction,
  FixedSignerWeightMode,
  FixedSignerGuildConsensusSDK,
  fixedSignerConsensusAction,
  fixedSignerVoteEvidence,
  GUILD_CHAT_STEWARD_MBR,
  guildChatKey,
  GuildActionType,
  GuildConsensusName,
  LockedTokenConsensusAction,
  lockedTokenConsensusAction,
  lockedTokenConsensusConfig,
  newWalletAction,
  reclaimAction,
  revokeChatStewardAction,
  setChatStewardAction,
  setConsensusActionSettingsAction,
  setPluginSettingsAction,
  SubscriptionConsensusAction,
  subscriptionConsensusAction,
  subscriptionVoteEvidence,
  subscriptionVotingOpensAt,
  isSubscriptionSeasoned,
} from ".";

const member = algosdk.encodeAddress(new Uint8Array(32).fill(1));
const settings = { fee: 0n, power: 1n, duration: 60n, participation: 0n, approval: 50_000n, minimumApprovals: 1n };

const withCode = (code: number, payload: Uint8Array) => new Uint8Array([code, ...payload]);

describe("Guild fixed-signer vote evidence", () => {
  test("selects historical evidence only for the matching account and ballot epoch", async () => {
    const history = new Map([
      [{ account: member, since: 1n }, { weight: 3n, until: 4n }],
      [{ account: member, since: 4n }, { weight: 5n, until: 8n }],
    ]);
    const sdk = Object.create(FixedSignerGuildConsensusSDK.prototype) as FixedSignerGuildConsensusSDK;
    let epoch = 5n;
    let missingMember = false;
    sdk.client = { state: { box: {
      memberSnapshots: { value: async () => ({ epoch, mode: 2 }) },
      members: { value: async () => {
        if (missingMember) throw Object.assign(new Error('Box not found'), { status: 404 });
        return { since: 8n, weight: 9n, slot: 0n };
      } },
      memberHistory: { getMap: async () => history },
    } } } as unknown as typeof sdk.client;
    expect(await sdk.voteEvidence(member, 1n)).toEqual(fixedSignerVoteEvidence(4n));
    missingMember = true;
    expect(await sdk.voteEvidence(member, 1n)).toEqual(fixedSignerVoteEvidence(4n));
    missingMember = false;
    epoch = 8n;
    expect(await sdk.voteEvidence(member, 2n)).toEqual(new Uint8Array());
    epoch = 0n;
    await expect(sdk.voteEvidence(member, 3n)).rejects.toThrow("not a member");
  });

  test("exports the factory's stable consensus registry names", () => {
    expect(GuildConsensusName).toEqual({
      FixedSigners: "fixed-signers",
      LockedToken: "locked-token",
      Subscription: "subscription",
    });
  });
});

describe("Guild consensus action builders", () => {
  test("prefix every payload with a one-byte policy code inside a type-83 action", () => {
    expect(fixedSignerConsensusAction.addMembers(FixedSignerWeightMode.Assigned, [[member, 4n]])).toEqual([
      GuildActionType.Consensus,
      withCode(FixedSignerConsensusAction.AddMembers, ABIType.from("(uint8,(address,uint64)[])").encode([2, [[member, 4n]]])),
    ]);
    expect(fixedSignerConsensusAction.removeMember(member)).toEqual([
      GuildActionType.Consensus,
      withCode(FixedSignerConsensusAction.RemoveMember, ABIType.from("(address)").encode([member])),
    ]);
    expect(fixedSignerConsensusAction.setMemberWeight(member, 7n)).toEqual([
      GuildActionType.Consensus,
      withCode(FixedSignerConsensusAction.SetMemberWeight, ABIType.from("(address,uint64)").encode([member, 7n])),
    ]);
    expect(fixedSignerConsensusAction.setThreshold(3n)).toEqual([
      GuildActionType.Consensus,
      withCode(FixedSignerConsensusAction.SetThreshold, ABIType.from("(uint64)").encode([3n])),
    ]);
    expect(fixedSignerConsensusAction.setWeightMode(FixedSignerWeightMode.Equal)).toEqual([
      GuildActionType.Consensus,
      withCode(FixedSignerConsensusAction.SetWeightMode, ABIType.from("(uint8)").encode([1])),
    ]);
    expect(fixedSignerConsensusAction.lockMembership()).toEqual([
      GuildActionType.Consensus,
      new Uint8Array([FixedSignerConsensusAction.LockMembership]),
    ]);
    expect(subscriptionConsensusAction.addOfferings([{ interval: 60n, amount: 3n, title: "Member", weight: 3n }])).toEqual([
      GuildActionType.Consensus,
      withCode(
        SubscriptionConsensusAction.AddOfferings,
        ABIType.from("(uint64,uint64,string,byte[36],uint8,byte[3],uint64)[]").encode([
          [60n, 3n, "Member", new Uint8Array(36), 0, new Uint8Array(3), 3n],
        ]),
      ),
    ]);
    expect(newWalletAction("Treasury")).toEqual([
      GuildActionType.NewWallet,
      ABIType.from("(string,byte[32])").encode(["Treasury", new Uint8Array(32)]),
    ]);
    expect(setPluginSettingsAction(9n, "ops", settings)[0]).toBe(GuildActionType.SetPluginSettings);
    expect(subscriptionVoteEvidence(5n, 2n)).toEqual(ABIType.from("(uint64,uint64)").encode([5n, 2n]));
    expect(subscriptionConsensusAction.removeOffering(7n)[1][0]).toBe(SubscriptionConsensusAction.RemoveOffering);
    expect(lockedTokenConsensusAction.setMinimumApprovals(2n)).toEqual([
      GuildActionType.Consensus,
      withCode(LockedTokenConsensusAction.SetMinimumApprovals, ABIType.from("(uint64)").encode([2n])),
    ]);
    expect(consensusAction(encodeConsensusActionData(200))).toEqual([GuildActionType.Consensus, new Uint8Array([200])]);
  });

  test("rejects invalid inputs before building a proposal", () => {
    expect(() => fixedSignerConsensusAction.addMembers(FixedSignerWeightMode.Equal, [])).toThrow("At least one fixed signer is required");
    expect(() => fixedSignerConsensusAction.addMembers(FixedSignerWeightMode.Equal, [[member, 2n]])).toThrow(
      "Equal-weight fixed signers must have weight 1",
    );
    expect(() => fixedSignerConsensusAction.setMemberWeight(member, 0n)).toThrow("Fixed-signer weight must be positive");
    expect(() => fixedSignerConsensusAction.setThreshold(0n)).toThrow("threshold must be positive");
    expect(() => subscriptionConsensusAction.setOfferingWeight(1n, 0n)).toThrow("Offering weight must be positive");
    expect(() => lockedTokenConsensusAction.setMinimumApprovals(0n)).toThrow("Minimum approvals must be positive");
    expect(() => encodeConsensusActionData(256)).toThrow("one byte");
    expect(() => lockedTokenConsensusConfig(1n, 2n, 0n)).toThrow("positive minimum approval floor");
  });
});

describe("Guild treasury and settings action builders", () => {
  test("encode reclaim, admin handoff, and per-code settings exactly", () => {
    expect(reclaimAction("ops", [{ asset: 0n, amount: 5n, closeOut: false }])).toEqual([
      GuildActionType.Reclaim,
      ABIType.from("(string,(uint64,uint64,bool)[])").encode(["ops", [[0n, 5n, false]]]),
    ]);
    expect(changeAdminAction(member)).toEqual([GuildActionType.ChangeAdmin, ABIType.from("(address)").encode([member])]);
    expect(setConsensusActionSettingsAction(FixedSignerConsensusAction.SetThreshold, settings)).toEqual([
      GuildActionType.SetConsensusActionSettings,
      ABIType.from("(uint64,(uint64,uint64,uint64,uint64,uint64,uint64))").encode([4n, [0n, 1n, 60n, 0n, 50_000n, 1n]]),
    ]);
    expect(() => reclaimAction("ops", [])).toThrow("At least one reclaim is required");
  });

  test("encode a chat steward as the chat's SHA-256 and the steward's address", () => {
    // SHA-256 of "group:akita-builders", the key a reader of the consensus app's box derives too
    const key = guildChatKey("group:akita-builders");
    expect(Buffer.from(key).toString("hex")).toBe("f3ba44b39277bef22d0be228f873db6872c41258fdd48f246dc791c28f9eb585");
    expect(setChatStewardAction("group:akita-builders", member)).toEqual([
      GuildActionType.SetChatSteward,
      new Uint8Array([...key, ...new Uint8Array(32).fill(1)]),
    ]);
    expect(GuildActionType.SetChatSteward).toBe(86);
    // a revocation names the zero address
    expect(revokeChatStewardAction("group:akita-builders")).toEqual([86, new Uint8Array([...key, ...new Uint8Array(32)])]);
    // prefix + 32-byte key, 32-byte address: 2,500 + 400 * 65
    expect(GUILD_CHAT_STEWARD_MBR).toBe(2_500n + 400n * 65n);
  });
});

describe("subscription seasoning (readiness audit 2026-11-09, C13)", () => {
  const interval = 100n;
  const startDate = 1_000n;

  it("a new subscription votes on ballots opened one interval after it started", () => {
    const fresh = { startDate, lastPayment: startDate, streak: 1n, interval };
    expect(subscriptionVotingOpensAt(fresh)).toBe(1_100n);
    expect(isSubscriptionSeasoned(fresh, 1_000n)).toBe(false);
    expect(isSubscriptionSeasoned(fresh, 1_099n)).toBe(false);
    expect(isSubscriptionSeasoned(fresh, 1_100n)).toBe(true);
  });

  it("renewing does not move the date: the run still began with the subscription", () => {
    for (const [lastPayment, streak] of [[1_100n, 2n], [1_250n, 3n], [1_999n, 10n]] as const) {
      expect(subscriptionVotingOpensAt({ startDate, lastPayment, streak, interval })).toBe(1_100n);
    }
  });

  it("a run that restarted after a missed window is counted from the end of its first window", () => {
    // Paid window 0, missed windows 1 to 3, paid again at 1,420 (window 4): streak 1.
    const resumed = { startDate, lastPayment: 1_420n, streak: 1n, interval };
    // Window 4 ends at 1,500; one more interval is 1,600.
    expect(subscriptionVotingOpensAt(resumed)).toBe(1_600n);
    expect(isSubscriptionSeasoned(resumed, 1_599n)).toBe(false);
    expect(isSubscriptionSeasoned(resumed, 1_600n)).toBe(true);
    // Paying window 5 as well extends the run but not its start.
    expect(subscriptionVotingOpensAt({ ...resumed, lastPayment: 1_510n, streak: 2n })).toBe(1_600n);
  });

  it("a record with no payment run grants nothing", () => {
    expect(subscriptionVotingOpensAt({ startDate, lastPayment: 1_420n, streak: 0n, interval })).toBeUndefined();
    expect(subscriptionVotingOpensAt({ startDate, lastPayment: 1_420n, streak: 1n, interval: 0n })).toBeUndefined();
    expect(subscriptionVotingOpensAt({ startDate, lastPayment: 900n, streak: 1n, interval })).toBeUndefined();
    expect(isSubscriptionSeasoned({ startDate, lastPayment: 1_420n, streak: 0n, interval }, 9_999n)).toBe(false);
  });
});

describe("guildBallotOutcome", () => {
  const ballot = (votes: { approvals: bigint; rejections: bigint; abstains?: bigint }, overrides = {}) => ({
    resolved: false,
    votingEnd: 1_000n,
    eligiblePower: 3n,
    requirements: { participation: 0n, approval: 50_000n, minimumApprovals: 2n },
    votes: { abstains: 0n, ...votes },
    ...overrides,
  });

  it("closes early once the members who have not voted cannot change the result", () => {
    expect(guildBallotOutcome(ballot({ approvals: 2n, rejections: 0n }), 10n)).toBe("approved");
    expect(guildBallotOutcome(ballot({ approvals: 0n, rejections: 2n }), 10n)).toBe("rejected");
    expect(guildBallotOutcome(ballot({ approvals: 1n, rejections: 0n }), 10n)).toBeUndefined();
    expect(guildBallotOutcome(ballot({ approvals: 1n, rejections: 1n }), 10n)).toBeUndefined();
  });

  it("needs an eligible-power snapshot to close early, and resolves by the votes once time ends", () => {
    expect(guildBallotOutcome(ballot({ approvals: 2n, rejections: 0n }, { eligiblePower: 0n }), 10n)).toBeUndefined();
    expect(guildBallotOutcome(ballot({ approvals: 1n, rejections: 0n }), 1_001n)).toBe("rejected");
    expect(guildBallotOutcome(ballot({ approvals: 2n, rejections: 1n }), 1_001n)).toBe("approved");
    expect(guildBallotOutcome(ballot({ approvals: 2n, rejections: 0n }, { resolved: true }), 10n)).toBeUndefined();
  });
});
