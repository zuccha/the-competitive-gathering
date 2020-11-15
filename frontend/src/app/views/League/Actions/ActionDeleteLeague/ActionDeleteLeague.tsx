import { unwrapResult } from '@reduxjs/toolkit'
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { IStoreDispatch } from '../../../../../store'
import { deleteLeagueById } from '../../../../../store/slices/leagues'
import { ILeague } from '../../../../../types/League'
import Button from '../../../../components/Button'

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
    <Button onClick={deleteLeague} disabled={isDeleting}>
      {isDeleting ? 'Delete...' : 'Delete'}
    </Button>
  )
}

export default ActionDeleteLeague
