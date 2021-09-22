import React, { useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { BaseLayout, Button, Card, CardBody, Link } from 'uikit-layer2'
import { useTotalReferralCommissions, useTotalReferrals } from '../../hooks/useTokenBalance'
import UnlockButton from '../../components/UnlockButton'

const MainContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`
const CardGrid = styled(BaseLayout)`
  grid-gap: 2em;
  & > div {
    grid-column: span 6
  }
`

const Heading = styled.div`
  padding: 24px;
  font-size: 1.5em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  display: flex;
  justify-content: space-between;
`

const Body = styled.div`
  padding: 24px;
`

const Refferals = () => {
  const { account } = useWallet()
  const myTotalReferrals = useTotalReferrals(account);
  const TotalReferrals = myTotalReferrals.toNumber();
  const myTotalReferralCommissions = useTotalReferralCommissions(account);
  const TotalReferralCommissionsValue = myTotalReferralCommissions.toNumber() === 0?'0':((myTotalReferralCommissions.toNumber()/1000000000000000000)).toLocaleString('en-US', {minimumFractionDigits: 3})
  const refferalsLink = document.location.origin.concat("/?ref=".concat(btoa(account)))
  const [copyText, setCopyText] = useState("Copy")
  const handleCopy = ()=>{
    if (navigator.clipboard) {
      navigator.clipboard.writeText(refferalsLink);
      setCopyText("Copied");
      setTimeout(function() {
        setCopyText("Copy");
      }, 1000);
    }
  }
  return (
    <MainContainer>
        {!account ?
          (
            <Card>
              <CardBody style={{ textAlign: 'center', padding: '24px' }}>
                <UnlockButton/>
                <div style={{ marginTop: '1em' }}>
                  Unlock wallet to get your unique referral link
                </div>
              </CardBody>
            </Card>
          )
          : (
            <CardGrid>
              <Card>
                <CardBody style={{padding: 0}}>
                  <Heading>
                    Total Referrals
                  </Heading>
                  <Body>
                    {TotalReferrals}
                  </Body>
                </CardBody>
              </Card>
              <Card>
                <CardBody style={{padding: 0}}>
                  <Heading>
                    Total Referral Commissions
                  </Heading>
                  <Body>
                  {TotalReferralCommissionsValue} iClaws
                  </Body>
                </CardBody>
              </Card>
              <Card style={{gridColumn: 'span 12'}}>
                <CardBody style={{padding: 0}}>
                  <Heading>
                    <div style={{lineHeight: "1.6em"}}>
                      Your Referral Link
                    </div>
                    <Button style={{marginTop: "-0.5em"}} onClick={handleCopy}>
                      {copyText}
                    </Button>
                  </Heading>
                  <Body>
                    <Link href={refferalsLink} style={{margin: "0 auto"}}>
                      {refferalsLink}
                    </Link>
                  </Body>
                </CardBody>
              </Card>
            </CardGrid>
          )
        }
    </MainContainer>
  )
}
export default Refferals