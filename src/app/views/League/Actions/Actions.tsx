import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectUsername } from '../../../../store/slices/auth'
import { useLeagueById } from '../../../../store/slices/leagues'
import { useMatchesByLeague } from '../../../../store/slices/matches'
import Request from '../../../../types/Request'
import RequestSwitch from '../../../components/RequestSwitch'
import ActionCancelLeague from './ActionCancelLeague'
import ActionDeleteLeague from './ActionDeleteLeague'
import ActionEnrollLeague from './ActionEnrollLeague'
import ActionFinishLeague from './ActionFinishLeague'
import ActionLeaveLeague from './ActionLeaveLeague'
import styles from './Actions.module.css'
import ActionStartLeague from './ActionStartLeague'

const Actions: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [league, leagueStatus] = useLeagueById(id)
  const [matches, matchesStatus] = useMatchesByLeague(id)
  const username = useSelector(selectUsername)

  if (username === undefined) {
    return null
  }

  return (
    <RequestSwitch
      status={Request.mergeStatuses(leagueStatus, matchesStatus)}
      renderSuccess={() => (
        <div className={styles['actions']}>
          <ActionEnrollLeague username={username} league={league!} />
          <ActionLeaveLeague username={username} league={league!} />
          <ActionStartLeague username={username} league={league!} />
          <ActionFinishLeague username={username} league={league!} matches={matches!} />
          <ActionDeleteLeague username={username} league={league!} />
          <ActionCancelLeague username={username} league={league!} />
        </div>
      )}
    />
  )
}

export default Actions
