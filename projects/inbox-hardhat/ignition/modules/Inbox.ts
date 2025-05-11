import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

const InboxModule = buildModule('InboxModule', (m: any) => {
  const inbox = m.contract('Inbox', ['Hello, World!'])

  return { inbox }
})

export default InboxModule
