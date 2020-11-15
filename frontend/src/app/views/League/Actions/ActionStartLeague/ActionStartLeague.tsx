import React, { useCallback } from 'react'
import { ILeague } from '../../../../../types/League'
import Button from '../../../../components/Button'

type IActionStartLeagueProps = {
  league: ILeague
  username: string
}

const ActionStartLeague: React.FC<IActionStartLeagueProps> = ({
  league,
  username,
}) => {
  const startLeague = useCallback(() => {
    // TODO.
  }, [])

  if (league.creator !== username) {
    return null
  }

  if (league.status !== 'PENDING') {
    return null
  }

  return (
    <Button onClick={startLeague}>
      Start
    </Button>
  )
}

export default ActionStartLeague
