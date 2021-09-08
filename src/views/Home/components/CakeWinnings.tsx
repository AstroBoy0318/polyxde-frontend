import React from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useTotalClaim } from 'hooks/useTickets'
import { getBalanceNumber } from 'utils/formatBalance'
import CardValue from './CardValue'

const CakeWinnings = () => {
	const { account } = useWallet()
  const { claimAmount } = useTotalClaim()
  /* if (!account) {
    return (
      <Text color="text" style={{ lineHeight: '50px',fontSize:"35px" }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  } */
  return <CardValue value={getBalanceNumber(claimAmount)} fontSize="35px"/>
}

export default CakeWinnings