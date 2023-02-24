import { ColumnConfig, ModalKey } from '@/models'
import create from 'zustand'

type AppState = {
  openModal?: ModalKey
  selectedId?: string
  selectedIds: string[]
  columnLabel?: ColumnConfig<string>
  setOpenModal: (openModal?: ModalKey) => void
  setSelectedId: (id?: string) => void
  setSelectedIds: (ids: string[]) => void
  setColumnLabel: (columnLabel: ColumnConfig<string>) => void
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
  setColumnLabel: columnLabel => {
    set({ columnLabel })
  },
}))
