import { useMemo, useState, useCallback } from 'react'
import when from '../../../../utils/when'
import { IColumn, IOrder, IRow, ISortingBy } from '../types'

const reverseOrder = (order: IOrder) => (
  order === 'ascending'
    ? 'descending'
    : 'ascending'
)

type IUseSortArgs<
  T extends Record<string, unknown>,
  C extends Record<string, unknown> | undefined = undefined,
> = {
  columns: IColumn<T, C>[]
  rows: IRow<T>[]
  defaultSortingOrder?: IOrder
  defaultSortingColumn?: IColumn<T, C>
}

type IUseSortReturn<
  T extends Record<string, unknown>,
  C extends Record<string, unknown> | undefined = undefined,
> = {
  sortedRows: IRow<T>[]
  sortingBy: ISortingBy<T, C>
  sortByColumn: (column: IColumn<T, C>) => void
}

const useSort = <
  T extends Record<string, unknown>,
  C extends Record<string, unknown> | undefined = undefined,
>({
  columns,
  rows,
  defaultSortingOrder = 'ascending',
  defaultSortingColumn,
}: IUseSortArgs<T, C>): IUseSortReturn<T, C> => {
  const sortableColumns = useMemo(() => {
    return columns.filter(column => column.isSortable)
  }, [columns])

  const [sortingBy, setSortBy] = useState<ISortingBy<T, C>>({
    order: defaultSortingOrder,
    column: defaultSortingColumn || sortableColumns[0],
  })

  const sort = useCallback((row1: IRow<T>, row2: IRow<T>): number => {
    const rowLeft = sortingBy.order === 'ascending' ? row1 : row2
    const rowRight = sortingBy.order === 'ascending' ? row2 : row1
    return sortingBy.column!.sort
      ? sortingBy.column!.sort(rowLeft, rowRight)
      : when([
        [rowLeft.data[sortingBy.column!.id] < rowRight.data[sortingBy.column!.id], () => -1],
        [rowLeft.data[sortingBy.column!.id] > rowRight.data[sortingBy.column!.id], () => 1],
      ], () => 0)
  }, [sortingBy])

  const sortedRows = useMemo(() => {
    return !sortingBy.column
      ? rows
      : rows.slice().sort(sort)
  }, [sortingBy, rows, sort])

  const sortByColumn = useCallback((column: IColumn<T, C>) => {
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
