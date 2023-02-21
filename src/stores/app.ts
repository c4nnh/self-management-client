import create from 'zustand'

export type ModalKey =
  | 'transaction-detail'
  | 'transaction-filter'
  | 'transaction-columns'

type AppState = {
  openModal?: ModalKey
  selectedId?: string
  setOpenModal: (openModal?: ModalKey) => void
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
