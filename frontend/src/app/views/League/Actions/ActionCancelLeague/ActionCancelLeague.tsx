import React, { useCallback } from 'react'
import { ILeague } from '../../../../../types/League'
import Button from '../../../../components/Button'

type IActionCancelLeagueProps = {
  league: ILeague
  username: string
}

const ActionCancelLeague: React.FC<IActionCancelLeagueProps> = ({
  league,
  username,
}) => {
  const cancelLeague = useCallback(() => {
    // TODO.
  }, [])

  if (league.creator !== username) {
    return null
  }

  if (league.status !== 'ONGOING') {
    return null
  }

  return (
    <Button onClick={cancelLeague}>
      Cancel
    </Button>
  )
}

export default ActionCancelLeague
