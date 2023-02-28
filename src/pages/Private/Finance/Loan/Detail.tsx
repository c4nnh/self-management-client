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
  OpenCreateButton,
} from '@/components'
import { CreateLoanDto, UpdateLoanDto } from '@/models'
import { useAppStore, useAuthStore, useCurrencyStore } from '@/stores'
import { requiredField } from '@/utils'
import { useQueryClient } from '@tanstack/react-query'
import { Form, notification } from 'antd'
import dayjs from 'dayjs'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const LoanDetail: React.FC = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const formMethods = useForm<CreateLoanDto | UpdateLoanDto>()
  const { handleSubmit, reset, formState } = formMethods
  const { isDirty } = formState
  const { user } = useAuthStore()
  const { openModal, selectedId, setOpenModal, setSelectedId } = useAppStore()
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
        queryClient.invalidateQueries(['getLoanDetail'])
      },
      onError: () => {
        notification.error({ message: t('loan.update.error') })
      },
    })

  const { isFetching: isFetchingDetail } = useGetLoanDetailQuery(selectedId!, {
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
    createLoanMutate(dto as CreateLoanDto)
  })

  const handleUpdate = handleSubmit(dto => {
    updateLoanMutate(dto as UpdateLoanDto)
  })

  return (
    <>
      <OpenCreateButton modalKey="loan-detail" />
      <FormProvider {...formMethods}>
        <CreateModal
          title={selectedId ? t('loan.detail.title') : t('loan.create.title')}
          isLoading={isFetchingDetail}
          open={openModal === 'loan-detail'}
          closable={false}
          onCancel={() => {
            setSelectedId()
            setOpenModal()
            if (selectedId) {
              queryClient.cancelQueries(['getLoanDetail'])
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
          </Form>
        </CreateModal>
      </FormProvider>
    </>
  )
}
