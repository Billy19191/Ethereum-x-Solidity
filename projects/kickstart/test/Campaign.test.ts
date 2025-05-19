import { expect } from 'chai'
import CampaignModule from '../ignition/modules/Campaign'
import hre from 'hardhat'
import { Campaign, CampaignFactory } from '../typechain-types'
import { ContractTransactionResponse } from 'ethers'

let campaignFactory: CampaignFactory
let campaignAddress: string
let campaignContract: Campaign
let deployerAccount: string

beforeEach('Campaign', async () => {
  deployerAccount = (await hre.ethers.getSigners())[0].address
  campaignFactory = await hre.ethers.deployContract('CampaignFactory', [])

  await campaignFactory.createCampaign(100)
  campaignAddress = await campaignFactory.deployedCampaign(0)

  campaignContract = await hre.ethers.getContractAt('Campaign', campaignAddress)
})

describe('Campaign', () => {
  it('deploy a factory and campaign', () => {
    expect(campaignAddress).ok
    expect(campaignFactory).ok
  })
  it('caller is manager', async () => {
    const manager = await campaignContract.manager()
    expect(manager).to.equal(deployerAccount)
  })
  it('allow contributions become approvers', async () => {
    const contribution = await campaignContract.contribute({
      value: 100,
    })
    const isApprover = await campaignContract.approvers(deployerAccount)
    expect(isApprover).to.equal(true)
  })
  it('require minimum value (100) of contribution', async () => {
    try {
      await campaignContract.contribute({
        value: 10,
      })
      expect(false).to.equal(true, 'Transaction should have failed')
    } catch (error) {
      expect(error).to.exist
    }
  })
})
