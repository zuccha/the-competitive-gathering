import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { IStoreDispatch } from '../../../../../store'
import { cancelLeagueById } from '../../../../../store/slices/leagues'
import { ILeague } from '../../../../../types/League'
import Button from '../../../../components/Button'
import ModalConfirmation from '../../../../components/ModalConfirmation'
import useModal from '../../../../hooks/useModal'

type IActionCancelLeagueProps = {
  league: ILeague
  username: string
}

const ActionCancelLeague: React.FC<IActionCancelLeagueProps> = ({
  league,
  username,
}) => {
  const [isCanceling, setIsCanceling] = useState(false)
  const [isModalOpen, openModal, closeModal] = useModal()

  const dispatch: IStoreDispatch = useDispatch()
  const cancelLeague = useCallback(() => {
    setIsCanceling(true)
    dispatch(cancelLeagueById(league.id))
      .then(() => { setIsCanceling(false) })
  }, [history])

  if (league.creator !== username) {
    return null
  }

  if (league.status !== 'ONGOING') {
    return null
  }

  return (
    <>
      <Button onClick={openModal} disabled={isCanceling}>
        {isCanceling ? 'Cancel...' : 'Cancel'}
      </Button>
      {isModalOpen && (
        <ModalConfirmation
          message='Are you sure you want to cancel this league?'
          onCancel={closeModal}
          onConfirm={cancelLeague}
        />
      )}
    </>
  )
}

export default ActionCancelLeague
