import React from 'react'
import { Text } from 'uikit-layer2'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from 'hooks/useTickets'

const LotteryJackpot = () => {
  const lotteryPrizeAmount = useTotalRewards()
  const { account } = useWallet()

  /* if (!account) {
    return (
      <Text color="text" style={{ lineHeight: '50px',fontSize:"35px" }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  } */
  return (
    <Text bold fontSize="35px" color="text">
      {getBalanceNumber(lotteryPrizeAmount).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })} Hel3
    </Text>
  )
}

export default LotteryJackpot
