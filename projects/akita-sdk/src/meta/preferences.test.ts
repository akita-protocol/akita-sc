import { describe, expect, test, vi } from "vitest";
import { encodeAddress } from "algosdk";
import {
  ACCOUNT_GROUPS_RECORD,
  ACCOUNT_ICONS_RECORD,
  AGENT_ACCOUNTS_RECORD,
  AKITA_PREFERENCE_RECORDS,
  AKITA_PREFERENCES_NAMESPACE,
  AKITA_PREFERENCES_SCOPE,
  APP_THEME_RECORD,
  encodeAccountGroups,
  encodeAccountIcons,
  encodeAgentAccounts,
  encodeAppTheme,
  encodeReceiveQrAccountStyles,
  parseAccountGroups,
  parseAccountIcons,
  parseAgentAccounts,
  parseAppTheme,
  parseReceiveQrAccountStyles,
  readMetaPreference,
  RECEIVE_QR_ACCOUNTS_RECORD,
  RECEIVE_QR_STYLE_RECORD,
  resolveReceiveQrStyle,
  type AccountGroupsV1,
  type AccountIconsV1,
  type AgentAccountsV1,
  type AppThemeV1,
} from "./preferences";
import { metadataDataKey, metadataPluginValueLimit } from "./records";
import { metadataScopeArgs } from "../wallet/plugins/meta-scope";
import type { ReceiveQrStyleV1 } from "./schemas";
import { MetaPluginSDK } from "../wallet/plugins/meta";

const bytes = (value: unknown) => new TextEncoder().encode(JSON.stringify(value));
const address = (fill: number) => encodeAddress(new Uint8Array(32).fill(fill));
const style: ReceiveQrStyleV1 = { version: 1, background: "#112233", foreground: "auto", moduleRoundness: 0.5, finderRoundness: 1, showAvatar: true };

