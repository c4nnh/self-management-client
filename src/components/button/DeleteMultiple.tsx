import { useAppStore } from '@/stores'
import { DeleteOutlined } from '@ant-design/icons'
import { ButtonProps, Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { ResponsiveButton } from './ResponsiveButton'

type Props = Omit<ButtonProps, 'onClick'> & {
  onDelete: (ids: string[]) => void
}

export const DeleteMultiple: React.FC<Props> = ({
  onDelete,
  ...buttonProps
}) => {
  const { t } = useTranslation()
  const { selectedIds } = useAppStore()

  const onOk = () => {
    Modal.confirm({
      title: t('common.confirmDeleteMultiple', {
        numberOfItem: selectedIds.length,
      }),
      okText: t('common.yes'),
      cancelText: t('common.no'),
      onOk: async () => {
        await onDelete(selectedIds)
      },
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
