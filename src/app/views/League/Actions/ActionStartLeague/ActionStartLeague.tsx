import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { IStoreDispatch } from '../../../../../store'
import { startLeagueById } from '../../../../../store/slices/leagues'
import { ILeague } from '../../../../../types/League'
import Button from '../../../../components/Button'
import ModalConfirmation from '../../../../components/ModalConfirmation'
import useModal from '../../../../hooks/useModal'

type IActionStartLeagueProps = {
  league: ILeague
  username: string
}

const ActionStartLeague: React.FC<IActionStartLeagueProps> = ({
  league,
  username,
}) => {
  const [isStarting, setIsStarting] = useState(false)
  const [isModalOpen, openModal, closeModal] = useModal()

  const dispatch: IStoreDispatch = useDispatch()
  const startLeague = useCallback(() => {
    setIsStarting(true)
    dispatch(startLeagueById(league.id))
      .then(() => { setIsStarting(false) })
  }, [history])

  if (league.creator !== username) {
    return null
  }

  if (league.status !== 'PENDING') {
    return null
  }

  const hasEnoughPlayers =
    league.playersMin <= league.players.length &&
    league.players.length <= (league.playersMax || Infinity)

  return (
    <>
      <Button onClick={openModal} disabled={isStarting || !hasEnoughPlayers}>
        {isStarting ? 'Start...' : 'Start'}
      </Button>
      {isModalOpen && (
        <ModalConfirmation
          message='Are you sure you want to start this league?'
          onCancel={closeModal}
          onConfirm={startLeague}
        />
      )}
    </>
  )
}

export default ActionStartLeague
