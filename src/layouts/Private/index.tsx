import { Loading } from '@/components'
import { SCREEN_WIDTH } from '@/constants'
import { useScreen } from '@/hooks'
import { PropsWithChildren, Suspense } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

type Props = PropsWithChildren

export const PrivateLayout: React.FC<Props> = ({ children }) => {
  const { isDesktop } = useScreen()

  return (
    <Suspense fallback={<Loading />}>
      <Container maxWidth={SCREEN_WIDTH.DESKTOP}>
        {isDesktop && <Sidebar />}
        <Body>
          <Header />
          <div className="flex-1 p-5 mt-10">{children}</div>
        </Body>
      </Container>
    </Suspense>
  )
}

type ContainerProps = {
  maxWidth: number
}

const Container = styled.div<ContainerProps>`
  ${tw`h-full flex bg-gray-200 overflow-x-hidden`}

  @media screen and (max-width: ${p => p.maxWidth}px) {
    ${tw`block`}
  }
`

const Body = styled.div`
  ${tw`flex-1 flex flex-col overflow-x-hidden relative`}
`
