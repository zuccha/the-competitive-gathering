import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { IStoreDispatch } from '../../../../../store'
import { finishLeagueById } from '../../../../../store/slices/leagues'
import { ILeague } from '../../../../../types/League'
import { IMatch } from '../../../../../types/Match'
import Button from '../../../../components/Button'
import ModalConfirmation from '../../../../components/ModalConfirmation'
import useModal from '../../../../hooks/useModal'

type IActionFinishLeagueProps = {
  league: ILeague
  matches: IMatch[]
  username: string
}

const ActionFinishLeague: React.FC<IActionFinishLeagueProps> = ({
  league,
  matches,
  username,
}) => {
  const [isFinishing, setIsFinishing] = useState(false)
  const [isModalOpen, openModal, closeModal] = useModal()

  const dispatch: IStoreDispatch = useDispatch()
  const finishLeague = useCallback(() => {
    setIsFinishing(true)
    dispatch(finishLeagueById(league.id))
      .then(() => { setIsFinishing(false) })
  }, [history])

  if (league.creator !== username) {
    return null
  }

  if (league.status !== 'ONGOING') {
    return null
  }

  const isDone = matches.every(match => match.status === 'DONE')

  return (
    <>
      <Button onClick={openModal} disabled={isFinishing || !isDone}>
        {isFinishing ? 'Finish...' : 'Finish'}
      </Button>
      {isModalOpen && (
        <ModalConfirmation
          message='Are you sure you want to finish this league?'
          onCancel={closeModal}
          onConfirm={finishLeague}
        />
      )}
    </>
  )
}

export default ActionFinishLeague
