import { Modal as AModal, ModalProps } from 'antd'
import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Loading } from './Loading'

type Props = PropsWithChildren<ModalProps> & {
  isLoading?: boolean
}

export const Modal: React.FC<Props> = ({ isLoading, children, ...props }) => {
  return (
    <StyledModal {...props}>
      {isLoading ? (
        <div className="h-[300px]">
          <Loading />
        </div>
      ) : (
        children
      )}
    </StyledModal>
  )
}

const StyledModal = styled(AModal)`
  .ant-modal-body {
    min-height: 300px;
  }
  .ant-modal-title {
    ${tw`flex justify-center`}
  }
`
