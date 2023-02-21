import { Checkbox, FormItemProps } from 'antd'
import { CheckboxGroupProps, CheckboxProps } from 'antd/es/checkbox'
import { ControllerProps } from 'react-hook-form'
import styled from 'styled-components'
import tw from 'twin.macro'
import { ControlledFormItem } from './ControlledFormItem'

type Option<T> = {
  value: T
  label: React.ReactNode
}

type Props<T> = {
  name: string
  options: Option<T>[]
  label?: string | null
  formItemProps?: FormItemProps
  checkboxGroupProps?: Omit<CheckboxGroupProps, 'options'>
  checkboxProps?: CheckboxProps
} & Omit<ControllerProps, 'render'>

export const FormCheckbox = <T extends number | string>({
  label,
  options,
  checkboxGroupProps,
  checkboxProps,
  ...rest
}: Props<T>) => {
  return (
    <ControlledFormItem
      {...rest}
      render={({ value, onChange }) => (
        <Container>
          <Label>{label}</Label>
          <Checkbox.Group {...{ value, onChange }} {...checkboxGroupProps}>
            {options.map(option => (
              <Checkbox key={option.value} value={option.value}>
                {option.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Container>
      )}
    />
  )
}

const Container = styled.div`
  ${tw`flex flex-col gap-[2px]`}
`

const Label = styled.span`
  ${tw`font-semibold`}
`
