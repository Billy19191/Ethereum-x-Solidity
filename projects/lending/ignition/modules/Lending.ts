import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

const LendingModule = buildModule('LendingModule', (m) => {
  //To be add depend on token pool
  const tokenAddress = '0x...'
  const lending = m.contract('Lending', [tokenAddress])
  return { lending }
})

export default LendingModule
