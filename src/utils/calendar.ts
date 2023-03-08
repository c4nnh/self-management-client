import { DayOfWeek } from '@/models'
import { TFunction } from 'i18next'

export const getDayOfWeekLabel = (
  t: TFunction
): { [key in DayOfWeek]: string } => ({
  0: t('calendar.week.sunday'),
  1: t('calendar.week.monday'),
  2: t('calendar.week.tuesday'),
  3: t('calendar.week.wednesday'),
  4: t('calendar.week.thursday'),
  5: t('calendar.week.friday'),
  6: t('calendar.week.saturday'),
})
