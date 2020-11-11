import React from 'react'
import Leagues from './Leagues'
import Standings from './Standings'

const Overview: React.FC = () => {
  return (
    <div>
      <h1>MTG Leagues</h1>
      <Standings />
      <Leagues />
    </div>
  )
}

export default Overview
