import {
  useCreateLoanMutation,
  useGetLoanDetailQuery,
  useUpdateLoanMutation,
} from '@/apis'
import {
  CreateModal,
  FormDatePicker,
  FormInput,
  FormNumberInput,
  FormSelect,
  FormTextArea,
} from '@/components'
import { CreateLoanDto, UpdateLoanDto } from '@/models'
import { useAppStore, useAuthStore, useCurrencyStore } from '@/stores'
import { requiredField } from '@/utils'
import { useQueryClient } from '@tanstack/react-query'
import { notification } from 'antd'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

export const LoanDetail: React.FC = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { user } = useAuthStore()
  const { selectedId, setOpenModal, setSelectedId } = useAppStore()
  const { currencies } = useCurrencyStore()

  const { mutate: createLoanMutate, isLoading: isCreating } =
    useCreateLoanMutation({
      onSuccess: () => {
        notification.success({ message: t('loan.create.success') })
        queryClient.invalidateQueries(['getLoans'])
        setOpenModal()
      },
      onError: () => {
        notification.error({ message: t('loan.create.error') })
      },
    })

  const { mutate: updateLoanMutate, isLoading: isUpdating } =
    useUpdateLoanMutation({
      onSuccess: () => {
        notification.success({ message: t('loan.update.success') })
        queryClient.invalidateQueries(['getLoans'])
        setOpenModal()
      },
      onError: () => {
        notification.error({ message: t('loan.update.error') })
      },
    })

  const { data: loanDetail, isFetching: isFetchingDetail } =
    useGetLoanDetailQuery(selectedId!, {
      enabled: !!selectedId,
      onError: () => {
        setSelectedId()
        setOpenModal()
        notification.error({ message: t('common.error.system') })
      },
    })

  return (
    <CreateModal<CreateLoanDto, UpdateLoanDto>
      modalKey="loan-detail"
      modalProps={{
        title: selectedId ? t('loan.detail.title') : t('loan.create.title'),
        isLoading: isFetchingDetail,
        okButtonProps: {
          disabled: !!selectedId && isFetchingDetail,
          loading: isCreating || isUpdating,
        },
      }}
      defaultValues={loanDetail}
      onCreate={createLoanMutate}
      onUpdate={updateLoanMutate}
    >
      <FormInput
        name="debtor"
        label={t('loan.debtor')}
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
