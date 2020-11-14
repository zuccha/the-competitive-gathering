import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  fetchStandingsByLeague,
  selectStandingsByLeague,
  selectStandingsStatusByLeague,
} from '../../../../store/slices/standings'
import RequestSwitch from '../../../components/RequestSwitch'
import StandingsTable from '../../../components/StandingsTable'
import usePrefetch from '../../../hooks/usePrefetch'

const Standings: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const fetchStandings = useCallback(() => fetchStandingsByLeague(id), [id])

  const selectStandings = useCallback(selectStandingsByLeague(id), [id])
  const selectStandingsStatus = useCallback(selectStandingsStatusByLeague(id), [id])
  const standings = useSelector(selectStandings)
  const standingsStatus = useSelector(selectStandingsStatus)
  usePrefetch(standingsStatus, fetchStandings)

  return (
    <div>
      <h2>Standings</h2>
      <RequestSwitch
        status={standingsStatus}
        renderSuccess={() => {
          return standings!.length === 0
            ? <div>There are no players in the league.</div>
            : <StandingsTable standings={standings!} />
        }}
      />
    </div>
  )
}

export default Standings
