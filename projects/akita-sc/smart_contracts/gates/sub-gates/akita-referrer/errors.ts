// Mirror `ERR_INVALID_WALLET_ID` from `gates/errors.ts` so this sub-gate shares
// the wire format. PuyaTs doesn't support `export { X } from` re-export syntax,
// so the constant is redeclared here with an identical value.
export const ERR_INVALID_WALLET_ID = 'IWID'
