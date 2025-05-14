import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

export default buildModule('LotteryModule', (m: any) => {
  console.log(
    JSON.stringify(
      require('../../artifacts/contracts/Lottery.sol/Lottery.json').abi
    )
  )

  const lottery = m.contract('Lottery', [])
  return { lottery }
})
