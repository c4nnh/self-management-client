import {
  useCreateAssetMutation,
  useGetAssetDetailQuery,
  useUpdateAssetMutation,
} from '@/apis'
import {
  CreateModal,
  FormDatePicker,
  FormInput,
  FormNumberInput,
  FormSelect,
  FormTextArea,
  FormUploadImages,
} from '@/components'
import { CreateAssetDto, UpdateAssetDto } from '@/models'
import {
  useAppStore,
  useAuthStore,
  useCurrencyStore,
  useFormStore,
} from '@/stores'
import { requiredField } from '@/utils'
import { useQueryClient } from '@tanstack/react-query'
import { notification } from 'antd'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

export const AssetDetail: React.FC = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { user } = useAuthStore()
  const { selectedId, setOpenModal, setSelectedId } = useAppStore()
  const { defaultValues, setDefaultValues, setIsChanged } = useFormStore()
  const { currencies } = useCurrencyStore()

  const { mutate: createAssetMutate, isLoading: isCreating } =
    useCreateAssetMutation({
      onSuccess: () => {
        notification.success({ message: t('asset.create.success') })
        queryClient.invalidateQueries(['getAssets'])
        setOpenModal()
      },
      onError: () => {
        notification.error({ message: t('asset.create.error') })
      },
    })

  const { mutate: updateAssetMutate, isLoading: isUpdating } =
    useUpdateAssetMutation({
      onSuccess: (_, dto) => {
        notification.success({ message: t('asset.update.success') })
        queryClient.invalidateQueries(['getAssets'])
        setDefaultValues(dto)
        setIsChanged(false)
      },
      onError: () => {
        notification.error({ message: t('asset.update.error') })
      },
    })

  const { data: assetDetail, isFetching: isFetchingDetail } =
    useGetAssetDetailQuery(selectedId!, {
      onSuccess: setDefaultValues,
      enabled: !!selectedId,
      onError: () => {
        setSelectedId()
        setOpenModal()
        notification.error({ message: t('common.error.system') })
      },
    })

  return (
    <CreateModal<CreateAssetDto, UpdateAssetDto>
      modalKey="asset-detail"
      modalProps={{
        title: selectedId ? t('asset.detail.title') : t('asset.create.title'),
        isLoading: isFetchingDetail,
        okButtonProps: {
          disabled: !!selectedId && isFetchingDetail,
          loading: isCreating || isUpdating,
        },
      }}
      onCreate={createAssetMutate}
      onUpdate={updateAssetMutate}
    >
      <FormInput
        name="name"
        label={t('common.name')}
        rules={requiredField(t)}
      />
      <FormNumberInput
        name="price"
        label={t('asset.price')}
        rules={requiredField(t)}
      />
      <FormDatePicker
        name="boughtDate"
        label={t('asset.boughtDate')}
        datePickerProps={{
          disabledDate: currentDate => {
            return dayjs(currentDate) > dayjs()
          },
        }}
      />
      <FormTextArea name="description" label={t('common.description')} />
      <FormSelect
        name="currencyId"
        label={t('common.currency')}
        defaultValue={currencies.length ? user?.currency?.id : undefined}
        options={currencies.map(item => ({
          value: item.id,
          label: `${item.symbol} - ${item.code}`,
        }))}
        rules={requiredField(t)}
      />
      <FormUploadImages
        name="images"
        initialUrls={assetDetail?.images}
        label={t('common.images')}
      />
    </CreateModal>
  )
}
