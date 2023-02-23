import { useDeleteTransactionMutation, useGetTransactionsQuery } from '@/apis'
import { ColumnIcon } from '@/assets'
import {
  DeleteMultiple,
  PageContainer,
  PageHeader,
  PageTitle,
  ResponsiveButton,
  SearchInput,
  Table,
  TableActionsContainer,
} from '@/components'
import { DATE_FORMAT } from '@/constants'
import { usePagination, useSorter } from '@/hooks'
import { Transaction as TTransaction, TransactionType } from '@/models'
import { useAppStore, useTransactionFilter } from '@/stores'
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { notification, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { TransactionDetail } from './Detail'
import { TransactionFilter } from './Filter'

export const Transaction: React.FC = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { setSelectedIds } = useAppStore()
  const pagination = usePagination()
  const { params, setParams } = useTransactionFilter()
  const sorter = useSorter<TTransaction>()

  useEffect(() => {
    setSelectedIds([])
  }, [params])

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
      render: value => dayjs(value).format(DATE_FORMAT),
      sorter: true,
    },
  ]

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle title={t('transaction.pageTitle')} />
        <TableActionsContainer
          leftChildren={
            <SearchInput
              value={params?.title}
              setValue={title => setParams({ title })}
            />
          }
          rightChildren={
            <>
              <DeleteMultiple onDelete={() => {}} />
              <TransactionDetail />
              <TransactionFilter />
              <ResponsiveButton icon={<ColumnIcon />} type="primary" />
            </>
          }
        />
      </PageHeader>
      <Table
        dataSource={data?.items?.map(item => ({ ...item, key: item.id }))}
        loading={isFetching}
        columns={columns}
        pagination={pagination}
        onChange={(_, __, sorterValue) => {
          sorter.onSorterChange(sorterValue)
        }}
        onDelete={deleteTransactionMutate}
        modalKey="transaction-detail"
      />
    </PageContainer>
  )
}
