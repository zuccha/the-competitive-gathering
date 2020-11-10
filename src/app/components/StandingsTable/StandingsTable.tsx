import React, { useCallback, useMemo, useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { IStanding } from '../../../types/Standing'
import when from '../../../utils/when'
import styles from './StandingsTable.module.css'

type IOrder = 'ascending' | 'descending'

interface IStandingsTableProps {
  standings: IStanding[]
}

const StandingsTable: React.FC<IStandingsTableProps> = ({ standings }) => {
  const [sortingBy, setSortingBy] = useState<{ property: keyof IStanding, order: IOrder }>({
    property: 'username',
    order: 'ascending',
  })

  const sortedStandings = useMemo(() => {
    return standings.slice().sort((standing1, standing2) => {
      const standingLeft = sortingBy.order === 'ascending' ? standing1 : standing2
      const standingRight = sortingBy.order === 'ascending' ? standing2 : standing1
      return when([
        [standingLeft[sortingBy.property] < standingRight[sortingBy.property], () => -1],
        [standingLeft[sortingBy.property] > standingRight[sortingBy.property], () => 1],
      ], () => 0)
    })
  }, [sortingBy, standings])

  const renderTh = useCallback((property: keyof IStanding, label: string) => {
    if (sortingBy.property !== property) {
      const handleSort = () => setSortingBy({ property, order: 'ascending' })
      return <th onClick={handleSort}>{label}</th>
    }
    if (sortingBy.order === 'ascending') {
      const handleSort = () => setSortingBy({ property, order: 'descending' })
      return <th onClick={handleSort}>{label} <MdKeyboardArrowUp /></th>
    }
    const handleSort = () => setSortingBy({ property, order: 'ascending' })
    return <th onClick={handleSort}>{label} <MdKeyboardArrowDown /></th>
  }, [sortingBy])

  return (
    <table className={styles['standings-table']}>
      <tr>
        {renderTh('username', 'Player')}
        {renderTh('points', 'Pts')}
        {renderTh('matchesPlayed', 'MP')}
        {renderTh('matchesWon', 'MW')}
        {renderTh('matchesLost', 'ML')}
        {renderTh('matchesDraw', 'MD')}
        {renderTh('gamesPlayed', 'GP')}
        {renderTh('gamesWon', 'GW')}
        {renderTh('gamesLost', 'GL')}
        {renderTh('gamesDraw', 'GD')}
      </tr>
      {sortedStandings.map(standing => (
        <tr key={standing.username}>
          <td className={styles['standings-table-cell-text']}>{standing.username}</td>
          <td className={styles['standings-table-cell-number']}>{standing.points}</td>
          <td className={styles['standings-table-cell-number']}>{standing.matchesPlayed}</td>
          <td className={styles['standings-table-cell-number']}>{standing.matchesWon}</td>
          <td className={styles['standings-table-cell-number']}>{standing.matchesLost}</td>
          <td className={styles['standings-table-cell-number']}>{standing.matchesDraw}</td>
          <td className={styles['standings-table-cell-number']}>{standing.gamesPlayed}</td>
          <td className={styles['standings-table-cell-number']}>{standing.gamesWon}</td>
          <td className={styles['standings-table-cell-number']}>{standing.gamesLost}</td>
          <td className={styles['standings-table-cell-number']}>{standing.gamesDraw}</td>
        </tr>
      ))}
    </table>
  )
}

export default StandingsTable
