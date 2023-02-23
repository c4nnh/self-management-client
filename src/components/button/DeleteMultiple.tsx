import { DeleteOutlined } from '@ant-design/icons'
import { ButtonProps, Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { ResponsiveButton } from './ResponsiveButton'

type Props = Omit<ButtonProps, 'onClick'> & {
  selectedIds: string[]
  onDelete: () => void
}

export const DeleteMultiple: React.FC<Props> = ({
  selectedIds,
  onDelete,
  ...buttonProps
}) => {
  const { t } = useTranslation()

  const onOk = () => {
    Modal.confirm({
      title: t('common.confirmDeleteMultiple', {
        numberOfItem: selectedIds.length,
      }),
      okText: t('common.yes'),
      cancelText: t('common.no'),
      onOk: onDelete,
    })
  }

  if (!selectedIds.length) {
    return <></>
  }

  return (
    <ResponsiveButton
      icon={<DeleteOutlined />}
      type="primary"
      onClick={onOk}
      danger
      {...buttonProps}
    />
  )
}
