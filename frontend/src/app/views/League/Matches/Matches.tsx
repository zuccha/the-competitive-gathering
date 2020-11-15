import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { IStoreDispatch } from '../../../../store'
import { useLeagueById } from '../../../../store/slices/leagues'
import { registerMatchResult, useMatchesByLeague } from '../../../../store/slices/matches'
import { IMatch } from '../../../../types/Match'
import Request from '../../../../types/Request'
import MatchesTableEditable from '../../../components/MatchesTableEditable'
import RequestSwitch from '../../../components/RequestSwitch'

const Matches: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [league, leagueStatus] = useLeagueById(id)
  const [matches, matchesStatus] = useMatchesByLeague(id)

  const dispatch: IStoreDispatch = useDispatch()
  const handleRegisterMatchResult = useCallback((match: IMatch) => {
    return dispatch(registerMatchResult(match))
  }, [dispatch])

  return (
    <div>
      <h2>Matches</h2>
      <RequestSwitch
        status={Request.mergeStatuses(leagueStatus, matchesStatus)}
        renderSuccess={() => {
          return matches!.length === 0
            ? <div>There are no matches.</div>
            : (
              <MatchesTableEditable
                disabled={league!.status !== 'ONGOING'}
                matches={matches!}
                onRegisterMatchResult={handleRegisterMatchResult}
              />
            )
        }}
      />
    </div>
  )
}

export default Matches
