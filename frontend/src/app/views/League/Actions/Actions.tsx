import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectUsername } from '../../../../store/slices/auth'
import { useLeagueById } from '../../../../store/slices/leagues'
import RequestSwitch from '../../../components/RequestSwitch'
import ActionCancelLeague from './ActionCancelLeague'
import ActionDeleteLeague from './ActionDeleteLeague'
import ActionEnroll from './ActionEnroll'
import styles from './Actions.module.css'
import ActionStartLeague from './ActionStartLeague'

const Actions: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [league, leagueStatus] = useLeagueById(id)
  const username = useSelector(selectUsername)

  if (username === undefined) {
    return null
  }

  return (
    <RequestSwitch
      status={leagueStatus}
      renderSuccess={() => (
        <div className={styles['actions']}>
          <ActionEnroll league={league!} username={username} />
          <ActionStartLeague league={league!} username={username} />
          <ActionDeleteLeague league={league!} username={username} />
          <ActionCancelLeague league={league!} username={username} />
        </div>
      )}
    />
  )
}

export default Actions
