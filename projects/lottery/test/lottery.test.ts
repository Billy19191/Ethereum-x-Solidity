import { expect } from 'chai'
import { ethers } from 'hardhat'
import { Lottery } from '../typechain-types/Lottery'
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers'

describe('Lottery Contract', function () {
  let lottery: any
  let accounts: HardhatEthersSigner[]
  let manager: HardhatEthersSigner

  beforeEach(async function () {
    accounts = await ethers.getSigners()
    manager = accounts[0]

    const Lottery = await ethers.getContractFactory('Lottery')
    lottery = await Lottery.deploy()
  })

  it('deploys a contract', async function () {
    expect(await lottery.target).to.be.a('string')
  })

  it('sets the manager correctly', async function () {
    expect(await lottery.manager()).to.equal(manager.address)
  })

  it('allows one account to enter', async function () {
    await lottery.enter({ value: ethers.parseEther('0.02') })

    const players = await lottery.getPlayers()

    expect(players[0]).to.equal(manager.address)
    expect(players.length).to.equal(1)
  })

  it('allows multiple accounts to enter', async function () {
    await lottery.enter({ value: ethers.parseEther('0.02') })
    await lottery
      .connect(accounts[1])
      .enter({ value: ethers.parseEther('0.02') })
    await lottery
      .connect(accounts[2])
      .enter({ value: ethers.parseEther('0.02') })

    const players = await lottery.getPlayers()

    expect(players[0]).to.equal(manager.address)
    expect(players[1]).to.equal(accounts[1].address)
    expect(players[2]).to.equal(accounts[2].address)
    expect(players.length).to.equal(3)
  })

  it('requires a minimum amount of ether to enter', async function () {
    try {
      await lottery.enter({ value: ethers.parseEther('0.001') })
      expect.fail('Should have thrown an error')
    } catch (error) {
      // Expected error
    }
  })

  it('only manager can call pickWinner', async function () {
    await lottery.enter({ value: ethers.parseEther('0.02') })

    try {
      await lottery.connect(accounts[1]).pickWinner()
      expect.fail('Should have thrown an error')
    } catch (error) {
      // Expected error
    }
  })

  it('sends money to the winner and resets the players array', async function () {
    await lottery.enter({ value: ethers.parseEther('2') })

    const initialBalance = await ethers.provider.getBalance(manager.address)
    await lottery.pickWinner()
    const finalBalance = await ethers.provider.getBalance(manager.address)

    expect(finalBalance - initialBalance).to.be.greaterThan(
      ethers.parseEther('1.8')
    )

    const players = await lottery.getPlayers()
    expect(players.length).to.equal(0)
  })
})
