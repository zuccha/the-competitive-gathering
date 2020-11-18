import classnames from 'classnames'
import React from 'react'
import styles from './CellInt.module.css'

type ICellIntProps = {
  className?: string
  value?: number
  width?: string
  placeholder?: string
}

const CellInt: React.FC<ICellIntProps> = ({
  className,
  value,
  width = '64px',
  placeholder = '',
}) => {
  return (
    <div className={classnames(styles['cell-int'], className)} style={{ width }}>
      {value !== undefined ? `${value}` : placeholder}
    </div>
  )
}

export default CellInt
