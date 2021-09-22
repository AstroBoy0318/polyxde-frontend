import React from 'react'
import { Card, CardBody, Heading, Text } from 'uikit-layer2'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import {
  useBurnedBalance,
  useMaxTxAmount,
  useTotalSupply,
  useTransferTax,
} from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import { useFarms, usePriceCakeBusd } from '../../../state/hooks'
import { CAKE_NAME } from '../../../config'

const StyledCakeStats = styled(Card)`
  // grid-row-start: 2;
  // grid-row-end: 4;
  text-align: center;
  height: auto !important;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: max-content;
    margin-top: 50px;
  }
  `

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;  
  margin-right: 15px;
  margin-left: 15px;
`

const CakeStats = () => {
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  // const maxTxAmount = useMaxTxAmount()
  // const transferTax = useTransferTax()
  // const transferTaxvalue = (getBalanceNumber(transferTax))*100000000000000000
  const farms = useFarms();
  const eggPrice = usePriceCakeBusd();
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0);
  const cakeSupply = getBalanceNumber(circSupply);
  const marketCap = eggPrice.times(circSupply);

  let tokenPerBlock = 0;
  if(farms && farms[0] && farms[0].tokenPerBlock){
    tokenPerBlock = new BigNumber(farms[0].tokenPerBlock).div(new BigNumber(10).pow(18)).toNumber();
  }

  return (
    <StyledCakeStats>
      <CardBody style={{padding: "24px 10px",paddingBottom: "5px"}}>
        <Heading size="xl" mb="24px" color="primary" style={{marginTop: '10px', marginBottom: '0.5em'}}>
          { CAKE_NAME } Stats
        </Heading>
        <Row>
          <Text fontSize="14px" color="text">Total { CAKE_NAME } Supply</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(marketCap)} decimals={0} prefix="$" />
        </Row>
        <Row>
          <Text fontSize="14px" color="text">Total Minted</Text>
          {totalSupply && <CardValue fontSize="14px" value={getBalanceNumber(totalSupply)} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px" color="text">Total Burned</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(burnedBalance)} decimals={0} />
        </Row>
        <Row>
          <Text fontSize="14px" color="text">Circulating Supply</Text>
          {cakeSupply && <CardValue fontSize="14px" value={cakeSupply} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px" color="text">New {CAKE_NAME}/block</Text>
          <Text bold fontSize="14px">{tokenPerBlock}</Text>
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
