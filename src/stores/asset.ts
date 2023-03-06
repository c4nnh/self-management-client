import { AssetParams } from '@/models'
import create from 'zustand'

type AssetState = {
  params?: AssetParams
  setParams: (params: AssetParams) => void
  resetParams: () => void
}

export const useAssetStore = create<AssetState>()((set, get) => ({
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
