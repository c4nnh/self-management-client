import { AssetParams } from '@/models'
import create from 'zustand'

type AssetFilterState = {
  params?: AssetParams
  setParams: (params: AssetParams) => void
  resetParams: () => void
}

export const useAssetFilter = create<AssetFilterState>()((set, get) => ({
  setParams: params => {
    const oldParams = get().params
    set({
      params: {
        ...oldParams,
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
