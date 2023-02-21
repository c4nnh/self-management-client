import { DatePicker, DatePickerProps, FormItemProps } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import { ControllerProps } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import tw from 'twin.macro'
import { DATE_FORMAT } from '../../constants'
import { ControlledFormItem } from './ControlledFormItem'

type Props = {
  name: string
  label?: string | null
  formItemProps?: FormItemProps
  datePickerProps?: DatePickerProps
} & Omit<ControllerProps, 'render'>

export const FormDatePicker: React.FC<Props> = ({
  datePickerProps,
  ...rest
}) => {
  const { t } = useTranslation()

  return (
    <ControlledFormItem
      {...rest}
      render={({ value, onChange, onBlur }) => (
        <StyledDatePicker
          format={DATE_FORMAT}
          placeholder={t('common.selectDate') || ''}
          {...{ value: value ? dayjs(value) : undefined, onChange, onBlur }}
          allowClear
          {...datePickerProps}
        />
      )}
    />
  )
}

const StyledDatePicker = styled(DatePicker)`
  ${tw`w-full`}
`
