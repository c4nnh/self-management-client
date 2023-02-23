import { FormItemProps, Switch, SwitchProps } from 'antd'
import React from 'react'
import { ControllerProps } from 'react-hook-form'
import { ControlledFormItem } from './ControlledFormItem'

type Props = {
  name: string
  label: string
  formItemProps?: FormItemProps
  switchProps?: SwitchProps
} & Omit<ControllerProps, 'render'>

export const FormSwitch: React.FC<Props> = ({
  label,
  switchProps,
  formItemProps,
  ...rest
}) => {
  return (
    <ControlledFormItem
      {...rest}
      formItemProps={{
        ...formItemProps,
        style: {
          ...formItemProps?.style,
          flex: 'unset',
        },
      }}
      render={({ value, onChange, onBlur }) => (
        <div className="flex h-[52px] items-center mr-10">
          <span className="text-sm font-semibold">{label}</span>
          <Switch {...{ onChange, onBlur }} checked={value} {...switchProps} />
        </div>
      )}
    />
  )
}
