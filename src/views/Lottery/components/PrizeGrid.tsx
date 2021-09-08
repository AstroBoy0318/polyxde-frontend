import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { Heading, Text } from '@polyxde/uikit'

export interface PrizeGridProps {
  lotteryPrizeAmount?: number
  pastDraw?: boolean
  jackpotMatches?: number
  twoTicketMatches?: number
  threeTicketMatches?: number
}

const Grid = styled.div<{ pastDraw?: boolean }>`
  display: grid;
  grid-template-columns: repeat(${(props) => (props.pastDraw ? 3 : 2)}, 1fr);
  grid-template-rows: repeat(4, auto);
  & > div{
    margin-bottom: 0;
  }
`

const RightAlignedText = styled(Text)`
  text-align: right;
`

const RightAlignedHeading = styled(Heading)`
  text-align: right;
`

const GridItem = styled.div<{ marginBottom?: string }>`
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '10px')};
`

const PastDrawGridItem = styled(GridItem)`
  transform: translate(-40%, 0%);
`

const PrizeGrid: React.FC<PrizeGridProps> = ({
  lotteryPrizeAmount = 0,
  pastDraw = false,
  jackpotMatches,
  twoTicketMatches,
  threeTicketMatches,
}) => {
  const fourMatchesAmount = +((lotteryPrizeAmount / 100) * 50).toFixed(0)
  const threeMatchesAmount = +((lotteryPrizeAmount / 100) * 20).toFixed(0)
  const twoMatchesAmount = +((lotteryPrizeAmount / 100) * 10).toFixed(0)
  const burnAmount = +((lotteryPrizeAmount / 100) * 20).toFixed(0)
  const TranslateString = useI18n()

  return (
    <Grid pastDraw={pastDraw}>
      <GridItem>
        <Text fontSize="16px" color="primary">
          {TranslateString(999, 'No. Matched')}
        </Text>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem>
          <RightAlignedText fontSize="16px" color="primary">
            {TranslateString(999, 'Winners')}
          </RightAlignedText>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedText fontSize="16px" color="primary">
          {TranslateString(999, 'Prize Pot')}
        </RightAlignedText>
      </GridItem>
      {/* 4 matches row */}
      <GridItem>
        <Heading fontSize="16px !important" color="text">4</Heading>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem>
          <RightAlignedHeading fontSize="16px !important" color="text">{jackpotMatches}</RightAlignedHeading>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedHeading fontSize="16px !important" color="text">{fourMatchesAmount.toLocaleString()}</RightAlignedHeading>
      </GridItem>
      {/* 3 matches row */}
      <GridItem>
        <Text bold color="text">3</Text>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem>
          <RightAlignedText fontSize="16px" bold color="text">{threeTicketMatches}</RightAlignedText>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedText fontSize="16px" color="text">{threeMatchesAmount.toLocaleString()}</RightAlignedText>
      </GridItem>
      {/* 2 matches row */}
      <GridItem marginBottom="20px">
        <Text color="text">2</Text>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem marginBottom="20px">
          <RightAlignedText fontSize="16px" color="text">{twoTicketMatches}</RightAlignedText>
        </PastDrawGridItem>
      )}
      <GridItem marginBottom="20px">
        <RightAlignedText fontSize="16px" color="text">{twoMatchesAmount.toLocaleString()}</RightAlignedText>
      </GridItem>
      {/* Burn row */}
      <GridItem marginBottom="0">
        <Text fontSize="16px" color="text">{TranslateString(999, `${pastDraw ? 'Burned' : 'To burn'}`)}:</Text>
      </GridItem>
      {pastDraw ? (
        <>
          <GridItem marginBottom="0" />
          <GridItem marginBottom="0">
            <RightAlignedText fontSize="16px" color="text">{burnAmount.toLocaleString()}</RightAlignedText>
          </GridItem>
        </>
      ) : (
        <GridItem marginBottom="0">
          <RightAlignedText fontSize="16px" color="text">{burnAmount.toLocaleString()}</RightAlignedText>
        </GridItem>
      )}
    </Grid>
  )
}

export default PrizeGrid
