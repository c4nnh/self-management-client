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
    id: false,
    name: true,
  },
}
