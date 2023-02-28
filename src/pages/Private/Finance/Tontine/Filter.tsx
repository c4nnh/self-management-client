import {
  FilterModal,
  FormDateRangePicker,
  FormInput,
  FormNumberRange,
} from '@/components'
import { TontineParams } from '@/models'
import { useTontineFilter } from '@/stores'
import { convertDateRangeToDateFilter } from '@/utils'
import { Dayjs } from 'dayjs'
import { useTranslation } from 'react-i18next'

type FilterDto = Pick<TontineParams, 'description'> & {
  dateRange: [Dayjs?, Dayjs?]
  amountRange: [number?, number?]
}

export const TontineFilter: React.FC = () => {
  const { t } = useTranslation()
  const { params, setParams, resetParams } = useTontineFilter()
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
      modalKey="tontine-filter"
      modalProps={{
        title: t('tontine.filter.title'),
      }}
      onReset={resetParams}
    >
      <FormInput
        name="description"
        label={t('common.description')}
        inputProps={{
          placeholder: `${t('tontine.search.placeholder')}`,
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
