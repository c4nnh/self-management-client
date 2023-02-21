import styled from 'styled-components'
import tw from 'twin.macro'

type Props = {
  title: string
}

export const PageTitle: React.FC<Props> = ({ title }) => {
  return <StyledTitle>{title}</StyledTitle>
}

const StyledTitle = styled.span`
  ${tw`font-semibold text-2xl`}

  @media screen and (max-width: 550px) {
    ${tw`text-base`}
  }
`
