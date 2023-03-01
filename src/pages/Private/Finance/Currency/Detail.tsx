import {
  useCreateCurrencyMutation,
  useGetCurrencyDetailQuery,
  useUpdateCurrencyMutation,
} from '@/apis'
import { CreateModal, FormInput } from '@/components'
import { CreateCurrencyDto, UpdateCurrencyDto } from '@/models'
import { useAppStore } from '@/stores'
import { requiredField } from '@/utils'
import { useQueryClient } from '@tanstack/react-query'
import { Form, notification } from 'antd'
import { useTranslation } from 'react-i18next'

export const CurrencyDetail: React.FC = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { selectedId, setOpenModal, setSelectedId } = useAppStore()

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
      onSuccess: () => {
        notification.success({ message: t('currency.update.success') })
        queryClient.invalidateQueries(['getCurrencies'])
        queryClient.invalidateQueries(['getCurrencyDetail'])
      },
      onError: () => {
        notification.error({ message: t('currency.update.error') })
      },
    })

  const { data: currencyDetail, isFetching: isFetchingDetail } =
    useGetCurrencyDetailQuery(selectedId!, {
      enabled: !!selectedId,
      onError: () => {
        setSelectedId()
        setOpenModal()
        notification.error({ message: t('common.error.system') })
      },
    })

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
      defaultValues={currencyDetail}
      onCreate={createCurrencyMutate}
      onUpdate={updateCurrencyMutate}
    >
      <Form layout="vertical" size="middle" className="flex flex-col">
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
      </Form>
    </CreateModal>
  )
}
