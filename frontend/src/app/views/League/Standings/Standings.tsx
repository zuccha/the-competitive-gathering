import React from 'react'
import { useParams } from 'react-router-dom'
import { useStandingsByLeague } from '../../../../store/slices/standings'
import RequestSwitch from '../../../components/RequestSwitch'
import StandingsTable from '../../../components/StandingsTable'

const Standings: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [standings, standingsStatus] = useStandingsByLeague(id)

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
