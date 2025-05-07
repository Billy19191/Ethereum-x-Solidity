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

// Compile the contract
// console.log(input)
// The solc.compile() function takes a JSON string and returns a JavaScript object
const compiledOutput = solc.compile(JSON.stringify(input))
// console.log(compiledOutput)

// No need to parse as JSON - compiledOutput is already a JavaScript object
const output = JSON.parse(compiledOutput) // Remove the JSON.parse here

// Check if there are any errors
if (output.errors) {
  console.error('Compilation errors:', output.errors)
}

// Extract ABI and bytecode
const contract =
  output.contracts &&
  output.contracts['Inbox.sol'] &&
  output.contracts['Inbox.sol'].Inbox

if (!contract) {
  console.error('Contract not found in compilation output')
  process.exit(1)
}

// Export the ABI and bytecode
export const ABI = contract.abi
export const Bytecode = contract.evm.bytecode.object

const arrow = () => {}
