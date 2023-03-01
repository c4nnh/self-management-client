import { useAppStore } from '@/stores'
import { ModalProps } from 'antd'
import { PropsWithChildren, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Modal } from './Modal'

type Props = PropsWithChildren<ModalProps> & {
  isLoading?: boolean
}

export const CreateModal: React.FC<Props> = ({
  isLoading,
  children,
  ...props
}) => {
  const { openModal } = useAppStore()
  const { reset, getValues } = useFormContext()

  useEffect(() => {
    if (!openModal) {
      reset(
        Object.keys(getValues()).reduce(
          (pre, curr) => ({ ...pre, [curr]: '' }),
          {}
        ),
        {
          keepValues: false,
        }
      )
    }
  }, [openModal])

  return (
    <Modal isLoading={isLoading} {...props}>
      {children}
    </Modal>
  )
}
