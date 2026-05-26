import { getAddress, ReadableAddress } from "@algorandfoundation/algokit-utils/common";
import type { Arc56Contract } from "@algorandfoundation/algokit-utils/abi";
import { decodeAddress } from "algosdk";
import { BaseSDK } from "../../base";
import { NfdPluginArgs, NfdPluginClient, NfdPluginFactory } from "../../generated/NFDPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginHookParams, PluginSDKReturn, PluginTxn } from "../../types";
import { getTxns } from "../utils";

type ContractArgs = NfdPluginArgs["obj"];
type MintContractArgs = ContractArgs['mint(uint64,bool,string,uint64,address,bool)uint64'];

type MintArgs = (
  Omit<MintContractArgs, 'wallet' | 'rekeyBack' | 'amount'>
  & Partial<Pick<MintContractArgs, 'amount'>>
  & MaybeSigner
  & {
    rekeyBack?: boolean;
    years?: bigint | number;
  }
);

type RegistryPriceInfo = {
  oneYearPrice: bigint;
  carryCost: bigint;
  exists: boolean;
  isExpired: boolean;
  inAuction: boolean;
};

type RegistryLinkOnMintExtraMbrCosts = {
  linkingNfdMbrCost: bigint;
  linkingRegistryMbrCost: bigint;
};

type LinkNfdAddressMbrCosts = {
  candidateNeedsUpdate: boolean;
  candidateMbrCost: bigint;
  nfdMbrCost: bigint;
  registryMbrCost: bigint;
};

const NFD_FIELD_CANDIDATE_ALGO_ADDRESS = 'u.cav.algo.a';
const NFD_FIELD_VERIFIED_ALGO_ADDRESSES = 'v.caAlgo.0.as';

const NFD_REGISTRY_APP_SPEC = {
  name: 'NFDRegistry',
  structs: {
    PriceInfo: [
      { name: 'oneYearPrice', type: 'uint64' },
      { name: 'carryCost', type: 'uint64' },
      { name: 'exists', type: 'bool' },
      { name: 'isExpired', type: 'bool' },
      { name: 'inAuction', type: 'bool' },
    ],
    LinkOnMintExtraMbrCosts: [
      { name: 'linkingNfdMbrCost', type: 'uint64' },
      { name: 'linkingRegistryMbrCost', type: 'uint64' },
    ],
  },
  methods: [
    {
      name: 'getPrice',
      args: [
        { name: 'nfdName', type: 'string' },
        { name: 'caller', type: 'address' },
      ],
      returns: { type: '(uint64,uint64,bool,bool,bool)', struct: 'PriceInfo' },
      actions: { create: [], call: ['NoOp'] },
      readonly: true,
      events: [],
      recommendations: {},
    },
    {
      name: 'getNfdLinkOnMintExtraMbrCost',
      args: [
        { name: 'address', type: 'address' },
      ],
      returns: { type: '(uint64,uint64)', struct: 'LinkOnMintExtraMbrCosts' },
      actions: { create: [], call: ['NoOp'] },
      readonly: true,
      events: [],
      recommendations: {},
    },
    {
      name: 'costToAddToAddress',
      args: [
        { name: 'lookupAddress', type: 'address' },
      ],
      returns: { type: 'uint64' },
      actions: { create: [], call: ['NoOp'] },
      readonly: true,
      events: [],
      recommendations: {},
    },
  ],
  arcs: [22, 28],
  networks: {},
  state: {
    schema: {
      global: { ints: 0, bytes: 0 },
      local: { ints: 0, bytes: 0 },
    },
    keys: { global: {}, local: {}, box: {} },
    maps: { global: {}, local: {}, box: {} },
  },
  bareActions: { create: [], call: [] },
  events: [],
  templateVariables: {},
} as unknown as Arc56Contract;

