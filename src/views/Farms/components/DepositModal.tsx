import BigNumber from 'bignumber.js'
import React, { useCallback, useContext, useMemo, useState } from 'react'
import { Button, Modal } from 'uikit-layer2'
import ModalActions from 'components/ModalActions'
import TokenInput from 'components/TokenInput'
import useI18n from 'hooks/useI18n'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Spacer from '../../../components/Spacer'
import { RefferalContext } from '../../../contexts/RefferalContext'

interface DepositModalProps {
  max: BigNumber
  onConfirm: (amount: string,address: string) => void
  onDismiss?: () => void
  tokenName?: string
  depositFeeBP?: number
  decimals?: number
}

const DepositModal: React.FC<DepositModalProps> = ({ max, onConfirm, onDismiss, tokenName = '' , depositFeeBP = 0, decimals = 18}) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const TranslateString = useI18n()
  const { refferalAddress } = useContext(RefferalContext)
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max, decimals)
  }, [max, decimals])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <Modal title={`${TranslateString(316, 'Deposit')} ${tokenName} Tokens`} onDismiss={onDismiss}>
      <TokenInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
        depositFeeBP={depositFeeBP}
      />
      <Spacer size="sm"/>
      <ModalActions>
        <Button variant="primary" onClick={onDismiss}>
          {TranslateString(462, 'Cancel')}
        </Button>
        <Button
          disabled={pendingTx || val === ''}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val,(refferalAddress===""?account:refferalAddress))
            setPendingTx(false)
            onDismiss()
          }}
        >
          {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Confirm')}
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default DepositModal
