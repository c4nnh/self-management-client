/// Common
export type ErrorResponse = {
  error: string
  message: string
  statusCode: number
}

export type PaginationParams = {
  limit?: number
  offset?: number
}

export type SortParams = {
  orderBy?: string
  orderDirection?: string
}

export type Collection<T> = {
  items: T[]
  pagination: Required<PaginationParams> & {
    totalItem: number
  }
}

export type Language = 'en' | 'vi'

// Auth
export type Token = {
  accessToken: string
  refreshToken: string
}

export type LoginPayload = {
  usernameOrEmail: string
  password: string
}

export type LoginResponse = {
  user: User
  token: Token
}

export type RegisterPayload = {
  email: string
  name: string
  password: string
}

export type RegisterResponse = LoginResponse

export type RefreshTokenResponse = {
  token: Token
}

// User
export type User = {
  id: string
  name: string
  email: string
  username?: string
  image?: string
  createdAt: Date
  updatedAt: Date
}

// FINANCE
// Currency
export type Currency = {
  id: string
  name: string
}

// Transaction
export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export type Transaction = {
  id: string
  title: string
  description?: string
  type: TransactionType
  amount: number
  date: Date
  currency: Currency
}

export type GetTransactionsParams = PaginationParams &
  SortParams & {
    type?: TransactionType
    from?: Date
    to?: Date
  }
