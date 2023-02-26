import {
  useDeleteMultipleTransactionsMutation,
  useDeleteTransactionMutation,
  useGetTransactionsQuery,
} from '@/apis'
import {
  ColumnConfigModal,
  DeleteMultiple,
  EllipsisText,
  PageContainer,
  PageHeader,
  PageTitle,
  SearchInput,
  Table,
  TableActionsContainer,
  TextNumber,
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
  const { selectedIds, columnLabel, setSelectedIds } = useAppStore()
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
          pagination.handleAfterDeleteLastItemsInCurrentPage()
        } else {
          queryClient.invalidateQueries(['getTransactions'])
        }
      },
      onError: () => {
        notification.error({ message: t('common.error.deleteFailed') })
      },
    }
  )

  const { mutateAsync: deleteMultipleTransactionsMutate } =
    useDeleteMultipleTransactionsMutation({
      onSuccess: async () => {
        if (
          selectedIds.length === data?.items?.length &&
          (pagination.current || 1) > 1
        ) {
          pagination.handleAfterDeleteLastItemsInCurrentPage()
        } else {
          queryClient.invalidateQueries(['getTransactions'])
        }
      },
      onError: () => {
        notification.error({ message: t('common.error.deleteFailed') })
      },
    })

  const columns: ColumnsType<TTransaction> = [
    {
      title: columnLabel?.transaction.id,
      dataIndex: 'id',
      sorter: true,
    },
    {
      title: columnLabel?.transaction.title,
      dataIndex: 'title',
      sorter: true,
    },
    {
      title: columnLabel?.transaction.type,
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
      title: columnLabel?.transaction.amount,
      dataIndex: 'amount',
      sorter: true,
      render: (_, transaction) => (
        <div className="flex gap-1 items-center">
          <TextNumber value={transaction.amount} />
          <span className="text-gray-500 font-light">
            {`${transaction.currency.symbol} - ${transaction.currency.code}`}
          </span>
        </div>
      ),
    },
    {
      title: columnLabel?.transaction.date,
      dataIndex: 'date',
      render: value => dayjs(value).format(DATE_FORMAT),
      sorter: true,
    },
    {
      title: columnLabel?.transaction.description,
      dataIndex: 'description',
      sorter: true,
      render: value => <EllipsisText text={value} />,
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
              searchProps={{
                placeholder: `${t('transaction.search.placeholder')}`,
              }}
            />
          }
          rightChildren={
            <>
              <DeleteMultiple onDelete={deleteMultipleTransactionsMutate} />
              <TransactionDetail />
              <TransactionFilter />
              <ColumnConfigModal
                modalKey="transaction-columns"
                tableConfigKey="transaction"
              />
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
        tableConfigKey="transaction"
      />
    </PageContainer>
  )
}
