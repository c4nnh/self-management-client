import create from 'zustand'

type ImageState = {
  hasError?: boolean
  setHasError: (hasError: boolean) => void
  isChanged?: boolean
  setIsChanged: (isChanged: boolean) => void
}

export const useImageStore = create<ImageState>()(set => ({
  setHasError: hasError => {
    set({ hasError })
  },
  setIsChanged: isChanged => {
    set({ isChanged })
  },
}))
