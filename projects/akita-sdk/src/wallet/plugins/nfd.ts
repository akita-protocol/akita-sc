import { getAddress, ReadableAddress } from "@algorandfoundation/algokit-utils/common";
import type { Arc56Contract } from "@algorandfoundation/algokit-utils/abi";
import { BaseSDK } from "../../base";
import { NfdPluginArgs, NfdPluginClient, NfdPluginFactory } from "../../generated/NFDPluginClient";
import { NewContractSDKParams, MaybeSigner } from "../../types";
import { PluginHookParams, PluginSDKReturn } from "../../types";
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
  Omit<ContractArgs['updateFields(uint64,bool,uint64,byte[][])void'], 'wallet' | 'rekeyBack'>
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

        const params = await this.client.params.updateFields({
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
