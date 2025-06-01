import hre from 'hardhat'
import { expect } from 'chai'
import { Lending, TestToken } from '../typechain-types'

let token: TestToken

describe('Lending', async () => {
  before('Deploy test token', async () => {
    token = await hre.ethers.deployContract('TestToken')
  })

  it('can deploy lending contracts', async () => {
    const ownerWallet = (await hre.ethers.getSigners())[0]
    const lendingFactory = await hre.ethers.getContractFactory('Lending')
    const lendingContract: Lending = await lendingFactory
      .connect(ownerWallet)
      .deploy(await token.getAddress())

    expect(await lendingContract.owners()).to.equal(
      await ownerWallet.getAddress()
    )
  })
})
