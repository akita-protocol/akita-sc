import { type MetadataKey } from "./records";
import { type ReceiveQrStyleV1 } from "./schemas";
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
export type MetaPreferenceRecord = {
    readonly namespace: string;
    readonly field: string;
    readonly key: Uint8Array;
};
/**
 * Every synced preference lives in this one namespace, so a single key-restricted Meta plugin
 * grant (`AKITA_PREFERENCES_SCOPE`) can write all of them and nothing else. Akita gives that grant
 * to the wallet's hot key, so a settings change needs no passkey approval.
 */
export declare const AKITA_PREFERENCES_NAMESPACE = "akita.prefs";
/** The account's app theme: light/dark scheme and accent (`AppThemeV1`). */
export declare const APP_THEME_RECORD: MetaPreferenceRecord;
/** The account's sub account groups and order (`AccountGroupsV1`). */
export declare const ACCOUNT_GROUPS_RECORD: MetaPreferenceRecord;
/** The wallet's receive QR style (`ReceiveQrStyleV1`); it also stands for accounts without their own. */
export declare const RECEIVE_QR_STYLE_RECORD: MetaPreferenceRecord;
/** Receive QR styles for the wallet's other accounts, keyed by address (`ReceiveQrAccountStylesV1`). */
export declare const RECEIVE_QR_ACCOUNTS_RECORD: MetaPreferenceRecord;
/** The emoji and background colour the owner gave each account, keyed by address (`AccountIconsV1`). */
export declare const ACCOUNT_ICONS_RECORD: MetaPreferenceRecord;
/** The agent each agent sub account was made for: its address, name and avatar (`AgentAccountsV1`). */
export declare const AGENT_ACCOUNTS_RECORD: MetaPreferenceRecord;
export declare const AKITA_PREFERENCE_RECORDS: readonly [MetaPreferenceRecord, MetaPreferenceRecord, MetaPreferenceRecord, MetaPreferenceRecord, MetaPreferenceRecord, MetaPreferenceRecord];
/** The Meta plugin scope that lets a grant write exactly the preference records. */
export declare const AKITA_PREFERENCES_SCOPE: MetaPluginScope;
export type AppThemeScheme = "light" | "dark" | "system";
export interface AppThemeV1 {
    version: 1;
    /** The scheme the owner picked; a reader may keep its own. */
    scheme: AppThemeScheme;
    /** A client-defined accent id, e.g. Akita's `prismaticSoft`. Unknown ids fall back to the default. */
    accent: string;
}
export declare function isAppThemeV1(value: unknown): value is AppThemeV1;
export declare const ACCOUNT_GROUPS_MAX_GROUPS = 32;
export declare const ACCOUNT_GROUPS_MAX_ENTRIES = 256;
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
export declare function isAccountGroupsV1(value: unknown): value is AccountGroupsV1;
export declare const RECEIVE_QR_ACCOUNTS_MAX = 64;
export interface ReceiveQrAccountStylesV1 {
    version: 1;
    /** Account address to its style. */
    accounts: Record<string, ReceiveQrStyleV1>;
}
export declare function isReceiveQrAccountStylesV1(value: unknown): value is ReceiveQrAccountStylesV1;
/** The style an account's receive QR uses: its own entry, else the wallet's style. */
export declare function resolveReceiveQrStyle(address: string, walletStyle: ReceiveQrStyleV1 | undefined, accountStyles: ReceiveQrAccountStylesV1 | undefined): ReceiveQrStyleV1 | undefined;
export declare const ACCOUNT_ICONS_MAX = 64;
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
export declare function isAccountIconsV1(value: unknown): value is AccountIconsV1;
export declare const AGENT_ACCOUNTS_MAX = 32;
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
export declare function isAgentAccountsV1(value: unknown): value is AgentAccountsV1;
export declare const parseAppTheme: (data: Uint8Array) => AppThemeV1 | undefined;
export declare const parseAccountGroups: (data: Uint8Array) => AccountGroupsV1 | undefined;
export declare const parseReceiveQrAccountStyles: (data: Uint8Array) => ReceiveQrAccountStylesV1 | undefined;
export declare const parseAccountIcons: (data: Uint8Array) => AccountIconsV1 | undefined;
export declare const parseAgentAccounts: (data: Uint8Array) => AgentAccountsV1 | undefined;
export declare const encodeAppTheme: (value: AppThemeV1) => Uint8Array<ArrayBufferLike>;
export declare const encodeAccountGroups: (value: AccountGroupsV1) => Uint8Array<ArrayBufferLike>;
export declare const encodeReceiveQrAccountStyles: (value: ReceiveQrAccountStylesV1) => Uint8Array<ArrayBufferLike>;
export declare const encodeAccountIcons: (value: AccountIconsV1) => Uint8Array<ArrayBufferLike>;
export declare const encodeAgentAccounts: (value: AgentAccountsV1) => Uint8Array<ArrayBufferLike>;
/**
 * A published preference: `revision` is the record's current revision (0 when absent), which a
 * write passes back as `expectedRevision`. `value` is undefined when the record is absent or does
 * not parse, so a reader falls back to its default either way.
 */
export type MetaPreference<T> = {
    exists: boolean;
    revision: bigint;
    value: T | undefined;
};
type RecordReader = {
    readRecord(account: string, key: MetadataKey): Promise<{
        exists: boolean;
        revision: bigint;
        data: Uint8Array;
    }>;
};
/** One box read. `meta` is a `MetaSDK` (or anything with its `readRecord`). */
export declare function readMetaPreference<T>(meta: RecordReader, owner: string, record: Pick<MetaPreferenceRecord, "key">, parseValue: (data: Uint8Array) => T | undefined): Promise<MetaPreference<T>>;
export {};
