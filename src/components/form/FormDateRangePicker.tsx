import { FormItemProps } from 'antd'
import DatePicker, { RangePickerProps } from 'antd/lib/date-picker'
import dayjs from 'dayjs'
import { ControllerProps } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import tw from 'twin.macro'
import { ControlledFormItem } from './ControlledFormItem'

type Props = {
  name: string
  label?: string | null
  formItemProps?: FormItemProps
  dateRangePickerProps?: RangePickerProps
} & Omit<ControllerProps, 'render'>

export const FormDateRangePicker: React.FC<Props> = ({
  dateRangePickerProps,
  ...rest
}) => {
  const { t } = useTranslation()

  return (
    <ControlledFormItem
      {...rest}
      render={({ value, onChange, onBlur }) => {
        const [from, to] = value || [null, null]
        const fromValue = from ? dayjs(from) : null
        const toValue = to ? dayjs(to) : null
        return (
          <StyledDateRangePicker
            placeholder={[t('common.fromDate'), t('common.toDate')]}
            allowClear
            allowEmpty={[true, true]}
            {...{ value: [fromValue, toValue], onChange, onBlur }}
            {...dateRangePickerProps}
          />
        )
      }}
    />
  )
}

const StyledDateRangePicker = styled(DatePicker.RangePicker)`
  ${tw`w-full`}
`
