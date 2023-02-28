import { TontineParams } from '@/models'
import create from 'zustand'

type TontineFilterState = {
  params?: TontineParams
  setParams: (params: TontineParams) => void
  resetParams: () => void
}

export const useTontineFilter = create<TontineFilterState>()((set, get) => ({
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
