import create from 'zustand'

type AppState = {
  openModal?: boolean
  selectedId?: string
  setOpenModal: (openModal?: boolean) => void
  setSelectedId: (id?: string) => void
}

export const useAppStore = create<AppState>()(set => ({
  setOpenModal: openModal => {
    set({
      openModal,
    })
  },
  setSelectedId: selectedId => {
    set({
      selectedId,
    })
  },
}))
