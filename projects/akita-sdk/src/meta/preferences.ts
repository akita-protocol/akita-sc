import { isValidAddress } from "algosdk";
import { encodeMetadataJson, METADATA_MAX_VALUE_BYTES, metadataDataKey, type MetadataKey } from "./records";
import { isReceiveQrStyleV1, type ReceiveQrStyleV1 } from "./schemas";
import type { MetaPluginScope } from "../wallet/plugins/meta-scope";

/**
 * Account preferences that Akita clients publish in the Meta registry so they follow the account
 * to every device and other clients can read them. Each is a versioned JSON record owned by the
 * account that wrote it: through the Meta plugin, the wallet's controlled address.
 *
 * Everything here is public. Clients should apply account groups and per-account QR styles only
 * while the owner's Akita membership is paid up, and premium theme accents under the same rule
 * they use for the viewer's own theme. Account order (in the groups record), account icons and
 * agent account details apply to everyone.
 */

/** A Meta record a Meta plugin call addresses by `namespace` and `field`, and a reader by `key`. */
export type MetaPreferenceRecord = { readonly namespace: string; readonly field: string; readonly key: Uint8Array };

/**
 * Every synced preference lives in this one namespace, so a single key-restricted Meta plugin
 * grant (`AKITA_PREFERENCES_SCOPE`) can write all of them and nothing else. Akita gives that grant
 * to the wallet's hot key, so a settings change needs no passkey approval.
 */
export const AKITA_PREFERENCES_NAMESPACE = "akita.prefs";

function preferenceRecord(field: string): MetaPreferenceRecord {
  return { namespace: AKITA_PREFERENCES_NAMESPACE, field, key: metadataDataKey(AKITA_PREFERENCES_NAMESPACE, field) };
}

/** The account's app theme: light/dark scheme and accent (`AppThemeV1`). */
export const APP_THEME_RECORD = preferenceRecord("theme");
/** The account's sub account groups and order (`AccountGroupsV1`). */
export const ACCOUNT_GROUPS_RECORD = preferenceRecord("groups");
/** The wallet's receive QR style (`ReceiveQrStyleV1`); it also stands for accounts without their own. */
export const RECEIVE_QR_STYLE_RECORD = preferenceRecord("qr");
/** Receive QR styles for the wallet's other accounts, keyed by address (`ReceiveQrAccountStylesV1`). */
export const RECEIVE_QR_ACCOUNTS_RECORD = preferenceRecord("qr-accounts");

/** The emoji and background colour the owner gave each account, keyed by address (`AccountIconsV1`). */
export const ACCOUNT_ICONS_RECORD = preferenceRecord("icons");
/** The agent each agent sub account was made for: its address, name and avatar (`AgentAccountsV1`). */
export const AGENT_ACCOUNTS_RECORD = preferenceRecord("agents");

export const AKITA_PREFERENCE_RECORDS = [
  APP_THEME_RECORD,
  ACCOUNT_GROUPS_RECORD,
  RECEIVE_QR_STYLE_RECORD,
  RECEIVE_QR_ACCOUNTS_RECORD,
  ACCOUNT_ICONS_RECORD,
  AGENT_ACCOUNTS_RECORD,
] as const;

/** The Meta plugin scope that lets a grant write exactly the preference records. */
export const AKITA_PREFERENCES_SCOPE: MetaPluginScope = {
  type: "keys",
  namespace: AKITA_PREFERENCES_NAMESPACE,
  keys: AKITA_PREFERENCE_RECORDS.map((record) => record.field),
};

// ---------------------------------------------------------------------------------------------
// Theme

export type AppThemeScheme = "light" | "dark" | "system";

export interface AppThemeV1 {
  version: 1;
  /** The scheme the owner picked; a reader may keep its own. */
  scheme: AppThemeScheme;
  /** A client-defined accent id, e.g. Akita's `prismaticSoft`. Unknown ids fall back to the default. */
  accent: string;
}

const accentId = /^[A-Za-z0-9_-]{1,32}$/;

