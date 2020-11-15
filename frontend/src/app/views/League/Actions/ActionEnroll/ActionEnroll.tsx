import React, { useCallback } from 'react'
import { ILeague } from '../../../../../types/League'
import Button from '../../../../components/Button'

type IActionEnrollProps = {
  league: ILeague
  username: string
}

const ActionEnroll: React.FC<IActionEnrollProps> = ({
  league,
  username,
}) => {
  const isEnrolled = league.players.includes(username)

  const leaveLeague = useCallback(() => {
    // TODO.
  }, [username])

  const enrollLeague = useCallback(() => {
    // TODO.
  }, [username])

  if (league.status !== 'PENDING') {
    return null
  }

  return (
    <Button onClick={isEnrolled ? leaveLeague : enrollLeague}>
      {isEnrolled ? 'Leave' : 'Enroll'}
    </Button>
  )
}

export default ActionEnroll
