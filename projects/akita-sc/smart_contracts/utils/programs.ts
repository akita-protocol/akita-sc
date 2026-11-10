import { Application, Bytes, bytes, loggedAssert, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { MAX_AVM_BYTE_ARRAY_LENGTH, MIN_PROGRAM_PAGES, PROGRAM_PAGE_SIZE } from './constants'
import { errContractNotSet, errProgramTooLarge } from './errors'

/**
 * Helpers for programs that are stored in a box and pushed into an app by an inner
 * create/update transaction.
 *
 * AVM 13 allows up to 8 program pages (1 base page plus 7 extra pages, 2 048 bytes each),
 * so approval + clear can be up to 16 384 bytes. One AVM byte value is at most 4 096 bytes,
 * so an approval program is passed as up to four `ApprovalProgramPages` chunks.
 *
 * Every create/update site passes exactly four chunks (`boxedProgramChunk(key, 0..3)`).
 * Chunks past the end of the program are empty, and the AVM ignores empty pages.
 */

/** Largest number of program pages an app may have (AVM 13): base page + 7 extra pages. */
export const MAX_PROGRAM_TOTAL_PAGES: uint64 = 8

/** Chunks passed to every boxed create/update (4 × 4 096 = 16 384 bytes). */
export const BOXED_PROGRAM_CHUNKS: uint64 = 4

/**
 * Extra pages that factory children have always been created with (and that SDK/plugin cost
 * quotes assume via `MAX_PROGRAM_PAGES`). Children are never created with fewer extra pages
 * than this, so existing quotes stay exact until a child actually outgrows four pages.
 */
export const LEGACY_CHILD_EXTRA_PROGRAM_PAGES: uint64 = 3

/** Total program pages required for an approval + clear pair. */
export function programPages(approvalSize: uint64, clearSize: uint64): uint64 {
  const pages: uint64 = (approvalSize + clearSize + PROGRAM_PAGE_SIZE - 1) / PROGRAM_PAGE_SIZE
  loggedAssert(pages <= MAX_PROGRAM_TOTAL_PAGES, errProgramTooLarge)
  return pages
}

/**
 * Extra program pages for a new app, never below `minExtraPages`.
 * Pass `LEGACY_CHILD_EXTRA_PROGRAM_PAGES` for factory children, or 0 for an exact fit.
 */
export function programExtraPages(approvalSize: uint64, clearSize: uint64, minExtraPages: uint64): uint64 {
  const pages = programPages(approvalSize, clearSize)
  const extra: uint64 = pages > 0 ? pages - 1 : 0
  return extra > minExtraPages ? extra : minExtraPages
}

/** Creator min-balance for an app's program pages (100 000 µALGO per page incl. the base page). */
export function programPagesMbr(extraPages: uint64): uint64 {
  return MIN_PROGRAM_PAGES * (1 + extraPages)
}

/**
 * For an UpdateApplication: the extra-page count to set if the new program does not fit the
 * app's current pages, or 0 if no change is needed.
 *
 * Pages are only ever grown, never shrunk. When pages grow, the AVM makes the *sender of the
 * update* the app's size sponsor and moves the app's entire MBR (pages + schema) onto it, so
 * the sender must be funded before the update.
 */
export function extraPagesToGrow(app: Application, approvalSize: uint64, clearSize: uint64): uint64 {
  const needed = programExtraPages(approvalSize, clearSize, 0)
  const [current] = op.AppParams.appExtraProgramPages(app)
  return needed > current ? needed : 0
}

/**
 * Current global schema of `app` as `[numUint, numByteSlice]`.
 *
 * IMPORTANT: an UpdateApplication that sets `extraProgramPages` is treated by the AVM as a size
 * change, and the update's `globalNumUint` / `globalNumBytes` fields (0 when omitted) become the
 * app's new global schema. Every page-growing update must therefore also pass the current (or a
 * larger) schema, or it fails with "unable to change global schema".
 */
export function appGlobalSchema(app: Application): readonly [uint64, uint64] {
  const [numUint] = op.AppParams.appGlobalNumUint(app)
  const [numBytes] = op.AppParams.appGlobalNumByteSlice(app)
  return [numUint, numBytes]
}

/** Size in bytes of the program stored in box `boxKey`. Fails if the box does not exist. */
export function boxedProgramSize(boxKey: bytes): uint64 {
  const [size, exists] = op.Box.length(boxKey)
  loggedAssert(exists, errContractNotSet)
  return size
}

/**
 * Chunk `index` (0-based, `MAX_AVM_BYTE_ARRAY_LENGTH` bytes each) of the program stored in
 * box `boxKey`. Returns empty bytes for chunks past the end of the program.
 */
export function boxedProgramChunk(boxKey: bytes, index: uint64): bytes {
  const size = boxedProgramSize(boxKey)
  const offset: uint64 = index * MAX_AVM_BYTE_ARRAY_LENGTH
  if (offset >= size) {
    return Bytes('')
  }
  const remaining: uint64 = size - offset
  return op.Box.extract(boxKey, offset, remaining > MAX_AVM_BYTE_ARRAY_LENGTH ? MAX_AVM_BYTE_ARRAY_LENGTH : remaining)
}
