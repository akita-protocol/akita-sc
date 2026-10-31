// AkitaRouterPlugin and VenueRegistry error codes (router.md §4.2 names, 7-byte `err` style).

/** the spending account is not rekeyed to the router (called outside a wallet window) */
export const errRtCustody = 'errRtcu'
/** invalid route shape: legs, segments, assets, pools, chunks, candidates, flags */
export const errRtRoute = 'errRtrt'
/** adapter not in the VenueRegistry, or disabled */
export const errRtAdapter = 'errRtad'
/** adapter's current Application.version differs from the registry's pinned version */
export const errRtAdapterVer = 'errRtav'
/** the adapter did not hand the account back to the router */
export const errRtRekeyBack = 'errRtrb'
/** more input left an account than the leg/segment allowed */
export const errRtOverspend = 'errRtos'
/** spendable ALGO left an account on a route that does not trade ALGO */
export const errRtAlgoLeak = 'errRtal'
/** output below a segment, leg or aggregate minimum */
export const errRtSlippage = 'errRtsl'
/** swapBest: an executed chunk delivered less than its own quote minus the tolerance */
export const errRtQuote = 'errRtqt'
/** DIRECT custody is reserved and not available in v1 (SANDBOX only) */
export const errRtDirect = 'errRtdi'
/** the spending account holds less input than the route spends */
export const errRtFunds = 'errRtfd'
/** leg escrow already initialized / not initialized, or init payment invalid */
export const errRtInit = 'errRtin'
/** swapBest: no candidate can fill a chunk */
export const errRtNoLiq = 'errRtnl'
/** VenueRegistry: admin only */
export const errRtAdmin = 'errRtam'
/** a payment does not cover the measured cost */
export const errRtPayment = 'errRtpy'
