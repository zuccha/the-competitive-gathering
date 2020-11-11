import React, { useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { ILeague } from '../../../types/League'
import Table, { CellText, IColumn } from '../Table'

type ILeaguesTableProps = {
  leagues: ILeague[]
}

const columns: IColumn<ILeague>[] = [
  /* eslint-disable react/display-name */
  {
    id: 'id',
    label: 'Id',
    renderData: data => <CellText value={data.id} />,
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
    renderData: data => <CellText value={data.dateStart} />,
    isSortable: true,
  },
  {
    id: 'dateEnd',
    label: 'End',
    renderData: data => <CellText value={data.dateEnd || ''} />,
    isSortable: true,
  },
  /* eslint-enable react/display-name */
]

const LeaguesTable: React.FC<ILeaguesTableProps> = ({ leagues }) => {
  const history = useHistory()

  const rows = useMemo(() => {
    return leagues.map(league => ({ data: league }))
  }, [history, leagues])

  const handleClickRow = useCallback((league: ILeague) => {
    history.push(`/leagues/${league.id}`)
  }, [])

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
