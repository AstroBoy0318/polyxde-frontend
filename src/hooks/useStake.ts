import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, updateUserBalance, updateUserStakedBalance } from 'state/actions'
import { sousStake, sousStakeBnb, stake } from 'utils/callHelpers'
import { useFarmFromPid } from 'state/hooks'
import { useMasterchef, useSousChef } from './useContract'

const useStake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()
  const farm = useFarmFromPid(pid)

  const handleStake = useCallback(
    async (amount: string, address?: string) => {      
      const txHash = await stake(masterChefContract, pid, amount, account, address, farm.decimals)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid, farm],
  )

  return { onStake: handleStake }
}

export default useStake
