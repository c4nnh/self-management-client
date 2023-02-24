import { ColumnIcon } from '@/assets'
import { ModalKey } from '@/models'
import { useAppStore } from '@/stores'
import { ButtonProps } from 'antd'
import { ResponsiveButton } from './ResponsiveButton'

type Props = ButtonProps & {
  modalKey: ModalKey
}

export const ColumnConfigButton: React.FC<Props> = ({
  modalKey,
  ...buttonProps
}) => {
  const { setOpenModal } = useAppStore()

  return (
    <ResponsiveButton
      icon={<ColumnIcon />}
      type="primary"
      onClick={() => setOpenModal(modalKey)}
      {...buttonProps}
    />
  )
}
