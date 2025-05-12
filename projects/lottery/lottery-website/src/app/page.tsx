'use client'
import React, { useEffect, useState } from 'react'
import Lottery from '@/utils/Lottery'
import web3 from '@/lib/web3'

const HomePage: React.FC = () => {
  const [manager, setManager] = useState<string>('Loading ...')
  const [players, setPlayers] = useState<string[]>([])
  const [currentPoolSize, setCurrentPoolSize] = useState<number>(0)

  const enterLottery = async () => {
    try {
      const web3Instance = await web3
      const accounts = await web3Instance.eth.requestAccounts()
      const lotteryContract = await Lottery
      const send = await lotteryContract.methods.enter().send({
        from: accounts[0],
        value: web3Instance.utils.toWei('0.01', 'ether'),
      })
      console.log('Entered lottery:', send)
    } catch (error) {
      console.error('Error entering lottery:', error)
    }
  }

  useEffect(() => {
    const fetchManager = async () => {
      try {
        const lotteryContract = await Lottery
        const result = await lotteryContract.methods.manager().call()
        setManager(String(result))
        console.log('Manager address:', result)
      } catch (error) {
        console.error('Error fetching manager:', error)
      }
    }

    const fetchPeopleEntered = async () => {
      try {
        const lotteryContract = await Lottery
        const result = await lotteryContract.methods.getPlayers().call()
        if (Array.isArray(result)) {
          setPlayers(result.map((player: unknown) => String(player)))
        } else {
          setPlayers([])
        }
      } catch (error) {
        console.error('Error fetching players:', error)
      }
    }

    const fetchCurrentPoolSize = async () => {
      try {
        const web3Instance = await web3
        const lotteryContract = await Lottery
        const contractAddress = lotteryContract.options.address

        if (!contractAddress) {
          console.error('Contract address is undefined')
          return
        }

        const result = await web3Instance.eth.getBalance(contractAddress)
        setCurrentPoolSize(Number(web3Instance.utils.fromWei(result, 'ether')))
      } catch (error) {
        console.error('Error fetching current pool size:', error)
      }
    }

    fetchManager()
    fetchPeopleEntered()
    fetchCurrentPoolSize()
  }, [])
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl bg-white text-black">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Welcome to the Lottery Website
      </h1>
      <p className="text-lg mb-8 text-black/70">
        This is a decentralized lottery application built on Ethereum. You can
        enter the lottery and stand a chance to win big!
      </p>

      <div className="border border-black rounded p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-3">Manager Address</h2>
        <p className="font-mono text-sm bg-white border border-black p-2 rounded overflow-auto break-all">
          {manager}
        </p>
      </div>

      <div className="border border-black rounded p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-3">Enter the Lottery</h2>
        <p className=" mb-3">Current Pool Size: {currentPoolSize} ETH</p>

        <button
          onClick={enterLottery}
          className="bg-black text-white font-bold py-2 px-4 rounded w-full mb-3 hover:bg-white hover:text-black hover:border hover:border-black transition duration-200"
        >
          Join the jackpot pool!
        </button>
        <p className="text-sm text-black/50">
          Click the button above to enter the lottery. A minimum of 0.01 ETH is
          required to enter.
        </p>
      </div>

      <div className="border border-black rounded p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-3">Players Entered</h2>
        {players.length > 0 ? (
          <ul className="list-disc pl-5">
            {players.map((player, index) => (
              <li
                key={index}
                className="font-mono text-sm border border-black p-2 rounded mb-1 overflow-auto break-all bg-white"
              >
                {player}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-black/50">No players have entered yet.</p>
        )}
      </div>

      <p className="text-xl font-semibold text-center text-black">
        Get ready to win big!
      </p>
    </div>
  )
}
export default HomePage
