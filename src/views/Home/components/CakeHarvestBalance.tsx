import React from 'react'
import { Text } from 'uikit-layer2'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import CardValue from './CardValue'

const CakeHarvestBalance = ({earningsSum}) => {
  const TranslateString = useI18n()
  const { account } = useWallet()

  if (!account) {
    return (
      <Text color="primary" style={{ fontSize: '35px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return <CardValue value={earningsSum}  fontSize="35px"/>
}

export default CakeHarvestBalance