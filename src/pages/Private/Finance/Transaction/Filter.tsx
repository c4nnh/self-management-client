import { Dayjs } from 'dayjs'
import { useTranslation } from 'react-i18next'
import {
  FilterModal,
  FormCheckbox,
  FormDateRangePicker,
  FormInput,
} from '../../../../components'
import { DATE_FORMAT_FILTER } from '../../../../constants'
import { useScreen } from '../../../../hooks'
import { TransactionParams, TransactionType } from '../../../../models'
import { useTransactionFilter } from '../../../../stores'

type FilterDto = Pick<TransactionParams, 'title' | 'types'> & {
  dateRange: [Dayjs?, Dayjs?]
  amountRange: [number?, number?]
}

export const TransactionFilter: React.FC = () => {
  const { t } = useTranslation()
  const { isMobile } = useScreen()
  const { setTransactionParams, params } = useTransactionFilter()
  const onSearch = (dto: FilterDto) => {
    const { dateRange, amountRange, ...params } = dto
    const [dateFrom, dateTo] = dateRange || [null, null]

    setTransactionParams({
      ...params,
      dateFrom: dateFrom ? dateFrom.format(DATE_FORMAT_FILTER) : undefined,
      dateTo: dateTo ? dateTo.format(DATE_FORMAT_FILTER) : undefined,
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
      {isMobile && <FormInput name="title" label={t('common.title')} />}
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
