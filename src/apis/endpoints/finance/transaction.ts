import {
  Collection,
  CreateTransactionDto,
  GetTransactionsParams,
  Transaction,
  UpdateTransactionDto,
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
  getDetail: Transaction
  getMany: Collection<Transaction>
  create: Transaction
  update: Transaction
  delete: boolean
}

type QueryKeys = {
  getDetail: ['getTransactionDetail', string]
  getMany: ['getTransactions', GetTransactionsParams?]
}

type Variables = {
  create: CreateTransactionDto
  update: UpdateTransactionDto
  delete: string
}

type API = {
  getDetail: QueryFunction<Response['getDetail'], QueryKeys['getDetail']>
  getMany: QueryFunction<Response['getMany'], QueryKeys['getMany']>
  create: MutationFunction<Response['create'], Variables['create']>
  update: MutationFunction<Response['update'], Variables['update']>
  delete: MutationFunction<Response['delete'], Variables['delete']>
}

const PREFIX = 'transactions'

const transaction: API = {
  getDetail: ({ queryKey: [, id] }) => request.get(`${PREFIX}/${id}`),
  getMany: ({ queryKey: [, params] }) => request.get(PREFIX, { params }),
  create: dto => request.post(PREFIX, dto),
  update: ({ id, ...dto }) => request.put(`${PREFIX}/${id}`, dto),
  delete: id => request.delete(`${PREFIX}/${id}`),
}

export const useGetTransactiongetDetailQuery = (
  id: string,
  options?: QueryOptions<Response['getDetail'], QueryKeys['getDetail']>
) => useQuery(['getTransactionDetail', id], transaction.getDetail, options)

export const useGetTransactionsQuery = (
  params?: GetTransactionsParams,
  options?: QueryOptions<Response['getMany'], QueryKeys['getMany']>
) => useQuery(['getTransactions', params], transaction.getMany, options)

export const useCreateTransactionMutation = (
  options?: MutationOptions<Response['create'], Variables['create']>
) => {
  return useMutation(['createTransaction'], transaction.create, options)
}

export const useUpdateTransactionMutation = (
  options?: MutationOptions<Response['update'], Variables['update']>
) => {
  return useMutation(['updateTransaction'], transaction.update, options)
}

export const useDeleteTransactionMutation = (
  options?: MutationOptions<Response['delete'], Variables['delete']>
) => {
  return useMutation(['deleteTransaction'], transaction.delete, options)
}
