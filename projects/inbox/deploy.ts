import Web3 from 'web3'
import { ABI, Bytecode } from './compile'
import dotenv from 'dotenv'

dotenv.config()

async function initializeWeb3() {
  const apiKey = process.env.INFURA_API_KEY
  if (!apiKey) {
    throw new Error('Missing INFURA_API_KEY in environment variables')
  }

  console.log('Using Infura API Key')
  const provider = new Web3.providers.HttpProvider(
    `https://sepolia.infura.io/v3/${apiKey}`
  )
  return new Web3(provider)
}

async function setupAccount(web3Instance: Web3) {
  const privateKey = process.env.PRIVATE_KEY?.trim()

  if (!privateKey || !/^([A-Fa-f0-9]{64})$/.test(privateKey)) {
    throw new Error('Invalid or missing private key in environment variables')
  }

  const privateKeyWith0x = `0x${privateKey}`
  const wallet = web3Instance.eth.accounts.wallet.add(privateKeyWith0x)
  const account = web3Instance.eth.accounts.wallet[0]

  console.log('Using account address:', account.address)
  return account
}

async function deployContract(
  web3Instance: Web3,
  accountAddress: string,
  initialMessage = 'Hello From Billy!'
) {
  console.log('Attempting to deploy from account', accountAddress)

  const contract = new web3Instance.eth.Contract(ABI)
  const deployTransaction = contract.deploy({
    data: Bytecode,
    arguments: [initialMessage],
  })

  const deployedContract = await deployTransaction.send({
    gas: '1000000',
    from: accountAddress,
  })

  console.log('Contract deployed to', deployedContract.options.address)
  return deployedContract
}

async function main() {
  try {
    const web3Instance = await initializeWeb3()
    const account = await setupAccount(web3Instance)
    await deployContract(web3Instance, account.address)
    console.log('Deployment script finished successfully')
  } catch (error: unknown) {
    console.error(
      'Error:',
      error instanceof Error ? error.message : String(error)
    )
    process.exit(1)
  } finally {
    console.log('Cleaning up...')
  }
}

main()
