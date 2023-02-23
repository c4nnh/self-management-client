import { TransactionParams } from '@/models'
import create from 'zustand'

type TransactionFilterState = {
  params?: TransactionParams
  setParams: (params: TransactionParams) => void
  resetParams: () => void
}

export const useTransactionFilter = create<TransactionFilterState>()(
  (set, get) => ({
    setParams: params => {
      const oldParams = get().params
      set({
        params: {
          ...oldParams,
          ...params,
        },
      })
    },
    resetParams: () => {
      set({
        params: {},
      })
    },
  })
)
