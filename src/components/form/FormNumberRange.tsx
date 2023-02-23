import { FormItemProps, Input, InputProps, InputRef } from 'antd'
import classNames from 'classnames'
import React, { forwardRef, useState } from 'react'
import { InputAttributes, NumericFormatProps } from 'react-number-format'
import styled from 'styled-components'
import tw from 'twin.macro'
import { FormNumberInput } from './FormNumberInput'

type Props = {
  label?: string | null
  from: {
    name: string
    formItemProps?: FormItemProps
    numericFormatProps?: NumericFormatProps
  }
  to: {
    name: string
    formItemProps?: FormItemProps
    numericFormatProps?: NumericFormatProps
  }
}

export const FormNumberRange: React.FC<Props> = ({
  label,
  from: { numericFormatProps: fromNumericFormatProps, ...fromProps },
  to: { numericFormatProps: toNumericFormatProps, ...toProps },
}) => {
  const [isFocusing, setIsFocusing] = useState(false)

  return (
    <Container
      className={classNames({
        'is-focusing': isFocusing,
      })}
    >
      <FormNumberInput
        {...fromProps}
        numericFormatProps={{
          placeholder: 'From',
          ...fromNumericFormatProps,
          customInput: CustomInput,

          onFocus: () => {
            setIsFocusing(true)
          },
          onBlur: () => {
            setIsFocusing(false)
          },
        }}
        label={label}
      />
      <FormNumberInput
        {...toProps}
        numericFormatProps={{
          placeholder: 'To',
          ...toNumericFormatProps,
          customInput: CustomInput,
          onFocus: () => {
            setIsFocusing(true)
          },
          onBlur: () => {
            setIsFocusing(false)
          },
        }}
        label="&nbsp;"
      />
    </Container>
  )
}

export const CustomInput = forwardRef<InputRef, InputProps>((props, ref) => (
  <Input ref={ref} {...props} />
)) as React.ComponentType<InputAttributes>

const Container = styled.div`
  ${tw`w-full flex`}

  &.is-focusing {
    .ant-form-item {
      div > div > div {
        .ant-input {
          border-color: #4096ff;
          box-shadow: 2px 0 2px 2px rgb(5 145 255 / 10%);
          outline: 0;
        }
      }
    }
  }
  :hover {
    .ant-form-item {
      div > div > div > .ant-input {
        border-color: #4096ff;
      }
    }
  }

  .ant-form-item {
    ${tw`!flex-1`}
  }

  .ant-form-item:first-child {
    div > div > div > .ant-input {
      ${tw`border-r-0 rounded-r-none`}
    }
  }

  .ant-form-item:last-child {
    div > div > div > .ant-input {
      ${tw`border-l-0 rounded-l-none pl-0`}
    }
  }
`
