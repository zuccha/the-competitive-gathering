import classnames from 'classnames'
import React from 'react'
import Tooltip from '../Tooltip'
import styles from './Text.module.css'

type ITextProps = {
  className?: string
  children: React.ReactChild
  tooltip?: string
}

const Text: React.FC<ITextProps> = ({
  className,
  children,
  tooltip,
}) => {
  return tooltip
    ? (
      <span className={classnames(styles['text-with-tooltip'], className)}>
        <Tooltip tooltip={tooltip}>
          {children}
        </Tooltip>
      </span>
    )
    : (
      <span className={classnames(styles['text-without-tooltip'], className)}>
        {children}
      </span>
    )
}

export default Text
