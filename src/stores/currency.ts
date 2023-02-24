import { Currency, CurrencyParams } from '@/models'
import create from 'zustand'

type CurerncyState = {
  currencies: Currency[]
  params?: CurrencyParams
  setCurrencies: (currencies: Currency[]) => void
  setParams: (params: CurrencyParams) => void
  resetParams: () => void
}

export const useCurrencyStore = create<CurerncyState>()((set, get) => ({
  currencies: [],
  setCurrencies: currencies => {
    set({ currencies })
  },
  setParams: params => {
    set({
      params: {
        ...get().params,
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
