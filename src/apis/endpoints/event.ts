import { CreateEventDto, Event, EventsParams } from '@/models'
import {
  MutationFunction,
  QueryFunction,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import { request } from '../request'
import { MutationOptions, QueryOptions } from '../type'

type Response = {
  getMany: Event[]
  create: Event[]
}

type QueryKeys = {
  getMany: ['getEvents', EventsParams?]
}

type Variables = {
  create: CreateEventDto
}

type API = {
  getMany: QueryFunction<Response['getMany'], QueryKeys['getMany']>
  create: MutationFunction<Response['create'], Variables['create']>
}

const PREFIX = 'events'

const event: API = {
  getMany: ({ queryKey: [, params] }) => request.get(PREFIX, { params }),
  create: dto => request.post(PREFIX, dto),
}

export const useGetEventsQuery = (
  params?: EventsParams,
  options?: QueryOptions<Response['getMany'], QueryKeys['getMany']>
) => useQuery(['getEvents', params], event.getMany, options)

export const useCreateEventMutation = (
  options?: MutationOptions<Response['create'], Variables['create']>
) => useMutation(['createEvent'], event.create, options)
