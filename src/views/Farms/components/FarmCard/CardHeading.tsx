import React from 'react'
import styled from 'styled-components'
import { Flex, Heading, Image, Tag, Text, VerifiedIcon } from '@polyxde/uikit'
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
const DepositFeeTag = styled(Tag)`
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
    <Wrapper justifyContent="space-between" mb="12px">
      <div>
        <Flex flexDirection="column" alignItems="flex-start">
          <Heading mb="4px">
            <img src={`/images/farms/${farmImage}.png`} alt={tokenSymbol} style={{ height: "24px",marginRight: "15px", verticalAlign: "bottom" }} />
            {lpLabel}
          </Heading>
          <Flex justifyContent="center" style={{gridGap: "10px"}}>
            <MultiplierTag variant="primary">{multiplier}</MultiplierTag>
            {!isTokenOnly &&
            <QuickswapTag variant="binance">
              Quickswap
            </QuickswapTag>
            }
            {depositFee === 0 ? <NoFeeTag /> : <DepositFeeTag variant="success" outline startIcon={<VerifiedIcon />}>{(depositFee / 100)}%</DepositFeeTag> }
            {/* {isCommunityFarm ? <CommunityTag /> : <CoreTag />} */}
            {/* <RiskTag risk={risk} /> */}
          </Flex>
        </Flex>
        {depositFee !== 0 &&
        <Flex justifyContent='space-between' style={{display: "none"}}>
          <Text style={{ fontSize: '16px',paddingRight:'0.3em' }}>Deposit Fee :</Text>
          <Text bold style={{ fontSize: '16px' }}> {(depositFee / 100)}%</Text>
        </Flex>}
      </div>
    </Wrapper>
  )
}

export default CardHeading
