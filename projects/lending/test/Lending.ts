import hre from 'hardhat'
import { expect } from 'chai'
import '@nomicfoundation/hardhat-chai-matchers'
import { Lending, TestToken } from '../typechain-types'
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers'

describe('Lending', () => {
  let token: TestToken
  let lendingContract: Lending
  let ownerWallet: HardhatEthersSigner
  let userWallet: HardhatEthersSigner

  beforeEach('Setup contracts and wallets', async () => {
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

  it('user can withdraw their deposit from pool', async () => {
    await token
      .connect(userWallet)
      .approve(await lendingContract.getAddress(), 500000000000000000000000n)
    await lendingContract
      .connect(userWallet)
      .depositTokens(500000000000000000000000n)
    const withdrawAmount = 500000000000000000000000n
    await lendingContract.connect(userWallet).withdrawTokens(withdrawAmount)
    const actualTokenBalance = await token.balanceOf(
      await userWallet.getAddress()
    )
    expect(withdrawAmount).equal(actualTokenBalance)
  })

  it('should revert when user tries to withdraw more than deposited', async () => {
    await expect(
      lendingContract
        .connect(userWallet)
        .withdrawTokens(600000000000000000000000n)
    ).to.be.reverted
  })
})
