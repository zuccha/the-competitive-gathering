import classnames from 'classnames'
import React from 'react'
import styles from './CellText.module.css'

type ICellTextProps = {
  className?: string
  value?: string
  width?: string
  placeholder?: string
}

const CellText: React.FC<ICellTextProps> = ({
  className,
  value,
  width = '128px',
  placeholder = '',
}) => {
  return (
    <div className={classnames(styles['cell-text'], className)} style={{ width }}>
      {value || placeholder}
    </div>
  )
}

export default CellText
