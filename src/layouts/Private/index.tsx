import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useScreen } from '../../hooks'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

type Props = PropsWithChildren

export const PrivateLayout: React.FC<Props> = ({ children }) => {
  const { isDesktop } = useScreen()

  return (
    <Container>
      {isDesktop && <Sidebar />}
      <Body>
        <Header />
        <div className="flex-1 p-5">{children}</div>
      </Body>
    </Container>
  )
}

const Container = styled.div`
  ${tw`h-full flex bg-gray-200`}
`

const Body = styled.div`
  ${tw`flex-1 flex flex-col`}
`
