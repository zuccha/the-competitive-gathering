import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { IStoreDispatch } from '../../../../../store'
import { enrollLeagueByIdAndUsername } from '../../../../../store/slices/leagues'
import { ILeague } from '../../../../../types/League'
import Button from '../../../../components/Button'

type IActionEnrollLeagueProps = {
  league: ILeague
  username: string
}

const ActionEnrollLeague: React.FC<IActionEnrollLeagueProps> = ({
  league,
  username,
}) => {
  const [isEnrolling, setIsEnrolling] = useState(false)

  const dispatch: IStoreDispatch = useDispatch()
  const enrollLeague = useCallback(() => {
    setIsEnrolling(true)
    dispatch(enrollLeagueByIdAndUsername({ id: league.id, username }))
      .then(() => { setIsEnrolling(false) })
  }, [username, league.id])

  if (league.status !== 'PENDING') {
    return null
  }

  if (league.players.includes(username)) {
    return null
  }

  const canEnroll = league.players.length < (league.playersMax || Infinity)

  return (
    <Button onClick={enrollLeague} disabled={isEnrolling || !canEnroll}>
      {isEnrolling ? 'Enroll...' : 'Enroll'}
    </Button>
  )
}

export default ActionEnrollLeague