const NFD_INSTANCE_APP_SPEC = {
  name: 'NFD',
  structs: {},
  methods: [
    {
      name: 'getFieldUpdateCost',
      args: [
        { name: 'fieldAndVals', type: 'byte[][]' },
      ],
      returns: { type: 'uint64' },
      actions: { create: [], call: ['NoOp'] },
      readonly: true,
      events: [],
      recommendations: {},
    },
    {
      name: 'readField',
      args: [
        { name: 'fieldName', type: 'byte[]' },
      ],
      returns: { type: 'byte[]' },
      actions: { create: [], call: ['NoOp'] },
      readonly: true,
      events: [],
      recommendations: {},
    },
    {
      name: 'isAddressInField',
      args: [
        { name: 'fieldName', type: 'string' },
        { name: 'address', type: 'address' },
      ],
      returns: { type: 'bool' },
      actions: { create: [], call: ['NoOp'] },
      readonly: true,
      events: [],
      recommendations: {},
    },
  ],
  arcs: [22, 28],
  networks: {},
  state: {
    schema: {
      global: { ints: 0, bytes: 0 },
      local: { ints: 0, bytes: 0 },
    },
    keys: { global: {}, local: {}, box: {} },
    maps: { global: {}, local: {}, box: {} },
  },
  bareActions: { create: [], call: [] },
  events: [],
  templateVariables: {},
} as unknown as Arc56Contract;

function toBigInt(value: bigint | number, name: string): bigint {
  const result = BigInt(value);
  if (result < 0n) {
    throw new Error(`${name} must be non-negative`);
  }
  return result;
}

function parsePriceInfo(value: unknown): RegistryPriceInfo {
  if (Array.isArray(value)) {
    return {
      oneYearPrice: BigInt(value[0]),
      carryCost: BigInt(value[1]),
      exists: Boolean(value[2]),
      isExpired: Boolean(value[3]),
      inAuction: Boolean(value[4]),
    };
  }

  const priceInfo = value as RegistryPriceInfo;
  return {
    oneYearPrice: BigInt(priceInfo.oneYearPrice),
    carryCost: BigInt(priceInfo.carryCost),
    exists: Boolean(priceInfo.exists),
    isExpired: Boolean(priceInfo.isExpired),
    inAuction: Boolean(priceInfo.inAuction),
  };
}

function asciiBytes(value: string): Uint8Array {
  return Uint8Array.from([...value].map((char) => char.charCodeAt(0)));
}

function concatBytes(first: Uint8Array, second: Uint8Array): Uint8Array {
  const result = new Uint8Array(first.length + second.length);
  result.set(first, 0);
  result.set(second, first.length);
  return result;
}

function bytesEqual(first: Uint8Array, second: Uint8Array): boolean {
  if (first.length !== second.length) return false;
  return first.every((value, index) => value === second[index]);
}

function parseBytes(value: unknown): Uint8Array {
  if (value instanceof Uint8Array) return value;
  if (Array.isArray(value)) return Uint8Array.from(value);
  throw new Error('Expected byte array return value');
}

function parseUint64(value: unknown): bigint {
  if (value === undefined) throw new Error('Expected uint64 return value');
  return BigInt(value as bigint | number | string | boolean);
}

function parseLinkOnMintExtraMbrCosts(value: unknown): RegistryLinkOnMintExtraMbrCosts {
  if (Array.isArray(value)) {
    return {
      linkingNfdMbrCost: BigInt(value[0]),
      linkingRegistryMbrCost: BigInt(value[1]),
    };
  }

  const costs = value as RegistryLinkOnMintExtraMbrCosts;
  return {
    linkingNfdMbrCost: BigInt(costs.linkingNfdMbrCost),
    linkingRegistryMbrCost: BigInt(costs.linkingRegistryMbrCost),
  };
}

