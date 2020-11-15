import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchLeagueById, selectLeagueById, selectLeagueStatusById } from '../../../../store/slices/leagues'
import RequestSwitch from '../../../components/RequestSwitch'
import usePrefetch from '../../../hooks/usePrefetch'
import InfoTable from './InfoTable'

const Info: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const fetchLeague = useCallback(() => fetchLeagueById(id), [id])

  const selectLeague = useCallback(selectLeagueById(id), [id])
  const selectLeagueStatus = useCallback(selectLeagueStatusById(id), [id])
  const league = useSelector(selectLeague)
  const leagueStatus = useSelector(selectLeagueStatus)
  usePrefetch(leagueStatus, fetchLeague)

  return (
    <div>
      <h2>Info</h2>
      <RequestSwitch
        status={leagueStatus}
        renderSuccess={() => <InfoTable league={league!} />}
      />
    </div>
  )
}

export default Info
