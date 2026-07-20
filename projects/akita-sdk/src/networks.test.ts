import { describe, expect, test } from "vitest";
import {
  MAINNET_APP_IDS,
  NETWORK_PLUGIN_DEPLOYMENTS,
  PLUGIN_APP_ID_KEYS,
  TESTNET_APP_IDS,
  getKnownPluginAppIds,
  getPluginUpdate,
  resolvePluginDeployment,
} from "./networks";

describe("plugin deployment catalog", () => {
  test.each([
    ["testnet", TESTNET_APP_IDS],
    ["mainnet", MAINNET_APP_IDS],
  ] as const)("keeps latest %s deployments in NetworkAppIds", (network, appIds) => {
    const deployments = NETWORK_PLUGIN_DEPLOYMENTS[network]!;

    for (const key of PLUGIN_APP_ID_KEYS) {
      expect(deployments[key].length).toBeGreaterThan(0);
      expect(deployments[key][deployments[key].length - 1]?.appId).toBe(appIds[key]);
    }

    const knownIds = getKnownPluginAppIds(network);
    expect(new Set(knownIds).size).toBe(knownIds.length);
  });

  test("resolves a legacy plugin and identifies its update", () => {
    const legacy = resolvePluginDeployment("mainnet", 3368398585n);

    expect(legacy).toMatchObject({
      key: "optinPlugin",
      name: "Opt-in",
      revision: 1,
      isLatest: false,
      appId: 3368398585n,
    });
    expect(legacy?.latest.appId).toBe(MAINNET_APP_IDS.optinPlugin);
    expect(getPluginUpdate("mainnet", 3368398585n)?.latest.appId).toBe(MAINNET_APP_IDS.optinPlugin);
  });

  test("does not offer an update for latest or unknown plugins", () => {
    expect(getPluginUpdate("mainnet", MAINNET_APP_IDS.socialPlugin)).toBeUndefined();
    expect(resolvePluginDeployment("mainnet", 999999999999n)).toBeUndefined();
    expect(resolvePluginDeployment("localnet", 1n)).toBeUndefined();
  });

  test("retains intermediate manually replaced deployments", () => {
    const nfd = resolvePluginDeployment("mainnet", 3570637728n);

    expect(nfd).toMatchObject({ key: "nfdPlugin", revision: 2, isLatest: false });
    expect(nfd?.latest.appId).toBe(3572944055n);
  });
});
