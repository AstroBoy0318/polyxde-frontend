import React from 'react'
import styled from 'styled-components'
import { CardBody, CardFooter, Heading, PancakeRoundIcon, TicketRound } from '@polyxde/uikit'
import useI18n from 'hooks/useI18n'
import { DataResponse } from 'utils/getLotteryRoundData'
import LotteryCardHeading from '../LotteryCardHeading'
import PastLotteryActions from './PastLotteryActions'
import PrizeGrid from '../PrizeGrid'
import Timestamp from '../Timestamp'

interface PastRoundCardDetailsProps {
  data: DataResponse
}

const CardHeading = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const TopLotteryCardHeading = styled(LotteryCardHeading)`
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
  color: ${({ theme }) => theme.colors.primary};
`

const PastRoundCardDetails: React.FC<PastRoundCardDetailsProps> = ({ data }) => {
  const TranslateString = useI18n()

  const {
    contractLink,
    jackpotTicket,
    lotteryDate,
    lotteryNumber,
    lotteryNumbers,
    match2Ticket,
    match3Ticket,
    poolSize,
  } = data

  return (
    !data.error &&
    data && (
      <>
        <CardBody style={{padding: "24px 24px 0 24px"}}>
          <CardHeading>
            <div style={{marginBottom: "2em"}}>
              <Timestamp timeValue={lotteryDate} />
              <Heading size="md" color="primary" style={{textAlign:"left",width: "53%"}}>
                Round #{lotteryNumber}
              </Heading>
            </div>
            <TopLotteryCardHeading
              valueToDisplay={`${lotteryNumbers[0]}, ${lotteryNumbers[1]}, ${lotteryNumbers[2]}, ${lotteryNumbers[3]}`}
              Icon={TicketRound}
            >
              {TranslateString(999, 'Winning numbers')}
            </TopLotteryCardHeading>
            <LotteryCardHeading
              valueToDisplay={TranslateString(999, `${poolSize.toLocaleString()} Mumu`)}
              Icon={PancakeRoundIcon}
            >
              {TranslateString(999, 'Total prizes')}
            </LotteryCardHeading>
          </CardHeading>
        </CardBody>
        <CardFooter>
          <PrizeGrid
            lotteryPrizeAmount={poolSize}
            jackpotMatches={jackpotTicket}
            twoTicketMatches={match2Ticket}
            threeTicketMatches={match3Ticket}
            pastDraw
          />
          <PastLotteryActions contractLink={contractLink} lotteryNumber={lotteryNumber} />
        </CardFooter>
      </>
    )
  )
}

export default PastRoundCardDetails
