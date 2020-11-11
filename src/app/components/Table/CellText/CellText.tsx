import React from 'react'
import styles from './CellText.module.css'

type ICellTextProps = {
  value: string
  width?: string
}

const CellText: React.FC<ICellTextProps> = ({
  value,
  width = '128px',
}) => {
  return (
    <div className={styles['cell-text']} style={{ width }}>
      {value}
    </div>
  )
}

export default CellText
