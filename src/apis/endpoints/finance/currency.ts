import { Collection, Currency, GetCurrenciesParams } from '@/models'
import { QueryFunction, useQuery } from '@tanstack/react-query'
import { request } from '../../request'
import { QueryOptions } from '../../type'

type Response = {
  getMany: Collection<Currency>
}

type QueryKeys = {
  getMany: ['getCurrencies', GetCurrenciesParams?]
}

type API = {
  getMany: QueryFunction<Response['getMany'], QueryKeys['getMany']>
}

const PREFIX = 'currencies'

const currency: API = {
  getMany: ({ queryKey: [, params] }) => request.get(PREFIX, { params }),
}

export const useGetManyCurrencies = (
  params?: GetCurrenciesParams,
  options?: QueryOptions<Response['getMany'], QueryKeys['getMany']>
) => useQuery(['getCurrencies', params], currency.getMany, options)
