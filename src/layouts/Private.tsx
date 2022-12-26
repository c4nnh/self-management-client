import { PropsWithChildren } from 'react'
import styled from 'styled-components'

type Props = PropsWithChildren

export const PrivateLayout: React.FC<Props> = ({ children }) => {
  return <Container>{children}</Container>
}

const Container = styled.div``
