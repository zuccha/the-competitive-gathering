import React from 'react'
import styles from './CellInt.module.css'

type ICellIntProps = {
  value: number
  width?: string
}

const CellInt: React.FC<ICellIntProps> = ({
  value,
  width = '64px',
}) => {
  return (
    <div className={styles['cell-int']} style={{ width }}>
      {value}
    </div>
  )
}

export default CellInt
