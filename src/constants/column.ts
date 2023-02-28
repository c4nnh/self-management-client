import { ColumnConfig } from '@/models'

export const DEFAULT_COLUMN_CONFIG: ColumnConfig<boolean> = {
  transaction: {
    id: false,
    title: true,
    type: true,
    amount: true,
    date: true,
    description: false,
  },
  currency: {
    id: true,
    name: true,
    symbol: true,
    code: true,
  },
  loan: {
    id: false,
    debtor: true,
    amount: true,
    date: true,
    description: false,
  },
  tontine: {
    id: false,
    amount: true,
    date: true,
    description: false,
  },
}
