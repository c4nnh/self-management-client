import {
  Collection,
  CreateLoanDto,
  GetLoansParams,
  Loan,
  UpdateLoanDto,
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
  getDetail: Loan
  getMany: Collection<Loan>
  create: Loan
  update: Loan
  delete: boolean
  deleteMultiple: boolean
}

type QueryKeys = {
  getDetail: ['getLoanDetail', string]
  getMany: ['getLoans', GetLoansParams?]
}

type Variables = {
  create: CreateLoanDto
  update: UpdateLoanDto
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

const PREFIX = 'loans'

const loan: API = {
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

export const useGetLoanDetailQuery = (
  id: string,
  options?: QueryOptions<Response['getDetail'], QueryKeys['getDetail']>
) => useQuery(['getLoanDetail', id], loan.getDetail, options)

export const useGetLoansQuery = (
  params?: GetLoansParams,
  options?: QueryOptions<Response['getMany'], QueryKeys['getMany']>
) => useQuery(['getLoans', params], loan.getMany, options)

export const useCreateLoanMutation = (
  options?: MutationOptions<Response['create'], Variables['create']>
) => {
  return useMutation(['createLoan'], loan.create, options)
}

export const useUpdateLoanMutation = (
  options?: MutationOptions<Response['update'], Variables['update']>
) => {
  return useMutation(['updateLoan'], loan.update, options)
}

export const useDeleteLoanMutation = (
  options?: MutationOptions<Response['delete'], Variables['delete']>
) => {
  return useMutation(['deleteLoan'], loan.delete, options)
}

export const useDeleteMultipleLoansMutation = (
  options?: MutationOptions<
    Response['deleteMultiple'],
    Variables['deleteMultiple']
  >
) => {
  return useMutation(['deleteMultipleLoans'], loan.deleteMultiple, options)
}
