import {
  MutationFunction,
  QueryFunction,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import { Collection, GetTransactionsParams, Transaction } from '../../../models'
import { request } from '../../request'
import { MutationOptions, QueryOptions } from '../../type'

type Response = {
  getMany: Collection<Transaction>
  delete: boolean
}

type QueryKeys = {
  getMany: ['getTransactions', GetTransactionsParams?]
}

type Variables = {
  delete: string
}

type API = {
  getMany: QueryFunction<Response['getMany'], QueryKeys['getMany']>
  delete: MutationFunction<Response['delete'], Variables['delete']>
}

const PREFIX = 'transactions'

const transaction: API = {
  getMany: ({ queryKey: [, params] }) => request.get(PREFIX, { params }),
  delete: id => request.delete(`${PREFIX}/${id}`),
}

export const useGetTransactionsQuery = (
  params?: GetTransactionsParams,
  options?: QueryOptions<Response['getMany'], QueryKeys['getMany']>
) => useQuery(['getTransactions', params], transaction.getMany, options)

export const useDeleteTransactionMutation = (
  options?: MutationOptions<Response['delete'], Variables['delete']>
) => {
  return useMutation(['deleteTransaction'], transaction.delete, options)
}
