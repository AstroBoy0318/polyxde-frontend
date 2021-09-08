import React from 'react'
import styled from 'styled-components'
import { BaseLayout } from '@polyxde/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import FarmStakingCard from './components/FarmStakingCard'
import CakeStats from './components/CakeStats'
import TotalValueLockedCard from './components/TotalValueLockedCard'
import LPWorth from './components/LPWorth'
import AddTokenCard from './components/AddTokenCard'
import InfoCard from './components/InfoCard'

const Hero = styled.div`
  align-items: center;
  background-repeat: no-repeat;
  background-size: 100px 30px;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 5px;
  padding-top: 0px;
  text-align: center;
  @media (max-width: 768px) {
    min-height: 3vw;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    background-position: left center, right center;
    background-size: 30px;
    height: 30px;
    padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 48px;
  max-width: 1200px;
  margin: 0 auto;
  grid-gap: 40px;

  & > div {
    grid-column: span 12;
    margin: 0 auto;
  }
`


const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <Hero/>
      <div>
        <Cards>
          <InfoCard />
          <FarmStakingCard />
          {/* <LotteryCard /> */}
          {/* <Announcement /> */}
          {/* <CakeStats /> */}
          {/* <LPWorth /> */}
          {/* <TotalValueLockedCard /> */}
          {/* <AddTokenCard /> */}
	      </Cards>
      </div>
    </Page>
  )
}

export default Home
