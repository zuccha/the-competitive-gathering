import React from 'react'
import { useSelector } from 'react-redux'
import { selectOverallStandings, fetchOverallStandings } from '../../../../store/slices/overallStandings'
import RequestSwitch from '../../../components/RequestSwitch'
import StandingsTable from '../../../components/StandingsTable'
import usePrefetch from '../../../hooks/usePrefetch'

const Standings: React.FC = () => {
  const overallStandings = useSelector(selectOverallStandings)
  usePrefetch(overallStandings.status, fetchOverallStandings)

  return (
    <div>
      <h2>{'Players\' Standings'}</h2>
      <RequestSwitch
        status={overallStandings.status}
        renderSuccess={() => {
          return overallStandings.data!.length === 0
            ? <div>There are no players.</div>
            : <StandingsTable standings={overallStandings.data!} />
        }}
      />
    </div>
  )
}

export default Standings
