import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

export const PageHeader: React.FC<PropsWithChildren> = ({ children }) => {
  return <Container>{children}</Container>
}

const Container = styled.div`
  ${tw`flex flex-col gap-5`}

  @media screen and (max-width: 550px) {
    ${tw`gap-2 flex-row items-center justify-between`}
  }
`
