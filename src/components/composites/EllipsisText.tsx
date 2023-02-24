import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import tw from 'twin.macro'

type Props = {
  text?: string
}

export const EllipsisText: React.FC<Props> = ({ text }) => {
  const { t } = useTranslation()

  return (
    <StyledParagraph ellipsis={{ tooltip: t('common.viewToReadMore') }}>
      {text}
    </StyledParagraph>
  )
}

const StyledParagraph = styled(Typography.Paragraph)`
  ${tw`!mb-0`}
`
