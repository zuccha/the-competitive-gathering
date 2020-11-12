import React from 'react'
import Button from '../../components/Button'
import Leagues from './Leagues'
import Standings from './Standings'
import styles from './Overview.module.css'

const Overview: React.FC = () => {
  return (
    <div>
      <h1>The Competitive Gathering</h1>
      <div className={styles['overview-buttons']}>
        <Button>Create league</Button>
      </div>
      <Standings />
      <Leagues />
    </div>
  )
}

export default Overview
