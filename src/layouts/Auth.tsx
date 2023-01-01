import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { LogoIcon } from '../assets'

type Props = PropsWithChildren & {
  title: string
}

export const AuthLayout: React.FC<Props> = ({ title, children }) => {
  return (
    <Container>
      <div className="w-full h-fit flex flex-col bg-white rounded-lg max-w-[500px] px-5 py-10 shadow-md mobile:shadow-none">
        <LogoIcon className="text-6xl text-primary mx-auto h-[60px]" />
        <Title>{title}</Title>
        {children}
      </div>
    </Container>
  )
}

const Container = styled.div`
  ${tw`w-full bg-gray-200 mobile:bg-white h-full flex items-center justify-center`}
`

const Title = styled.span`
  ${tw`mx-auto py-2 text-3xl font-semibold text-primary`}
`
