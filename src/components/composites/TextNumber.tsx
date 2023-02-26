import { NumericFormat, NumericFormatProps } from 'react-number-format'

type Props = NumericFormatProps

export const TextNumber: React.FC<Props> = props => {
  return (
    <NumericFormat
      displayType="text"
      decimalScale={2}
      thousandSeparator=","
      {...props}
    />
  )
}
