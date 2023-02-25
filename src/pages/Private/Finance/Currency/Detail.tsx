import {
  useCreateCurrencyMutation,
  useGetCurrencyDetailQuery,
  useUpdateCurrencyMutation,
} from '@/apis'
import { CreateModal, FormInput, OpenCreateButton } from '@/components'
import { CreateCurrencyDto, UpdateCurrencyDto } from '@/models'
import { useAppStore } from '@/stores'
import { requiredField } from '@/utils'
import { useQueryClient } from '@tanstack/react-query'
import { Form, notification } from 'antd'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const CurrencyDetail: React.FC = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const formMethods = useForm<CreateCurrencyDto | UpdateCurrencyDto>()
  const { handleSubmit, reset, formState } = formMethods
  const { isDirty } = formState
  const { openModal, selectedId, setOpenModal, setSelectedId } = useAppStore()

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

  const { isFetching: isFetchingDetail } = useGetCurrencyDetailQuery(
    selectedId!,
    {
      enabled: !!selectedId,
      onSuccess: data => {
        reset(data)
      },
      onError: () => {
        setSelectedId()
        setOpenModal()
        notification.error({ message: t('common.error.system') })
      },
    }
  )

  const handleCreate = handleSubmit(dto => {
    createCurrencyMutate(dto as CreateCurrencyDto)
  })

  const handleUpdate = handleSubmit(dto => {
    updateCurrencyMutate(dto as UpdateCurrencyDto)
  })

  return (
    <>
      <OpenCreateButton modalKey="currency-detail" />
      <FormProvider {...formMethods}>
        <CreateModal
          title={
            selectedId ? t('currency.detail.title') : t('currency.create.title')
          }
          isLoading={isFetchingDetail}
          open={openModal === 'currency-detail'}
          closable={false}
          onCancel={() => {
            setSelectedId()
            setOpenModal()
            if (selectedId) {
              queryClient.cancelQueries(['getCurrencyDetail'])
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
      </FormProvider>
    </>
  )
}
