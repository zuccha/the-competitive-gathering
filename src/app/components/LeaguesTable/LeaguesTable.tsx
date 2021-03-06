import React, { useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { ILeague } from '../../../types/League'
import LeagueFormat from '../../../types/LeagueFormat'
import LeagueStatus from '../../../types/LeagueStatus'
import Table, { CellInt, CellText, IColumn } from '../Table'

type ILeaguesTableProps = {
  leagues: ILeague[]
}

const columns: IColumn<ILeague>[] = [
  /* eslint-disable react/display-name */
  {
    id: 'id',
    label: 'Id',
    renderData: data => <CellInt value={parseInt(data.id)} width='56px' />,
    isSortable: true,
    sort: (rowLeft, rowRight) => {
      const idStrLeft = parseInt(rowLeft.data.id)
      const idStrRight = parseInt(rowRight.data.id)
      if (idStrLeft < idStrRight) return -1
      if (idStrLeft > idStrRight) return 1
      return 0
    },
  },
  {
    id: 'name',
    label: 'Name',
    renderData: data => <CellText value={data.name} width='200px' />,
    isSortable: true,
  },
  {
    id: 'format',
    label: 'Format',
    renderData: data => <CellText value={LeagueFormat.toString(data.format)} className='capitalize' />,
    isSortable: true,
  },
  {
    id: 'status',
    label: 'Status',
    renderData: data => <CellText value={LeagueStatus.toString(data.status)} className='capitalize' />,
    isSortable: true,
  },
  {
    id: 'playersMin',
    label: 'Min',
    tooltip: 'Minimum number of players needed to start the league',
    renderData: data => <CellInt value={data.playersMin} />,
    isSortable: true,
  },
  {
    id: 'playersMax',
    label: 'Max',
    tooltip: 'Maximum number of players accepted in the league (nothing means no maximum)',
    renderData: data => <CellInt value={data.playersMax} placeholder='-' />,
    isSortable: true,
  },
  /* eslint-enable react/display-name */
]

const LeaguesTable: React.FC<ILeaguesTableProps> = ({ leagues }) => {
  const history = useHistory()

  const rows = useMemo(() => {
    return leagues.map(league => ({ data: league }))
  }, [leagues])

  const handleClickRow = useCallback((league: ILeague) => {
    history.push(`/leagues/${league.id}`)
  }, [history])

  return (
    <Table
      columns={columns}
      rows={rows}
      defaultSortingOrder='descending'
      highlightHoveredRow
      getRowId={data => data.id}
      onClickRow={handleClickRow}
    />
  )
}

export default LeaguesTable
