import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { selectUsername } from '../../../../../../store/slices/auth'
import { IMatch } from '../../../../../../types/Match'
import styles from '../MatchesTable.module.css'

type IMatchProps = {
  match: IMatch
}

const isIntegerOrEmpty = (str: string): boolean => {
  return /^\d*$/.test(str)
}

const Match: React.FC<IMatchProps> = ({ match }) => {
  const username = useSelector(selectUsername)
  const [gamesWonByUsername1, setGamesWonByUsername1] = useState('')
  const [gamesWonByUsername2, setGamesWonByUsername2] = useState('')
  const [gamesDraw, setGamesDraw] = useState('')

  const handleChangeGamesWonByUsername1 = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (isIntegerOrEmpty(event.target.value)) {
      setGamesWonByUsername1(event.target.value)
    }
  }, [])

  const handleChangeGamesWonByUsername2 = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (isIntegerOrEmpty(event.target.value)) {
      setGamesWonByUsername2(event.target.value)
    }
  }, [])

  const handleChangeGamesDraw = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (isIntegerOrEmpty(event.target.value)) {
      setGamesDraw(event.target.value)
    }
  }, [])

  if (match.results) {
    return (
      <tr>
        <td className={styles['matches-table-cell-text']}>{match.username1}</td>
        <td className={styles['matches-table-cell-text']}>{match.username2}</td>
        <td className={styles['matches-table-cell-number']}>{match.results.gamesWonByUsername1}</td>
        <td className={styles['matches-table-cell-number']}>{match.results.gamesWonByUsername2}</td>
        <td className={styles['matches-table-cell-number']}>{match.results.gamesDraw}</td>
        <td>Done</td>
      </tr>
    )
  }

  if (username !== match.username1 && username !== match.username2) {
    return (
      <tr>
        <td className={styles['matches-table-cell-text']}>{match.username1}</td>
        <td className={styles['matches-table-cell-text']}>{match.username2}</td>
        <td className={styles['matches-table-cell-number']}></td>
        <td className={styles['matches-table-cell-number']}></td>
        <td className={styles['matches-table-cell-number']}></td>
        <td>Pending</td>
      </tr>
    )
  }

  const disabled = gamesWonByUsername1 === '' || gamesWonByUsername2 === '' || gamesDraw === ''

  return (
    <tr>
      <td className={styles['matches-table-cell-text']}>{match.username1}</td>
      <td className={styles['matches-table-cell-text']}>{match.username2}</td>
      <td className={styles['matches-table-cell-number']}>
        <input type='text' value={gamesWonByUsername1} onChange={handleChangeGamesWonByUsername1} />
      </td>
      <td className={styles['matches-table-cell-number']}>
        <input type='text' value={gamesWonByUsername2} onChange={handleChangeGamesWonByUsername2} />
      </td>
      <td className={styles['matches-table-cell-number']}>
        <input type='text' value={gamesDraw} onChange={handleChangeGamesDraw} />
      </td>
      <td><button disabled={disabled}>Save</button></td>
    </tr>
  )
}

export default Match
