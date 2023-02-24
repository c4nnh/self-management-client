import {
  Collection,
  CreateCurrencyDto,
  Currency,
  GetCurrenciesParams,
  UpdateCurrencyDto,
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
  getDetail: Currency
  getMany: Collection<Currency>
  create: Currency
  update: Currency
  delete: boolean
  deleteMultiple: boolean
}

type QueryKeys = {
  getDetail: ['getCurrencyDetail', string]
  getMany: ['getCurrencies', GetCurrenciesParams?]
}

type Variables = {
  create: CreateCurrencyDto
  update: UpdateCurrencyDto
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

const PREFIX = 'currencies'

const currency: API = {
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

export const useGetCurrencyDetailQuery = (
  id: string,
  options?: QueryOptions<Response['getDetail'], QueryKeys['getDetail']>
) => useQuery(['getCurrencyDetail', id], currency.getDetail, options)

export const useGetCurrenciesQuery = (
  params?: GetCurrenciesParams,
  options?: QueryOptions<Response['getMany'], QueryKeys['getMany']>
) => useQuery(['getCurrencies', params], currency.getMany, options)

export const useCreateCurrencyMutation = (
  options?: MutationOptions<Response['create'], Variables['create']>
) => {
  return useMutation(['createCurrency'], currency.create, options)
}

export const useUpdateCurrencyMutation = (
  options?: MutationOptions<Response['update'], Variables['update']>
) => {
  return useMutation(['updateCurrency'], currency.update, options)
}

export const useDeleteCurrencyMutation = (
  options?: MutationOptions<Response['delete'], Variables['delete']>
) => {
  return useMutation(['deleteCurrency'], currency.delete, options)
}

export const useDeleteMultipleCurrenciesMutation = (
  options?: MutationOptions<
    Response['deleteMultiple'],
    Variables['deleteMultiple']
  >
) => {
  return useMutation(
    ['deleteMultipleCurrencies'],
    currency.deleteMultiple,
    options
  )
}
