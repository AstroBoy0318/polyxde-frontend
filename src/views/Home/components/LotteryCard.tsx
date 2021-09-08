import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, Card, CardBody, Heading, useModal } from '@polyxde/uikit'
import { getCakeAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import useTokenBalance from 'hooks/useTokenBalance'
import { useMultiClaimLottery } from 'hooks/useBuyLottery'
import { useTotalClaim } from 'hooks/useTickets'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BuyModal from 'views/Lottery/components/TicketCard/BuyTicketModal'
import CakeWinnings from './CakeWinnings'
import LotteryJackpot from './LotteryJackpot'
import UnlockButton from '../../../components/UnlockButton'
import Spacer from '../../../components/Spacer'

const StyledLotteryCard = styled(Card)`
  border-radius: 10px;
  text-align: center;
  width: 100%;
  margin-left: 0;
`
const Block = styled.div`
 margin-top: 1em;
`
const CardImage = styled.img`
  // box-shadow: -8px 8px 0 0 rgba(201,157,55,0.4);
`
const Label = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
`
const Actions = styled.div`
 display: flex;
 margin-top: 22%;
 button {
   flex: 1 0 50%;
 }
 @media (max-width: 768px) {
  display: block;
  margin-top: 2em;
 }
 `
 const Row = styled.div`
  display: flex;
  flex-direction: row;
`
const Left = styled.div`
  padding-top: 5%;
  width: 50%;
`
const Right = styled.div`
  padding-top: 5%;
  width: 50%;
`

const FarmedStakingCard = () => {
  const lotteryHasDrawn = useGetLotteryHasDrawn()
  const [requesteClaim, setRequestedClaim] = useState(false)
  const TranslateString = useI18n()
  const { claimAmount } = useTotalClaim()
  const { onMultiClaim } = useMultiClaimLottery()

  const pizzaBalance = useTokenBalance(getCakeAddress())
  const { account } = useWallet()


  const handleClaim = useCallback(async () => {
    try {
      setRequestedClaim(true)
      const txHash = await onMultiClaim()
      // user rejected tx or didn't go thru
      if (txHash) {
        setRequestedClaim(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onMultiClaim, setRequestedClaim])

  const [onPresentBuy] = useModal(<BuyModal max={pizzaBalance} tokenName="Mumu" />)

  return (
    <StyledLotteryCard>
      <CardBody>
        <Heading mb="20px" color="primary" style={{width: "min(100%,14em)", margin: "0 auto", marginTop: '10px' }} size="xl">
          {TranslateString(550, 'Mumuswap lottery desk')}
        </Heading>
        <Block>
          <Row>
            <CakeWinnings />
          </Row>
          <Row>
            <Label>HELIUM3 to Collect</Label>
          </Row>
          <Row>
            <LotteryJackpot />
          </Row>
          <Row>
            <Label>{TranslateString(554, 'Total jackpot this round')}</Label>
          </Row>
        </Block>
        {account?
          <>
            <Spacer size="md"/>
            <Spacer size="sm"/>
            </> :
          <></>
        }
      <Actions>
        {account ? (
          <>
            <Button
              id="dashboard-collect-winnings"
              disabled={getBalanceNumber(claimAmount) === 0 || requesteClaim}
              // onClick={handleClaim}
              style={{ marginRight: '8px' }}
            >
              {TranslateString(556, 'Collect Winnings')}
            </Button>
             {/* <Button id="dashboard-buy-tickets" variant="primary" onClick={onPresentBuy} disabled={lotteryHasDrawn} className="imgBtn"> */}
             <Button id="dashboard-buy-tickets" variant="primary" disabled={lotteryHasDrawn} className="imgBtn">
              {TranslateString(558, 'Buy Tickets')}
            </Button>
          </>
          ):(
            <div style={{margin:"0 auto"}}>
              <UnlockButton />
            </div>
          )}
      </Actions>
      </CardBody>
    </StyledLotteryCard>
  )
}

export default FarmedStakingCard
