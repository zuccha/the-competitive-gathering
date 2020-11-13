import React, { useMemo } from 'react'
import { IStanding } from '../../../types/Standing'
import Table, { CellInt, CellText, IColumn } from '../Table'

type IStandingsTableProps = {
  standings: IStanding[]
}

const columns: IColumn<IStanding>[] = [
  /* eslint-disable react/display-name */
  {
    id: 'username',
    label: 'Player',
    renderData: data => <CellText value={data.username} />,
    isSortable: true,
  },
  {
    id: 'points',
    label: 'Pts',
    tooltip: 'Sum of points gained with matches: win (3), draw (1), loss (0)',
    renderData: data => <CellInt value={data.points} />,
    isSortable: true,
  },
  {
    id: 'matchesPlayed',
    label: 'MP',
    tooltip: 'Total number of matches played (best-of-one or best-of-three games)',
    renderData: data => <CellInt value={data.matchesPlayed} />,
    isSortable: true,
  },
  {
    id: 'matchesWon',
    label: 'MW',
    tooltip: 'Total number of matches won (best-of-one or best-of-three games)',
    renderData: data => <CellInt value={data.matchesWon} />,
    isSortable: true,
  },
  {
    id: 'matchesLost',
    label: 'ML',
    tooltip: 'Total number of matches lost (best-of-one or best-of-three games)',
    renderData: data => <CellInt value={data.matchesLost} />,
    isSortable: true,
  },
  {
    id: 'matchesDraw',
    label: 'MD',
    tooltip: 'Total number of matches drew (best-of-one or best-of-three games)',
    renderData: data => <CellInt value={data.matchesDraw} />,
    isSortable: true,
  },
  {
    id: 'gamesPlayed',
    label: 'GP',
    tooltip: 'Total number of games played',
    renderData: data => <CellInt value={data.gamesPlayed} />,
    isSortable: true,
  },
  {
    id: 'gamesWon',
    label: 'GW',
    tooltip: 'Total number of games won',
    renderData: data => <CellInt value={data.gamesWon} />,
    isSortable: true,
  },
  {
    id: 'gamesLost',
    label: 'GL',
    tooltip: 'Total number of games lost',
    renderData: data => <CellInt value={data.gamesLost} />,
    isSortable: true,
  },
  {
    id: 'gamesDrew',
    label: 'GD',
    tooltip: 'Total number of games drew',
    renderData: data => <CellInt value={data.gamesDrew} />,
    isSortable: true,
  },
  /* eslint-enable react/display-name */
]

const StandingsTable: React.FC<IStandingsTableProps> = ({ standings }) => {
  const rows = useMemo(() => {
    return standings.map(standing => ({ data: standing }))
  }, [standings])

  return (
    <Table
      columns={columns}
      rows={rows}
      getRowId={data => data.username}
    />
  )
}

export default StandingsTable
