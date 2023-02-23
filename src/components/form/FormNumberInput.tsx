import { FormItemProps, Input } from 'antd'
import React from 'react'
import { ControllerProps } from 'react-hook-form'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { InputAttributes } from 'react-number-format/types/types'
import { ControlledFormItem } from './ControlledFormItem'

type Props = {
  name: string
  label?: string | null
  formItemProps?: FormItemProps
  numericFormatProps?: NumericFormatProps & {
    customSuffix?: React.ReactNode
  }
} & Omit<ControllerProps, 'render'>

export const FormNumberInput: React.FC<Props> = ({
  numericFormatProps,
  ...rest
}) => {
  return (
    <ControlledFormItem
      {...rest}
      render={({ value, onChange, onBlur }) => (
        <NumericFormat
          {...{
            value,
            onValueChange: ({ value }) => onChange(value ? +value : null),
            onBlur,
          }}
          isAllowed={({ floatValue, value }) => {
            if (!value || (!floatValue && floatValue !== 0)) return true
            if (
              numericFormatProps?.maxLength &&
              (value.length > numericFormatProps?.maxLength.toString().length ||
                floatValue > numericFormatProps?.maxLength)
            ) {
              return false
            }
            if (numericFormatProps?.max && floatValue > numericFormatProps.max)
              return false
            if (numericFormatProps?.min && floatValue < numericFormatProps.min)
              return false
            return true
          }}
          customInput={
            numericFormatProps?.customInput ||
            (Input as React.ComponentType<InputAttributes>)
          }
          decimalScale={2}
          thousandSeparator=","
          {...numericFormatProps}
        />
      )}
    />
  )
}
