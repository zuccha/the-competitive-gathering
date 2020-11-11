import React from 'react'
import Header from './Header'
import styles from './Table.module.css'
import { IColumn, IOrder, IRow } from './types'
import useSort from './useSort'

type ITableProps<T extends Record<string, unknown>> = {
  columns: IColumn<T>[]
  rows: IRow<T>[]
  defaultSortingColumn?: IColumn<T>
  defaultSortingOrder?: IOrder
  highlightHoveredRow?: boolean
  getRowId: (data: T) => string
  onClickRow?: (data: T) => void
}

const Table = <T extends Record<string, unknown>>({
  columns,
  rows,
  defaultSortingColumn,
  defaultSortingOrder,
  highlightHoveredRow = false,
  getRowId,
  onClickRow,
}: ITableProps<T>): React.ReactElement => {
  const {
    sortedRows,
    sortingBy,
    sortByColumn,
  } = useSort({ columns, rows, defaultSortingColumn, defaultSortingOrder })
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map(column => {
            return (
              <th key={`${column.id}`}>
                {column.renderHeader
                  ? column.renderHeader(column, sortingBy, sortByColumn)
                  : <Header column={column} sortingBy={sortingBy} sortByColumn={sortByColumn} />
                }
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {sortedRows.map(row => {
          const rowId = getRowId(row.data)
          return (
            <tr key={rowId}>
              {columns.map(column => (
                <td key={`${rowId}-${column.id}`}>
                  {column.renderData
                    ? column.renderData(row.data)
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
