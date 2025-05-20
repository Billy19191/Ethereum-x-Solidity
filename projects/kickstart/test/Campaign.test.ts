import { expect } from 'chai'
import CampaignModule from '../ignition/modules/Campaign'
import hre from 'hardhat'
import { Campaign, CampaignFactory } from '../typechain-types'
import {
  AddressLike,
  ContractRunner,
  ContractTransactionResponse,
  Typed,
} from 'ethers'
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers'

let campaignFactory: CampaignFactory
let campaignAddress: string
let campaignContract: Campaign
let deployerAccount: AddressLike
let otherAccounts: AddressLike
let user2Account: HardhatEthersSigner | ContractRunner | null | undefined
let user3Account: HardhatEthersSigner | ContractRunner | null | undefined

beforeEach('Campaign', async () => {
  const [deployerAcc, user1, user2, user3] = await hre.ethers.getSigners()
  deployerAccount = deployerAcc.address
  otherAccounts = user1.address
  user2Account = user2
  user3Account = user3

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
  it('allow manager to make payment request', async () => {
    await campaignContract.createRequest(
      'Vendor Payment 3rd Party',
      100000,
      otherAccounts
    )
    const request = await campaignContract.requests(0)

    expect(request.description).is.equal('Vendor Payment 3rd Party')
  })
  it('process request end to end ', async () => {
    await campaignContract.contribute({
      value: 200000,
    })
    await campaignContract.connect(user2Account).contribute({
      value: 200000,
    })
    await campaignContract.createRequest(
      'Vendor Payment 3rd Party',
      100000,
      otherAccounts
    )

    await campaignContract.approveRequest(0)
    await campaignContract.connect(user2Account).approveRequest(0)

    const initialBalance = await hre.ethers.provider.getBalance(otherAccounts)
    await campaignContract.finalizeRequest(0)
    const finalBalance = await hre.ethers.provider.getBalance(otherAccounts)

    expect(finalBalance > initialBalance).to.be.true
  })
})
