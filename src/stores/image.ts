import create from 'zustand'

type ImageState = {
  hasError?: boolean
  setHasError: (hasError: boolean) => void
}

export const useImageStore = create<ImageState>()(set => ({
  setHasError: hasError => {
    set({ hasError })
  },
}))
