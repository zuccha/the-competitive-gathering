import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { IStoreDispatch } from '../../../../../store'
import { leaveLeagueByIdAndUsername } from '../../../../../store/slices/leagues'
import { ILeague } from '../../../../../types/League'
import Button from '../../../../components/Button'

type IActionLeaveLeagueProps = {
  league: ILeague
  username: string
}

const ActionLeaveLeague: React.FC<IActionLeaveLeagueProps> = ({
  league,
  username,
}) => {
  const [isLeaving, setIsLeaving] = useState(false)

  const dispatch: IStoreDispatch = useDispatch()
  const leaveLeague = useCallback(() => {
    setIsLeaving(true)
    dispatch(leaveLeagueByIdAndUsername({ id: league.id, username }))
      .then(() => { setIsLeaving(false) })
  }, [username, league.id])

  if (league.status !== 'PENDING') {
    return null
  }

  if (!league.players.includes(username)) {
    return null
  }

  return (
    <Button onClick={leaveLeague} disabled={isLeaving}>
      {isLeaving ? 'Leave...' : 'Leave'}
    </Button>
  )
}

export default ActionLeaveLeague