type DeleteFieldsArgs = (
  Omit<ContractArgs['deleteFields(uint64,bool,uint64,byte[][])void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type UpdateFieldsArgs = (
  Omit<ContractArgs['updateFields(uint64,bool,uint64,byte[][],uint64)void'], 'wallet' | 'rekeyBack' | 'mbrCost'>
  & MaybeSigner
  & { rekeyBack?: boolean; mbrCost?: bigint | number }
);

type LinkNfdAddressArgs = (
  Omit<ContractArgs['linkNfdAddress(uint64,bool,uint64,string,uint64,uint64)void'], 'wallet' | 'rekeyBack' | 'nfdMbrCost' | 'registryMbrCost'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type UnlinkNfdAddressArgs = (
  Omit<ContractArgs['unlinkNfdAddress(uint64,bool,uint64,string,address)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type SetAddressPrimaryNfdArgs = (
  Omit<ContractArgs['setAddressPrimaryNfd(uint64,bool,uint64,string,address)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type OfferForSaleArgs = (
  Omit<ContractArgs['offerForSale(uint64,bool,uint64,uint64,address)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type CancelSaleArgs = (
  Omit<ContractArgs['cancelSale(uint64,bool,uint64)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type PostOfferArgs = (
  Omit<ContractArgs['postOffer(uint64,bool,uint64,uint64,string)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type PurchaseArgs = (
  Omit<ContractArgs['purchase(uint64,bool,uint64)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type UpdateHashArgs = (
  Omit<ContractArgs['updateHash(uint64,bool,uint64,byte[])void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type ContractLockArgs = (
  Omit<ContractArgs['contractLock(uint64,bool,uint64,bool)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type SegmentLockArgs = (
  Omit<ContractArgs['segmentLock(uint64,bool,uint64,bool,uint64)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type VaultOptInLockArgs = (
  Omit<ContractArgs['vaultOptInLock(uint64,bool,uint64,bool)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type VaultOptInArgs = (
  Omit<ContractArgs['vaultOptIn(uint64,bool,uint64,uint64[])void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type VaultSendArgs = (
  Omit<ContractArgs['vaultSend(uint64,bool,uint64,uint64,address,string,uint64,uint64[])void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type RenewArgs = (
  Omit<ContractArgs['renew(uint64,bool,uint64,uint64)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type AutoRenewArgs = (
  Omit<ContractArgs['autoRenew(uint64,bool,uint64)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

type SetPrimaryAddressArgs = (
  Omit<ContractArgs['setPrimaryAddress(uint64,bool,uint64,string,address)void'], 'wallet' | 'rekeyBack'>
  & MaybeSigner
  & { rekeyBack?: boolean }
);

export class NFDPluginSDK extends BaseSDK<NfdPluginClient> {

  constructor(params: NewContractSDKParams) {
    super({ factory: NfdPluginFactory, ...params });
  }

  private async getRegistryAppId(): Promise<bigint> {
    const registry = await this.client.state.global.registry();
    if (registry === undefined) {
      throw new Error('NFD plugin registry is not configured');
    }

    return registry;
  }

  private async getMintAmount({
    nfdName,
    reservedFor,
    linkOnMint,
    years,
    caller,
  }: {
    nfdName: string;
    reservedFor: string;
    linkOnMint: boolean;
    years?: bigint | number;
    caller: ReadableAddress;
  }): Promise<bigint> {
    const registrationYears = years === undefined ? 1n : toBigInt(years, 'years');
    if (registrationYears < 1n) {
      throw new Error('years must be at least 1');
    }

    const registryAppId = await this.getRegistryAppId();
    const registryClient = this.algorand.client.getAppClientById({
      appId: registryAppId,
      appSpec: NFD_REGISTRY_APP_SPEC,
    });
    const callerAddress = getAddress(caller).toString();
    const readerParams = this.getReaderSendParams({ sender: callerAddress });
    const priceResult = await registryClient.send.call({
      ...readerParams,
      method: 'getPrice(string,address)(uint64,uint64,bool,bool,bool)',
      args: [nfdName, callerAddress],
    });
    const priceInfo = parsePriceInfo(priceResult.return);
    let amount = priceInfo.oneYearPrice * registrationYears + priceInfo.carryCost;

    if (linkOnMint) {
      const linkMbrResult = await registryClient.send.call({
        ...readerParams,
        method: 'getNfdLinkOnMintExtraMbrCost(address)(uint64,uint64)',
        args: [reservedFor],
      });
      const linkMbrCosts = parseLinkOnMintExtraMbrCosts(linkMbrResult.return);
      amount += linkMbrCosts.linkingNfdMbrCost + linkMbrCosts.linkingRegistryMbrCost;
    }

    return amount;
  }

  private async getLinkNfdAddressMbrCosts({
    appId,
    caller,
  }: {
    appId: bigint | number;
    caller: ReadableAddress;
  }): Promise<LinkNfdAddressMbrCosts> {
    const registryAppId = await this.getRegistryAppId();
    const callerAddress = getAddress(caller).toString();
    const callerAddressBytes = decodeAddress(callerAddress).publicKey;
    const readerParams = this.getReaderSendParams({ sender: callerAddress });
    const nfdClient = this.algorand.client.getAppClientById({
      appId: BigInt(appId),
      appSpec: NFD_INSTANCE_APP_SPEC,
    });
    const registryClient = this.algorand.client.getAppClientById({
      appId: registryAppId,
      appSpec: NFD_REGISTRY_APP_SPEC,
    });

    const candidateAddressField = asciiBytes(NFD_FIELD_CANDIDATE_ALGO_ADDRESS);
    const candidateAddressResult = await nfdClient.send.call({
      ...readerParams,
      method: 'readField(byte[])byte[]',
      args: [candidateAddressField],
    });
    const candidateNeedsUpdate = !bytesEqual(
      parseBytes(candidateAddressResult.return),
      callerAddressBytes,
    );
    const candidateMbrCostResult = candidateNeedsUpdate
      ? await nfdClient.send.call({
        ...readerParams,
        method: 'getFieldUpdateCost(byte[][])uint64',
        args: [[
          candidateAddressField,
          callerAddressBytes,
        ]],
      })
      : null;

    const verifiedAddressField = asciiBytes(NFD_FIELD_VERIFIED_ALGO_ADDRESSES);
    const existingVerifiedAddressesResult = await nfdClient.send.call({
      ...readerParams,
      method: 'readField(byte[])byte[]',
      args: [verifiedAddressField],
    });
    const existingVerifiedAddresses = parseBytes(existingVerifiedAddressesResult.return);

    const isAlreadyVerifiedResult = await nfdClient.send.call({
      ...readerParams,
      method: 'isAddressInField(string,address)bool',
      args: [NFD_FIELD_VERIFIED_ALGO_ADDRESSES, callerAddress],
    });
    const updatedVerifiedAddresses = isAlreadyVerifiedResult.return === true
      ? existingVerifiedAddresses
      : concatBytes(existingVerifiedAddresses, callerAddressBytes);

    const nfdMbrCostResult = isAlreadyVerifiedResult.return === true
      ? null
      : await nfdClient.send.call({
        ...readerParams,
        method: 'getFieldUpdateCost(byte[][])uint64',
        args: [[
          verifiedAddressField,
          updatedVerifiedAddresses,
        ]],
      });

    const registryMbrCostResult = await registryClient.send.call({
      ...readerParams,
      method: 'costToAddToAddress(address)uint64',
      args: [callerAddress],
    });

    return {
      candidateNeedsUpdate,
      candidateMbrCost: parseUint64(candidateMbrCostResult?.return ?? 0n),
      nfdMbrCost: parseUint64(nfdMbrCostResult?.return ?? 0n),
      registryMbrCost: parseUint64(registryMbrCostResult.return),
    };
  }

  private async getFieldUpdateCost({
    appId,
    fieldAndVals,
    caller,
  }: {
    appId: bigint | number;
    fieldAndVals: Uint8Array[];
    caller: ReadableAddress;
  }): Promise<bigint> {
    const callerAddress = getAddress(caller).toString();
    const nfdClient = this.algorand.client.getAppClientById({
      appId: BigInt(appId),
      appSpec: NFD_INSTANCE_APP_SPEC,
    });
    const result = await nfdClient.send.call({
      ...this.getReaderSendParams({ sender: callerAddress }),
      method: 'getFieldUpdateCost(byte[][])uint64',
      args: [fieldAndVals],
    });

    return parseUint64(result.return);
  }

  mint(): PluginSDKReturn;
  mint(args: MintArgs): PluginSDKReturn;
  mint(args?: MintArgs): PluginSDKReturn {
    const methodName = 'mint';
    if (args === undefined) {
      return (_spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const {
      sender,
      signer,
      amount: providedAmount,
      years,
      rekeyBack: requestedRekeyBack,
      ...mintArgs
    } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = requestedRekeyBack ?? true;
        const amount = providedAmount === undefined
          ? await this.getMintAmount({
            nfdName: mintArgs.nfdName,
            reservedFor: mintArgs.reservedFor,
            linkOnMint: mintArgs.linkOnMint,
            years,
            caller: spendingAddress ?? sendParams.sender,
          })
          : toBigInt(providedAmount, 'amount');

        const params = await this.client.params.mint({
          ...sendParams,
          args: { wallet, rekeyBack, amount, ...mintArgs },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  deleteFields(): PluginSDKReturn;
  deleteFields(args: DeleteFieldsArgs): PluginSDKReturn;
  deleteFields(args?: DeleteFieldsArgs): PluginSDKReturn {
    const methodName = 'deleteFields';
    if (args === undefined) {
      return (_spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (_spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.deleteFields({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  updateFields(): PluginSDKReturn;
  updateFields(args: UpdateFieldsArgs): PluginSDKReturn;
  updateFields(args?: UpdateFieldsArgs): PluginSDKReturn {
    const methodName = 'updateFields';
    if (args === undefined) {
      return (_spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (_spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;
        const mbrCost = args.mbrCost === undefined
          ? await this.getFieldUpdateCost({
            appId: args.appId,
            fieldAndVals: args.fieldAndVals,
            caller: sendParams.sender,
          })
          : toBigInt(args.mbrCost, 'mbrCost');
        const { mbrCost: _mbrCost, ...contractArgs } = args;

        const params = await this.client.params.updateFields({
          ...sendParams,
          args: { wallet, rekeyBack, ...contractArgs, mbrCost },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  linkNfdAddress(): PluginSDKReturn;
  linkNfdAddress(args: LinkNfdAddressArgs): PluginSDKReturn;
  linkNfdAddress(args?: LinkNfdAddressArgs): PluginSDKReturn {
    const methodName = 'linkNfdAddress';
    if (args === undefined) {
      return (_spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const addressToVerify = spendingAddress ?? sendParams.sender;
        const rekeyBack = args.rekeyBack ?? true;
        const mbrCosts = await this.getLinkNfdAddressMbrCosts({
          appId: args.appId,
          caller: addressToVerify,
        });
        const methodCalls: PluginTxn[] = [];

        if (mbrCosts.candidateNeedsUpdate) {
          const updateCandidateParams = await this.client.params.updateFields({
            ...sendParams,
            args: {
              wallet,
              rekeyBack: false,
              appId: args.appId,
              fieldAndVals: [
                asciiBytes(NFD_FIELD_CANDIDATE_ALGO_ADDRESS),
                decodeAddress(getAddress(addressToVerify).toString()).publicKey,
              ],
              mbrCost: mbrCosts.candidateMbrCost,
            },
          });

          methodCalls.push({
            type: 'methodCall',
            ...updateCandidateParams,
          });
        }

        const params = await this.client.params.linkNfdAddress({
          ...sendParams,
          args: {
            wallet,
            rekeyBack,
            ...args,
            nfdMbrCost: mbrCosts.nfdMbrCost,
            registryMbrCost: mbrCosts.registryMbrCost,
          },
        });

        methodCalls.push({
          type: 'methodCall',
          ...params
        });

        return methodCalls;
      }
    });
  }

  unlinkNfdAddress(): PluginSDKReturn;
  unlinkNfdAddress(args: UnlinkNfdAddressArgs): PluginSDKReturn;
  unlinkNfdAddress(args?: UnlinkNfdAddressArgs): PluginSDKReturn {
    const methodName = 'unlinkNfdAddress';
    if (args === undefined) {
      return (_spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (_spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.unlinkNfdAddress({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  setAddressPrimaryNfd(): PluginSDKReturn;
  setAddressPrimaryNfd(args: SetAddressPrimaryNfdArgs): PluginSDKReturn;
  setAddressPrimaryNfd(args?: SetAddressPrimaryNfdArgs): PluginSDKReturn {
    const methodName = 'setAddressPrimaryNfd';
    if (args === undefined) {
      return (_spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (_spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.setAddressPrimaryNfd({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  offerForSale(): PluginSDKReturn;
  offerForSale(args: OfferForSaleArgs): PluginSDKReturn;
  offerForSale(args?: OfferForSaleArgs): PluginSDKReturn {
    const methodName = 'offerForSale';
    if (args === undefined) {
      return (_spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (_spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.offerForSale({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  cancelSale(): PluginSDKReturn;
  cancelSale(args: CancelSaleArgs): PluginSDKReturn;
  cancelSale(args?: CancelSaleArgs): PluginSDKReturn {
    const methodName = 'cancelSale';
    if (args === undefined) {
      return (_spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (_spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.cancelSale({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  postOffer(): PluginSDKReturn;
  postOffer(args: PostOfferArgs): PluginSDKReturn;
  postOffer(args?: PostOfferArgs): PluginSDKReturn {
    const methodName = 'postOffer';
    if (args === undefined) {
      return (_spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (_spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.postOffer({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  purchase(): PluginSDKReturn;
  purchase(args: PurchaseArgs): PluginSDKReturn;
  purchase(args?: PurchaseArgs): PluginSDKReturn {
    const methodName = 'purchase';
    if (args === undefined) {
      return (_spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (_spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.purchase({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  updateHash(): PluginSDKReturn;
  updateHash(args: UpdateHashArgs): PluginSDKReturn;
  updateHash(args?: UpdateHashArgs): PluginSDKReturn {
    const methodName = 'updateHash';
    if (args === undefined) {
      return (_spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (_spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.updateHash({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  contractLock(): PluginSDKReturn;
  contractLock(args: ContractLockArgs): PluginSDKReturn;
  contractLock(args?: ContractLockArgs): PluginSDKReturn {
    const methodName = 'contractLock';
    if (args === undefined) {
      return (_spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (_spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.contractLock({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  segmentLock(): PluginSDKReturn;
  segmentLock(args: SegmentLockArgs): PluginSDKReturn;
  segmentLock(args?: SegmentLockArgs): PluginSDKReturn {
    const methodName = 'segmentLock';
    if (args === undefined) {
      return (_spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (_spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.segmentLock({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  vaultOptInLock(): PluginSDKReturn;
  vaultOptInLock(args: VaultOptInLockArgs): PluginSDKReturn;
  vaultOptInLock(args?: VaultOptInLockArgs): PluginSDKReturn {
    const methodName = 'vaultOptInLock';
    if (args === undefined) {
      return (_spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (_spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.vaultOptInLock({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  vaultOptIn(): PluginSDKReturn;
  vaultOptIn(args: VaultOptInArgs): PluginSDKReturn;
  vaultOptIn(args?: VaultOptInArgs): PluginSDKReturn {
    const methodName = 'vaultOptIn';
    if (args === undefined) {
      return (_spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (_spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.vaultOptIn({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  vaultSend(): PluginSDKReturn;
  vaultSend(args: VaultSendArgs): PluginSDKReturn;
  vaultSend(args?: VaultSendArgs): PluginSDKReturn {
    const methodName = 'vaultSend';
    if (args === undefined) {
      return (_spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (_spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.vaultSend({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  renew(): PluginSDKReturn;
  renew(args: RenewArgs): PluginSDKReturn;
  renew(args?: RenewArgs): PluginSDKReturn {
    const methodName = 'renew';
    if (args === undefined) {
      return (_spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (_spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.renew({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  autoRenew(): PluginSDKReturn;
  autoRenew(args: AutoRenewArgs): PluginSDKReturn;
  autoRenew(args?: AutoRenewArgs): PluginSDKReturn {
    const methodName = 'autoRenew';
    if (args === undefined) {
      return (_spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (_spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.autoRenew({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }

  setPrimaryAddress(): PluginSDKReturn;
  setPrimaryAddress(args: SetPrimaryAddressArgs): PluginSDKReturn;
  setPrimaryAddress(args?: SetPrimaryAddressArgs): PluginSDKReturn {
    const methodName = 'setPrimaryAddress';
    if (args === undefined) {
      return (_spendingAddress?: ReadableAddress) => ({
        appId: this.client.appId,
        selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
        getTxns
      });
    }

    const { sender, signer } = args;
    const sendParams = this.getRequiredSendParams({ sender, signer });

    return (_spendingAddress?: ReadableAddress) => ({
      appId: this.client.appId,
      selectors: [this.client.appClient.getABIMethod(methodName).getSelector()],
      getTxns: async ({ wallet }: PluginHookParams) => {
        const rekeyBack = args.rekeyBack ?? true;

        const params = await this.client.params.setPrimaryAddress({
          ...sendParams,
          args: { wallet, rekeyBack, ...args },
        });

        return [{
          type: 'methodCall',
          ...params
        }];
      }
    });
  }
}
