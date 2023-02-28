import {
  Asset,
  Collection,
  CreateAssetDto,
  GetAssetsParams,
  UpdateAssetDto,
} from '@/models'
import {
  MutationFunction,
  QueryFunction,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import { request } from '../request'
import { MutationOptions, QueryOptions } from '../type'

type Response = {
  getDetail: Asset
  getMany: Collection<Asset>
  create: Asset
  update: Asset
  delete: boolean
  deleteMultiple: boolean
}

type QueryKeys = {
  getDetail: ['getAssetDetail', string]
  getMany: ['getAssets', GetAssetsParams?]
}

type Variables = {
  create: CreateAssetDto
  update: UpdateAssetDto
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

const PREFIX = 'assets'

const asset: API = {
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

export const useGetAssetDetailQuery = (
  id: string,
  options?: QueryOptions<Response['getDetail'], QueryKeys['getDetail']>
) => useQuery(['getAssetDetail', id], asset.getDetail, options)

export const useGetAssetsQuery = (
  params?: GetAssetsParams,
  options?: QueryOptions<Response['getMany'], QueryKeys['getMany']>
) => useQuery(['getAssets', params], asset.getMany, options)

export const useCreateAssetMutation = (
  options?: MutationOptions<Response['create'], Variables['create']>
) => {
  return useMutation(['createAsset'], asset.create, options)
}

export const useUpdateAssetMutation = (
  options?: MutationOptions<Response['update'], Variables['update']>
) => {
  return useMutation(['updateAsset'], asset.update, options)
}

export const useDeleteAssetMutation = (
  options?: MutationOptions<Response['delete'], Variables['delete']>
) => {
  return useMutation(['deleteAsset'], asset.delete, options)
}

export const useDeleteMultipleAssetsMutation = (
  options?: MutationOptions<
    Response['deleteMultiple'],
    Variables['deleteMultiple']
  >
) => {
  return useMutation(['deleteMultipleAssets'], asset.deleteMultiple, options)
}
