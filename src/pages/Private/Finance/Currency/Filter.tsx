import { FilterModal, FormInput } from '@/components'
import { CurrencyParams } from '@/models'
import { useCurrencyStore } from '@/stores'
import { useTranslation } from 'react-i18next'

export const CurrencyFilter: React.FC = () => {
  const { t } = useTranslation()
  const { params, setParams, resetParams } = useCurrencyStore()
  const onSearch = (dto: CurrencyParams) => {
    setParams(dto)
  }

  return (
    <FilterModal<CurrencyParams>
      onApply={onSearch}
      defaultValues={params}
      modalKey="currency-filter"
      modalProps={{
        title: t('currency.filter.title'),
      }}
      onReset={resetParams}
    >
      <FormInput name="name" label={t('common.name')} />
    </FilterModal>
  )
}
