import React from 'react'
import styles from './CellText.module.css'

type ICellTextProps = {
  value?: string
  width?: string
  placeholder?: string
}

const CellText: React.FC<ICellTextProps> = ({
  value,
  width = '128px',
  placeholder = '',
}) => {
  return (
    <div className={styles['cell-text']} style={{ width }}>
      {value || placeholder}
    </div>
  )
}

export default CellText
