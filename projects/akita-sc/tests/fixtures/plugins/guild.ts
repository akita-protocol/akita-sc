import { setCurrentNetwork } from 'akita-sdk'
import { GuildPluginSDK } from 'akita-sdk/wallet'
import { GuildPluginFactory } from '../../../smart_contracts/artifacts/arc58/plugins/guild/GuildPluginClient'
import { FixtureAndAccount } from '../../types'

type DeployParams = FixtureAndAccount & { factory: bigint; guild: bigint }

export const deployGuildPlugin = async ({
  fixture,
  sender,
  signer,
  factory,
  guild,
}: DeployParams): Promise<GuildPluginSDK> => {
  setCurrentNetwork('localnet')
  const { algorand } = fixture.context
  const pluginFactory = algorand.client.getTypedAppFactory(GuildPluginFactory, {
    defaultSender: sender,
    defaultSigner: signer,
  })
  const { appClient } = await pluginFactory.send.create.create({ args: { factory, guild } })

  return new GuildPluginSDK({
    algorand,
    factoryParams: {
      appId: appClient.appId,
      defaultSender: sender,
      defaultSigner: signer,
    },
  })
}
