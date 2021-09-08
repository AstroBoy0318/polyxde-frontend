import React from 'react'
import styled from 'styled-components'
import { Flex, Heading, Image, Tag, Text } from '@polyxde/uikit'
import { NoFeeTag } from 'components/Tags'
import { useFarmFromPid } from '../../../../state/hooks'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  risk?: number
  depositFee?: number
  farmImage?: string
  tokenSymbol?: string
  isTokenOnly?: boolean
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 0.25rem;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`

const QuickswapTag = styled(Tag)`
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  multiplier,
  risk,
  farmImage,
  tokenSymbol,
  depositFee,
  isTokenOnly
}) => {
  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      <img src={`/images/farms/${farmImage}.png`} alt={tokenSymbol} style={{ height: "48px" }} />
      <div>
        <Flex flexDirection="column" alignItems="flex-start">
          <Heading mb="4px">{lpLabel}</Heading>
          <Flex justifyContent="center">
            <MultiplierTag variant="primary">{multiplier}</MultiplierTag>
            {!isTokenOnly &&
            <QuickswapTag variant="binance">
              Quickswap
            </QuickswapTag>
            }
            {depositFee === 0 ? <NoFeeTag /> : null}
            {/* {isCommunityFarm ? <CommunityTag /> : <CoreTag />} */}
            {/* <RiskTag risk={risk} /> */}
          </Flex>
        </Flex>
        {depositFee !== 0 &&
        <Flex justifyContent='space-between'>
          <Text style={{ fontSize: '16px',paddingRight:'0.3em' }}>Deposit Fee :</Text>
          <Text bold style={{ fontSize: '16px' }}> {(depositFee / 100)}%</Text>
        </Flex>}
      </div>
    </Wrapper>
  )
}

export default CardHeading
