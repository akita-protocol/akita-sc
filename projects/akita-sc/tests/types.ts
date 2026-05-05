import { AlgorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { MaybeSigner } from '../../akita-sdk/src/types';

export type FixtureAndAccount = MaybeSigner & {
  fixture: AlgorandFixture,
}