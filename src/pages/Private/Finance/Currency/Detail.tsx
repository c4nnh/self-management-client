import {
  useCreateCurrencyMutation,
  useGetCurrencyDetailQuery,
  useUpdateCurrencyMutation,
} from '@/apis'
import { CreateModal, FormInput } from '@/components'
import { CreateCurrencyDto, UpdateCurrencyDto } from '@/models'
import { useAppStore, useFormStore } from '@/stores'
import { requiredField } from '@/utils'
import { useQueryClient } from '@tanstack/react-query'
import { notification } from 'antd'
import { useTranslation } from 'react-i18next'

export const CurrencyDetail: React.FC = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { selectedId, setOpenModal, setSelectedId } = useAppStore()
  const { setDefaultValues } = useFormStore()

  const { mutate: createCurrencyMutate, isLoading: isCreating } =
    useCreateCurrencyMutation({
      onSuccess: () => {
        notification.success({ message: t('currency.create.success') })
        queryClient.invalidateQueries(['getCurrencies'])
        setOpenModal()
      },
      onError: () => {
        notification.error({ message: t('currency.create.error') })
      },
    })

  const { mutate: updateCurrencyMutate, isLoading: isUpdating } =
    useUpdateCurrencyMutation({
      onSuccess: (_, dto) => {
        notification.success({ message: t('currency.update.success') })
        queryClient.invalidateQueries(['getCurrencies'])
        setDefaultValues(dto)
      },
      onError: () => {
        notification.error({ message: t('currency.update.error') })
      },
    })

  const { isFetching: isFetchingDetail } = useGetCurrencyDetailQuery(
    selectedId!,
    {
      enabled: !!selectedId,
      onSuccess: setDefaultValues,
      onError: () => {
        setSelectedId()
        setOpenModal()
        notification.error({ message: t('common.error.system') })
      },
    }
  )

  return (
    <CreateModal<CreateCurrencyDto, UpdateCurrencyDto>
      modalKey="currency-detail"
      modalProps={{
        title: selectedId
          ? t('currency.detail.title')
          : t('currency.create.title'),
        isLoading: isFetchingDetail,
        okButtonProps: {
          disabled: !!selectedId && isFetchingDetail,
          loading: isCreating || isUpdating,
        },
      }}
      onCreate={createCurrencyMutate}
      onUpdate={updateCurrencyMutate}
    >
      <FormInput
        name="name"
        label={t('common.name')}
        rules={requiredField(t)}
      />
      <FormInput
        name="symbol"
        label={t('common.symbol')}
        rules={requiredField(t)}
      />
      <FormInput
        name="code"
        label={t('common.code')}
        rules={requiredField(t)}
      />
    </CreateModal>
  )
}
