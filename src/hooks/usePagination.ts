import { TablePaginationConfig } from 'antd'
import { useState } from 'react'

type PaginationInfo = {
  offset: number
  setOffset: (value: number) => void
  setTotal: (value: number) => void
} & TablePaginationConfig

export const usePagination = (
  options?: TablePaginationConfig
): PaginationInfo => {
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)
  const [limit, setLimit] = useState(10)

  return {
    ...options,
    total,
    pageSize: limit,
    current: Math.floor(offset / limit) + 1,
    offset,
    showSizeChanger: true,
    pageSizeOptions: [5, 10, 20, 50],
    onShowSizeChange: (_, size) => {
      setLimit(size)
    },
    onChange: (page, pageSize) => setOffset((page - 1) * pageSize),
    setTotal,
    setOffset,
  }
}
