import { LoanParams } from '@/models'
import create from 'zustand'

type LoanState = {
  params?: LoanParams
  setParams: (params: LoanParams) => void
  resetParams: () => void
}

export const useLoanStore = create<LoanState>()((set, get) => ({
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
