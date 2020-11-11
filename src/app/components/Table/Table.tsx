import React from 'react'
import styles from './Table.module.css'

export type IColumn<T extends Record<string, unknown>> = {
  id: keyof T
  label: string
  isSortable?: boolean
  renderHeader?: (label: string) => React.ReactElement
  renderData?: (data: T) => React.ReactElement
}

export type IRow<T extends Record<string, unknown>> = {
  data: T
}

type ITableProps<T extends Record<string, unknown>> = {
  columns: IColumn<T>[]
  rows: IRow<T>[]
  highlightHoveredRow?: boolean
  getRowId: (data: T) => string
  onClickRow?: (data: T) => void
}

const Table = <T extends Record<string, unknown>>({
  columns,
  rows,
  highlightHoveredRow = false,
  getRowId,
  onClickRow,
}: ITableProps<T>): React.ReactElement => {

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map(column => {
            return (
              <th key={`${column.id}`}>
                {column.renderHeader
                  ? column.renderHeader(column.label)
                  : column.label
                }
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => {
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
