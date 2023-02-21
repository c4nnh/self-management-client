import { FormItemProps, Input, InputProps } from 'antd'
import React from 'react'
import { ControllerProps } from 'react-hook-form'
import { ControlledFormItem } from './ControlledFormItem'

type Props = {
  name: string
  label?: string | null
  formItemProps?: FormItemProps
  inputProps?: InputProps
} & Omit<ControllerProps, 'render'>

export const FormInput: React.FC<Props> = ({ inputProps, ...rest }) => {
  return (
    <ControlledFormItem
      {...rest}
      render={({ value, onChange, onBlur }) => (
        <Input {...{ value, onChange, onBlur }} allowClear {...inputProps} />
      )}
    />
  )
}
