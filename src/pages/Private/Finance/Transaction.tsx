import {
  CaretDownOutlined,
  CaretUpOutlined,
  FilterFilled,
  PlusOutlined,
} from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { Button, Input, notification, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import {
  useDeleteTransactionMutation,
  useGetTransactionsQuery,
} from '../../../apis'
import { ColumnIcon } from '../../../assets'
import {
  PageContainer,
  PageTitle,
  Table,
  TableActionsContainer,
} from '../../../components'
import { DATE_FORMAT } from '../../../constants'
import { usePagination, useSorter } from '../../../hooks'
import { Transaction as TTransaction, TransactionType } from '../../../models'
import { useTransactionFilter } from '../../../stores'

export const Transaction: React.FC = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const pagination = usePagination()
  const { params, setTransactionParams } = useTransactionFilter()
  const sorter = useSorter<TTransaction>()
  const { data, isFetching } = useGetTransactionsQuery(
    {
      limit: pagination.pageSize,
      offset: pagination.offset,
      orderBy: sorter.orderBy,
      orderDirection: sorter.orderDirection,
      ...params,
    },
    {
      onSuccess: ({ pagination: { totalItem } }) => {
        pagination.setTotal(totalItem)
      },
    }
  )

  const { mutateAsync: deleteTransactionMutate } = useDeleteTransactionMutation(
    {
      onSuccess: async () => {
        if (data?.items.length === 1) {
          pagination.handleAfterDeleteLastItemInCurrentPage()
        } else {
          queryClient.invalidateQueries(['getTransactions'])
        }
      },
      onError: () => {
        notification.error({ message: t('common.error.deleteFailed') })
      },
    }
  )

  const columns: ColumnsType<TTransaction> = [
    {
      title: t('common.title'),
      dataIndex: 'title',
      sorter: true,
    },
    {
      title: t('common.type'),
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
      title: t('common.amount'),
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
      title: t('common.date'),
      dataIndex: 'date',
      render: value => moment(value).format(DATE_FORMAT),
      sorter: true,
    },
  ]

  return (
    <PageContainer>
      <PageTitle title={t('transaction.pageTitle')} />
      <TableActionsContainer
        leftChildren={
          <Input.Search
            size="large"
            className="max-w-[500px]"
            enterButton
            allowClear
            value={params?.title}
            onChange={e => setTransactionParams({ title: e.target.value })}
          />
        }
        rightChildren={
          <>
            <Button icon={<PlusOutlined />} size="large" type="primary" />
            <Button icon={<FilterFilled />} size="large" type="primary" />
            <Button icon={<ColumnIcon />} size="large" type="primary" />
          </>
        }
      />
      <Table
        dataSource={data?.items?.map(item => ({ ...item, key: item.id }))}
        loading={isFetching}
        columns={columns}
        pagination={pagination}
        onChange={(_, __, sorterValue) => {
          sorter.onSorterChange(sorterValue)
        }}
        onDelete={id => deleteTransactionMutate(id)}
      />
    </PageContainer>
  )
}
