import classnames from 'classnames'
import React, { useMemo } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import Text from '../../Text'
import { IColumn, IContext } from '../types'
import styles from './Header.module.css'

type IHeaderProps<
  T extends Record<string, unknown>,
  C extends Record<string, unknown> | undefined = undefined,
> = {
  column: IColumn<T, C>
  context: IContext<T, C>
}

const Header = <
  T extends Record<string, unknown>,
  C extends Record<string, unknown> | undefined = undefined,
>({
  column,
  context,
}: IHeaderProps<T, C>): React.ReactElement => {
  const onClick = useMemo(() => {
    return column.isSortable
      ? () => context.sortByColumn(column)
      : undefined
  }, [column, context])

  const icon = useMemo(() => {
    return column.id !== context.sortingBy.column?.id
      ? ''
      : (context.sortingBy.order === 'ascending'
        ? <MdKeyboardArrowUp />
        : <MdKeyboardArrowDown />
      )
  }, [column, context])

  return (
    <div
      onClick={onClick}
      className={classnames(styles['header'], onClick && styles['header-clickable'])}
    >
      <Text tooltip={column.tooltip}>
        {column.label}
      </Text>
      &nbsp;
      {icon}
    </div>
  )
}

export default Header
