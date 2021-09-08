import React, { useCallback, useEffect, useState } from 'react'
import { Button, Modal,Text } from '@polyxde/uikit'
import ModalActions from 'components/ModalActions'
import Spacer from '../../../components/Spacer'
import { useHarvestTime, useNowTime } from '../../../hooks/useHarvest'

interface TimeModalProps {
  pid: number
  onDismiss?: () => void
}
const secondsToHms = (d)=>{
  const h = Math.floor(d / 3600);
  const m = Math.floor(d % 3600 / 60);
  const s = Math.floor(d % 3600 % 60);

  const hDisplay = (h<10?h.toString().padStart(2,"0"):h.toString()).concat(":");
  const mDisplay = (m<10?m.toString().padStart(2,"0"):m.toString()).concat(":");
  const sDisplay = (s<10?s.toString().padStart(2,"0"):s.toString());
  return hDisplay + mDisplay + sDisplay;
}
const TimeModal: React.FC<TimeModalProps> = ({ pid, onDismiss}) => {
  const harvestTime = useHarvestTime(pid)
  const nowTime = useNowTime()
  const timeString = secondsToHms(harvestTime-nowTime)
  return (
    <Modal title="Harvest In" onDismiss={onDismiss}>
      <Text fontSize="32px" bold color="primary" style={{margin: "0 auto"}}> { timeString }</Text>
      <Spacer size="sm"/>
    </Modal>
  )
}

export default TimeModal
