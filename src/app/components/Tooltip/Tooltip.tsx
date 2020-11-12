import React from 'react'
import styles from './Tooltip.module.css'

type ITooltipProps = {
  children: React.ReactChild
  tooltip: string
}

const Tooltip: React.FC<ITooltipProps> = ({
  children,
  tooltip,
}) => {
  return (
    <span className={styles['tooltip']}>
      {children}
      <span className={styles['tooltip-text']}>{tooltip}</span>
    </span>
  )
}

export default Tooltip
