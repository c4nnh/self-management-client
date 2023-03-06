import {
  useDeleteLoanMutation,
  useDeleteMultipleLoansMutation,
  useGetLoansQuery,
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
import { Loan as TLoan } from '@/models'
import { useAppStore, useLoanStore } from '@/stores'
import { useQueryClient } from '@tanstack/react-query'
import { notification } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LoanDetail } from './Detail'
import { LoanFilter } from './Filter'

export const Loan: React.FC = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { selectedIds, columnLabel, setSelectedIds } = useAppStore()
  const pagination = usePagination()
  const { params, setParams } = useLoanStore()
  const sorter = useSorter<TLoan>()

  useEffect(() => {
    setSelectedIds([])
  }, [params])

  const { data, isFetching } = useGetLoansQuery(
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

  const { mutateAsync: deleteLoanMutate } = useDeleteLoanMutation({
    onSuccess: async () => {
      if (data?.items.length === 1) {
        pagination.handleAfterDeleteLastItemsInCurrentPage()
      } else {
        queryClient.invalidateQueries(['getLoans'])
      }
    },
    onError: () => {
      notification.error({ message: t('common.error.deleteFailed') })
    },
  })

  const { mutateAsync: deleteMultipleLoansMutate } =
    useDeleteMultipleLoansMutation({
      onSuccess: async () => {
        if (
          selectedIds.length === data?.items?.length &&
          (pagination.current || 1) > 1
        ) {
          pagination.handleAfterDeleteLastItemsInCurrentPage()
        } else {
          queryClient.invalidateQueries(['getLoans'])
        }
      },
      onError: () => {
        notification.error({ message: t('common.error.deleteFailed') })
      },
    })

  const columns: ColumnsType<TLoan> = [
    {
      title: columnLabel?.loan.id,
      dataIndex: 'id',
      sorter: true,
    },
    {
      title: columnLabel?.loan.debtor,
      dataIndex: 'debtor',
      sorter: true,
    },
    {
      title: columnLabel?.loan.amount,
      dataIndex: 'amount',
      sorter: true,
      render: (_, loan) => (
        <div className="flex gap-1 items-center">
          <TextNumber value={loan.amount} />
          <span className="text-gray-500 font-light">
            {`${loan.currency.symbol} - ${loan.currency.code}`}
          </span>
        </div>
      ),
    },
    {
      title: columnLabel?.loan.date,
      dataIndex: 'date',
      render: value => dayjs(value).format(DATE_FORMAT),
      sorter: true,
    },
    {
      title: columnLabel?.loan.description,
      dataIndex: 'description',
      sorter: true,
      render: value => <EllipsisText text={value} />,
    },
  ]

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle title={t('loan.pageTitle')} />
        <TableActionsContainer
          leftChildren={
            <SearchInput
              value={params?.search}
              setValue={search => setParams({ search })}
              searchProps={{
                placeholder: `${t('loan.search.placeholder')}`,
              }}
            />
          }
          rightChildren={
            <>
              <DeleteMultiple onDelete={deleteMultipleLoansMutate} />
              <LoanDetail />
              <LoanFilter />
              <ColumnConfigModal
                modalKey="loan-columns"
                tableConfigKey="loan"
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
        onDelete={deleteLoanMutate}
        modalKey="loan-detail"
        tableConfigKey="loan"
      />
    </PageContainer>
  )
}
