import Web3 from 'web3'
import { beforeEach, describe, it } from 'mocha'
import ganache from 'ganache'
import contractData from '../artifacts/contracts/Lottery.sol/Lottery.json'
import assert from 'assert'

let lottery: any
const abi = contractData.abi
const byteCode = contractData.bytecode
let account: any

const web3: Web3 = new Web3(ganache.provider())

beforeEach(async () => {
  account = await web3.eth.getAccounts()
  lottery = await new web3.eth.Contract(abi)
    .deploy({
      data: byteCode,
    })
    .send({
      from: account[0],
      gas: '1000000',
    })
})

describe('Lottery Contract', () => {
  it('deploy a contract', () => {
    assert.ok(lottery.options.address)
  })

  it('allow multiple account to enter', async () => {
    await lottery.methods.enter().send({
      from: account[0],
      value: web3.utils.toWei('0.2', 'ether'),
    })
    await lottery.methods.enter().send({
      from: account[1],
      value: web3.utils.toWei('0.2', 'ether'),
    })

    const players = await lottery.methods.getPlayers().call({
      from: account[0],
    })

    assert.equal(account[0], players[0])
    assert.equal(account[1], players[1])
    assert.equal(2, players.length)
  })

  it('requires a minimum amount of ether to enter', async () => {
    try {
      await lottery.methods.enter().send({
        from: account[0],
        value: web3.utils.toWei('0.01', 'ether'),
      })
      assert.fail('Expected transaction to fail')
    } catch (err) {
      assert.ok(err)
    }
  })

  it('only manager can call pickWinner', async () => {
    await lottery.methods.enter().send({
      from: account[0],
      value: web3.utils.toWei('0.2', 'ether'),
    })

    try {
      await lottery.methods.pickWinner().send({
        from: account[1],
      })
      assert.fail('Expected transaction to fail')
    } catch (err) {
      assert.ok(err)
    }
  })

  it('sends money to the winner and resets the players array', async () => {
    await lottery.methods.enter().send({
      from: account[0],
      value: web3.utils.toWei('2', 'ether'),
    })

    await lottery.methods.pickWinner().send({ from: account[0] })

    const players = await lottery.methods
      .getPlayers()
      .call({ from: account[0] })

    assert.equal(0, players.length)
  })
})
