import { SorterResult } from 'antd/es/table/interface'
import { useState } from 'react'

type Sort = 'asc' | 'desc'

type SorterInfo<T> = {
  orderBy?: string
  orderDirection?: Sort
  onSorterChange: (value: SorterResult<T> | SorterResult<T>[]) => void
}

export const useSorter = <T>(): SorterInfo<T> => {
  const [orderBy, setOrderBy] = useState<string>()
  const [orderDirection, setOrderDirection] = useState<Sort>()

  const onChangeSorter = (sorter: SorterResult<T> | SorterResult<T>[]) => {
    const sorterResult = (sorter as SorterResult<T>[]).length
      ? (sorter as SorterResult<T>[])[0]
      : (sorter as SorterResult<T>)

    const { order, field } = sorterResult
    if (!order) {
      setOrderBy(undefined)
      setOrderDirection(undefined)
      return
    }
    setOrderDirection(order === 'ascend' ? 'asc' : 'desc')
    setOrderBy(field as string)
  }

  return {
    orderBy,
    orderDirection,
    onSorterChange: onChangeSorter,
  }
}
