import { Table as ATable, TableProps } from 'antd'
import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

export const Table = <T extends object>(
  props: PropsWithChildren<TableProps<T>>
) => {
  return <StyledTable<T> {...props} tableLayout="auto" />
}

const StyledTable = styled(ATable)`
  .ant-table-thead > tr > th {
    ${tw`font-semibold bg-gray-100`}
  }
` as typeof ATable
