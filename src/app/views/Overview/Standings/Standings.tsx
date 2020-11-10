import React from 'react'
import { useSelector } from 'react-redux'
import { selectStandingsOverall, fetchStandingsOverall } from '../../../../store/slices/standingsOverall'
import RequestSwitch from '../../../components/RequestSwitch'
import StandingsTable from '../../../components/StandingsTable'
import usePrefetch from '../../../hooks/usePrefetch'

const Standings: React.FC = () => {
  const standingsOverall = useSelector(selectStandingsOverall)
  usePrefetch(standingsOverall.status, fetchStandingsOverall)

  return (
    <div>
      <h2>{'Players\' Standings'}</h2>
      <RequestSwitch
        status={standingsOverall.status}
        renderSuccess={() => <StandingsTable standings={standingsOverall.data!} />}
      />
    </div>
  )
}

export default Standings
