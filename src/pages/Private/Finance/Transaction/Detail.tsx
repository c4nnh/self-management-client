import {
  useCreateTransactionMutation,
  useGetTransactionDetailQuery,
  useUpdateTransactionMutation,
} from '@/apis'
import {
  CreateModal,
  FormDatePicker,
  FormInput,
  FormNumberInput,
  FormRadio,
  FormSelect,
  FormTextArea,
} from '@/components'
import { TransactionType } from '@/models'
import { useAppStore, useAuthStore, useCurrencyStore } from '@/stores'
import { requiredField } from '@/utils'
import { useQueryClient } from '@tanstack/react-query'
import { notification } from 'antd'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

export const TransactionDetail: React.FC = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { user } = useAuthStore()
  const { selectedId, setOpenModal, setSelectedId } = useAppStore()
  const { currencies } = useCurrencyStore()

  const { mutate: createTransactionMutate, isLoading: isCreating } =
    useCreateTransactionMutation({
      onSuccess: () => {
        notification.success({ message: t('transaction.create.success') })
        queryClient.invalidateQueries(['getTransactions'])
        setOpenModal()
      },
      onError: () => {
        notification.error({ message: t('transaction.create.error') })
      },
    })

  const { mutate: updateTransactionMutate, isLoading: isUpdating } =
    useUpdateTransactionMutation({
      onSuccess: () => {
        notification.success({ message: t('transaction.update.success') })
        queryClient.invalidateQueries(['getTransactions'])
        setOpenModal()
      },
      onError: () => {
        notification.error({ message: t('transaction.update.error') })
      },
    })

  const { data: transactionDetail, isFetching: isFetchingDetail } =
    useGetTransactionDetailQuery(selectedId!, {
      enabled: !!selectedId,
      onError: () => {
        setSelectedId()
        setOpenModal()
        notification.error({ message: t('common.error.system') })
      },
    })

  return (
    <CreateModal
      modalKey="transaction-detail"
      modalProps={{
        title: selectedId
          ? t('transaction.detail.title')
          : t('transaction.create.title'),
        isLoading: isFetchingDetail,
        okButtonProps: {
          disabled: !!selectedId && isFetchingDetail,
          loading: isCreating || isUpdating,
        },
      }}
      defaultValues={transactionDetail}
      onCreate={createTransactionMutate}
      onUpdate={updateTransactionMutate}
    >
      <FormInput
        name="title"
        label={t('common.title')}
        rules={requiredField(t)}
      />
      <FormRadio
        name="type"
        label={t('transaction.type.title')}
        defaultValue={TransactionType.EXPENSE}
        options={[
          {
            value: TransactionType.EXPENSE,
            label: t('transaction.type.expense'),
          },
          {
            value: TransactionType.INCOME,
            label: t('transaction.type.income'),
          },
        ]}
        rules={requiredField(t)}
      />
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