function object(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasOnly(value: Record<string, unknown>, keys: string[]): boolean {
  return Object.keys(value).every((key) => keys.includes(key));
}

export function isAppThemeV1(value: unknown): value is AppThemeV1 {
  return (
    object(value) &&
    hasOnly(value, ["version", "scheme", "accent"]) &&
    value.version === 1 &&
    (value.scheme === "light" || value.scheme === "dark" || value.scheme === "system") &&
    typeof value.accent === "string" &&
    accentId.test(value.accent)
  );
}

// ---------------------------------------------------------------------------------------------
// Account groups

export const ACCOUNT_GROUPS_MAX_GROUPS = 32;
export const ACCOUNT_GROUPS_MAX_ENTRIES = 256;
const MAX_ID_LENGTH = 64;
const MAX_LABEL_LENGTH = 64;
const MAX_ICON_LENGTH = 16;

export interface AccountGroupV1 {
  /** Unique within the record. */
  id: string;
  label: string;
  /** An emoji. */
  icon: string;
  /** A `#rrggbb` colour. */
  color: string;
  /** Account ids in the group, in its own order. Akita writes `escrow-<escrow name>`. */
  accountIds: string[];
}

export interface AccountGroupsV1 {
  version: 1;
  /** Account ids and `group:<group id>` entries, top to bottom. Anything missing keeps its natural place after them. */
  order: string[];
  groups: AccountGroupV1[];
}

const color = /^#[0-9a-fA-F]{6}$/;

function boundedString(value: unknown, max: number): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= max;
}

function boundedIds(value: unknown): value is string[] {
  return Array.isArray(value) && value.length <= ACCOUNT_GROUPS_MAX_ENTRIES && value.every((id) => boundedString(id, MAX_ID_LENGTH));
}

function isAccountGroupV1(value: unknown): value is AccountGroupV1 {
  return (
    object(value) &&
    hasOnly(value, ["id", "label", "icon", "color", "accountIds"]) &&
    boundedString(value.id, MAX_ID_LENGTH) &&
    boundedString(value.label, MAX_LABEL_LENGTH) &&
    boundedString(value.icon, MAX_ICON_LENGTH) &&
    typeof value.color === "string" &&
    color.test(value.color) &&
    boundedIds(value.accountIds)
  );
}

export function isAccountGroupsV1(value: unknown): value is AccountGroupsV1 {
  if (
    !object(value) ||
    !hasOnly(value, ["version", "order", "groups"]) ||
    value.version !== 1 ||
    !boundedIds(value.order) ||
    !Array.isArray(value.groups) ||
    value.groups.length > ACCOUNT_GROUPS_MAX_GROUPS ||
    !value.groups.every(isAccountGroupV1)
  ) {
    return false;
  }
  const ids = value.groups.map((group) => group.id);
  return new Set(ids).size === ids.length;
}

// ---------------------------------------------------------------------------------------------
// Per-account receive QR styles

export const RECEIVE_QR_ACCOUNTS_MAX = 64;

export interface ReceiveQrAccountStylesV1 {
  version: 1;
  /** Account address to its style. */
  accounts: Record<string, ReceiveQrStyleV1>;
}

export function isReceiveQrAccountStylesV1(value: unknown): value is ReceiveQrAccountStylesV1 {
  if (!object(value) || !hasOnly(value, ["version", "accounts"]) || value.version !== 1 || !object(value.accounts)) return false;
  const entries = Object.entries(value.accounts);
  return entries.length <= RECEIVE_QR_ACCOUNTS_MAX && entries.every(([address, style]) => isValidAddress(address) && isReceiveQrStyleV1(style));
}

/** The style an account's receive QR uses: its own entry, else the wallet's style. */
export function resolveReceiveQrStyle(
  address: string,
  walletStyle: ReceiveQrStyleV1 | undefined,
  accountStyles: ReceiveQrAccountStylesV1 | undefined,
): ReceiveQrStyleV1 | undefined {
  return accountStyles?.accounts[address] ?? walletStyle;
}

// ---------------------------------------------------------------------------------------------
// Account icons

export const ACCOUNT_ICONS_MAX = 64;

export interface AccountIconV1 {
  /** A short emoji shown in place of the wallet glyph. */
  emoji?: string;
  /** The icon's background, `#rrggbb`. */
  color?: string;
}

export interface AccountIconsV1 {
  version: 1;
  /** Account address to its icon. */
  accounts: Record<string, AccountIconV1>;
}

function isAccountIconV1(value: unknown): value is AccountIconV1 {
  if (!object(value) || !hasOnly(value, ["emoji", "color"])) return false;
  if (value.emoji === undefined && value.color === undefined) return false;
  if (value.emoji !== undefined && (typeof value.emoji !== "string" || value.emoji.length < 1 || value.emoji.length > 16)) return false;
  return value.color === undefined || (typeof value.color === "string" && color.test(value.color));
}

export function isAccountIconsV1(value: unknown): value is AccountIconsV1 {
  if (!object(value) || !hasOnly(value, ["version", "accounts"]) || value.version !== 1 || !object(value.accounts)) return false;
  const entries = Object.entries(value.accounts);
  return entries.length <= ACCOUNT_ICONS_MAX && entries.every(([address, icon]) => isValidAddress(address) && isAccountIconV1(icon));
}

