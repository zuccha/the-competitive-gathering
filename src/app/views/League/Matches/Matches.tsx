import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { IStoreDispatch } from '../../../../store'
import { selectGetLeagueMatches, fetchMatchesByLeague, registerMatchResult } from '../../../../store/slices/leaguesMatches'
import { IMatch } from '../../../../types/Match'
import MatchesTableEditable from '../../../components/MatchesTableEditable'
import RequestSwitch from '../../../components/RequestSwitch'
import usePrefetch from '../../../hooks/usePrefetch'

const Standings: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const fetchMatches = useCallback(() => fetchMatchesByLeague(id), [id])

  const leagueMatches = useSelector(selectGetLeagueMatches)(id)
  usePrefetch(leagueMatches.status, fetchMatches)

  const dispatch: IStoreDispatch = useDispatch()
  const handleRegisterMatchResult = useCallback((match: IMatch) => {
    return dispatch(registerMatchResult({ leagueId: id, match }))
  }, [dispatch])

  return (
    <div>
      <h2>Matches</h2>
      <RequestSwitch
        status={leagueMatches.status}
        renderSuccess={() => {
          return leagueMatches.data!.length === 0
            ? <div>There are no matches.</div>
            : (
              <MatchesTableEditable
                matches={leagueMatches.data!}
                onRegisterMatchResult={handleRegisterMatchResult}
              />
            )
        }}
      />
    </div>
  )
}

export default Standings
