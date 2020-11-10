import classnames from 'classnames'
import React, { useCallback, useMemo, useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import when from '../../../utils/when'
import styles from './SortableTable.module.css'

type IOrder = 'ascending' | 'descending'

type IValue = undefined | string | number

export type IHeader<T extends Record<string, IValue>> = {
  property: keyof T
  label: string
}

export type IItem<T extends Record<string, IValue>> = {
  data: T
}

type ISortableTableProps<T extends Record<string, IValue>> = {
  className?: string
  defaultOrder?: IOrder
  defaultProperty: keyof T
  headers: IHeader<T>[]
  items: IItem<T>[]
}

const SortableTable = <T extends Record<string, IValue>,>({
  className,
  defaultOrder = 'ascending',
  defaultProperty,
  headers,
  items,
}: ISortableTableProps<T>): React.ReactElement => {
  const [sortingBy, setSortingBy] = useState<{ property: keyof T, order: IOrder }>({
    property: defaultProperty,
    order: defaultOrder,
  })

  const sortedItems = useMemo(() => {
    return items.slice().sort((item1, item2) => {
      const itemLeft = sortingBy.order === 'ascending' ? item1 : item2
      const itemRight = sortingBy.order === 'ascending' ? item2 : item1
      return when([
        [itemLeft.data[sortingBy.property] < itemRight.data[sortingBy.property], () => -1],
        [itemLeft.data[sortingBy.property] > itemRight.data[sortingBy.property], () => 1],
      ], () => 0)
    })
  }, [sortingBy, items])

  const renderTh = useCallback((header: IHeader<T>) => {
    const order = sortingBy.property === header.property && sortingBy.order === 'ascending'
      ? 'descending'
      : 'ascending'

    const label = when([
      [sortingBy.property !== header.property, () => <>{header.label}</>],
      [sortingBy.order === 'ascending', () => <>{header.label} <MdKeyboardArrowUp /></>],
    ], () => <>{header.label} <MdKeyboardArrowDown /></>)

    const handleSort = () => setSortingBy({ property: header.property, order })
    return <th onClick={handleSort} key={`${header.property}`}>{label}</th>
  }, [sortingBy])

  const renderTd = useCallback((item: IItem<T>, header: IHeader<T>) => {
    const value = item.data[header.property] || '-'
    const className = when([
      [typeof value === 'number', () => 'sortable-table-cell-number'],
      [typeof value === 'string', () => 'sortable-table-cell-text'],
    ], () => 'sortable-table-cell-text')
    return <td className={styles[className]} key={`${item.data[defaultProperty]}-${header.property}`}>{value}</td>
  }, [])

  return (
    <table className={classnames(styles['sortable-table'], className)}>
      <thead>
        <tr>
          {headers.map(header => renderTh(header))}
        </tr>
      </thead>
      <tbody>
        {sortedItems.map(item => (
          <tr key={`${item.data[defaultProperty]}`}>
            {headers.map(header => renderTd(item, header))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SortableTable
