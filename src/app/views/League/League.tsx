import React from 'react'
import { useParams } from 'react-router-dom'
import { useLeagueById } from '../../../store/slices/leagues'
import Actions from './Actions'
import Info from './Info'
import Matches from './Matches'
import Standings from './Standings'

const League: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [league] = useLeagueById(id)
  return (
    <div>
      <h1>
        {league?.name
          ? `League #${id} (${league.name})`
          : `League #${id}`
        }
      </h1>
      <Actions />
      <Info />
      <Standings />
      <Matches />
    </div>
  )
}

export default League
