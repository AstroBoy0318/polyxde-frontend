import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Card, CardBody, Heading, Text } from '@polyxde/uikit'
import { useCake } from '../../../hooks/useContract'
import { getWeb3 } from '../../../utils/web3'
import { getCakeAddress } from '../../../utils/addressHelpers'
import { CAKE_NAME } from '../../../config'

const MainContainer = styled(Card)`
  ${({ theme }) => theme.mediaQueries.lg} {  
    max-width: 100% !important;
  }
`

const TooltipButton = styled(Button)`
  overflow: visible;
  position: relative;
  word-break: break-all;
  max-width: 100%;
  & > .tooltip{
    display: none;
    position: absolute;
    top: 110%;
    left: 35%;
    width: 30%;
    text-align: center;
    background: rgba(0,0,0,0.5);
    border-radius: 10px;
    padding: 10px 8px;
  }
  &:hover > .tooltip{
    display: block;
  }
`

const ItemDiv = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  line-height: 1.1em;
  text-align: center;
  & > div{
    margin: 0 auto;
    margin-bottom: 1em;
  }
  ${({ theme }) => theme.mediaQueries.md}{
    display: flex;
    justify-content: center;
  }
`
const ChildDiv = styled.div`
  width: 50%;
  min-width: 300px;
  text-align: center;
  &>button>img{
    width: 32px;
    margin-left: 10px;
  }
`
const AddTokenCard = () => {
  const cakeContract = useCake()

  const tokenAddress = getCakeAddress()
  const [copyTooltip, setCopyTooltip] = useState("Copy Address")
  const [isPending, setIsPending] = useState(false)

  const handleCopy = ()=>{
    if (navigator.clipboard) {
      navigator.clipboard.writeText(tokenAddress);
      setCopyTooltip("Copied");
    }
  }

  const addToken = async ()=>{
    setIsPending(true)
    const tokenSymbol = await cakeContract.methods.symbol().call();
    const tokenDecimals = await cakeContract.methods.decimals().call();
    const web3 = getWeb3()
    await web3.givenProvider.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: '',
        },
      },
    });
    setIsPending(false)
  }

  const buyToken = ()=>{
    window.open("https://quickswap.exchange/#/swap?outputCurrency=".concat(tokenAddress))
  }

  return (
    <MainContainer>
      <CardBody>
        <Heading color="primary" size="xl" style={{ width:"100%",textAlign: "center" }}>Add { CAKE_NAME }</Heading>
        <div style={{width: "80%",minWidth: "300px", margin: "0 auto", marginTop: "1em"}}>
          <ItemDiv>
            <div>
              <div>
                <Text color="textSubtle">
                  Token Address
                </Text>
                <TooltipButton onClick={handleCopy}>
                  {tokenAddress}
                  <span className="tooltip">{copyTooltip}</span>
                </TooltipButton>
              </div>
            </div>
          </ItemDiv>
          <ItemDiv style={{marginTop: "0em"}}>
            <ChildDiv>
              <Button onClick={addToken} disabled={isPending}>Add { CAKE_NAME } to <img src="/images/icons/metamask.png" alt="metamask"/></Button>
            </ChildDiv>
            <ChildDiv>
              <Button onClick={buyToken}>Buy { CAKE_NAME } from <img src="/images/icons/quickswap.png" alt="pancake"/></Button>
            </ChildDiv>
          </ItemDiv>
        </div>
      </CardBody>
    </MainContainer>
  )
}
export default AddTokenCard