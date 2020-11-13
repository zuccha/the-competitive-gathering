import React from 'react'
import ActionCreateLeague from './ActionCreateLeague'
import styles from './Actions.module.css'

const Actions: React.FC = () => {
  return (
    <div className={styles['actions']}>
      <ActionCreateLeague />
    </div>
  )
}

export default Actions
