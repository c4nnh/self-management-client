import create from 'zustand'
import { Currency } from '../models'

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
