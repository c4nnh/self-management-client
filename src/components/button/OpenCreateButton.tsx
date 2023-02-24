import { ModalKey } from '@/models'
import { useAppStore } from '@/stores'
import { PlusOutlined } from '@ant-design/icons'
import { ButtonProps } from 'antd'
import { ResponsiveButton } from './ResponsiveButton'

type Props = ButtonProps & {
  modalKey: ModalKey
}

export const OpenCreateButton: React.FC<Props> = ({
  modalKey,
  ...buttonProps
}) => {
  const { setOpenModal, setSelectedId } = useAppStore()

  return (
    <ResponsiveButton
      icon={<PlusOutlined />}
      type="primary"
      onClick={() => {
        setSelectedId()
        setOpenModal(modalKey)
      }}
      {...buttonProps}
    />
  )
}
