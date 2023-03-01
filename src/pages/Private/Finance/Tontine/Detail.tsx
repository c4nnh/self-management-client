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
} from '@/components'
import { useAppStore, useAuthStore, useCurrencyStore } from '@/stores'
import { requiredField } from '@/utils'
import { useQueryClient } from '@tanstack/react-query'
import { notification } from 'antd'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

export const TontineDetail: React.FC = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { user } = useAuthStore()
  const { selectedId, setOpenModal, setSelectedId } = useAppStore()
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
      },
      onError: () => {
        notification.error({ message: t('tontine.update.error') })
      },
    })

  const { data: tontineDetail, isFetching: isFetchingDetail } =
    useGetTontineDetailQuery(selectedId!, {
      enabled: !!selectedId,
      onError: () => {
        setSelectedId()
        setOpenModal()
        notification.error({ message: t('common.error.system') })
      },
    })

  return (
    <CreateModal
      modalKey="tontine-detail"
      modalProps={{
        title: selectedId
          ? t('tontine.detail.title')
          : t('tontine.create.title'),
        isLoading: isFetchingDetail,
        okButtonProps: {
          disabled: !!selectedId && isFetchingDetail,
          loading: isCreating || isUpdating,
        },
      }}
      defaultValues={tontineDetail}
      onCreate={createTontineMutate}
      onUpdate={updateTontineMutate}
    >
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
    </CreateModal>
  )
}
