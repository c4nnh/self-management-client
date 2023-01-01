import { TFunction } from 'i18next'
import { RegisterOptions } from 'react-hook-form'

export const requiredField = (
  t: TFunction
): Partial<
  Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
> => ({
  required: `${t('common.requiredField')}`,
})
