import React, { useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { ILeague } from '../../../types/League'
import Table, { CellInt, CellText, IColumn } from '../Table'

type ILeaguesTableProps = {
  leagues: ILeague[]
}

const columns: IColumn<ILeague>[] = [
  /* eslint-disable react/display-name */
  {
    id: 'id',
    label: 'Id',
    renderData: data => <CellText value={data.id} width='56px' />,
    isSortable: true,
  },
  {
    id: 'format',
    label: 'Format',
    renderData: data => <CellText value={data.format} />,
    isSortable: true,
  },
  {
    id: 'dateStart',
    label: 'Start',
    tooltip: 'Date marking the start of the league; the league starts when the minimum number of players is reached and its creator approves it',
    renderData: data => <CellText value={data.dateStart} />,
    isSortable: true,
  },
  {
    id: 'dateEnd',
    label: 'End',
    tooltip: 'Date marking the end of the league; the league ends once all matches have been played',
    renderData: data => <CellText value={data.dateEnd} />,
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
