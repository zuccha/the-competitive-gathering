import classnames from 'classnames'
import React, { useMemo } from 'react'
import Header from './Header'
import styles from './Table.module.css'
import { IColumn, IOrder, IRow } from './types'
import useSort from './useSort'

type ITableProps<
  T extends Record<string, unknown>,
  C extends Record<string, unknown> | undefined = undefined,
> = {
  columns: IColumn<T, C>[]
  rows: IRow<T>[]
  defaultSortingColumn?: IColumn<T, C>
  defaultSortingOrder?: IOrder
  highlightHoveredRow?: boolean
  customContext?: C
  getRowId: (data: T) => string
  onClickRow?: (data: T) => void
}

const Table = <
  T extends Record<string, unknown>,
  C extends Record<string, unknown> | undefined = undefined,
>({
  columns,
  rows,
  defaultSortingColumn,
  defaultSortingOrder,
  highlightHoveredRow = false,
  customContext,
  getRowId,
  onClickRow,
}: ITableProps<T, C>): React.ReactElement => {
  const {
    sortedRows,
    sortingBy,
    sortByColumn,
  } = useSort({ columns, rows, defaultSortingColumn, defaultSortingOrder })

  const context = useMemo(() => ({
    sortByColumn,
    sortingBy,
    custom: customContext,
  }), [sortByColumn, sortingBy])

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map(column => {
            return (
              <th key={`${column.id}`}>
                {column.renderHeader
                  ? column.renderHeader(column, context)
                  : <Header column={column} context={context} />
                }
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {sortedRows.map(row => {
          const rowId = getRowId(row.data)
          const handleClickRow = onClickRow
            ? () => onClickRow(row.data)
            : undefined
          const className = classnames(
            onClickRow && styles['table-row-clickable'],
            highlightHoveredRow && styles['table-row-highlight'],
          )
          return (
            <tr key={rowId} onClick={handleClickRow} className={className}>
              {columns.map(column => (
                <td key={`${rowId}-${column.id}`}>
                  {column.renderData
                    ? column.renderData(row.data, context)
                    : `${row.data[column.id]}`
                  }
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
