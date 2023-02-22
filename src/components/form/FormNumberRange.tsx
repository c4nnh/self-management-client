import { FormItemProps } from 'antd'
import React from 'react'
import { NumericFormatProps } from 'react-number-format'
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
  return (
    <Container>
      <FormNumberInput
        {...fromProps}
        numericFormatProps={{
          placeholder: 'From',
          ...fromNumericFormatProps,
        }}
        label={label}
      />
      <FormNumberInput
        {...toProps}
        numericFormatProps={{
          placeholder: 'To',
          ...toNumericFormatProps,
        }}
        label="&nbsp;"
      />
    </Container>
  )
}

const Container = styled.div`
  ${tw`w-full flex`}

  .ant-form-item {
    ${tw`!flex-1`}

    div > div > div > .ant-input {
      :hover,
      :focus {
        box-shadow: unset;
        border-color: #d9d9d9;
      }
    }
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
