import { useCallback, useEffect, useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, updateUserBalance, updateUserPendingReward } from 'state/actions'
import { harvest, soushHarvest, soushHarvestBnb } from 'utils/callHelpers'
import { useGettingtime, useMasterchef, useSousChef } from './useContract'

export const useHarvest = (farmPid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async (address?:string) => {
    const txHash = await harvest(masterChefContract, farmPid, account, address)
    dispatch(fetchFarmUserDataAsync(account))
    return txHash
  }, [account, dispatch, farmPid, masterChefContract])

  return { onReward: handleHarvest }
}

export const useAllHarvest = (farmPids: number[]) => {
  const { account } = useWallet()
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    const harvestPromises = farmPids.reduce((accum, pid) => {
      return [...accum, harvest(masterChefContract, pid, account)]
    }, [])

    return Promise.all(harvestPromises)
  }, [account, farmPids, masterChefContract])

  return { onReward: handleHarvest }
}

export const useSousHarvest = (sousId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const sousChefContract = useSousChef(sousId)
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    if (sousId === 0) {
      await harvest(masterChefContract, 0, account)
    } else if (isUsingBnb) {
      await soushHarvestBnb(sousChefContract, account)
    } else {
      await soushHarvest(sousChefContract, account)
    }
    dispatch(updateUserPendingReward(sousId, account))
    dispatch(updateUserBalance(sousId, account))
  }, [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId])

  return { onReward: handleHarvest }
}

export const useHarvestTime = (farmPid: number) => {
  const { account } = useWallet()
  const masterChefContract = useMasterchef()
  const gettingtimeContract = useGettingtime()
  const [time,setTime] = useState(0)

  useEffect(() => {
    const fetchTime = async () => {
      if(account && time === 0) {
        const res = await masterChefContract.methods.userInfo(farmPid, account).call()
        setTime(res.nextHarvestUntil)
      }
    }
    fetchTime()
    if(time > 0)
    {
      setTimeout(()=>{
        setTime(time-1)
      },1000)
    }
  }, [account,masterChefContract,gettingtimeContract,farmPid,time])

  return time
}

export const useNowTime = () => {
  const { account } = useWallet()
  const gettingtimeContract = useGettingtime()
  const [time,setTime] = useState(0)

  useEffect(() => {
    const fetchTime = async () => {
      if(account && time === 0) {
        const now = await gettingtimeContract.methods.gettingtime().call()
        console.log("now:".concat(now))
        setTime(now)
      }
    }
    fetchTime()
  }, [account,gettingtimeContract,time])

  return time
}
