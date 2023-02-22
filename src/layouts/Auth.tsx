import { LogoIcon } from '@/assets'
import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

type Props = PropsWithChildren & {
  title: string
}

export const AuthLayout: React.FC<Props> = ({ title, children }) => {
  return (
    <Container>
      <div className="z-10 w-full h-fit flex flex-col bg-white rounded-lg max-w-[500px] px-5 py-10 shadow-md mobile:shadow-none">
        <LogoIcon className="text-6xl text-primary mx-auto h-[60px]" />
        <Title>{title}</Title>
        {children}
      </div>
      <Background />
    </Container>
  )
}

const Container = styled.div`
  ${tw`w-full bg-slate-600 relative mobile:bg-white h-full flex items-center justify-center`}
`

const Background = styled.div`
  ${tw`absolute bg-slate-800 bottom-0 left-0 z-1 w-full h-full`}

  border-radius: 100% 0% 100% 0% / 100% 100% 0% 0%;
`

const Title = styled.span`
  ${tw`mx-auto py-2 text-3xl font-semibold text-primary`}
`
