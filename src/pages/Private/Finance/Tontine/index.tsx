import {
  useDeleteMultipleTontinesMutation,
  useDeleteTontineMutation,
  useGetTontinesQuery,
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
import { Tontine as TTontine } from '@/models'
import { useAppStore, useCurrencyStore } from '@/stores'
import { useQueryClient } from '@tanstack/react-query'
import { notification } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { TontineDetail } from './Detail'
import { TontineFilter } from './Filter'

export const Tontine: React.FC = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { selectedIds, columnLabel, setSelectedIds } = useAppStore()
  const pagination = usePagination()
  const { params, setParams } = useCurrencyStore()
  const sorter = useSorter<TTontine>()

  useEffect(() => {
    setSelectedIds([])
  }, [params])

  const { data, isFetching } = useGetTontinesQuery(
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

  const { mutateAsync: deleteTontineMutate } = useDeleteTontineMutation({
    onSuccess: async () => {
      if (data?.items.length === 1) {
        pagination.handleAfterDeleteLastItemsInCurrentPage()
      } else {
        queryClient.invalidateQueries(['getTontines'])
      }
    },
    onError: () => {
      notification.error({ message: t('common.error.deleteFailed') })
    },
  })

  const { mutateAsync: deleteMultipleTontinesMutate } =
    useDeleteMultipleTontinesMutation({
      onSuccess: async () => {
        if (
          selectedIds.length === data?.items?.length &&
          (pagination.current || 1) > 1
        ) {
          pagination.handleAfterDeleteLastItemsInCurrentPage()
        } else {
          queryClient.invalidateQueries(['getTontines'])
        }
      },
      onError: () => {
        notification.error({ message: t('common.error.deleteFailed') })
      },
    })

  const columns: ColumnsType<TTontine> = [
    {
      title: columnLabel?.tontine.id,
      dataIndex: 'id',
      sorter: true,
    },
    {
      title: columnLabel?.tontine.amount,
      dataIndex: 'amount',
      sorter: true,
      render: (_, tontine) => (
        <div className="flex gap-1 items-center">
          <TextNumber value={tontine.amount} />
          <span className="text-gray-500 font-light">
            {`${tontine.currency.symbol} - ${tontine.currency.code}`}
          </span>
        </div>
      ),
    },
    {
      title: columnLabel?.tontine.date,
      dataIndex: 'date',
      render: value => dayjs(value).format(DATE_FORMAT),
      sorter: true,
    },
    {
      title: columnLabel?.tontine.description,
      dataIndex: 'description',
      sorter: true,
      render: value => <EllipsisText text={value} />,
    },
  ]

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle title={t('tontine.pageTitle')} />
        <TableActionsContainer
          leftChildren={
            <SearchInput
              value={params?.search}
              setValue={search => setParams({ search })}
              searchProps={{
                placeholder: `${t('tontine.search.placeholder')}`,
              }}
            />
          }
          rightChildren={
            <>
              <DeleteMultiple onDelete={deleteMultipleTontinesMutate} />
              <TontineDetail />
              <TontineFilter />
              <ColumnConfigModal
                modalKey="tontine-columns"
                tableConfigKey="tontine"
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
        onDelete={deleteTontineMutate}
        modalKey="tontine-detail"
        tableConfigKey="tontine"
      />
    </PageContainer>
  )
}

const Container = styled.div``
