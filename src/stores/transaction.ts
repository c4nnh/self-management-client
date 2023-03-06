import { TransactionParams } from '@/models'
import create from 'zustand'

type TransactionState = {
  params?: TransactionParams
  setParams: (params: TransactionParams) => void
  resetParams: () => void
}

export const useTransactionStore = create<TransactionState>()((set, get) => ({
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
}))
