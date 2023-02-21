import { FilterFilled } from '@ant-design/icons'
import { ButtonProps } from 'antd'
import { ModalKey, useAppStore } from '../../stores'
import { ResponsiveButton } from './ResponsiveButton'

type Props = ButtonProps & {
  modalKey: ModalKey
}

export const OpenFilterButton: React.FC<Props> = ({
  modalKey,
  ...buttonProps
}) => {
  const { setOpenModal } = useAppStore()

  return (
    <ResponsiveButton
      icon={<FilterFilled />}
      type="primary"
      onClick={() => {
        setOpenModal(modalKey)
      }}
      {...buttonProps}
    />
  )
}
