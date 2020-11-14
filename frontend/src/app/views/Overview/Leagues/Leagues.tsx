import React from 'react'
import { useSelector } from 'react-redux'
import { selectLeagues, selectLeaguesStatus } from '../../../../store/slices/leagues'
import fetchLeagues from '../../../../store/slices/leagues/thunks/fetchLeagues'
import LeaguesTable from '../../../components/LeaguesTable'
import RequestSwitch from '../../../components/RequestSwitch'
import usePrefetch from '../../../hooks/usePrefetch'

const Leagues: React.FC = () => {
  const leagues = useSelector(selectLeagues)
  const leaguesStatus = useSelector(selectLeaguesStatus)
  usePrefetch(leaguesStatus, fetchLeagues)

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
