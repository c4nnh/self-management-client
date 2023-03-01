import { Modal as AModal, ModalProps } from 'antd'
import { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import tw, { theme } from 'twin.macro'
import { Loading } from '../composites/Loading'

type Props = PropsWithChildren<ModalProps> & {
  isLoading?: boolean
}

export const Modal: React.FC<Props> = ({ isLoading, children, ...props }) => {
  const { t } = useTranslation()

  return (
    <StyledModal
      destroyOnClose
      closable={false}
      okText={t('common.ok')}
      cancelText={t('common.cancel')}
      maskClosable={false}
      {...props}
    >
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
  .ant-modal-header {
    ${tw`pb-2 `}
    border-bottom: 1px solid ${theme`colors.gray.200`};
  }

  .ant-modal-body {
    min-height: 150px;
  }

  .ant-modal-title {
    ${tw`flex justify-center`}
  }
`
