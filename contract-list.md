# Contract inventory

See [CONTRACT_AUDIT.md](./CONTRACT_AUDIT.md) for end-to-end lifecycle,
inter-contract dependencies, invariants, findings, tests, and migration notes.

## Governance and ARC-58 accounts

- Akita DAO
- DAO proposal validator
- DAO ABI types helper
- Abstracted account
- Abstracted account factory
- Abstracted account MBR helper
- Abstracted account balance reader
- Abstracted account update stub
- Ed25519 passkey logic signature
- secp256r1 passkey logic signature

## ARC-58 plugins

- ASA manager
- Auction
- DAO
- Dual stake
- Gate
- Haystack Router
- HyperSwap
- Marketplace
- NFD
- Opt-in
- Self opt-in
- Pay
- Pay silo
- Pay silo factory
- Poll
- Raffle
- Revenue manager
- Rewards
- Social
- Staking
- Staking pool
- Subscriptions
- Sunset
- Update Akita DAO

The test close-out and test proxy-rekey plugins are LocalNet-only helpers.

## Protocol and infrastructure

- Escrow and Escrow Factory
- Staking
- Rewards
- Subscriptions
- Akita Social
- Akita Social Graph
- Akita Social Impact
- Akita Social Moderation
- Gate
- MetaMerkles
- Plugin DEX
- HyperSwap
- Marketplace and Listing
- Auction and Auction Factory
- Raffle and Raffle Factory
- Poll and Poll Factory
- PrizeBox and PrizeBox Factory
- Staking Pool and Staking Pool Factory
- Sunset and Wallet Factory Sunset

## Gate implementations

- Akita referrer
- Asset
- Merkle address
- Merkle asset
- NFD
- NFD root
- Poll
- Social activity
- Social follower count
- Social follower index
- Social impact
- Social moderator
- Staking amount
- Staking power
- Subscription
- Subscription streak

## Test-only support

- Mock DAO, wallet, wallet factory, Social, Subscriptions, Staking consumer,
  randomness beacon, and child factories
- PCG32 and PCG64 deterministic random-number libraries
