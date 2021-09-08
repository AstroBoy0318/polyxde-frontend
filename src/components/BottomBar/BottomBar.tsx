import React, { useContext } from 'react'
import styled from 'styled-components'
import { Text } from '@polyxde/uikit'
import { RefferalContext } from '../../contexts/RefferalContext'

const BottomBar: React.FC = () => {
  const { refferalAddress } = useContext(RefferalContext)
  return (
    <StyledTopBar>
      {refferalAddress&&<Text color="textSubtle" fontSize="md">Ref by: {refferalAddress}</Text>}
    </StyledTopBar>
  )
}

const StyledTopBar = styled.div`
  height: max-content;
  text-align: center;
  width: 100%;
`

export default BottomBar
