import Web3 from 'web3'

declare global {
  interface Window {
    ethereum?: {
      request: (args: {
        method: string
        params?: unknown[]
      }) => Promise<unknown>
      on: (eventName: string, callback: (...args: unknown[]) => void) => void
      removeListener: (
        eventName: string,
        callback: (...args: unknown[]) => void
      ) => void
      isMetaMask?: boolean
    }
  }
}

let web3Instance: Web3 | null = null
let initialized = false

async function initialize(): Promise<void> {
  if (typeof window === 'undefined' || !window.ethereum) {
    console.warn('MetaMask is not available.')
    initialized = true
    return
  }

  try {
    const provider = window.ethereum
    web3Instance = new Web3(provider)

    const accounts = (await provider.request({
      method: 'eth_requestAccounts',
    })) as string[]

    console.log('Connected accounts:', accounts)
    initialized = true
  } catch (error) {
    console.error('Failed to initialize Web3:', error)
    web3Instance = null
    initialized = true
  }
}

async function getWeb3(): Promise<Web3 | null> {
  if (!initialized) {
    await initialize()
  }
  return web3Instance
}

export default getWeb3()
