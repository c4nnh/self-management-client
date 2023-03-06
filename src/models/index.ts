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
  | 'currency-detail'
  | 'currency-filter'
  | 'currency-columns'
  | 'loan-detail'
  | 'loan-filter'
  | 'loan-columns'
  | 'tontine-detail'
  | 'tontine-filter'
  | 'tontine-columns'
  | 'asset-detail'
  | 'asset-filter'
  | 'asset-columns'

export type TableConfig = {
  transaction: Required<Omit<Transaction, 'currency'>>
  currency: Currency
  loan: Required<Omit<Loan, 'currency'>>
  tontine: Required<Omit<Tontine, 'currency'>>
  asset: Required<Omit<Asset, 'currency'>>
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

// Image
export type CreateSignedUrlResponsee = {
  uploadUrl: string
  publicUrl: string
}

export type CreateSignedUrlDto = {
  fileName: string
  fileType: string
}

export type UploadImageToSignedUrlDto = {
  file: File
  url: string
}

// FINANCE
// Currency
export type Currency = {
  id: string
  name: string
  symbol: string
  code: string
}

export type CurrencyParams = {
  search?: string
}

export type GetCurrenciesParams = PaginationParams & SortParams & CurrencyParams

export type CreateCurrencyDto = Pick<Currency, 'name' | 'symbol' | 'code'>

export type UpdateCurrencyDto = Partial<CreateCurrencyDto> & {
  id: string
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

export type CreateTransactionDto = Omit<Transaction, 'id' | 'currency'> & {
  currencyId: string
}

export type UpdateTransactionDto = Partial<CreateTransactionDto> & {
  id: string
}

// Loan
export type Loan = {
  id: string
  debtor: string
  amount: number
  date: Date
  description?: string
  currency: Currency
}

export type LoanParams = {
  search?: string
  dateFrom?: string
  dateTo?: string
  amountFrom?: number
  amountTo?: number
}

export type GetLoansParams = PaginationParams & SortParams & LoanParams

export type CreateLoanDto = Omit<Loan, 'id' | 'currency'> & {
  currencyId: string
}

export type UpdateLoanDto = Partial<CreateLoanDto> & {
  id: string
}

// Tontine
export type Tontine = {
  id: string
  amount: number
  date: Date
  description?: string
  currency: Currency
}

export type TontineParams = {
  description?: string
  dateFrom?: string
  dateTo?: string
  amountFrom?: number
  amountTo?: number
}

export type GetTontinesParams = PaginationParams & SortParams & TontineParams

export type CreateTontineDto = Omit<Tontine, 'id' | 'currency'> & {
  currencyId: string
}

export type UpdateTontineDto = Partial<CreateTontineDto> & {
  id: string
}

// Asset
export type Asset = {
  id: string
  name: string
  price: number
  boughtDate: Date
  images: string[]
  description?: string
  currency: Currency
}

export type AssetParams = {
  search?: string
  boughtDateFrom?: string
  boughtDateTo?: string
  priceFrom?: number
  priceTo?: number
}

export type GetAssetsParams = PaginationParams & SortParams & AssetParams

export type CreateAssetDto = Omit<Asset, 'id' | 'currency'> & {
  currencyId: string
}

export type UpdateAssetDto = Partial<CreateAssetDto> & {
  id: string
}

// Event
export enum EventPriority {
  SUPER_LOW = 'SUPER_LOW',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  SUPER_HIGH = 'SUPER_HIGH',
}

export enum EventStatus {
  UPCOMING = 'UPCOMING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELED = 'CANCELED',
}

export type Event = {
  id: string
  title: string
  description?: string
  startDate: Date
  endDate: Date
  startTime?: string
  endTime?: string
  priority: EventPriority
  status: EventStatus
}

export type EventsParams = {
  startDate?: Date
  endDate?: Date
}

export type CreateEventDto = {
  title: string
  description?: string
  startDate: Date
  endDate: Date
  startTime?: string
  endTime?: string
  priority?: EventPriority
}
