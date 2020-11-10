import React from 'react'
import Leagues from './Leagues'
import Standings from './Standings'

const Overview: React.FC = () => {
  return (
    <div>
      <Standings />
      <Leagues />
    </div>
  )
}

export default Overview
