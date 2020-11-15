import { unwrapResult } from '@reduxjs/toolkit'
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { IStoreDispatch } from '../../../../../store'
import { deleteLeagueById } from '../../../../../store/slices/leagues'
import { ILeague } from '../../../../../types/League'
import Button from '../../../../components/Button'
import ModalConfirmation from '../../../../components/ModalConfirmation'
import useModal from '../../../../hooks/useModal'

type IActionDeleteLeagueProps = {
  league: ILeague
  username: string
}

const ActionDeleteLeague: React.FC<IActionDeleteLeagueProps> = ({
  league,
  username,
}) => {
  const history = useHistory()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isModalOpen, openModal, closeModal] = useModal()

  const dispatch: IStoreDispatch = useDispatch()
  const deleteLeague = useCallback(() => {
    setIsDeleting(true)
    dispatch(deleteLeagueById(league.id))
      .then(unwrapResult)
      .then(() => { history.push('/') })
      .catch(() => { setIsDeleting(false) })
  }, [history])

  if (league.creator !== username) {
    return null
  }

  if (league.status !== 'PENDING') {
    return null
  }

  return (
    <>
      <Button onClick={openModal} disabled={isDeleting}>
        {isDeleting ? 'Delete...' : 'Delete'}
      </Button>
      {isModalOpen && (
        <ModalConfirmation
          message='Are you sure you want to delete this league?'
          onCancel={closeModal}
          onConfirm={deleteLeague}
        />
      )}
    </>
  )
}

export default ActionDeleteLeague
