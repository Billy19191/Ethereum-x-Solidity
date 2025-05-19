// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

const CampaignModule = buildModule('CampaignModule', (m) => {
  // Campaign constructor requires a minimum contribution amount and creator address
  const minimumContribution = 100 // Set an appropriate minimum in wei
  const campaign = m.contract('Campaign', [
    minimumContribution,
    m.getAccount(0),
  ])

  const campaignFactory = m.contract('CampaignFactory', [])

  return { campaign, campaignFactory }
})
export default CampaignModule
