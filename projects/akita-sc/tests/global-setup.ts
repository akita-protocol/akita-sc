import { AlgorandClient, algo } from '@algorandfoundation/algokit-utils'
import algosdk from 'algosdk'

// Specs that list or buy without a marketplace frontend pay that fee to the zero address. MainNet's zero
// address holds a balance; a fresh LocalNet's does not, so those payments fail the min-balance check.
export default async function setup(): Promise<void> {
  const algorand = AlgorandClient.defaultLocalNet()
  try {
    await algorand.client.algod.status().do()
  } catch {
    return
  }
  await algorand.account.ensureFundedFromEnvironment(algosdk.ALGORAND_ZERO_ADDRESS_STRING, algo(1))
}
