import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useScreen } from '../hooks'

type Props = {
  leftChildren?: React.ReactNode
  rightChildren?: React.ReactNode
}

export const TableActionsContainer: React.FC<Props> = ({
  leftChildren,
  rightChildren,
}) => {
  const { isMobile } = useScreen()

  return (
    <Container>
      {!isMobile && <ChildContainer>{leftChildren}</ChildContainer>}
      <ChildContainer className="justify-end">{rightChildren}</ChildContainer>
    </Container>
  )
}

const Container = styled.div`
  ${tw`flex items-center justify-between gap-2 flex-wrap`}
`

const ChildContainer = styled.div`
  ${tw`flex flex-1 items-center gap-2`}
`
