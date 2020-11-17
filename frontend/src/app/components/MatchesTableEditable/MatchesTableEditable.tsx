import { SerializedError } from '@reduxjs/toolkit'
import React, { useCallback, useMemo, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { selectUsername } from '../../../store/slices/auth'
import Match, { IMatch } from '../../../types/Match'
import MatchStatus from '../../../types/MatchStatus'
import doNothing from '../../../utils/doNothing'
import useIsMounted from '../../hooks/useIsMounted'
import ButtonIcon from '../ButtonIcon'
import Table, { CellInt, CellText, IColumn } from '../Table'
import RegisterResultModal from './RegisterResultModal'
import { IMatchForTable } from './types'
import toMatch from './utils/toMatch'
import toMatchForTable from './utils/toMatchForTable'

type ICustomContext = {
  disabled?: boolean
  username: string | undefined
  openConfirmResultModal: (match: IMatch) => void
}

const columns: IColumn<IMatchForTable, ICustomContext>[] = [
  /* eslint-disable react/display-name */
  {
    id: 'round',
    label: 'Round',
    renderData: data => <CellInt value={data.round} width='64px' />,
    isSortable: true,
  },
  {
    id: 'player1',
    label: 'Player 1',
    renderData: data => data.player1
      ? <CellText value={data.player1} width='96px' />
      : <CellText value='unknown' width='96px' className='italic' />,
    isSortable: true,
  },
  {
    id: 'player2',
    label: 'Player 2',
    renderData: data => data.player2
      ? <CellText value={data.player2} width='96px' />
      : <CellText value='unknown' width='96px' className='italic' />,
    isSortable: true,
  },
  {
    id: 'status',
    label: 'Status',
    tooltip: 'Status of the game: "ongoing" means the match has yet to be played, "done" means the match has already been played',
    renderData: data => <CellText value={MatchStatus.toString(data.status)} className='capitalize' width="100px" />,
    isSortable: true,
  },
  {
    id: 'gamesWonByPlayer1',
    label: 'P1 wins',
    tooltip: 'Games won by player 1',
    renderData: data => <CellInt value={data.gamesWonByPlayer1} />,
  },
  {
    id: 'gamesWonByPlayer2',
    label: 'P2 wins',
    tooltip: 'Games won by player 2',
    renderData: data => <CellInt value={data.gamesWonByPlayer2} />,
  },
  {
    id: 'gamesDrew',
    label: 'Draws',
    tooltip: 'Games drew by player 1 and 2',
    renderData: data => <CellInt value={data.gamesDrew} />,
  },
  {
    id: 'actions',
    label: '',
    renderData: (data, context) => {
      const match = toMatch(data)
      const handleClick = () => context.custom?.openConfirmResultModal(match)
      const disabled = context.custom?.disabled
        || !context.custom?.username
        || !Match.canEdit(match, context.custom.username)
      return <ButtonIcon onClick={handleClick} disabled={disabled}><BiEdit /></ButtonIcon>
    },
  },
  /* eslint-enable react/display-name */
]

type IMatchesTableEditableProps = {
  matches: IMatch[]
  disabled?: boolean
  onRegisterMatchResult: (match: IMatch) => Promise<{ error?: SerializedError, payload: unknown }>
}

const MatchesTableEditable: React.FC<IMatchesTableEditableProps> = ({
  matches,
  disabled,
  onRegisterMatchResult,
}) => {
  const isMounted = useIsMounted()

  const username = useSelector(selectUsername)
  const [confirmResultData, setConfirmResultData] = useState<IMatch | undefined>(undefined)

  const rows = useMemo(() => {
    return matches.map(match => ({ data: toMatchForTable(match) }))
  }, [matches])

  const openConfirmResultModal = useCallback((match: IMatch) => {
    if (isMounted) {
      setConfirmResultData(match)
    }
  }, [])

  const closeConfirmResultModal = useCallback(() => {
    if (isMounted) {
      setConfirmResultData(undefined)
    }
  }, [])

  const customContext = useMemo(() => ({
    disabled,
    username,
    openConfirmResultModal,
  }), [disabled, username, openConfirmResultModal])

  return (
    <>
      <Table
        columns={columns}
        rows={rows}
        customContext={customContext}
        getRowId={data => data.id}
      />
      {confirmResultData && (
        <RegisterResultModal
          match={confirmResultData}
          onCancel={closeConfirmResultModal}
          onRegisterResult={onRegisterMatchResult}
          onRegisterResultSuccess={closeConfirmResultModal}
          onRegisterResultFailure={doNothing}
        />
      )}
    </>
  )
}

export default MatchesTableEditable
