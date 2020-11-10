import React from 'react'
import { useParams } from 'react-router-dom'

const League: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  return <h2>{`League #${id}`}</h2>
}

export default League
