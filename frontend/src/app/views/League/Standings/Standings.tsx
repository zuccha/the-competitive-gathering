import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectGetLeagueStandings, fetchStandingsByLeague } from '../../../../store/slices/leaguesStandings'
import RequestSwitch from '../../../components/RequestSwitch'
import usePrefetch from '../../../hooks/usePrefetch'
import StandingsTable from '../../../components/StandingsTable'

const Standings: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const fetchStandings = useCallback(() => fetchStandingsByLeague(id), [id])

  const leagueStandings = useSelector(selectGetLeagueStandings)(id)
  usePrefetch(leagueStandings.status, fetchStandings)

  return (
    <div>
      <h2>Standings</h2>
      <RequestSwitch
        status={leagueStandings.status}
        renderSuccess={() => {
          return leagueStandings.data!.length === 0
            ? <div>There are no players in the league.</div>
            : <StandingsTable standings={leagueStandings.data!} />
        }}
      />
    </div>
  )
}

export default Standings
