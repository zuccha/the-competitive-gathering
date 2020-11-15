import React, { useCallback } from 'react'
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
  const deleteLeague = useCallback(() => {
    // TODO.
  }, [])

  if (league.creator !== username) {
    return null
  }

  if (league.status !== 'PENDING') {
    return null
  }

  return (
    <Button onClick={deleteLeague}>
      Delete
    </Button>
  )
}

export default ActionDeleteLeague
