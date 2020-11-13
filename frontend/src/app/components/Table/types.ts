export type IOrder = 'ascending' | 'descending'

export type IColumn<
  T extends Record<string, unknown>,
  C extends Record<string, unknown> | undefined = undefined,
> = {
  id: keyof T
  label: string
  tooltip?: string
  isSortable?: boolean
  renderHeader?: (column: IColumn<T, C>, context: IContext<T, C>) => React.ReactElement | null
  renderData?: (data: T, context: IContext<T, C>) => React.ReactElement | null
}

export type IRow<
  T extends Record<string, unknown>,
> = {
  data: T
}

export type ISortingBy<
  T extends Record<string, unknown>,
  C extends Record<string, unknown> | undefined = undefined,
> = {
  column?: IColumn<T, C>
  order: IOrder,
}

export type IContext<
  T extends Record<string, unknown>,
  C extends Record<string, unknown> | undefined = undefined,
> = {
  sortingBy: ISortingBy<T, C>
  sortByColumn: (column: IColumn<T, C>) => void
  custom?: C
}
