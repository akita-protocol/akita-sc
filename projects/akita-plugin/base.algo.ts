import { Contract } from '@algorandfoundation/algorand-typescript/arc4'

/**
 * Base contract for ARC-58 plugins.
 *
 * Extend this class to build a plugin for ARC-58 abstract accounts.
 *
 * ## Plugin Method Rules
 *
 * Every plugin method **must**:
 * 1. Accept `wallet: Application` as the **first** parameter
 * 2. Accept `rekeyBack: boolean` as the **second** parameter
 * 3. Rekey back to the wallet on the **last** inner transaction when `rekeyBack` is true
 *
 * Use the standalone utility functions from this package to satisfy these requirements:
 * - `getSpendingAccount(wallet)` - get the account to use as `sender`
 * - `rekeyAddress(rekeyBack, wallet)` - get the address for the `rekeyTo` field
 * - `rekeyBackIfNecessary(rekeyBack, wallet)` - submit a no-op rekey when your last
 *   operation isn't an inner transaction
 *
 * @example
 * ```ts
 * import { Application, itxn, uint64 } from '@algorandfoundation/algorand-typescript'
 * import { Plugin, getSpendingAccount, rekeyAddress } from '@akta/plugin'
 *
 * export class MyPlugin extends Plugin {
 *   doSomething(wallet: Application, rekeyBack: boolean, amount: uint64): void {
 *     const sender = getSpendingAccount(wallet)
 *
 *     itxn
 *       .payment({
 *         sender,
 *         receiver: someAddress,
 *         amount,
 *         rekeyTo: rekeyAddress(rekeyBack, wallet),
 *       })
 *       .submit()
 *   }
 * }
 * ```
 */
export class Plugin extends Contract {}
