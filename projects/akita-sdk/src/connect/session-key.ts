import algosdk from 'algosdk'

/**
 * The live session key caller: a version 1, threshold 2 multisig of the
 * page's key followed by the server's key. Both sides recompute it from the
 * two addresses, so the order is part of the protocol.
 */
export function getSessionKeyMultisig(browserKey: string, serverKey: string): {
  params: algosdk.MultisigMetadata
  address: string
} {
  if (browserKey === serverKey) throw new Error('The browser and server session keys must differ')
  for (const key of [browserKey, serverKey]) algosdk.Address.fromString(key)
  const params: algosdk.MultisigMetadata = { version: 1, threshold: 2, addrs: [browserKey, serverKey] }
  return { params, address: algosdk.multisigAddress(params).toString() }
}
