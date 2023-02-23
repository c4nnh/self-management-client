import create from 'zustand'

export type ModalKey =
  | 'transaction-detail'
  | 'transaction-filter'
  | 'transaction-columns'

type AppState = {
  openModal?: ModalKey
  selectedId?: string
  selectedIds: string[]
  setOpenModal: (openModal?: ModalKey) => void
  setSelectedId: (id?: string) => void
  setSelectedIds: (ids: string[]) => void
}

export const useAppStore = create<AppState>()(set => ({
  selectedIds: [],
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
  setSelectedIds: selectedIds => {
    set({
      selectedIds,
    })
  },
}))
