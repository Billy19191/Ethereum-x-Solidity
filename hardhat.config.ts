import { config as dotenvConfig } from 'dotenv'
import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'

dotenvConfig()

const config: HardhatUserConfig = {
  solidity: '0.8.21',
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
}

export default config
