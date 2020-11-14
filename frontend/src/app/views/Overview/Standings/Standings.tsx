import React from 'react'
import { useSelector } from 'react-redux'
import { fetchStandings, selectStandings, selectStandingsStatus } from '../../../../store/slices/standings'
import RequestSwitch from '../../../components/RequestSwitch'
import StandingsTable from '../../../components/StandingsTable'
import usePrefetch from '../../../hooks/usePrefetch'

const Standings: React.FC = () => {
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
            ? <div>There are no players.</div>
            : <StandingsTable standings={standings!} />
        }}
      />
    </div>
  )
}

export default Standings
