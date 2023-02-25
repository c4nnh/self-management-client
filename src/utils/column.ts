import { ColumnConfig } from '@/models'
import { TFunction } from 'i18next'

export const getColumnLabel = (t: TFunction): ColumnConfig<string> => ({
  transaction: {
    id: t('common.id'),
    title: t('common.title'),
    type: t('common.type'),
    amount: t('common.amount'),
    date: t('common.date'),
    description: t('common.description'),
  },
  currency: {
    id: t('common.id'),
    name: t('common.name'),
    symbol: t('common.symbol'),
    code: t('common.code'),
  },
})
