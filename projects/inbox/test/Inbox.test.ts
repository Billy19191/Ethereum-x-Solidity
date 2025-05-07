import ganache from 'ganache'
import Web3 from 'web3'
import assert from 'assert'
import { beforeEach, describe, it } from 'mocha'
import { ABI, Bytecode } from '../compile'

const web3 = new Web3(ganache.provider())

let accounts: any[]

let inbox: any

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()

  const cleanBytecode = Bytecode.startsWith('0x') ? Bytecode : '0x' + Bytecode
  console.log('Bytecode length:', cleanBytecode.length)

  inbox = await new web3.eth.Contract(ABI)
    .deploy({
      data: cleanBytecode,
      arguments: ['Hello From Billy!'],
    })
    .send({ from: accounts[0], gas: '2000000' })
})

describe('Inbox', () => {
  it('deploys a contract', async () => {})

  it('has a default message', async () => {})
})
