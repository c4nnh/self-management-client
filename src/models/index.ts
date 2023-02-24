/// Common
export type ErrorResponse = {
  error: string
  message: string
  statusCode: number
}

export type PaginationParams = {
  limit?: number
  offset?: number
  isPaged?: boolean
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

export type ModalKey =
  | 'transaction-detail'
  | 'transaction-filter'
  | 'transaction-columns'

export type TableConfig = {
  transaction: Required<Omit<Transaction, 'currency'>>
  currency: Currency
}

export type ColumnConfig<T> = {
  [key in keyof TableConfig]: {
    [field in keyof TableConfig[key]]: T
  }
}

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
export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type User = {
  id: string
  name: string
  email: string
  username?: string
  image?: string
  createdAt: Date
  updatedAt: Date
  currency?: Currency
  role: Role
}

// FINANCE
// Currency
export type Currency = {
  id: string
  name: string
}

export type GetCurrenciesParams = PaginationParams & SortParams

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

export type TransactionParams = {
  title?: string
  types?: TransactionType
  dateFrom?: string
  dateTo?: string
  amountFrom?: number
  amountTo?: number
}

export type GetTransactionsParams = PaginationParams &
  SortParams &
  TransactionParams

export type CreateTransactionDto = {
  title: string
  type: TransactionType
  amount: number
  date?: Date
  description?: string
  currencyId: string
}

export type UpdateTransactionDto = Partial<CreateTransactionDto> & {
  id: string
}
