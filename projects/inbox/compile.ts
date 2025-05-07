import path from 'path'
import fs from 'fs'
import solc from 'solc'

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
const source = fs.readFileSync(inboxPath, 'utf-8')

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
        '*': ['*'],
      },
    },
  },
}

export const output = JSON.parse(solc.compile(JSON.stringify(input)))

// Log the output to see the compiled contract
console.log('Contract compiled successfully')
console.log('ABI:', JSON.stringify(output.contracts['Inbox.sol']['Inbox'].abi))
console.log(
  'Bytecode:',
  output.contracts['Inbox.sol']['Inbox'].evm.bytecode.object
)
