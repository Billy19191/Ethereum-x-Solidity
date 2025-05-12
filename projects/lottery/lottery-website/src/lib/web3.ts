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

let web3Instance: Web3

const initializeWeb3 = async () => {
  if (typeof window === 'undefined' || !window.ethereum) {
    console.warn('MetaMask is not available.')
    return web3Instance
  }

  try {
    const provider = window.ethereum
    const web3 = new Web3(provider)

    const accounts = (await provider.request({
      method: 'eth_requestAccounts',
    })) as string[]

    console.log('Connected accounts:', accounts)

    web3Instance = web3
    return web3
  } catch (error) {
    console.error('Failed to initialize Web3:', error)
    return web3Instance
  }
}

const getWeb3 = async () => {
  await initializeWeb3()
  return web3Instance
}

export default getWeb3()
