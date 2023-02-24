import {
  useDeleteCurrencyMutation,
  useDeleteMultipleCurrenciesMutation,
  useGetCurrenciesQuery,
} from '@/apis'
import {
  ColumnConfigModal,
  DeleteMultiple,
  PageContainer,
  PageHeader,
  PageTitle,
  SearchInput,
  Table,
  TableActionsContainer,
} from '@/components'
import { usePagination, useSorter } from '@/hooks'
import { Currency as TCurrency } from '@/models'
import { useAppStore, useCurrencyStore } from '@/stores'
import { useQueryClient } from '@tanstack/react-query'
import { notification } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { CurrencyDetail } from './Detail'
import { CurrencyFilter } from './Filter'

export const Currency: React.FC = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { selectedIds, columnLabel, setSelectedIds } = useAppStore()
  const pagination = usePagination()
  const { params, setParams } = useCurrencyStore()
  const sorter = useSorter<TCurrency>()

  useEffect(() => {
    setSelectedIds([])
  }, [params])

  const { data, isFetching } = useGetCurrenciesQuery(
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

  const { mutateAsync: deleteCurrencyMutate } = useDeleteCurrencyMutation({
    onSuccess: async () => {
      if (data?.items.length === 1) {
        pagination.handleAfterDeleteLastItemsInCurrentPage()
      } else {
        queryClient.invalidateQueries(['getCurrencies'])
      }
    },
    onError: () => {
      notification.error({ message: t('common.error.deleteFailed') })
    },
  })

  const { mutateAsync: deleteMultipleCurrenciesMutate } =
    useDeleteMultipleCurrenciesMutation({
      onSuccess: async () => {
        if (
          selectedIds.length === data?.items?.length &&
          (pagination.current || 1) > 1
        ) {
          pagination.handleAfterDeleteLastItemsInCurrentPage()
        } else {
          queryClient.invalidateQueries(['getCurrencies'])
        }
      },
      onError: () => {
        notification.error({ message: t('common.error.deleteFailed') })
      },
    })

  const columns: ColumnsType<TCurrency> = [
    {
      title: columnLabel?.currency.id,
      dataIndex: 'id',
      sorter: true,
    },
    {
      title: columnLabel?.currency.name,
      dataIndex: 'name',
      sorter: true,
    },
  ]

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle title={t('currency.pageTitle')} />
        <TableActionsContainer
          leftChildren={
            <SearchInput
              value={params?.name}
              setValue={name => setParams({ name })}
              searchProps={{
                placeholder: `${t('currency.search.placeholder')}`,
              }}
            />
          }
          rightChildren={
            <>
              <DeleteMultiple onDelete={deleteMultipleCurrenciesMutate} />
              <CurrencyDetail />
              <CurrencyFilter />
              <ColumnConfigModal
                modalKey="currency-columns"
                tableConfigKey="currency"
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
        onDelete={deleteCurrencyMutate}
        modalKey="currency-detail"
        tableConfigKey="currency"
      />
    </PageContainer>
  )
}

const Container = styled.div``
