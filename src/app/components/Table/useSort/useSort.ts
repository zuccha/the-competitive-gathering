import { useMemo, useState, useCallback } from 'react'
import when from '../../../../utils/when'
import { IColumn, IOrder, IRow, ISortingBy } from '../types'

const reverseOrder = (order: IOrder) => (
  order === 'ascending'
    ? 'descending'
    : 'ascending'
)

type IUseSortArgs<T extends Record<string, unknown>> = {
  columns: IColumn<T>[]
  rows: IRow<T>[]
  defaultSortingOrder?: IOrder
  defaultSortingColumn?: IColumn<T>
}

type IUseSortReturn<T extends Record<string, unknown>> = {
  sortedRows: IRow<T>[]
  sortingBy: ISortingBy<T>
  sortByColumn: (column: IColumn<T>) => void
}

const useSort = <T extends Record<string, unknown>>({
  columns,
  rows,
  defaultSortingOrder = 'ascending',
  defaultSortingColumn,
}: IUseSortArgs<T>): IUseSortReturn<T> => {
  const sortableColumns = useMemo(() => {
    return columns.filter(column => column.isSortable)
  }, [columns])

  const [sortingBy, setSortBy] = useState<ISortingBy<T>>({
    order: defaultSortingOrder,
    column: defaultSortingColumn || sortableColumns[0],
  })

  const sortedRows = useMemo(() => {
    return !sortingBy.column
      ? rows
      : rows.slice().sort((row1, row2) => {
          const rowLeft = sortingBy.order === 'ascending' ? row1 : row2
          const rowRight = sortingBy.order === 'ascending' ? row2 : row1
          return when([
            [rowLeft.data[sortingBy.column!.id] < rowRight.data[sortingBy.column!.id], () => -1],
            [rowLeft.data[sortingBy.column!.id] > rowRight.data[sortingBy.column!.id], () => 1],
          ], () => 0)
        })
  }, [sortingBy, rows])

  const sortByColumn = useCallback((column: IColumn<T>) => {
    setSortBy(sortingBy.column?.id === column.id
      ? { order: reverseOrder(sortingBy.order), column }
      : { order: 'ascending', column },
    )
  }, [sortingBy])

  return {
    sortedRows,
    sortingBy,
    sortByColumn,
  }
}

export default useSort
