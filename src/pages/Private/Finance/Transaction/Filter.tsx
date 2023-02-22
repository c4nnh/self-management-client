import { Dayjs } from 'dayjs'
import { useTranslation } from 'react-i18next'
import {
  FilterModal,
  FormCheckbox,
  FormDateRangePicker,
  FormInput,
} from '../../../../components'
import { TransactionParams, TransactionType } from '../../../../models'
import { useTransactionFilter } from '../../../../stores'
import { convertDateRangeToDateFilter } from '../../../../utils'

type FilterDto = Pick<TransactionParams, 'title' | 'types'> & {
  dateRange: [Dayjs?, Dayjs?]
  amountRange: [number?, number?]
}

export const TransactionFilter: React.FC = () => {
  const { t } = useTranslation()
  const { setTransactionParams, params } = useTransactionFilter()
  const onSearch = (dto: FilterDto) => {
    const { dateRange, amountRange, ...params } = dto

    setTransactionParams({
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
    </FilterModal>
  )
}
