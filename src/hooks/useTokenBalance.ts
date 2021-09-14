import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import cakeABI from 'config/abi/cake.json'
import PancakePair from 'config/abi/PancakePair.json'
import masterchefABI from 'config/abi/masterchef.json'
import { getContract } from 'utils/web3'
import { getTokenBalance, getTotalReferralCommissions, getTotalReferrals } from 'utils/erc20'
import { getCakeAddress, getLP1Address, getLP2Address, getMasterChefAddress } from 'utils/addressHelpers'
import useRefresh from './useRefresh'


const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTokenBalance(ethereum, tokenAddress, account)
      setBalance(new BigNumber(res))
    }

    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, tokenAddress, fastRefresh])

  return balance
}

export const useTotalSupply = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTotalSupply() {
      const cakeContract = getContract(cakeABI, getCakeAddress());
      const supply = await cakeContract.methods.totalSupply().call();
      setTotalSupply(new BigNumber(supply));
    }

    fetchTotalSupply()
  }, [slowRefresh])

  return totalSupply
}

export const useBurnedBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const masterContract = getContract(masterchefABI, getMasterChefAddress());
      /* const balDead = await cakeContract.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call();
      const bal0 = await cakeContract.methods.balanceOf('0x0000000000000000000000000000000000000000').call(); */
      const burnedBal = await masterContract.methods.totalBurned().call();
      setBalance(new BigNumber(burnedBal));
    }

    fetchBalance()
  }, [tokenAddress, slowRefresh])

  return balance
}

export const useLPBnbamount1 = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const pairContract = getContract(PancakePair, getLP1Address())
      const bal = await pairContract.methods.getReserves().call()
      setBalance(new BigNumber(bal[1]))
    }
    fetchBalance()
  }, [slowRefresh])
  
  return balance
}

export const useLPBnbamount2 = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const pairContract = getContract(PancakePair, getLP2Address())
      const bal = await pairContract.methods.getReserves().call()
      setBalance(new BigNumber(bal[1]))
    }   
    fetchBalance()
  }, [slowRefresh])
  
  return balance
}


export const useGetTotalSupply1 = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const pairContract = getContract(PancakePair, getLP1Address())
      const bal = await pairContract.methods.totalSupply().call()
      setBalance(new BigNumber(bal))
    }
    fetchBalance()
  }, [slowRefresh])
  
  return balance
}

export const useGetTotalSupply2 = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const pairContract = getContract(PancakePair, getLP2Address())
      const bal = await pairContract.methods.totalSupply().call()
      setBalance(new BigNumber(bal))
    }
    fetchBalance()
  }, [slowRefresh])
  
  return balance
}

export const useMaxTxAmount = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTotalSupply() {
      const cakeContract = getContract(cakeABI, getCakeAddress())
      const supply = await cakeContract.methods.maxTransferAmount().call()
      setTotalSupply(new BigNumber(supply))
    }

    fetchTotalSupply()
  }, [slowRefresh])

  return totalSupply
}

export const useTransferTax = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTotalSupply() {
      const cakeContract = getContract(cakeABI, getCakeAddress())
      const supply = await cakeContract.methods.transferTaxRate().call()
      setTotalSupply(new BigNumber(supply))
    }

    fetchTotalSupply()
  }, [slowRefresh])

  return totalSupply
}

export const useTotalReferrals = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTotalReferrals(ethereum, account)
      setBalance(new BigNumber(res))
    }

    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, tokenAddress, fastRefresh])

  return balance
}

export const useTotalReferralCommissions = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTotalReferralCommissions(ethereum, account)
      setBalance(new BigNumber(res))
    }

    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, tokenAddress, fastRefresh])

  return balance
}

export default useTokenBalance
