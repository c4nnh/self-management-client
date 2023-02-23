import { useScreen } from '@/hooks'
import { ModalKey, useAppStore } from '@/stores'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Modal, Table as ATable, TableProps } from 'antd'
import { ColumnType } from 'antd/es/table'
import { TableRowSelection } from 'antd/es/table/interface'
import { PropsWithChildren, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import tw from 'twin.macro'

type Props<T> = PropsWithChildren<TableProps<T>> & {
  maxWidthPerCell?: number
  modalKey: ModalKey
  onDelete: (id: string) => void
}

interface BaseObject extends Object {
  id: string
}

export const Table = <T extends BaseObject>({
  columns = [],
  dataSource = [],
  maxWidthPerCell = 150,
  modalKey,
  onDelete,
  ...props
}: Props<T>) => {
  const { t } = useTranslation()
  const { isDesktop } = useScreen()
  const { selectedIds, setSelectedId, setOpenModal, setSelectedIds } =
    useAppStore()
  const [data, setData] = useState<readonly T[]>(dataSource)

  const columnsWithWidth = columns.map((column: any) => {
    return {
      ...column,
      width: column.width || maxWidthPerCell,
    }
  })

  useEffect(() => {
    setData(dataSource)
  }, [dataSource])

  useEffect(() => {
    const dataIds = data.map(item => item.id)
    setSelectedIds(selectedIds.filter(id => dataIds.includes(id)))
  }, [data])

  useEffect(() => {
    return () => {
      setSelectedIds([])
    }
  }, [])

  dataSource.map((entry: any) => {
    columnsWithWidth.map((column, indexColumn) => {
      const columnWidth = column.width
      const cellValue = Object.values(entry)[indexColumn] as string

      // Get the string width based on chars length
      let cellWidth = getTextWidth(cellValue)

      // Verify if the cell value is smaller than column's width
      if (cellWidth < columnWidth) cellWidth = columnWidth

      // Verify if the cell value width is bigger than our max width flag
      if (cellWidth > maxWidthPerCell) {
        cellWidth = maxWidthPerCell
      }

      // Update the column width
      columnsWithWidth[indexColumn].width = cellWidth
    })
  })

  const tableWidth = columnsWithWidth
    .map(column => column.width)
    .reduce((pre, curr) => {
      return pre + curr
    })

  const onClickDelete = (id: string) => {
    Modal.confirm({
      title: t('common.confirmDelete'),
      okText: t('common.yes'),
      cancelText: t('common.no'),
      onOk: async () => {
        await onDelete(id)
      },
    })
  }

  const actionColumn: ColumnType<T> = {
    dataIndex: 'id',
    width: '50px',
    fixed: 'right',
    render: id => (
      <div className="flex gap-2 justify-center">
        <Button
          type="ghost"
          icon={<EditOutlined className="text-primary" />}
          onClick={() => {
            setSelectedId(id)
            setOpenModal(modalKey)
          }}
        />
        <Button
          onClick={() => onClickDelete(id)}
          type="ghost"
          icon={<DeleteOutlined className="text-red-500" />}
        />
      </div>
    ),
  }

  const rowSelection: TableRowSelection<T> = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedIds(selectedRowKeys as string[])
    },
    selectedRowKeys: selectedIds,
  }

  return (
    <StyledTable<T>
      size={isDesktop ? 'middle' : 'small'}
      rowSelection={rowSelection}
      {...props}
      dataSource={dataSource}
      scroll={{ x: tableWidth }}
      locale={{
        triggerAsc: `${t('common.clickToSortAscending')}`,
        triggerDesc: `${t('common.clickToSortDescending')}`,
        cancelSort: `${t('common.clickToCancelSort')}`,
      }}
      columns={[...columnsWithWidth, actionColumn]}
    />
  )
}

const getTextWidth = (text?: string, font = '16px -apple-system') => {
  if (!text) return 100

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (context) {
    context.font = font
    const metrics = context.measureText(text)
    const width = Math.round(metrics.width)
    canvas.remove()
    return width
  }

  return 100
}

const StyledTable = styled(ATable)`
  .ant-table-thead > tr > th {
    ${tw`font-semibold bg-gray-100`}
  }

  .ant-table-tbody {
    tr:not(:last-child) {
      td {
        border-radius: 0 !important;
      }
    }

    tr:last-child {
      td {
        border-top-left-radius: 0 !important;
        border-top-right-radius: 0 !important;
      }
    }
  }
` as typeof ATable
