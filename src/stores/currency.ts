import { Currency } from '@/models'
import create from 'zustand'

type CurerncyState = {
  currencies: Currency[]
  setCurrencies: (currencies: Currency[]) => void
}

export const useCurrencyStore = create<CurerncyState>()(set => ({
  currencies: [],
  setCurrencies: currencies => {
    set({ currencies })
  },
}))
