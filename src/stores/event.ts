import { EventsParams } from '@/models'
import dayjs from 'dayjs'

import create from 'zustand'

type EventState = {
  params?: EventsParams
  setParams: (params?: EventsParams) => void
}

export const useEventStore = create<EventState>()((set, get) => ({
  params: {
    startDate: dayjs().startOf('month').subtract(10, 'days').toDate(),
    endDate: dayjs().endOf('month').add(10, 'days').toDate(),
  },
  setParams: params => {
    const oldParams = get().params
    set({
      params: {
        ...oldParams,
        ...(params || {}),
      },
    })
  },
}))
