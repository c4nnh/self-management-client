import {
  FilterModal,
  FormDateRangePicker,
  FormInput,
  FormNumberRange,
} from '@/components'
import { AssetParams } from '@/models'
import { useAssetStore } from '@/stores'
import { convertDateRangeToDateFilter } from '@/utils'
import { Dayjs } from 'dayjs'
import { useTranslation } from 'react-i18next'

type FilterDto = Pick<AssetParams, 'search'> & {
  dateRange: [Dayjs?, Dayjs?]
}

export const AssetFilter: React.FC = () => {
  const { t } = useTranslation()
  const { params, setParams, resetParams } = useAssetStore()
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
        dateRange: [params?.boughtDateFrom, params?.boughtDateTo],
      }}
      modalKey="asset-filter"
      modalProps={{
        title: t('asset.filter.title'),
      }}
      onReset={resetParams}
    >
      <FormInput
        name="search"
        label={t('common.keyword')}
        inputProps={{
          placeholder: `${t('asset.search.placeholder')}`,
        }}
      />
      <FormDateRangePicker name="dateRange" label={t('asset.boughtDate')} />
      <FormNumberRange
        label={t('asset.price')}
        from={{
          name: 'priceFrom',
          numericFormatProps: {
            allowNegative: false,
          },
        }}
        to={{
          name: 'priceTo',
          numericFormatProps: {
            allowNegative: false,
          },
        }}
      />
    </FilterModal>
  )
}
