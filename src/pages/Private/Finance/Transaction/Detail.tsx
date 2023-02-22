import {
  useCreateTransactionMutation,
  useGetTransactiongetDetailQuery,
  useUpdateTransactionMutation,
} from '@/apis'
import {
  FormDatePicker,
  FormInput,
  FormNumberInput,
  FormRadio,
  FormSelect,
  FormTextArea,
  Modal,
  OpenCreateButton,
} from '@/components'
import {
  CreateTransactionDto,
  TransactionType,
  UpdateTransactionDto,
} from '@/models'
import { useAppStore, useAuthStore, useCurrencyStore } from '@/stores'
import { requiredField } from '@/utils'
import { useQueryClient } from '@tanstack/react-query'
import { Form, notification } from 'antd'
import dayjs from 'dayjs'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const TransactionDetail: React.FC = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const formMethods = useForm<CreateTransactionDto | UpdateTransactionDto>()
  const { handleSubmit, reset, formState } = formMethods
  const { isDirty } = formState
  const { user } = useAuthStore()
  const { openModal, selectedId, setOpenModal, setSelectedId } = useAppStore()
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
        queryClient.invalidateQueries(['getTransactionDetail'])
      },
      onError: () => {
        notification.error({ message: t('transaction.update.error') })
      },
    })
  const { isFetching: isFetchingDetail } = useGetTransactiongetDetailQuery(
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
    createTransactionMutate(dto as CreateTransactionDto)
  })

  const handleUpdate = handleSubmit(dto => {
    updateTransactionMutate(dto as UpdateTransactionDto)
  })

  return (
    <>
      <OpenCreateButton modalKey="transaction-detail" />
      <Modal
        title={
          selectedId
            ? t('transaction.detail.title')
            : t('transaction.create.title')
        }
        isLoading={isFetchingDetail}
        open={openModal === 'transaction-detail'}
        closable={false}
        onCancel={() => {
          setSelectedId()
          setOpenModal()
          if (selectedId) {
            queryClient.cancelQueries(['getTransactionDetail'])
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
        <FormProvider {...formMethods}>
          <Form layout="vertical" size="middle" className="flex flex-col">
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
              numericFormatProps={{
                decimalScale: 2,
                thousandSeparator: ',',
              }}
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
              defaultValue={user?.currency?.id}
              options={currencies.map(item => ({
                value: item.id,
                label: item.name,
              }))}
              rules={requiredField(t)}
            />
          </Form>
        </FormProvider>
      </Modal>
    </>
  )
}
