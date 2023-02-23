import { SwapRightOutlined } from '@ant-design/icons'
import { FormItemProps, Input, InputProps, InputRef } from 'antd'
import classNames from 'classnames'
import React, { forwardRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
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
  const formContext = useFormContext()
  const { getValues, setValue } = formContext
  const [isFocusing, setIsFocusing] = useState(false)

  const onFocusInput = () => {
    setIsFocusing(true)
  }

  const onBlurInput = () => {
    setIsFocusing(false)
    const [fromValue, toValue] = getValues([fromProps.name, toProps.name])
    if ([fromValue, toValue].some(item => [null, undefined].includes(item))) {
      return
    }
    if (fromValue > toValue) {
      setValue(fromProps.name, toValue)
      setValue(toProps.name, fromValue)
    }
  }

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
          customSuffix: (
            <SwapRightOutlined className="text-base mr-[-10px] mt-[2px] h-[20px]" />
          ),
          onFocus: onFocusInput,
          onBlur: onBlurInput,
        }}
        label={label}
      />
      <FormNumberInput
        {...toProps}
        numericFormatProps={{
          placeholder: 'To',
          ...toNumericFormatProps,
          customInput: CustomInput,
          onFocus: onFocusInput,
          onBlur: onBlurInput,
        }}
        label="&nbsp;"
      />
    </Container>
  )
}

export const CustomInput = forwardRef<
  InputRef,
  InputProps & { customSuffix?: React.ReactNode }
>(({ customSuffix, ...props }, ref) => (
  <Input ref={ref} {...props} suffix={customSuffix} />
)) as React.ComponentType<InputAttributes>

const Container = styled.div`
  ${tw`w-full flex`}

  &.is-focusing {
    .ant-form-item {
      div > div > div {
        .ant-input,
        span {
          ${tw`border-primary-hover shadow-none`}
        }
      }
    }
  }

  :hover {
    .ant-form-item {
      div > div > div {
        .ant-input,
        span {
          ${tw`border-primary-hover`}
        }
      }
    }
  }

  .ant-form-item {
    ${tw`!flex-1`}
    div > div > div {
      .ant-input {
        ${tw`border-l-0 rounded-l-none pl-2`}
      }
      span {
        ${tw`!border-r-0 !rounded-r-none`}

        input {
          ${tw`!pl-0`}
        }

        .ant-input-suffix > span {
          color: rgba(0, 0, 0, 0.25);
        }
      }
    }
  }
`
