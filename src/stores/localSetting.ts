import { DEFAULT_COLUMN_CONFIG, LOCAL_STORAGE_KEYS } from '@/constants'
import { ColumnConfig } from '@/models'
import create from 'zustand'
import { persist } from 'zustand/middleware'

export type LocalSettingState = {
  pageSize?: number
  columnConfig: ColumnConfig<boolean>
  setColumnConfig: (column: Partial<ColumnConfig<boolean>>) => void
  setPageSize: (value: number) => void
}

export const useLocalSettingStore = create<LocalSettingState>()(
  persist(
    (set, get) => ({
      columnConfig: {
        transaction: DEFAULT_COLUMN_CONFIG.transaction,
        currency: DEFAULT_COLUMN_CONFIG.currency,
      },
      setColumnConfig: columnConfig => {
        set({
          columnConfig: {
            ...get().columnConfig,
            ...columnConfig,
          },
        })
      },
      setPageSize: value => {
        set({ pageSize: value })
      },
    }),
    {
      name: LOCAL_STORAGE_KEYS.SETTING,
    }
  )
)
