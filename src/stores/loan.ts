import { LoanParams } from '@/models'
import create from 'zustand'

type LoanFilterState = {
  params?: LoanParams
  setParams: (params: LoanParams) => void
  resetParams: () => void
}

export const useLoanFilter = create<LoanFilterState>()((set, get) => ({
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
