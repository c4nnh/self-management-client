import dayjs, { Dayjs } from 'dayjs'
import { DATE_FORMAT_FILTER } from '../constants'

export const convertDateRangeToDateFilter = (dateRange: [Dayjs?, Dayjs?]) => {
  const [dateFrom, dateTo] = dateRange || [null, null]

  return {
    dateFrom: dateFrom ? dayjs(dateFrom).format(DATE_FORMAT_FILTER) : undefined,
    dateTo: dateTo ? dayjs(dateTo).format(DATE_FORMAT_FILTER) : undefined,
  }
}
