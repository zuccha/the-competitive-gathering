import React, { useMemo } from 'react'
import { ILeague } from '../../../types/League'
import SortableTable, { IHeader } from '../SortableTable'

type ILeaguesTableProps = {
  leagues: ILeague[]
}

const headers: IHeader<ILeague>[] = [
  { property: 'id', label: 'Id' },
  { property: 'format', label: 'Format' },
  { property: 'dateStart', label: 'Start' },
  { property: 'dateEnd', label: 'End' },
]

const LeaguesTable: React.FC<ILeaguesTableProps> = ({ leagues }) => {
  const items = useMemo(() => {
    return leagues.map(league => ({ data: league }))
  }, [leagues])

  return (
    <SortableTable
      defaultOrder='descending'
      defaultProperty='id'
      headers={headers}
      items={items}
    />
  )
}

export default LeaguesTable
