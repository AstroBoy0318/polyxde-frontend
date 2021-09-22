import React, { useState } from 'react'
import styled from 'styled-components'
import { Card, Heading } from 'uikit-layer2'

const MainContainer = styled(Card)`
  /* grid-row-start: 2;
  grid-row-end: 5; */
  padding: 24px;
`

const ItemDiv = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
`

const Announcement = () => {
  const [marketCap,setMarketCap] = useState("")
  return (
    <MainContainer>
      <Heading color="primary" size="xl" style={{ width:"100%",textAlign: "center",marginTop: "10px" }}>Announcments</Heading>
      <div style={{width: "80%",margin: "0 auto", marginTop: "3em"}}>
        <ItemDiv>
          {/* Market Cap: { marketCap } */}
        </ItemDiv>
      </div>
    </MainContainer>
  )
}
export default Announcement