import React from 'react'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { Flex, Link, LinkExternal, Text } from '@polyxde/uikit'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { Address } from 'config/constants/types'
import CardActionsContainer from './CardActionsContainer'

export interface ExpandableSectionProps {
  farm: any
  ethereum: any
  account: string
  isTokenOnly?: boolean
  bscScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  quoteTokenAdresses?: Address
  quoteTokenSymbol?: string
  pid?: number
  tokenAddresses: Address
}

const Wrapper = styled.div`
  margin-top: 24px;
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  farm,
  ethereum,
  account,
  isTokenOnly,
  pid,
  bscScanAddress,
  removed,
  totalValueFormated,
  lpLabel,
  quoteTokenAdresses,
  quoteTokenSymbol,
  tokenAddresses,
}) => {
  const TranslateString = useI18n()
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })
  const buyUrl = (pid === -1?`https://quickswap.exchange/#/add/${liquidityUrlPathParts}`:`https://quickswap.exchange/#/add/${liquidityUrlPathParts}`)

  return (
    <Wrapper>
      <CardActionsContainer farm={farm} ethereum={ethereum} account={account} buyUrl={buyUrl}/>
      {/* <Flex justifyContent="center"> */}
      {/*  <Link external href={bscScanAddress} bold={false}> */}
      {/*    View on Polygon */}
      {/*  </Link> */}
      {/* </Flex> */}
    </Wrapper>
  )
}

export default DetailsSection
