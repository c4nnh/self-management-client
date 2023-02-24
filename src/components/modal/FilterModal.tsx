import { ModalKey } from '@/models'
import { useAppStore } from '@/stores'
import { Button, ButtonProps, Form, ModalProps } from 'antd'
import { PropsWithChildren, useEffect } from 'react'
import { DeepPartial, FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { OpenFilterButton } from '../button'
import { Modal } from './Modal'

type Props<T> = PropsWithChildren & {
  modalKey: ModalKey
  defaultValues?: DeepPartial<T>
  modalProps?: ModalProps
  buttonProps?: ButtonProps
  onApply: (params: T) => void
  onReset: () => void
}

export const FilterModal = <T extends object>({
  modalKey,
  defaultValues,
  modalProps,
  buttonProps,
  children,
  onApply,
  onReset,
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

  const onCancel = () => {
    setOpenModal()
  }

  const handleReset = () => {
    reset({} as T, { keepValues: false })
    setOpenModal()
    onReset()
  }

  return (
    <FormProvider {...formMethods}>
      <OpenFilterButton modalKey={modalKey} {...buttonProps} />
      <Modal
        open={openModal === modalKey}
        onCancel={onCancel}
        footer={
          <div className="flex gap-2 justify-end items-center">
            <Button onClick={onCancel}>{t('common.cancel')}</Button>
            <Button type="primary" ghost onClick={handleReset}>
              {t('common.reset')}
            </Button>
            <Button onClick={onOk} type="primary">
              {t('common.apply')}
            </Button>
          </div>
        }
        {...modalProps}
      >
        <Form layout="vertical" size="middle">
          {children}
        </Form>
      </Modal>
    </FormProvider>
  )
}
