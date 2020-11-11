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
    renderData: data => <CellInt value={data.points} />,
    isSortable: true,
  },
  {
    id: 'matchesPlayed',
    label: 'MP',
    renderData: data => <CellInt value={data.matchesPlayed} />,
    isSortable: true,
  },
  {
    id: 'matchesWon',
    label: 'MW',
    renderData: data => <CellInt value={data.matchesWon} />,
    isSortable: true,
  },
  {
    id: 'matchesLost',
    label: 'ML',
    renderData: data => <CellInt value={data.matchesLost} />,
    isSortable: true,
  },
  {
    id: 'matchesDraw',
    label: 'MD',
    renderData: data => <CellInt value={data.matchesDraw} />,
    isSortable: true,
  },
  {
    id: 'gamesPlayed',
    label: 'GP',
    renderData: data => <CellInt value={data.gamesPlayed} />,
    isSortable: true,
  },
  {
    id: 'gamesWon',
    label: 'GW',
    renderData: data => <CellInt value={data.gamesWon} />,
    isSortable: true,
  },
  {
    id: 'gamesLost',
    label: 'GL',
    renderData: data => <CellInt value={data.gamesLost} />,
    isSortable: true,
  },
  {
    id: 'gamesDraw',
    label: 'GD',
    renderData: data => <CellInt value={data.gamesDraw} />,
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