describe("Meta preference records", () => {
  test("every record shares one namespace that a key-restricted grant can cover", () => {
    expect(APP_THEME_RECORD.key).toEqual(metadataDataKey("akita.prefs", "theme"));
    expect(ACCOUNT_GROUPS_RECORD.key).toEqual(metadataDataKey("akita.prefs", "groups"));
    expect(RECEIVE_QR_STYLE_RECORD.key).toEqual(metadataDataKey("akita.prefs", "qr"));
    expect(RECEIVE_QR_ACCOUNTS_RECORD.key).toEqual(metadataDataKey("akita.prefs", "qr-accounts"));
    expect(ACCOUNT_ICONS_RECORD.key).toEqual(metadataDataKey("akita.prefs", "icons"));
    expect(AGENT_ACCOUNTS_RECORD.key).toEqual(metadataDataKey("akita.prefs", "agents"));
    for (const record of AKITA_PREFERENCE_RECORDS) {
      expect(record.namespace).toBe(AKITA_PREFERENCES_NAMESPACE);
      expect(metadataPluginValueLimit(record.namespace, record.field)).toBeGreaterThan(16000);
    }
    // The plugin's scope encoding accepts it, in canonical order.
    expect(metadataScopeArgs(AKITA_PREFERENCES_SCOPE)).toEqual({ namespace: "akita.prefs", keys: ["qr", "icons", "theme", "agents", "groups", "qr-accounts"] });
  });

  test("app theme round-trips and rejects anything else", () => {
    const theme: AppThemeV1 = { version: 1, scheme: "dark", accent: "prismaticSoft" };
    expect(parseAppTheme(encodeAppTheme(theme))).toEqual(theme);
    expect(parseAppTheme(bytes({ ...theme, scheme: "system" }))).toEqual({ ...theme, scheme: "system" });
    for (const bad of [
      { ...theme, version: 2 },
      { ...theme, scheme: "dim" },
      { ...theme, accent: "" },
      { ...theme, accent: "has space" },
      { ...theme, accent: "x".repeat(33) },
      { ...theme, extra: true },
    ]) {
      expect(parseAppTheme(bytes(bad))).toBeUndefined();
    }
    expect(parseAppTheme(new Uint8Array([0xff]))).toBeUndefined();
    expect(() => encodeAppTheme({ ...theme, scheme: "dim" } as never)).toThrow(/app theme/);
  });

  test("account groups round-trip, bounded and with unique ids", () => {
    const groups: AccountGroupsV1 = {
      version: 1,
      order: ["group:g1", "escrow-trading"],
      groups: [{ id: "g1", label: "Savings", icon: "💼", color: "#6366f1", accountIds: ["escrow-savings", "escrow-rainy"] }],
    };
    expect(parseAccountGroups(encodeAccountGroups(groups))).toEqual(groups);
    expect(parseAccountGroups(bytes({ version: 1, order: [], groups: [] }))).toEqual({ version: 1, order: [], groups: [] });
    const group = groups.groups[0];
    for (const bad of [
      { ...groups, groups: [group, group] },
      { ...groups, groups: [{ ...group, color: "red" }] },
      { ...groups, groups: [{ ...group, label: "" }] },
      { ...groups, groups: [{ ...group, label: "x".repeat(65) }] },
      { ...groups, groups: [{ ...group, accountIds: [1] }] },
      { ...groups, groups: [{ ...group, extra: 1 }] },
      { ...groups, order: "group:g1" },
      { ...groups, groups: Array.from({ length: 33 }, (_, i) => ({ ...group, id: `g${i}` })) },
    ]) {
      expect(parseAccountGroups(bytes(bad))).toBeUndefined();
    }
  });

  test("per-account QR styles fall back to the wallet's style", () => {
    const sub = address(2);
    const accounts = { version: 1 as const, accounts: { [sub]: { ...style, background: "#000000" } } };
    expect(parseReceiveQrAccountStyles(encodeReceiveQrAccountStyles(accounts))).toEqual(accounts);
    expect(parseReceiveQrAccountStyles(bytes({ version: 1, accounts: { nope: style } }))).toBeUndefined();
    expect(parseReceiveQrAccountStyles(bytes({ version: 1, accounts: { [sub]: { ...style, version: 2 } } }))).toBeUndefined();
    expect(resolveReceiveQrStyle(sub, style, accounts)?.background).toBe("#000000");
    expect(resolveReceiveQrStyle(address(3), style, accounts)).toBe(style);
    expect(resolveReceiveQrStyle(sub, undefined, undefined)).toBeUndefined();
  });

  test("account icons round-trip, keyed by address, with an emoji, a colour or both", () => {
    const icons: AccountIconsV1 = {
      version: 1,
      accounts: { [address(1)]: { emoji: "🦊", color: "#2563eb" }, [address(2)]: { color: "#111827" }, [address(3)]: { emoji: "🐕‍🦺" } },
    };
    expect(parseAccountIcons(encodeAccountIcons(icons))).toEqual(icons);
    for (const bad of [
      { version: 1, accounts: { "not-an-address": { emoji: "🦊" } } },
      { version: 1, accounts: { [address(1)]: {} } },
      { version: 1, accounts: { [address(1)]: { color: "blue" } } },
      { version: 1, accounts: { [address(1)]: { emoji: "x".repeat(17) } } },
      { version: 1, accounts: { [address(1)]: { emoji: "🦊", size: 2 } } },
      { version: 1, accounts: Object.fromEntries(Array.from({ length: 65 }, (_, index) => [address(index + 1), { emoji: "🦊" }])) },
    ]) {
      expect(parseAccountIcons(bytes(bad))).toBeUndefined();
    }
  });

  test("agent accounts round-trip, keyed by escrow name", () => {
    const agents: AgentAccountsV1 = {
      version: 1,
      agents: {
        "agent:trader": { address: address(4), name: "Trader", avatar: "https://images.nf.domains/avatar/trader.png" },
        "agent:scout": { address: address(5), name: "Scout" },
      },
    };
    expect(parseAgentAccounts(encodeAgentAccounts(agents))).toEqual(agents);
    for (const bad of [
      { version: 1, agents: { "agent:x": { address: "nope", name: "X" } } },
      { version: 1, agents: { "agent:x": { address: address(4), name: "" } } },
      { version: 1, agents: { "agent:x": { address: address(4), name: "X", avatar: "javascript:alert(1)" } } },
      { version: 1, agents: { "agent:x": { address: address(4), name: "X", avatar: `https://${"a".repeat(256)}` } } },
      { version: 1, agents: { "": { address: address(4), name: "X" } } },
    ]) {
      expect(parseAgentAccounts(bytes(bad))).toBeUndefined();
    }
    expect(() => encodeAgentAccounts({ version: 1, agents: { "agent:x": { address: "nope", name: "X" } } })).toThrow(/agent accounts/);
  });

  test("reads report the revision to write against, and absent or invalid values as undefined", async () => {
    const owner = address(1);
    const readRecord = vi.fn()
      .mockResolvedValueOnce({ exists: false, revision: 0n, data: new Uint8Array() })
      .mockResolvedValueOnce({ exists: true, revision: 4n, data: bytes({ version: 1, scheme: "light", accent: "lime" }) })
      .mockResolvedValueOnce({ exists: true, revision: 5n, data: bytes({ version: 9 }) });
    const meta = { readRecord };
    expect(await readMetaPreference(meta, owner, APP_THEME_RECORD, parseAppTheme)).toEqual({ exists: false, revision: 0n, value: undefined });
    expect(await readMetaPreference(meta, owner, APP_THEME_RECORD, parseAppTheme))
      .toEqual({ exists: true, revision: 4n, value: { version: 1, scheme: "light", accent: "lime" } });
    expect(await readMetaPreference(meta, owner, APP_THEME_RECORD, parseAppTheme)).toEqual({ exists: true, revision: 5n, value: undefined });
    expect(readRecord).toHaveBeenCalledWith(owner, APP_THEME_RECORD.key);
  });

  test("the Meta plugin writes a preference under its namespace and field", () => {
    const sdk = Object.create(MetaPluginSDK.prototype) as MetaPluginSDK;
    const set = vi.fn().mockReturnValue("call");
    const remove = vi.fn().mockReturnValue("removal");
    Object.assign(sdk, { set, remove });
    const data = encodeAppTheme({ version: 1, scheme: "dark", accent: "lime" });
    expect(sdk.setPreference({ record: APP_THEME_RECORD, data, expectedRevision: 3n })).toBe("call");
    expect(set).toHaveBeenCalledWith({ namespace: "akita.prefs", key: "theme", data, expectedRevision: 3n });
    expect(sdk.removePreference({ record: ACCOUNT_GROUPS_RECORD, expectedRevision: 1n })).toBe("removal");
    expect(remove).toHaveBeenCalledWith({ namespace: "akita.prefs", key: "groups", expectedRevision: 1n });
  });
});
