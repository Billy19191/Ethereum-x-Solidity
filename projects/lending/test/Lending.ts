import hre from 'hardhat'
import { expect } from 'chai'
import { Lending, TestToken } from '../typechain-types'
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers'

describe('Lending', () => {
  let token: TestToken
  let lendingContract: Lending
  let ownerWallet: HardhatEthersSigner
  let userWallet: HardhatEthersSigner

  before('Setup contracts and wallets', async () => {
    const signers = await hre.ethers.getSigners()
    ownerWallet = signers[0]
    userWallet = signers[1]

    token = await (await hre.ethers.getContractFactory('TestToken'))
      .connect(ownerWallet)
      .deploy()

    await token.transfer(userWallet, 500000000000000000000000n)

    const lendingFactory = await hre.ethers.getContractFactory('Lending')
    lendingContract = await lendingFactory
      .connect(ownerWallet)
      .deploy(await token.getAddress())
  })

  it('owner should be the same as deployer', async () => {
    expect(await lendingContract.owners()).to.equal(
      await ownerWallet.getAddress()
    )
  })

  it('user can supply to pool', async () => {
    await token
      .connect(userWallet)
      .approve(await lendingContract.getAddress(), 500000000000000000000000n)
    await lendingContract
      .connect(userWallet)
      .depositTokens(500000000000000000000000n)
    const userSupplyBalance = await lendingContract.depositList(
      await userWallet.getAddress()
    )
    expect(userSupplyBalance).equal(500000000000000000000000n)
  })
})
