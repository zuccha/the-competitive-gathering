import React from 'react'
import { useStandings } from '../../../../store/slices/standings'
import RequestSwitch from '../../../components/RequestSwitch'
import StandingsTable from '../../../components/StandingsTable'

const Standings: React.FC = () => {
  const [standings, standingsStatus] = useStandings()

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
