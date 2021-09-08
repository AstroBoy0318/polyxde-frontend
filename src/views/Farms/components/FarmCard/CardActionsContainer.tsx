import React, { useCallback, useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { provider } from 'web3-core'
import { getContract } from 'utils/erc20'
import { Button, Flex, Heading, LinkExternal, Text, useModal } from '@polyxde/uikit'
import { Farm } from 'state/types'
import { useFarmFromPid, useFarmUser } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import UnlockButton from 'components/UnlockButton'
import { useApprove } from 'hooks/useApprove'
import StakeAction from './StakeAction'
import HarvestAction from './HarvestAction'
import { CAKE_NAME } from '../../../../config'

const Action = styled.div`
  padding-bottom: 16px;
  & > div{
    grid-gap: 1em;
    padding: 0 1em;
  }
  & > div > div{
    border: 2px solid #524B63;
    border-radius: 3px;
    height: 100%;
    flex: 1;
    padding: 15px;
    min-width: 330px;
  }
`
export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

interface FarmCardActionsProps {
  farm: FarmWithStakedValue
  ethereum?: provider
  account?: string
  buyUrl: string
}

const CardActions: React.FC<FarmCardActionsProps> = ({ farm, ethereum, account , buyUrl}) => {
  const TranslateString = useI18n()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { pid, lpAddresses, tokenAddresses, isTokenOnly, depositFeeBP } = useFarmFromPid(farm.pid)
  const { allowance, tokenBalance, stakedBalance, earnings } = useFarmUser(pid)
  const lpAddress = lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const tokenAddress = tokenAddresses[process.env.REACT_APP_CHAIN_ID];
  const lpName = farm.lpSymbol.toUpperCase()
  const isApproved = account && allowance && allowance.isGreaterThan(0)

  const lpContract = useMemo(() => {
    if(isTokenOnly){
      return getContract(ethereum as provider, tokenAddress);
    }
    return getContract(ethereum as provider, lpAddress);
  }, [ethereum, lpAddress, tokenAddress, isTokenOnly])

  /* const harvestTime = useHarvestTime(pid)
  const nowTime = useNowTime()

  const [onPresentTime] = useModal(<TimeModal pid={farm.pid}/>) */

  const { onApprove } = useApprove(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])

  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction stakedBalance={stakedBalance} tokenBalance={tokenBalance} tokenName={lpName} pid={pid} depositFeeBP={depositFeeBP} />
    ) : (
      <Button variant="secondary" mt="8px" fullWidth disabled={requestedApproval} onClick={handleApprove}>
        {TranslateString(999, 'Approve Contract')}
      </Button>
    )
  }

  return (
    <Action>
      <Flex justifyContent="space-around" alignItems="center" flexWrap="wrap">
        <Flex flexDirection="column" mb="0px">
          <Flex>
            <Text textTransform="uppercase" color="text" fontSize="16" pr="3px">
              {/* TODO: Is there a way to get a dynamic value here from useFarmFromSymbol? */}
              { CAKE_NAME }
            </Text>
            <Text textTransform="uppercase" color="primary" fontSize="16px">
              {TranslateString(999, 'Earned')}
            </Text>
          </Flex>
          <HarvestAction earnings={earnings} pid={pid} />
        </Flex>
        {!isTokenOnly &&
        <Flex flexDirection="column">
          <Text fontSize="16px" style={{textAlign:"left"}}>Liquidity</Text>
          {!account ? <UnlockButton variant="secondary" mt="8px" fullWidth /> : <Button variant="secondary" mt="8px" onClick={()=>window.open(
            isTokenOnly ?
              `https://quickswap.exchange/#/swap/${tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
              :
              buyUrl
          )}>
            Add/Remove {lpName}
          </Button>}
        </Flex>
        }
        <Flex flexDirection="column" style={{minWidth: "260px"}}>
          <Flex>
            <Text color="text" fontSize="16px" pr="3px">
              {lpName}
            </Text>
            <Text color="primary" fontSize="16px">
              {TranslateString(999, 'Staked')}
            </Text>
          </Flex>
          {!account ? <UnlockButton variant="secondary" mt="8px" fullWidth /> : renderApprovalOrStakeButton()}
        </Flex>
      </Flex>
    </Action>
  )
}

export default CardActions
