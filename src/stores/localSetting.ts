import create from 'zustand'
import { persist } from 'zustand/middleware'

export type LocalSettingState = {
  pageSize?: number
  setPageSize: (value: number) => void
}

export const useLocalSettingStore = create<LocalSettingState>()(
  persist(
    set => ({
      setPageSize: value => {
        set({ pageSize: value })
      },
    }),
    {
      name: 'self-management-setting',
    }
  )
)
