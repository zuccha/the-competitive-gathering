import React from 'react'
import styles from './CellInt.module.css'

type ICellIntProps = {
  value?: number
  width?: string
  placeholder?: string
}

const CellInt: React.FC<ICellIntProps> = ({
  value,
  width = '64px',
  placeholder = '',
}) => {
  return (
    <div className={styles['cell-int']} style={{ width }}>
      {value !== undefined ? `${value}` : placeholder}
    </div>
  )
}

export default CellInt
