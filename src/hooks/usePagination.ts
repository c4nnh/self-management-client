import { TablePaginationConfig } from 'antd'
import { useEffect, useState } from 'react'
import { PAGE_SIZE_DEFAULT } from '../constants'
import { useLocalSettingStore } from '../stores'
import { useScreen } from './useScreen'

type PaginationInfo = {
  offset: number
  setOffset: (value: number) => void
  setTotal: (value: number) => void
  handleAfterDeleteLastItemInCurrentPage: () => void
} & TablePaginationConfig

export const usePagination = (
  options?: TablePaginationConfig
): PaginationInfo => {
  const { isDesktop } = useScreen()
  const { pageSize, setPageSize } = useLocalSettingStore()
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)
  const [limit, setLimit] = useState(
    pageSize || isDesktop ? PAGE_SIZE_DEFAULT.DESKTOP : PAGE_SIZE_DEFAULT.MOBILE
  )

  const handleAfterDeleteLastItemInCurrentPage = () => {
    if (offset >= limit) {
      setOffset(pre => pre - limit)
    }
  }

  useEffect(() => {
    setPageSize(limit)
  }, [limit])

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
    handleAfterDeleteLastItemInCurrentPage,
  }
}
