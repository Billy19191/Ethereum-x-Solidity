import ganache from 'ganache'
import Web3, { Contract } from 'web3'
import assert from 'assert'
import { beforeEach, describe, it } from 'mocha'
import { ABI, Bytecode } from '../compile'

const web3 = new Web3(ganache.provider())

let accounts: any[]

let inbox: Contract<typeof ABI>

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()

  const cleanBytecode = Bytecode.startsWith('0x') ? Bytecode : '0x' + Bytecode

  inbox = await new web3.eth.Contract(ABI)
    .deploy({
      data: cleanBytecode,
      arguments: ['Hello From Billy!'],
    })
    .send({ from: accounts[0], gas: '2000000' })
})

describe('Inbox', () => {
  it('deploys a contract', async () => {
    assert.ok(inbox.options.address)
  })

  it('has default message', async () => {
    const message: string = await inbox.methods.message().call()

    assert.equal(message, 'Hello From Billy!')
  })

  it('can set message', async () => {
    await inbox.methods.setMessage('Hello Bitch').send({
      from: accounts[0],
      gas: '2000000',
    })
    const message: string = await inbox.methods.message().call()
    assert.equal(message, 'Hello Bitch')
  })
})
