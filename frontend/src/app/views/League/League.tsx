import React from 'react'
import { useParams } from 'react-router-dom'
import Info from './Info'
import Matches from './Matches'
import Standings from './Standings'

const League: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  return (
    <div>
      <h1>{`League #${id}`}</h1>
      <Info />
      <Standings />
      <Matches />
    </div>
  )
}

export default League
