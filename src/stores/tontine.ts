import { TontineParams } from '@/models'
import create from 'zustand'

type TontineState = {
  params?: TontineParams
  setParams: (params: TontineParams) => void
  resetParams: () => void
}

export const useTontineStore = create<TontineState>()((set, get) => ({
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
