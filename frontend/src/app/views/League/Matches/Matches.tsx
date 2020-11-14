import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { IStoreDispatch } from '../../../../store'
import {
  fetchMatchesByLeague,
  registerMatchResult,
  selectMatchesByLeague,
  selectMatchesStatusByLeague,
} from '../../../../store/slices/matches'
import { IMatch } from '../../../../types/Match'
import MatchesTableEditable from '../../../components/MatchesTableEditable'
import RequestSwitch from '../../../components/RequestSwitch'
import usePrefetch from '../../../hooks/usePrefetch'

const Matches: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const fetchMatches = useCallback(() => fetchMatchesByLeague(id), [id])

  const selectMatches = useCallback(selectMatchesByLeague(id), [id])
  const selectMatchesStatus = useCallback(selectMatchesStatusByLeague(id), [id])
  const matches = useSelector(selectMatches)
  const matchesStatus = useSelector(selectMatchesStatus)
  usePrefetch(matchesStatus, fetchMatches)

  const dispatch: IStoreDispatch = useDispatch()
  const handleRegisterMatchResult = useCallback((match: IMatch) => {
    return dispatch(registerMatchResult({ leagueId: id, match }))
  }, [dispatch])

  return (
    <div>
      <h2>Matches</h2>
      <RequestSwitch
        status={matchesStatus}
        renderSuccess={() => {
          return matches!.length === 0
            ? <div>There are no matches.</div>
            : (
              <MatchesTableEditable
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
