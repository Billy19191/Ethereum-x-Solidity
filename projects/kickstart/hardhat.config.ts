import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import { vars } from 'hardhat/config'

const infuraApiKey = vars.get('INFURA_API_KEY')
const privateKey = vars.get('PRIVATE_KEY')

const config: HardhatUserConfig = {
  solidity: '0.8.28',
  networks: {
    sepolia: {
      url: 'https://sepolia.infura.io/v3/' + infuraApiKey,
      accounts: [privateKey || ''],
    },
  },
}

export default config
