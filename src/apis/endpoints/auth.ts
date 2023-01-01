import {
  MutationFunction,
  QueryFunction,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  User,
} from '../../models'
import { authRequest, request } from '../request'
import { MutationOptions, QueryOptions } from '../type'

type Response = {
  login: LoginResponse
  register: RegisterResponse
  me: User
}

type Variables = {
  login: LoginPayload
  register: RegisterPayload
}

type QueryKeys = {
  me: ['me']
}

type API = {
  login: MutationFunction<Response['login'], Variables['login']>
  register: MutationFunction<Response['register'], Variables['register']>
  me: QueryFunction<Response['me'], QueryKeys['me']>
}

const PREFIX = 'auth'

const auth: API = {
  login: data => authRequest.post(`${PREFIX}/login`, data),
  register: data => authRequest.post(`${PREFIX}/register`, data),
  me: () => request.get(`${PREFIX}/me`),
}

export const useLoginMutation = (
  options?: MutationOptions<Response['login'], Variables['login']>
) => useMutation(['login'], auth.login, options)

export const useRegisterMutation = (
  options?: MutationOptions<Response['register'], Variables['register']>
) => useMutation(['register'], auth.register, options)

export const useMeQuery = (
  options?: QueryOptions<Response['me'], QueryKeys['me']>
) => useQuery(['me'], auth.me, options)
