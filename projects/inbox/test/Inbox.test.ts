import ganache from 'ganache'
import Web3 from 'web3'
import assert from 'assert'
import { beforeEach, describe, it } from 'mocha'

const web3 = new Web3(ganache.provider())

let accounts: any[]
beforeEach(async () => {
  accounts = await web3.eth.getAccounts()
})

describe('Inbox', () => {
  it('deploy contracts', () => {
    console.log(accounts)
  })
})
