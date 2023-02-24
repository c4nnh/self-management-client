import styled from 'styled-components'
import tw from 'twin.macro'

export const NotfoundPage: React.FC = () => {
  return <Container>404</Container>
}

const Container = styled.div`
  ${tw`w-full h-full flex items-center justify-center text-3xl font-bold`}
`
