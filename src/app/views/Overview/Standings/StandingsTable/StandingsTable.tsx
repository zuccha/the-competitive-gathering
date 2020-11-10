import React, { useMemo } from 'react'
import { IStanding } from '../../../../../types/Standing'
import SortableTable, { IHeader } from '../../../../components/SortableTable'

type IStandingsTableProps = {
  standings: IStanding[]
}

const headers: IHeader<IStanding>[] = [
  { property: 'username', label: 'Player' },
  { property: 'points', label: 'Pts' },
  { property: 'matchesPlayed', label: 'MP' },
  { property: 'matchesWon', label: 'MW' },
  { property: 'matchesLost', label: 'ML' },
  { property: 'matchesDraw', label: 'MD' },
  { property: 'gamesPlayed', label: 'GP' },
  { property: 'gamesWon', label: 'GW' },
  { property: 'gamesLost', label: 'GL' },
  { property: 'gamesDraw', label: 'GD' },
]

const StandingsTable: React.FC<IStandingsTableProps> = ({ standings }) => {
  const items = useMemo(() => {
    return standings.map(standing => ({ data: standing }))
  }, [standings])

  return (
    <SortableTable
      headers={headers}
      items={items}
      defaultProperty='username'
    />
  )
}

export default StandingsTable
