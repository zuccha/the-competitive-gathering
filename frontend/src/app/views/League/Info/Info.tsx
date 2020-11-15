import React from 'react'
import { useParams } from 'react-router-dom'
import { useLeagueById } from '../../../../store/slices/leagues'
import RequestSwitch from '../../../components/RequestSwitch'
import InfoTable from './InfoTable'

const Info: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [league, leagueStatus] = useLeagueById(id)

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
