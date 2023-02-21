import { ButtonProps, Form, ModalProps } from 'antd'
import { PropsWithChildren, useEffect } from 'react'
import { DeepPartial, FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ModalKey, useAppStore } from '../../stores'
import { OpenFilterButton } from '../button'
import { Modal } from './Modal'

type Props<T> = PropsWithChildren & {
  modalKey: ModalKey
  defaultValues?: DeepPartial<T>
  modalProps?: Omit<ModalProps, 'onOk'>
  buttonProps?: ButtonProps
  onApply: (params: T) => void
}

export const FilterModal = <T extends object>({
  modalKey,
  defaultValues,
  modalProps,
  buttonProps,
  onApply,
  children,
}: Props<T>) => {
  const { t } = useTranslation()
  const { openModal, setOpenModal } = useAppStore()
  const formMethods = useForm<T>()
  const { handleSubmit, reset } = formMethods

  useEffect(() => {
    if (openModal) {
      reset(defaultValues)
    }
  }, [openModal])

  const onOk = () => {
    handleSubmit(onApply)()
    setOpenModal()
  }

  return (
    <FormProvider {...formMethods}>
      <OpenFilterButton modalKey={modalKey} {...buttonProps} />
      <Modal
        open={openModal === modalKey}
        closable={false}
        onCancel={() => {
          setOpenModal()
        }}
        okText={t('common.apply')}
        onOk={onOk}
        {...modalProps}
      >
        <Form layout="vertical" size="middle">
          {children}
        </Form>
      </Modal>
    </FormProvider>
  )
}
