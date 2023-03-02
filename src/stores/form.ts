import create from 'zustand'

type FormState = {
  hasImageError?: boolean
  setHasImageError: (hasImageError: boolean) => void
  isChanged?: boolean
  setIsChanged: (isChanged: boolean) => void
  defaultValues?: Record<string, any>
  setDefaultValues: (defaultValues: Record<string, any>) => void
}

export const useFormStore = create<FormState>()(set => ({
  setHasImageError: hasImageError => {
    set({ hasImageError })
  },
  setIsChanged: isChanged => {
    set({ isChanged })
  },
  setDefaultValues: defaultValues => {
    set({ defaultValues })
  },
}))
