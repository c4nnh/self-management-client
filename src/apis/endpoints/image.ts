import {
  CreateSignedUrlDto,
  CreateSignedUrlResponsee,
  UploadImageToSignedUrlDto,
} from '@/models'
import { MutationFunction, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { request } from '../request'
import { MutationOptions } from '../type'

type Response = {
  createSignedUrl: CreateSignedUrlResponsee
  upload: boolean
}

type Variables = {
  createSignedUrl: CreateSignedUrlDto
  upload: UploadImageToSignedUrlDto
}

type SignedUrlFor = 'asset'

type API = {
  upload: MutationFunction<Response['upload'], Variables['upload']>
} & {
  [key in SignedUrlFor]: MutationFunction<
    Response['createSignedUrl'],
    Variables['createSignedUrl']
  >
}

const PREFIX = 'images/signed-url'

const image: API = {
  asset: data => request.post(`${PREFIX}/assets`, data),
  upload: async data => {
    const { file, url } = data

    try {
      const res = await axios({
        method: 'put',
        url,
        headers: {
          'Content-Type': file.type,
        },
        data: file,
      })

      if (res.status !== 200) return false
      return true
    } catch {
      return false
    }
  },
}

export const useCreateSignedUrlMutation = (
  options?: MutationOptions<
    Response['createSignedUrl'],
    Variables['createSignedUrl']
  >
) => useMutation(['createSignedUrl'], image.asset, options)

export const useUploadImageMutation = (
  options?: MutationOptions<Response['upload'], Variables['upload']>
) => useMutation(['upload'], image.upload, options)
