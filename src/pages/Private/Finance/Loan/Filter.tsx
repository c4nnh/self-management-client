import {
  FilterModal,
  FormDateRangePicker,
  FormInput,
  FormNumberRange,
} from '@/components'
import { LoanParams } from '@/models'
import { useLoanFilter } from '@/stores'
import { convertDateRangeToDateFilter } from '@/utils'
import { Dayjs } from 'dayjs'
import { useTranslation } from 'react-i18next'

type FilterDto = Pick<LoanParams, 'search'> & {
  dateRange: [Dayjs?, Dayjs?]
  amountRange: [number?, number?]
}

export const LoanFilter: React.FC = () => {
  const { t } = useTranslation()
  const { params, setParams, resetParams } = useLoanFilter()
  const onSearch = (dto: FilterDto) => {
    const { dateRange, amountRange, ...params } = dto

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
      modalKey="loan-filter"
      modalProps={{
        title: t('loan.filter.title'),
      }}
      onReset={resetParams}
    >
      <FormInput
        name="search"
        label={t('common.keyword')}
        inputProps={{
          placeholder: `${t('loan.search.placeholder')}`,
        }}
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
