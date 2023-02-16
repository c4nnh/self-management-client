import { QueryFunction, useQuery } from '@tanstack/react-query'
import { Collection, GetTransactionsParams, Transaction } from '../../../models'
import { request } from '../../request'
import { QueryOptions } from '../../type'

type Response = {
  getMany: Collection<Transaction>
}

type QueryKeys = {
  getMany: ['getTransactions', GetTransactionsParams?]
}

type API = {
  getMany: QueryFunction<Response['getMany'], QueryKeys['getMany']>
}

const PREFIX = 'transactions'

const transaction: API = {
  getMany: ({ queryKey: [, params] }) => request.get(PREFIX, { params }),
}

export const useGetTransactionsQuery = (
  params?: GetTransactionsParams,
  options?: QueryOptions<Response['getMany'], QueryKeys['getMany']>
) => useQuery(['getTransactions', params], transaction.getMany, options)
