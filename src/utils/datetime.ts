import { DATE_FORMAT_FILTER } from '@/constants'
import dayjs, { Dayjs } from 'dayjs'

export const convertDateRangeToDateFilter = (dateRange: [Dayjs?, Dayjs?]) => {
  const [dateFrom, dateTo] = dateRange || [null, null]

  return {
    dateFrom: dateFrom ? dayjs(dateFrom).format(DATE_FORMAT_FILTER) : undefined,
    dateTo: dateTo ? dayjs(dateTo).format(DATE_FORMAT_FILTER) : undefined,
  }
}
