export type IOrder = 'ascending' | 'descending'

export type IColumn<T extends Record<string, unknown>> = {
  id: keyof T
  label: string
  isSortable?: boolean
  renderHeader?: (
    column: IColumn<T>,
    sortingBy: ISortingBy<T>,
    sortByColumn: (column: IColumn<T>) => void,
  ) => React.ReactElement
  renderData?: (data: T) => React.ReactElement
}

export type IRow<T extends Record<string, unknown>> = {
  data: T
}

export type ISortingBy<T extends Record<string, unknown>> = {
  column?: IColumn<T>
  order: IOrder,
}
