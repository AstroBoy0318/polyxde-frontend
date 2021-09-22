import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, Card, CardBody, Flex, Heading } from 'uikit-layer2'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'
import { usePriceCakeBusd } from '../../../state/hooks'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getCakeAddress } from '../../../utils/addressHelpers'
import useAllEarnings from '../../../hooks/useAllEarnings'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { CAKE_NAME } from '../../../config'

const StyledFarmStakingCard = styled(Card)`
  text-align: left;
  height: max-content;
  min-height: 100%;
`

const Block = styled.div`
  z-index: 1;
  position: relative;
  display: flex;
  margin-top: 2em;
  justify-content: space-around;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
`

const Actions = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 1em;
  margin-bottom: 2em;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const cakeBalance = getBalanceNumber(useTokenBalance(getCakeAddress()))
  const eggPrice = usePriceCakeBusd().toNumber()
  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  return (
    <Flex>
      <StyledFarmStakingCard style={{borderBottomRightRadius:0,borderTopRightRadius:0}}>
        <CardBody style={{borderBottomRightRadius:0,borderTopRightRadius:0}}>
          <Block>
            <div>
              <Row>
                <Heading style={{fontSize:"26px"}}>Your Rewards</Heading>
              </Row>
              <Row>
                <CakeHarvestBalance earningsSum={earningsSum}/>
              </Row>
              <Row>
                <Label>${(eggPrice * earningsSum).toFixed(2)}</Label>
              </Row>
            </div>
          </Block>

          <Actions>
            {account ? (
              <Button
                id="harvest-all"
                disabled={balancesWithValue.length <= 0 || pendingTx}
                onClick={harvestAllFarms}
                fullWidth
              >
                {pendingTx
                  ? TranslateString(548, ' iClaws')
                  : TranslateString(999, `Harvest all (${balancesWithValue.length})`)}
              </Button>
            ) : (
              <UnlockButton className="imgBtn"/>
            )}
          </Actions>
        </CardBody>
      </StyledFarmStakingCard>
      <StyledFarmStakingCard style={{borderBottomLeftRadius:0,borderTopLeftRadius:0,height: "100%"}}>
        <CardBody style={{borderBottomLeftRadius:0,borderTopLeftRadius:0}}>
          <Block>
            <div>
	<Row>
	<Heading style={{fontSize:"23px"}}>Be honest, this is an honest farm</Heading>
	</Row>

            <Row>
              <Label style={{fontSize:"15px"}}>Dont abuse! Buy/Sell 20% Max of total supply</Label>
            </Row>
            <Row>
              <Label><br /></Label>
            </Row>
            <Row>
              <Label>Farm Start: <a href="https://polygonscan.com/block/countdown/19405000">23/9/2021 ~5 PM UTC</a></Label>
            </Row>
            <Row>
              <Label><br /></Label>
            </Row>
            <Row>
              <Label style={{color:"#7ce0d6"}}><a href="https://polygonscan.com/tx/0x5cff684d31597434a97e0b2d15cc1206378321c43be8cba62feff7763d823b2c">iClaws token launched!</a></Label>
            </Row>
            <Row>
            <Label><a href="https://rugdoc.io/project/xdegen-finance-iclaws"><img src="/images/egg/rugdoc-kyc.png" alt="KYC-RUGDOC" style={{ height:"68px", marginTop: "15px"}}/></a></Label>
            </Row>
            </div>
          </Block>
        </CardBody>
      </StyledFarmStakingCard>
    </Flex>
  )
}

export default FarmedStakingCard
