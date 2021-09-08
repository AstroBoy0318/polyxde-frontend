import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Card, CardBody, Flex, Heading, HelpIcon, Skeleton, Text } from '@polyxde/uikit'
import { Farm } from 'state/types'
import { provider } from 'web3-core'
import useI18n from 'hooks/useI18n'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { QuoteToken } from 'config/constants/types'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'
import { CAKE_NAME } from '../../../../config'
import { useFarmUser } from '../../../../state/hooks'
import { getBalanceNumber } from '../../../../utils/formatBalance'
import HarvestAction from './HarvestAction'

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

const RainbowLight = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const StyledCardAccent = styled.div`
  background: linear-gradient(45deg,
  rgba(255, 0, 0, 1) 0%,
  rgba(255, 154, 0, 1) 10%,
  rgba(208, 222, 33, 1) 20%,
  rgba(79, 220, 74, 1) 30%,
  rgba(63, 218, 216, 1) 40%,
  rgba(47, 201, 226, 1) 50%,
  rgba(28, 127, 238, 1) 60%,
  rgba(95, 21, 242, 1) 70%,
  rgba(186, 12, 248, 1) 80%,
  rgba(251, 7, 217, 1) 90%,
  rgba(255, 0, 0, 1) 100%);
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 0px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const FCard = styled.div`
  align-self: baseline;  
  /* background: ${({ theme }) => theme.colors.card}; */
  border-radius: 5px;
  display: flex;
  padding: 1px;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  text-align: center;
  width: 100%;
`
const FCardBody = styled.div`
  padding: 0.5em 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  cursor: pointer;
