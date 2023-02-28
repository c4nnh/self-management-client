import {
  useDeleteAssetMutation,
  useDeleteMultipleAssetsMutation,
  useGetAssetsQuery,
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
import { Asset as TAsset } from '@/models'
import { useAppStore, useAssetFilter } from '@/stores'
import { useQueryClient } from '@tanstack/react-query'
import { notification } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AssetDetail } from './Detail'
import { AssetFilter } from './Filter'

export const Asset: React.FC = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { selectedIds, columnLabel, setSelectedIds } = useAppStore()
  const pagination = usePagination()
  const { params, setParams } = useAssetFilter()
  const sorter = useSorter<TAsset>()

  useEffect(() => {
    setSelectedIds([])
  }, [params])

  const { data, isFetching } = useGetAssetsQuery(
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

  const { mutateAsync: deleteAssetMutate } = useDeleteAssetMutation({
    onSuccess: async () => {
      if (data?.items.length === 1) {
        pagination.handleAfterDeleteLastItemsInCurrentPage()
      } else {
        queryClient.invalidateQueries(['getAssets'])
      }
    },
    onError: () => {
      notification.error({ message: t('common.error.deleteFailed') })
    },
  })

  const { mutateAsync: deleteMultipleAssetsMutate } =
    useDeleteMultipleAssetsMutation({
      onSuccess: async () => {
        if (
          selectedIds.length === data?.items?.length &&
          (pagination.current || 1) > 1
        ) {
          pagination.handleAfterDeleteLastItemsInCurrentPage()
        } else {
          queryClient.invalidateQueries(['getAssets'])
        }
      },
      onError: () => {
        notification.error({ message: t('common.error.deleteFailed') })
      },
    })

  const columns: ColumnsType<TAsset> = [
    {
      title: columnLabel?.asset.id,
      dataIndex: 'id',
      sorter: true,
    },
    {
      title: columnLabel?.asset.name,
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: columnLabel?.asset.price,
      dataIndex: 'price',
      sorter: true,
      render: (_, asset) => (
        <div className="flex gap-1 items-center">
          <TextNumber value={asset.price} />
          <span className="text-gray-500 font-light">
            {`${asset.currency.symbol} - ${asset.currency.code}`}
          </span>
        </div>
      ),
    },
    {
      title: columnLabel?.asset.boughtDate,
      dataIndex: 'boughtDate',
      render: value => dayjs(value).format(DATE_FORMAT),
      sorter: true,
    },
    {
      title: columnLabel?.asset.images,
      dataIndex: 'images',
      render: (images: string[]) => images.length,
    },
    {
      title: columnLabel?.asset.description,
      dataIndex: 'description',
      sorter: true,
      render: (value: string) => <EllipsisText text={value} />,
    },
  ]

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle title={t('asset.pageTitle')} />
        <TableActionsContainer
          leftChildren={
            <SearchInput
              value={params?.search}
              setValue={search => setParams({ search })}
              searchProps={{
                placeholder: `${t('asset.search.placeholder')}`,
              }}
            />
          }
          rightChildren={
            <>
              <DeleteMultiple onDelete={deleteMultipleAssetsMutate} />
              <AssetDetail />
              <AssetFilter />
              <ColumnConfigModal
                modalKey="asset-columns"
                tableConfigKey="asset"
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
        onDelete={deleteAssetMutate}
        modalKey="asset-detail"
        tableConfigKey="asset"
      />
    </PageContainer>
  )
}
