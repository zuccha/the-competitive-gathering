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
  defaultProperty: keyof T
  headers: IHeader<T>[]
  items: IItem<T>[]
}

const SortableTable = <T extends Record<string, IValue>,>({
  className,
  headers,
  items,
  defaultProperty,
}: ISortableTableProps<T>): React.ReactElement => {
  const [sortingBy, setSortingBy] = useState<{ property: keyof T, order: IOrder }>({
    property: defaultProperty,
    order: 'ascending',
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
    if (sortingBy.property !== header.property) {
      const handleSort = () => setSortingBy({ property: header.property, order: 'ascending' })
      return <th onClick={handleSort}>{header.label}</th>
    }
    if (sortingBy.order === 'ascending') {
      const handleSort = () => setSortingBy({ property: header.property, order: 'descending' })
      return <th onClick={handleSort}>{header.label} <MdKeyboardArrowUp /></th>
    }
    const handleSort = () => setSortingBy({ property: header.property, order: 'ascending' })
    return <th onClick={handleSort}>{header.label} <MdKeyboardArrowDown /></th>
  }, [sortingBy])

  const renderTd = useCallback((item: IItem<T>, header: IHeader<T>) => {
    const value = item.data[header.property]
    if (typeof value === 'number') return <td className={styles['sortable-table-cell-number']}>{value}</td>
    if (typeof value === 'string') return <td className={styles['sortable-table-cell-text']}>{value}</td>
    return <td className={styles['sortable-table-cell-text']}>-</td>
  }, [])

  return (
    <table className={classnames(styles['sortable-table'], className)}>
      <tr>
        {headers.map(header => renderTh(header))}
      </tr>
      {sortedItems.map(item => (
        <tr key={`${item.data[defaultProperty]}`}>
          {headers.map(header => renderTd(item, header))}
        </tr>
      ))}
    </table>
  )
}

export default SortableTable
