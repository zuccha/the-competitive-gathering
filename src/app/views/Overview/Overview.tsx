import React from 'react'
import Actions from './Actions'
import Leagues from './Leagues'
import Standings from './Standings'

const Overview: React.FC = () => {
  return (
    <div>
      <h1>The Competitive Gathering</h1>
      <Actions />
      <Standings />
      <Leagues />
    </div>
  )
}

export default Overview
