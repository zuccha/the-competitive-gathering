import React from 'react'
import { ILeague } from '../../../../../types/League'
import LeagueFormat from '../../../../../types/LeagueFormat'
import LeagueStatus from '../../../../../types/LeagueStatus'
import styles from './InfoTable.module.css'

type IInfoTableProps = {
  league: ILeague,
}

const InfoTable: React.FC<IInfoTableProps> = ({
  league,
}) => {
  return (
    <div className={styles['info-table']}>
      <div className={styles['info-table-column']}>
        <span><b>Creator:</b> {league.creator}</span>
        <span><b>Format:</b> <span className='capitalize'>{LeagueFormat.toString(league.format)}</span></span>
      </div>
      <div className={styles['info-table-column']}>
        <span><b>Status:</b> <span className='capitalize'>{LeagueStatus.toString(league.status)}</span></span>
        <span><b>Date started:</b> {league.dateStart || '-'}</span>
        <span><b>Date ended:</b> {league.dateEnd || '-'}</span>
      </div>
      <div className={styles['info-table-column']}>
        <span><b>Min. players:</b> {league.playersMin}</span>
        <span><b>Max. players:</b> {league.playersMax || 'None'}</span>
        <span><b>Rounds:</b> {league.rounds}</span>
      </div>
    </div>
  )
}

export default InfoTable
