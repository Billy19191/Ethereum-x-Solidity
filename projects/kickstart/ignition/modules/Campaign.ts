// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

const CampaignModule = buildModule('CampaignModule', (m) => {
  const campaignFactory = m.contract('CampaignFactory', [])

  return { campaignFactory }
})

export default CampaignModule
