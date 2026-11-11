// PluginDexAdminPlugin error codes (7-byte `err` style).

/** create: one of the five ids is 0, is not a live app, or lacks the admin state its contract has */
export const errDaCreate = 'errDaCr'
/** proposeAdminOf / acceptAdminOf: the app is not one of the four apps with a stored admin pinned at create */
export const errDaTarget = 'errDaTg'
