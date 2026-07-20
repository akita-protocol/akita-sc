import { AlgorandClient } from "@algorandfoundation/algokit-utils/types/algorand-client";
import { AppFactoryAppClientParams } from "@algorandfoundation/algokit-utils/app-factory";
import { beforeEach, describe, expect, test } from "vitest";
import { BaseSDK } from "./base";
import { setCurrentNetwork } from "./config";
import { DEFAULT_SEND_PARAMS } from "./constants";
import { ExpandedSendParams } from "./types";

const FIRST_SENDER = "B4NOFTMLUTGTTPBY5NHLW3EHQPB5XCW3BHYDQFMX5XDT2A6Q24Z2HK2WRQ";
const SECOND_SENDER = "RJZ3KL24OFSFNU6NKOJVGO65VSLHVGIT6TOMN2XKMRQEX3BGE7KWWXKCUQ";

type TestClient = { appId: bigint };

class TestClientFactory {
  constructor(_params: { algorand: AlgorandClient }) {}

  getAppClientById(params: AppFactoryAppClientParams): TestClient {
    return { appId: params.appId };
  }
}

class TestSDK extends BaseSDK<TestClient> {
  constructor({ defaultSender, sendParams }: { defaultSender?: string; sendParams?: ExpandedSendParams } = {}) {
    super({
      algorand: {} as AlgorandClient,
      factory: TestClientFactory,
      factoryParams: { appId: 1n, defaultSender },
      sendParams,
    });
  }
}

describe("BaseSDK send params", () => {
  beforeEach(() => setCurrentNetwork("localnet"));

  test("keeps default send params isolated between SDK instances", () => {
    const first = new TestSDK({ defaultSender: FIRST_SENDER });
    const second = new TestSDK({ defaultSender: SECOND_SENDER });

    expect(first.sendParams).not.toBe(second.sendParams);
    expect(first.sendParams.sender).toBe(FIRST_SENDER);
    expect(second.sendParams.sender).toBe(SECOND_SENDER);
    expect(DEFAULT_SEND_PARAMS).not.toHaveProperty("sender");
  });

  test("does not mutate send params supplied to the constructor", () => {
    const supplied: ExpandedSendParams = { ...DEFAULT_SEND_PARAMS, sender: FIRST_SENDER };
    const sdk = new TestSDK({ defaultSender: SECOND_SENDER, sendParams: supplied });

    expect(sdk.sendParams).not.toBe(supplied);
    expect(sdk.sendParams.sender).toBe(SECOND_SENDER);
    expect(supplied.sender).toBe(FIRST_SENDER);
  });

  test("owns send params supplied through the setter", () => {
    const supplied: ExpandedSendParams = { ...DEFAULT_SEND_PARAMS, sender: FIRST_SENDER };
    const sdk = new TestSDK();

    sdk.setSendParams(supplied);
    sdk.sendParams.sender = SECOND_SENDER;

    expect(sdk.sendParams).not.toBe(supplied);
    expect(supplied.sender).toBe(FIRST_SENDER);
  });
});
