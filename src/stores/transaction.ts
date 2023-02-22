import { TransactionParams } from '@/models'
import create from 'zustand'

type TransactionFilterState = {
  params?: TransactionParams
  setTransactionParams: (params: TransactionParams) => void
}

export const useTransactionFilter = create<TransactionFilterState>()(
  (set, get) => ({
    setTransactionParams: params => {
      const oldParams = get().params
      set({
        params: {
          ...oldParams,
          ...params,
        },
      })
    },
  })
)
