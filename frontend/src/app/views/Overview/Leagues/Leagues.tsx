import React from 'react'
import { useSelector } from 'react-redux'
import { selectLeagues, fetchLeagues } from '../../../../store/slices/leagues'
import LeaguesTable from '../../../components/LeaguesTable'
import RequestSwitch from '../../../components/RequestSwitch'
import usePrefetch from '../../../hooks/usePrefetch'

const Leagues: React.FC = () => {
  const leagues = useSelector(selectLeagues)
  usePrefetch(leagues.status, fetchLeagues)

  return (
    <div>
      <h2>Leagues</h2>
      <RequestSwitch
        status={leagues.status}
        renderSuccess={() => {
          return leagues.data!.length === 0
            ? <div>There are no leagues.</div>
            : <LeaguesTable leagues={leagues.data!} />
        }}
      />
    </div>
  )
}

export default Leagues
