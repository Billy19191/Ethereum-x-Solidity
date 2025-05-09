import path from 'path'
import fs from 'fs'
import solc from 'solc'

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
const source = fs.readFileSync(inboxPath, 'utf8')

const input = {
  language: 'Solidity',
  sources: {
    'Inbox.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode.object'],
      },
    },
  },
}

const compiledOutput = solc.compile(JSON.stringify(input))
const output = JSON.parse(compiledOutput)

if (output.errors) {
  console.error('Compilation errors:', output.errors)
}

const contract =
  output.contracts &&
  output.contracts['Inbox.sol'] &&
  output.contracts['Inbox.sol'].Inbox

if (!contract) {
  console.error('Contract not found in compilation output')
  process.exit(1)
}

export const ABI = contract.abi
export const Bytecode = contract.evm.bytecode.object
