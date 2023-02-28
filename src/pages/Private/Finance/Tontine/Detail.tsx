import {
  useCreateTontineMutation,
  useGetTontineDetailQuery,
  useUpdateTontineMutation,
} from '@/apis'
import {
  CreateModal,
  FormDatePicker,
  FormNumberInput,
  FormSelect,
  FormTextArea,
  OpenCreateButton,
} from '@/components'
import { CreateTontineDto, UpdateTontineDto } from '@/models'
import { useAppStore, useAuthStore, useCurrencyStore } from '@/stores'
import { requiredField } from '@/utils'
import { useQueryClient } from '@tanstack/react-query'
import { Form, notification } from 'antd'
import dayjs from 'dayjs'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const TontineDetail: React.FC = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const formMethods = useForm<CreateTontineDto | UpdateTontineDto>()
  const { handleSubmit, reset, formState } = formMethods
  const { isDirty } = formState
  const { user } = useAuthStore()
  const { openModal, selectedId, setOpenModal, setSelectedId } = useAppStore()
  const { currencies } = useCurrencyStore()

  const { mutate: createTontineMutate, isLoading: isCreating } =
    useCreateTontineMutation({
      onSuccess: () => {
        notification.success({ message: t('tontine.create.success') })
        queryClient.invalidateQueries(['getTontines'])
        setOpenModal()
      },
      onError: () => {
        notification.error({ message: t('tontine.create.error') })
      },
    })

  const { mutate: updateTontineMutate, isLoading: isUpdating } =
    useUpdateTontineMutation({
      onSuccess: () => {
        notification.success({ message: t('tontine.update.success') })
        queryClient.invalidateQueries(['getTontines'])
        queryClient.invalidateQueries(['getTontineDetail'])
      },
      onError: () => {
        notification.error({ message: t('tontine.update.error') })
      },
    })

  const { isFetching: isFetchingDetail } = useGetTontineDetailQuery(
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
    createTontineMutate(dto as CreateTontineDto)
  })

  const handleUpdate = handleSubmit(dto => {
    updateTontineMutate(dto as UpdateTontineDto)
  })

  return (
    <>
      <OpenCreateButton modalKey="tontine-detail" />
      <FormProvider {...formMethods}>
        <CreateModal
          title={
            selectedId ? t('tontine.detail.title') : t('tontine.create.title')
          }
          isLoading={isFetchingDetail}
          open={openModal === 'tontine-detail'}
          closable={false}
          onCancel={() => {
            setSelectedId()
            setOpenModal()
            if (selectedId) {
              queryClient.cancelQueries(['getTontineDetail'])
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
            <FormNumberInput
              name="amount"
              label={t('common.amount')}
              rules={requiredField(t)}
            />
            <FormDatePicker
              name="date"
              label={t('common.date')}
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
