import React, { useMemo } from 'react'
import { BiEdit } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { selectUsername } from '../../../store/slices/auth'
import Match, { IMatch } from '../../../types/Match'
import IconButton from '../IconButton'
import Table, { CellInt, CellText, IColumn } from '../Table'
import { IMatchForTable } from './types'
import toMatch from './utils/toMatch'
import toMatchForTable from './utils/toMatchForTable'

type IMatchesTableProps = {
  matches: IMatch[]
}

const columns: IColumn<IMatchForTable, { username: string | undefined }>[] = [
  /* eslint-disable react/display-name */
  {
    id: 'id',
    label: 'Id',
    renderData: data => <CellText value={data.id} width='64px' />,
    isSortable: true,
  },
  {
    id: 'username1',
    label: 'Player 1',
    renderData: data => <CellText value={data.username1} width='96px' />,
    isSortable: true,
  },
  {
    id: 'username2',
    label: 'Player 2',
    renderData: data => <CellText value={data.username2} width='96px' />,
    isSortable: true,
  },
  {
    id: 'gamesWonByUsername1',
    label: 'P1 wins',
    renderData: data => <CellInt value={data.gamesWonByUsername1} />,
  },
  {
    id: 'gamesWonByUsername2',
    label: 'P2 wins',
    renderData: data => <CellInt value={data.gamesWonByUsername2} />,
  },
  {
    id: 'gamesDraw',
    label: 'Draws',
    renderData: data => <CellInt value={data.gamesDraw} />,
  },
  {
    id: 'actions',
    label: '',
    renderData: (data, context) => {
      const handleClick = () => {/* do nothing */}
      const disabled = !context.custom?.username || !Match.canEdit(toMatch(data), context.custom.username)
      return <IconButton onClick={handleClick} disabled={disabled}><BiEdit /></IconButton>
    },
  },
  /* eslint-enable react/display-name */
]

const MatchesTable: React.FC<IMatchesTableProps> = ({ matches }) => {
  const username = useSelector(selectUsername)

  const rows = useMemo(() => {
    return matches.map(match => ({ data: toMatchForTable(match) }))
  }, [matches])

  const customContext = useMemo(() => ({
    username,
  }), [username])

  return (
    <Table
      columns={columns}
      rows={rows}
      defaultSortingOrder='descending'
      customContext={customContext}
      getRowId={data => data.id}
    />
  )
}

export default MatchesTable