// ---------------------------------------------------------------------------------------------
// Agent accounts

export const AGENT_ACCOUNTS_MAX = 32;

export interface AgentAccountV1 {
  /** The agent's account: the caller its plugins are installed for. */
  address: string;
  /** The agent's name as its install request gave it. */
  name: string;
  /** An `https://` or `ipfs://` image for the agent, from its profile when it was installed. */
  avatar?: string;
}

export interface AgentAccountsV1 {
  version: 1;
  /** The sub account's escrow name (e.g. `agent:trader`) to the agent it was made for. */
  agents: Record<string, AgentAccountV1>;
}

function isAgentAccountV1(value: unknown): value is AgentAccountV1 {
  if (!object(value) || !hasOnly(value, ["address", "name", "avatar"])) return false;
  if (typeof value.address !== "string" || !isValidAddress(value.address)) return false;
  if (typeof value.name !== "string" || value.name.length < 1 || value.name.length > 64) return false;
  return value.avatar === undefined || (typeof value.avatar === "string" && value.avatar.length <= 256 && /^(https|ipfs):\/\/\S+$/.test(value.avatar));
}

export function isAgentAccountsV1(value: unknown): value is AgentAccountsV1 {
  if (!object(value) || !hasOnly(value, ["version", "agents"]) || value.version !== 1 || !object(value.agents)) return false;
  const entries = Object.entries(value.agents);
  return entries.length <= AGENT_ACCOUNTS_MAX && entries.every(([escrow, agent]) => escrow.length >= 1 && escrow.length <= 64 && isAgentAccountV1(agent));
}

// ---------------------------------------------------------------------------------------------
// Encoding and reading

function parse<T>(data: Uint8Array, valid: (value: unknown) => value is T): T | undefined {
  if (data.length > METADATA_MAX_VALUE_BYTES) return undefined;
  try {
    const value: unknown = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(data));
    return valid(value) ? value : undefined;
  } catch {
    return undefined;
  }
}

function encode<T>(value: T, valid: (value: unknown) => value is T, name: string): Uint8Array {
  if (!valid(value)) throw new Error(`Invalid ${name}.`);
  return encodeMetadataJson(value);
}

export const parseAppTheme = (data: Uint8Array) => parse(data, isAppThemeV1);
export const parseAccountGroups = (data: Uint8Array) => parse(data, isAccountGroupsV1);
export const parseReceiveQrAccountStyles = (data: Uint8Array) => parse(data, isReceiveQrAccountStylesV1);
export const parseAccountIcons = (data: Uint8Array) => parse(data, isAccountIconsV1);
export const parseAgentAccounts = (data: Uint8Array) => parse(data, isAgentAccountsV1);

export const encodeAppTheme = (value: AppThemeV1) => encode(value, isAppThemeV1, "app theme v1");
export const encodeAccountGroups = (value: AccountGroupsV1) => encode(value, isAccountGroupsV1, "account groups v1");
export const encodeReceiveQrAccountStyles = (value: ReceiveQrAccountStylesV1) =>
  encode(value, isReceiveQrAccountStylesV1, "receive QR account styles v1");
export const encodeAccountIcons = (value: AccountIconsV1) => encode(value, isAccountIconsV1, "account icons v1");
export const encodeAgentAccounts = (value: AgentAccountsV1) => encode(value, isAgentAccountsV1, "agent accounts v1");

/**
 * A published preference: `revision` is the record's current revision (0 when absent), which a
 * write passes back as `expectedRevision`. `value` is undefined when the record is absent or does
 * not parse, so a reader falls back to its default either way.
 */
export type MetaPreference<T> = { exists: boolean; revision: bigint; value: T | undefined };

type RecordReader = { readRecord(account: string, key: MetadataKey): Promise<{ exists: boolean; revision: bigint; data: Uint8Array }> };

/** One box read. `meta` is a `MetaSDK` (or anything with its `readRecord`). */
export async function readMetaPreference<T>(
  meta: RecordReader,
  owner: string,
  record: Pick<MetaPreferenceRecord, "key">,
  parseValue: (data: Uint8Array) => T | undefined,
): Promise<MetaPreference<T>> {
  const result = await meta.readRecord(owner, record.key);
  if (!result.exists) return { exists: false, revision: 0n, value: undefined };
  return { exists: true, revision: result.revision, value: parseValue(result.data) };
}
