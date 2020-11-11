import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectGetLeagueMatches, fetchMatchesByLeague } from '../../../../store/slices/leaguesMatches'
import RequestSwitch from '../../../components/RequestSwitch'
import usePrefetch from '../../../hooks/usePrefetch'
import MatchesTable from './MatchesTable'

const Standings: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const fetchMatches = useCallback(() => fetchMatchesByLeague(id), [id])

  const leagueMatches = useSelector(selectGetLeagueMatches)(id)
  usePrefetch(leagueMatches.status, fetchMatches)

  return (
    <div>
      <h2>Matches</h2>
      <RequestSwitch
        status={leagueMatches.status}
        renderSuccess={() => {
          return leagueMatches.data!.length === 0
            ? <div>There are no matches.</div>
            : <MatchesTable matches={leagueMatches.data!} />
        }}
      />
    </div>
  )
}

export default Standings
