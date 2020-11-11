import React from 'react'
import { IMatch } from '../../../../../types/Match'
import Match from './Match'
import styles from './MatchesTable.module.css'

type IMatchesTableProps = {
  matches: IMatch[]
}

const MatchesTable: React.FC<IMatchesTableProps> = ({ matches }) => {
  return (
    <table className={styles['matches-table']}>
      <thead>
        <tr>
          <th>Player 1</th>
          <th>Player 2</th>
          <th>P1 wins</th>
          <th>P2 wins</th>
          <th>Draws</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {matches.map(match => <Match key={match.id} match={match} />)}
      </tbody>
    </table>
  )
}

export default MatchesTable
