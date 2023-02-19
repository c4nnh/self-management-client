import { Spin } from 'antd'
import styled from 'styled-components'
import tw from 'twin.macro'

export const Loading: React.FC = () => {
  return (
    <Container>
      <StyledSpin />
    </Container>
  )
}

const Container = styled.div`
  ${tw`w-full h-full flex items-center justify-center`}
`

const StyledSpin = styled(Spin)`
  .ant-spin-dot-item {
    ${tw`bg-primary`}
  }
`
