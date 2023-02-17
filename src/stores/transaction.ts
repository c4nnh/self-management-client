import create from 'zustand'
import { TransactionParams } from '../models'

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
