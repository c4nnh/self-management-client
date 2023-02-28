import {
  Collection,
  CreateTontineDto,
  GetTontinesParams,
  Tontine,
  UpdateTontineDto,
} from '@/models'
import {
  MutationFunction,
  QueryFunction,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import { request } from '../../request'
import { MutationOptions, QueryOptions } from '../../type'

type Response = {
  getDetail: Tontine
  getMany: Collection<Tontine>
  create: Tontine
  update: Tontine
  delete: boolean
  deleteMultiple: boolean
}

type QueryKeys = {
  getDetail: ['getTontineDetail', string]
  getMany: ['getTontines', GetTontinesParams?]
}

type Variables = {
  create: CreateTontineDto
  update: UpdateTontineDto
  delete: string
  deleteMultiple: string[]
}

type API = {
  getDetail: QueryFunction<Response['getDetail'], QueryKeys['getDetail']>
  getMany: QueryFunction<Response['getMany'], QueryKeys['getMany']>
  create: MutationFunction<Response['create'], Variables['create']>
  update: MutationFunction<Response['update'], Variables['update']>
  delete: MutationFunction<Response['delete'], Variables['delete']>
  deleteMultiple: MutationFunction<
    Response['deleteMultiple'],
    Variables['deleteMultiple']
  >
}

const PREFIX = 'tontines'

const tontine: API = {
  getDetail: ({ queryKey: [, id] }) => request.get(`${PREFIX}/${id}`),
  getMany: ({ queryKey: [, params] }) => request.get(PREFIX, { params }),
  create: dto => request.post(PREFIX, dto),
  update: ({ id, ...dto }) => request.put(`${PREFIX}/${id}`, dto),
  delete: id => request.delete(`${PREFIX}/${id}`),
  deleteMultiple: ids =>
    request.delete(PREFIX, {
      data: ids,
    }),
}

export const useGetTontineDetailQuery = (
  id: string,
  options?: QueryOptions<Response['getDetail'], QueryKeys['getDetail']>
) => useQuery(['getTontineDetail', id], tontine.getDetail, options)

export const useGetTontinesQuery = (
  params?: GetTontinesParams,
  options?: QueryOptions<Response['getMany'], QueryKeys['getMany']>
) => useQuery(['getTontines', params], tontine.getMany, options)

export const useCreateTontineMutation = (
  options?: MutationOptions<Response['create'], Variables['create']>
) => {
  return useMutation(['createTontine'], tontine.create, options)
}

export const useUpdateTontineMutation = (
  options?: MutationOptions<Response['update'], Variables['update']>
) => {
  return useMutation(['updateTontine'], tontine.update, options)
}

export const useDeleteTontineMutation = (
  options?: MutationOptions<Response['delete'], Variables['delete']>
) => {
  return useMutation(['deleteTontine'], tontine.delete, options)
}

export const useDeleteMultipleTontinesMutation = (
  options?: MutationOptions<
    Response['deleteMultiple'],
    Variables['deleteMultiple']
  >
) => {
  return useMutation(
    ['deleteMultipleTontines'],
    tontine.deleteMultiple,
    options
  )
}
