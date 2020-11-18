import React from 'react'
import { useLeagues } from '../../../../store/slices/leagues'
import LeaguesTable from '../../../components/LeaguesTable'
import RequestSwitch from '../../../components/RequestSwitch'

const Leagues: React.FC = () => {
  const [leagues, leaguesStatus] = useLeagues()

  return (
    <div>
      <h2>Leagues</h2>
      <RequestSwitch
        status={leaguesStatus}
        renderSuccess={() => {
          return leagues!.length === 0
            ? <div>There are no leagues.</div>
            : <LeaguesTable leagues={leagues!} />
        }}
      />
    </div>
  )
}

export default Leagues
