import styled from 'styled-components'
import tw from 'twin.macro'

export const PageContainer = styled.div`
  ${tw`flex flex-col gap-5 py-5`}

  @media screen and (max-width: 550px) {
    ${tw`py-2 gap-2`}
  }
`
