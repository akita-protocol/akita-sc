import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ABIType } from 'algosdk';
import { describe, expect, test, vi } from 'vitest';
import { AkitaDaoSDK, ProposalActionEnum } from '.';
import { APP_SPEC as DAO_SPEC } from '../generated/AkitaDAOClient';
import { APP_SPEC as TYPES_SPEC, type AkitaDaoTypesClient } from '../generated/AkitaDAOTypesClient';

const CALLER = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ';

const NFT_FEES = {
  marketplaceSalePercentageMin: 500n, marketplaceSalePercentageMax: 2_000n, marketplaceComposablePercentage: 500n,
  marketplaceRoyaltyDefaultPercentage: 5_000n, shuffleSalePercentage: 1_000n, omnigemSaleFee: 100_000_000n,
  auctionCreationFee: 10_000_000n, auctionSaleImpactTaxMin: 500n, auctionSaleImpactTaxMax: 2_000n,
  auctionComposablePercentage: 500n, auctionRafflePercentage: 10_000n, raffleCreationFee: 10_000_000n,
  raffleSaleImpactTaxMin: 500n, raffleSaleImpactTaxMax: 2_000n, raffleComposablePercentage: 500n,
};
const STAKING_FEES = { creationFee: 50_000_000n, impactTaxMin: 500n, impactTaxMax: 3_000n };

const setup = () => {
  const sdk = Object.create(AkitaDaoSDK.prototype) as AkitaDaoSDK;
  const proposalCost = vi.fn().mockResolvedValue({ total: 1n });
  sdk.sendParams = { sender: CALLER, signer: vi.fn() };
  sdk.readerAccount = CALLER;
  sdk.typeClient = { appClient: { appSpec: TYPES_SPEC } } as unknown as AkitaDaoTypesClient;
  sdk.client = {
    proposalCost,
    appClient: { appSpec: DAO_SPEC },
    state: { global: { nftFees: async () => NFT_FEES, stakingFees: async () => STAKING_FEES } },
  } as unknown as typeof sdk.client;
  return { sdk, proposalCost };
};

/** The field name and the raw value of the first UpdateFields action the SDK prepared. */
const prepared = (proposalCost: ReturnType<typeof vi.fn>, at = 0): [string, Uint8Array] => {
  const [type, data] = proposalCost.mock.calls[0][0].args.actions[at];
  expect(type).toBe(ProposalActionEnum.UpdateFields);
  const [field, value] = ABIType.from('(string,byte[])').decode(data) as [string, Uint8Array];
  return [field, Uint8Array.from(value)];
};

describe('DAO UpdateFields encoding', () => {
  test('every struct the SDK encodes a field with is a struct of the DAO', () => {
    const source = readFileSync(path.join(__dirname, 'index.ts'), 'utf8');
    const named = [...source.matchAll(/getABIEncodedValue\(abiData, '(\w+)', this\.client\.appClient\.appSpec\.structs\)/g)].map((m) => m[1]);
    expect(named.length).toBeGreaterThan(6);
    expect(named.filter((name) => !(name in DAO_SPEC.structs))).toEqual([]);
  });

  test('nft_fees: the members given change, the rest keep the value the DAO holds', async () => {
    const { sdk, proposalCost } = setup();
    await sdk.proposalCost({ actions: [{ type: ProposalActionEnum.UpdateFields, field: 'nft_fees', value: { auctionCreationFee: 50_000_000n, raffleCreationFee: 50_000_000n } }] });
    const [field, value] = prepared(proposalCost);
    expect(field).toBe('nft_fees');
    expect(value).toHaveLength(15 * 8);
    const expected = { ...NFT_FEES, auctionCreationFee: 50_000_000n, raffleCreationFee: 50_000_000n };
    expect(ABIType.from(`(${Array(15).fill('uint64').join(',')})`).decode(value)).toEqual(Object.values(expected));
  });

  test('staking_fees: the creation fee changes and both tax bounds are kept', async () => {
    const { sdk, proposalCost } = setup();
    await sdk.proposalCost({ actions: [{ type: ProposalActionEnum.UpdateFields, field: 'staking_fees', value: { creationFee: 100_000_000n } }] });
    const [field, value] = prepared(proposalCost);
    expect(field).toBe('staking_fees');
    expect(ABIType.from('(uint64,uint64,uint64)').decode(value)).toEqual([100_000_000n, 500n, 3_000n]);
  });
});
