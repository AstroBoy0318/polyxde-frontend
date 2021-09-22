import React from 'react'
import styled from 'styled-components'
import { Flex, Heading, Image, Tag, Text, VerifiedIcon } from 'uikit-layer2'
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
  margin-left: 1px;
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
    <Wrapper justifyContent="space-between" mb="7px">
      <div>
        <Flex flexDirection="column" alignItems="flex-start">
          <Heading mb="8px" style={{fontSize: "16px"}}>
            <img src={`/images/farms/${farmImage}.png`} alt={tokenSymbol} style={{ height: "21px",marginRight: "10px", verticalAlign: "bottom" }} />
	{lpLabel}
          </Heading>
          <Flex justifyContent="center" style={{gridGap: "3px"}}>
            <MultiplierTag variant="primary">{multiplier}</MultiplierTag>
            {!isTokenOnly &&
            <QuickswapTag variant="binance">
              Quickswap
            </QuickswapTag>
            }
            {depositFee === 0 ? <NoFeeTag /> : <DepositFeeTag variant="success" outline startIcon={<VerifiedIcon />}>{(depositFee / 100)}% Fee</DepositFeeTag> }
            {/* {isCommunityFarm ? <CommunityTag /> : <CoreTag />} */}
            {/* <RiskTag risk={risk} /> */}
          </Flex>
        </Flex>
        {depositFee !== 0 &&
        <Flex justifyContent='space-between' style={{display: "none"}}>
          <Text style={{ fontSize: '16px',paddingRight:'0.3em' }}>Deposit Fee:</Text>
          <Text bold style={{ fontSize: '16px' }}> {(depositFee / 100)}%</Text>
        </Flex>}
      </div>
    </Wrapper>
  )
}

export default CardHeading
