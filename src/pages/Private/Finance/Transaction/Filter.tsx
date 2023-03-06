import {
  FilterModal,
  FormCheckbox,
  FormDateRangePicker,
  FormInput,
  FormNumberRange,
} from '@/components'
import { TransactionParams, TransactionType } from '@/models'
import { useTransactionStore } from '@/stores'
import { convertDateRangeToDateFilter } from '@/utils'
import { Dayjs } from 'dayjs'
import { useTranslation } from 'react-i18next'

type FilterDto = Pick<TransactionParams, 'title' | 'types'> & {
  dateRange: [Dayjs?, Dayjs?]
}

export const TransactionFilter: React.FC = () => {
  const { t } = useTranslation()
  const { params, setParams, resetParams } = useTransactionStore()
  const onSearch = (dto: FilterDto) => {
    const { dateRange, ...params } = dto

    setParams({
      ...params,
      ...convertDateRangeToDateFilter(dateRange),
    })
  }

  return (
    <FilterModal<FilterDto>
      onApply={onSearch}
      defaultValues={{
        ...params,
        dateRange: [params?.dateFrom, params?.dateTo],
      }}
      modalKey="transaction-filter"
      modalProps={{
        title: t('transaction.filter.title'),
      }}
      onReset={resetParams}
    >
      <FormInput name="title" label={t('common.title')} />
      <FormCheckbox<TransactionType>
        name="types"
        label={t('transaction.type.title')}
        options={[
          {
            label: TransactionType.EXPENSE,
            value: TransactionType.EXPENSE,
          },
          {
            label: TransactionType.INCOME,
            value: TransactionType.INCOME,
          },
        ]}
      />
      <FormDateRangePicker name="dateRange" label={t('common.date')} />
      <FormNumberRange
        label={t('common.amount')}
        from={{
          name: 'amountFrom',
          numericFormatProps: {
            allowNegative: false,
          },
        }}
        to={{
          name: 'amountTo',
          numericFormatProps: {
            allowNegative: false,
          },
        }}
      />
    </FilterModal>
  )
}
