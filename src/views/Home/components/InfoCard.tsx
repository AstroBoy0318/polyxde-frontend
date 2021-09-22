import React from 'react'
import { Card, CardBody, Flex, Heading, Text } from 'uikit-layer2'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import CardValue from './CardValue'
import { useFarms, usePriceBnbBusd, usePriceCakeBusd, useTotalValue } from '../../../state/hooks'
import { BLOCKS_PER_YEAR, CAKE_NAME } from '../../../config'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { useBurnedBalance, useTotalSupply } from '../../../hooks/useTokenBalance'
import { getCakeAddress } from '../../../utils/addressHelpers'
import { QuoteToken } from '../../../config/constants/types'

const StyledInfoCard = styled(Card)`
  width: 100%;
  max-width: 1150px;
  grid-gap: 40px;
`;
const StyleInfoPart = styled(Flex)`
  width: 300px;
  flex-direction: column;
  text-align: center;
`
const CardMidContent = styled(Heading).attrs({ size: 'lg' })`
  line-height: 1.1em;
  padding-top: 10px;
`;
const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-right: 15px;
  margin-left: 15px;
`

const InfoCard = () => {
  const farmsLP = useFarms()

  const totalValue = useTotalValue();

  const totalSupply = useTotalSupply()

  const burnedBalance = useBurnedBalance(getCakeAddress())
  const farms = useFarms();
  const cakePrice = usePriceCakeBusd();
  const bnbPrice = usePriceBnbBusd();
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0);
  const cakeSupply = getBalanceNumber(circSupply);
  const marketCap = cakePrice.times(circSupply);

  let tokenPerBlock = 0;
  if(farms && farms[0] && farms[0].tokenPerBlock){
    tokenPerBlock = new BigNumber(farms[0].tokenPerBlock).div(new BigNumber(10).pow(18)).toNumber();
  }

  const maxAPY = farmsLP.reduce((preVal,farm)=>{
    const cakeRewardPerBlock = new BigNumber(farm.tokenPerBlock || 1).times(new BigNumber(farm.poolWeight)).div(new BigNumber(10).pow(18))
    const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

    let apy = cakePrice.times(cakeRewardPerYear);

    let tValue = new BigNumber(farm.lpTotalInQuoteToken || 0);

    if (farm.quoteTokenSymbol === QuoteToken.BNB) {
      tValue = tValue.times(bnbPrice);
    }
    if (tValue.comparedTo(0) > 0) {
      apy = apy.div(tValue);
    }
    return Math.max(preVal, apy.toNumber());
  }, 0)
  return (
    <StyledInfoCard>
      <CardBody>
        <Flex flexDirection="row" justifyContent="space-around" flexWrap="wrap" alignItems="center">
          <StyleInfoPart>
            <Heading color="text" style={{fontSize:"28px"}}>
              Total Value Locked
            </Heading>
            <CardMidContent marginTop="0em">
              <CardValue value={totalValue.toNumber()} prefix="$" decimals={2} fontSize="28px"/>
            </CardMidContent>
            <Heading color="white" size="sm">
              Across all Farms and Pools
            </Heading>
          </StyleInfoPart>
          <StyleInfoPart>
            <img src="/images/egg/logo.png" alt="logo" style={{ height:"45px", width: "51px", margin: "0 auto"}}/>
            <Text bold mt="0.5em">
              Earn up to { maxAPY.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 }) }%
            </Text>
          </StyleInfoPart>
          <StyleInfoPart>
            <Row>
              <Text fontSize="14px" color="text">Market Cap</Text>
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
              <Text fontSize="14px" color="text">{CAKE_NAME}/block</Text>
              <Text bold fontSize="14px" color="primary">{tokenPerBlock}</Text>
            </Row>
          </StyleInfoPart>
        </Flex>
      </CardBody>
    </StyledInfoCard>
  )
}

export default InfoCard;