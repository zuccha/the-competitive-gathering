import classnames from 'classnames'
import React, { useMemo } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { IColumn, ISortingBy } from '../types'
import styles from './Header.module.css'

type IHeaderProps<T extends Record<string, unknown>> = {
  column: IColumn<T>
  sortingBy: ISortingBy<T>
  sortByColumn: (column: IColumn<T>) => void
}

const Header = <T extends Record<string, unknown>>({
  column,
  sortingBy,
  sortByColumn,
}: IHeaderProps<T>): React.ReactElement => {
  const onClick = useMemo(() => {
    return column.isSortable
      ? () => sortByColumn(column)
      : undefined
  }, [column, sortByColumn])

  const icon = useMemo(() => {
    return column.id !== sortingBy.column?.id
      ? ''
      : (sortingBy.order === 'ascending'
        ? <MdKeyboardArrowUp />
        : <MdKeyboardArrowDown />
      )
  }, [column, sortingBy])

  return (
    <div
      onClick={onClick}
      className={classnames(styles['header'], onClick && styles['header-clickable'])}
    >
      {column.label} {icon}
    </div>
  )
}

export default Header