`
const BottomBar = ()=>{
  return (<img alt="bottom" style={{width: "100%",position: "absolute",left: "0",bottom: "-12px"}} src='/images/cardbackbottom_farm.png'/>);
}

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  height: 1px;
  /* margin: 28px auto; */
  width: 100%;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

const HelpDiv = styled.div`
  display: inline-block;
  position: relative;
  & > a {
    position: relative;
    top: 4px;
    left: 4px;
  }
  & > .tooltip{
    display: none;
    background: rgba(0,0,0,0.8);
    position: absolute;
    width: 160px;
    left: 135%;
    padding: 10px;
    border-radius: 10px;
    top: -35px;
  }
  &:hover > .tooltip{
    display: block;
  }
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  removed: boolean
  cakePrice?: BigNumber
  bnbPrice?: BigNumber
  ethereum?: provider
  account?: string
  isLast?: boolean
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, removed, cakePrice, bnbPrice, ethereum, account , isLast}) => {
  const TranslateString = useI18n()

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  // const isCommunityFarm = communityFarms.includes(farm.tokenSymbol)
  // We assume the token name is coin pair + lp e.g. CAKE-BNB LP, LINK-BNB LP,
  // NAR-CAKE LP. The images should be cake-bnb.svg, link-bnb.svg, nar-cake.svg
  // const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()
  const farmImage = farm.isTokenOnly ? farm.tokenSymbol.toLowerCase() : `${farm.tokenSymbol.toLowerCase()}-${farm.quoteTokenSymbol.toLowerCase()}`

  const totalValue: BigNumber = useMemo(() => {
    if (!farm.lpTotalInQuoteToken) {
      return null
    }
    if (farm.quoteTokenSymbol === QuoteToken.BNB) {
      return bnbPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
      return cakePrice.times(farm.lpTotalInQuoteToken)
    }
    return farm.lpTotalInQuoteToken
  }, [bnbPrice, cakePrice, farm.lpTotalInQuoteToken, farm.quoteTokenSymbol])

  const totalValueFormated = totalValue
    ? `$${Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  const lpLabel = farm.lpSymbol
  const earnLabel = CAKE_NAME
  const farmAPY = farm.apy && farm.apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const { quoteTokenAddresses, quoteTokenSymbol, tokenAddresses, risk } = farm
  const { stakedBalance, earnings } = useFarmUser(farm.pid)
  const rawEarningsBalance = getBalanceNumber(earnings)
  const rawEarningsPrice = getBalanceNumber(earnings)*cakePrice.toNumber()
  const displayEarningBalance = rawEarningsBalance.toLocaleString()
  const displayEarningPrice = rawEarningsPrice.toLocaleString()
  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const displayStakedBalance = rawStakedBalance.toLocaleString()
  const rawStakedPrice: BigNumber = useMemo(() => {
    if (!farm.lpTotalInQuoteToken) {
      return null
    }
    if (farm.quoteTokenSymbol === QuoteToken.BNB) {
      return bnbPrice.times(farm.lpTotalInQuoteToken).toString() === "NaN"?new BigNumber(0):bnbPrice.times(farm.lpTotalInQuoteToken).div(farm.tokenAmount).times(rawStakedBalance);
    }
    if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
      return cakePrice.times(farm.lpTotalInQuoteToken).toString() === "NaN"?new BigNumber(0):cakePrice.times(farm.lpTotalInQuoteToken).div(farm.tokenAmount).times(rawStakedBalance);
    }
    return (farm.lpTotalInQuoteToken === null || farm.lpTotalInQuoteToken.toString() === "NaN" || farm.lpTotalInQuoteToken.toString() === "0")? new BigNumber(0) : new BigNumber(farm.lpTotalInQuoteToken).div(farm.tokenAmount).times(rawStakedBalance);
  }, [ bnbPrice, cakePrice, rawStakedBalance, farm.lpTotalInQuoteToken, farm.quoteTokenSymbol, farm.tokenAmount])
  const displayStakedPrice = (rawStakedPrice === null || rawStakedPrice.toString() === "NaN" || rawStakedPrice.toString() === "0"? 0 : rawStakedPrice.toNumber()).toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })

  return (
    <FCard>
      <FCardBody onClick={() => setShowExpandableSection(!showExpandableSection)}>
        <CardHeading
          lpLabel={lpLabel}
          multiplier={farm.multiplier}
          risk={risk}
          depositFee={farm.depositFeeBP}
          farmImage={farmImage}
          tokenSymbol={farm.tokenSymbol}
          isTokenOnly={farm.isTokenOnly}
        />
        <Flex flexDirection="column">
          <Flex>
            <Text bold textTransform="uppercase" color="text" fontSize="12px" pr="3px">
              {/* TODO: Is there a way to get a dynamic value here from useFarmFromSymbol? */}
              { CAKE_NAME }
            </Text>
            <Text bold textTransform="uppercase" color="primary" fontSize="12px">
              {TranslateString(999, 'Earned')}
            </Text>
          </Flex>
          <Flex>
            <Heading color={rawEarningsBalance === 0 ? 'text' : 'text'} style={{ fontSize: "16px" }}>{displayEarningBalance}</Heading>
          </Flex>
          <Flex>
            <Heading color={rawEarningsPrice === 0 ? 'text' : 'text'} style={{ fontSize: "16px" }}>${displayEarningPrice}</Heading>
          </Flex>
        </Flex>
        <Flex flexDirection="column">
          <Flex>
            <Text bold textTransform="uppercase" color="text" fontSize="12px" pr="3px">
              {farm.lpSymbol}
            </Text>
            <Text bold textTransform="uppercase" color="primary" fontSize="12px">
              {TranslateString(999, 'Staked')}
            </Text>
          </Flex>
          <Flex>
            <Heading color={rawStakedBalance === 0 ? 'text' : 'text'} style={{ fontSize: "16px" }}>{displayStakedBalance}</Heading>
          </Flex>
          <Flex>
            <Heading color={rawStakedBalance === 0 ? 'text' : 'text'} style={{ fontSize: "16px" }}>${displayStakedPrice}</Heading>
          </Flex>
        </Flex>
        <Flex flexDirection="column">
        {!removed && (
          <Flex justifyContent="space-between" alignItems="center">
            <Text bold fontSize="14px">{TranslateString(352, 'APY')}:</Text>
            <Text bold style={{ display: 'flex', alignItems: 'center' }} fontSize="14px">
              {farm.apy ? (
                <>
                  <ApyButton
                    lpLabel={lpLabel}
                    quoteTokenAdresses={quoteTokenAddresses}
                    quoteTokenSymbol={quoteTokenSymbol}
                    tokenAddresses={tokenAddresses}
                    cakePrice={cakePrice}
                    apy={farm.apy}
                  />
                  {farmAPY}%
                </>
              ) : (
                <Skeleton height={24} width={80} />
              )}
            </Text>
          </Flex>
        )}
          <Flex justifyContent='space-between'>
            <Text bold fontSize="14px">{TranslateString(318, 'Earn')}:</Text>
            <Text bold fontSize="14px">{earnLabel}</Text>
          </Flex>
        </Flex>
        {!removed && (
          <Flex flexDirection="column" alignItems="start">
            <Text bold fontSize="14px">{TranslateString(23, 'Liquidity')}</Text>
            <Text bold fontSize="14px">{totalValueFormated === "$NaN"?"$0":totalValueFormated}</Text>
          </Flex>
        )}
        <ExpandableSectionButton
          expanded={showExpandableSection}
          onClick={() => { return 0; }}
        />
      </FCardBody>
      {/* <Flex justifyContent='space-between'> */}
      {/*  <Text style={{ fontSize: '15px' }}> */}
      {/*    Harvest Lockup */}
      {/*    <HelpDiv> */}
      {/*      <a href="https://mumuswapfinance.gitbook.io/mumuswap/"> */}
      {/*        <HelpIcon color="primary" style={{width: "15px"}}/> */}
      {/*      </a> */}
      {/*      <span className="tooltip"> */}
      {/*        <Text color="primary">How soon you harvest or compound again</Text> */}
      {/*      </span> */}
      {/*    </HelpDiv> */}
      {/*    </Text> */}
      {/*  <Text bold style={{ fontSize: '15px' }}>{(farm.harvestInterval / 3600)}hours</Text> */}
      {/* </Flex> */}
      { showExpandableSection && <Divider /> }
      <ExpandingWrapper expanded={showExpandableSection}>
        <DetailsSection
          farm={farm}
          ethereum={ethereum}
          account={account}
          removed={removed}
          pid={farm.pid}
          isTokenOnly={farm.isTokenOnly}
          bscScanAddress={
            farm.isTokenOnly ?
              `https://polygonscan.com/token/${farm.tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
              :
              `https://polygonscan.com/token/${farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]}`
          }
          totalValueFormated={totalValueFormated}
          lpLabel={lpLabel}
          quoteTokenAdresses={quoteTokenAddresses}
          quoteTokenSymbol={quoteTokenSymbol}
          tokenAddresses={tokenAddresses}
        />
      </ExpandingWrapper>
      { !isLast && <Divider /> }
    </FCard>
  )
}

export default FarmCard
