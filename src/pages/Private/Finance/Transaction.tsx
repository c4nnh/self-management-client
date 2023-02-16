import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useGetTransactionsQuery } from '../../../apis'
import { Table } from '../../../components'
import { DATE_FORMAT } from '../../../constants'
import { usePagination, useSorter } from '../../../hooks'
import { Transaction as TTransaction, TransactionType } from '../../../models'

export const Transaction: React.FC = () => {
  const { t } = useTranslation()
  const pagination = usePagination()
  const sorter = useSorter<TTransaction>()
  const { data, isFetching } = useGetTransactionsQuery(
    {
      limit: pagination.pageSize,
      offset: pagination.offset,
      orderBy: sorter.orderBy,
      orderDirection: sorter.orderDirection,
    },
    {
      onSuccess: ({ pagination: { totalItem } }) => {
        pagination.setTotal(totalItem)
      },
    }
  )

  const columns: ColumnsType<TTransaction> = [
    {
      title: t('transaction.column.title'),
      dataIndex: 'title',
      sorter: true,
    },
    {
      title: t('transaction.column.type'),
      dataIndex: 'type',
      render: value => {
        const isIncome = value === TransactionType.INCOME
        return (
          <Tag
            color={isIncome ? 'success' : 'error'}
            icon={isIncome ? <CaretUpOutlined /> : <CaretDownOutlined />}
          >
            {value}
          </Tag>
        )
      },
    },
    {
      title: t('transaction.column.amount'),
      dataIndex: 'amount',
      sorter: true,
      render: (_, transaction) => (
        <div className="flex gap-1 items-center">
          <span>{transaction.amount}</span>
          <span className="text-gray-500 font-light">
            {transaction.currency.name}
          </span>
        </div>
      ),
    },
    {
      title: t('transaction.column.date'),
      dataIndex: 'date',
      render: value => moment(value).format(DATE_FORMAT),
      sorter: true,
    },
  ]

  return (
    <Container>
      <Table
        dataSource={data?.items?.map(item => ({ ...item, key: item.id }))}
        loading={isFetching}
        columns={columns}
        pagination={pagination}
        onChange={(_, __, sorterValue) => {
          sorter.onSorterChange(sorterValue)
        }}
      />
    </Container>
  )
}

const Container = styled.div``
