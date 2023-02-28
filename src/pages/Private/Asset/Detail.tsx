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
  OpenCreateButton,
} from '@/components'
import { CreateAssetDto, UpdateAssetDto } from '@/models'
import { useAppStore, useAuthStore, useCurrencyStore } from '@/stores'
import { requiredField } from '@/utils'
import { useQueryClient } from '@tanstack/react-query'
import { Form, notification } from 'antd'
import dayjs from 'dayjs'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const AssetDetail: React.FC = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const formMethods = useForm<CreateAssetDto | UpdateAssetDto>()
  const { handleSubmit, reset, formState } = formMethods
  const { isDirty } = formState
  const { user } = useAuthStore()
  const { openModal, selectedId, setOpenModal, setSelectedId } = useAppStore()
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
      onSuccess: () => {
        notification.success({ message: t('asset.update.success') })
        queryClient.invalidateQueries(['getAssets'])
        queryClient.invalidateQueries(['getAssetDetail'])
      },
      onError: () => {
        notification.error({ message: t('asset.update.error') })
      },
    })

  const { isFetching: isFetchingDetail } = useGetAssetDetailQuery(selectedId!, {
    enabled: !!selectedId,
    onSuccess: data => {
      reset(data)
    },
    onError: () => {
      setSelectedId()
      setOpenModal()
      notification.error({ message: t('common.error.system') })
    },
  })

  const handleCreate = handleSubmit(dto => {
    createAssetMutate(dto as CreateAssetDto)
  })

  const handleUpdate = handleSubmit(dto => {
    updateAssetMutate(dto as UpdateAssetDto)
  })

  return (
    <>
      <OpenCreateButton modalKey="asset-detail" />
      <FormProvider {...formMethods}>
        <CreateModal
          title={selectedId ? t('asset.detail.title') : t('asset.create.title')}
          isLoading={isFetchingDetail}
          open={openModal === 'asset-detail'}
          closable={false}
          onCancel={() => {
            setSelectedId()
            setOpenModal()
            if (selectedId) {
              queryClient.cancelQueries(['getAssetDetail'])
            }
          }}
          okText={selectedId ? t('common.save') : t('common.create')}
          onOk={() => {
            selectedId ? handleUpdate() : handleCreate()
          }}
          okButtonProps={{
            disabled: !isDirty || (!!selectedId && isFetchingDetail),
            loading: isCreating || isUpdating,
          }}
        >
          <Form layout="vertical" size="middle" className="flex flex-col">
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
          </Form>
        </CreateModal>
      </FormProvider>
    </>
  )
}
