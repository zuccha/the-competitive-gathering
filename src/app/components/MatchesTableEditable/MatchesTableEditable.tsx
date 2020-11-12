import React, { useMemo, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { selectUsername } from '../../../store/slices/auth'
import Match, { IMatch } from '../../../types/Match'
import IconButton from '../IconButton'
import Table, { CellInt, CellText, IColumn } from '../Table'
import RegisterResultModal from './RegisterResultModal'
import { IMatchForTable } from './types'
import toMatch from './utils/toMatch'
import toMatchForTable from './utils/toMatchForTable'

type IMatchesTableEditableProps = {
  matches: IMatch[]
}

type ICustomContext = {
  username: string | undefined
  openConfirmResultModal: (match: IMatch) => void
}

const columns: IColumn<IMatchForTable, ICustomContext>[] = [
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
      const match = toMatch(data)
      const handleClick = () => context.custom?.openConfirmResultModal(match)
      const disabled = !context.custom?.username || !Match.canEdit(match, context.custom.username)
      return <IconButton onClick={handleClick} disabled={disabled}><BiEdit /></IconButton>
    },
  },
  /* eslint-enable react/display-name */
]

const MatchesTableEditable: React.FC<IMatchesTableEditableProps> = ({ matches }) => {
  const username = useSelector(selectUsername)
  const [confirmResultData, setConfirmResultData] = useState<IMatch | undefined>(undefined)

  const rows = useMemo(() => {
    return matches.map(match => ({ data: toMatchForTable(match) }))
  }, [matches])

  const customContext = useMemo(() => ({
    username,
    openConfirmResultModal: setConfirmResultData,
  }), [username])

  return (
    <>
      <Table
        columns={columns}
        rows={rows}
        defaultSortingOrder='descending'
        customContext={customContext}
        getRowId={data => data.id}
      />
      {confirmResultData && (
        <RegisterResultModal
          match={confirmResultData}
          onCancel={() => setConfirmResultData(undefined)}
          onRegister={() => setConfirmResultData(undefined)}
        />
      )}
    </>
  )
}

export default MatchesTableEditable
