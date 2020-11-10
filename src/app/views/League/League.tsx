import React from 'react'
import { useParams } from 'react-router-dom'
import Standings from './Standings'

const League: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  return (
    <div>
      <h1>{`League #${id}`}</h1>
      <Standings />
    </div>
  )
}

export default League
