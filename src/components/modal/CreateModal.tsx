import { ModalKey } from '@/models'
import { useAppStore, useFormStore } from '@/stores'
import { ButtonProps, Form, ModalProps, notification } from 'antd'
import { PropsWithChildren, useEffect } from 'react'
import { DeepPartial, FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { OpenCreateButton } from '../button'
import { Modal } from './Modal'

type Props<C, U> = PropsWithChildren & {
  modalKey: ModalKey
  modalProps?: ModalProps & { isLoading?: boolean }
  buttonProps?: ButtonProps
  onCreate: (dto: C) => void
  onUpdate: (dto: U) => void
}

export const CreateModal = <C extends object, U extends object>({
  modalKey,
  modalProps,
  buttonProps,
  onCreate,
  onUpdate,
  children,
}: Props<C, U>) => {
  const { t } = useTranslation()
  const { openModal, selectedId, setOpenModal, setSelectedId } = useAppStore()
  const {
    isChanged,
    hasImageError,
    defaultValues,
    setIsChanged,
    setDefaultValues,
  } = useFormStore()
  const formMethods = useForm<C | U>()
  const { handleSubmit, reset, formState } = formMethods
  const { isDirty } = formState

  useEffect(() => {
    if (openModal) {
      reset((selectedId ? defaultValues : {}) as DeepPartial<C | U>)
    }
  }, [openModal, defaultValues])

  useEffect(() => {
    setIsChanged(isDirty)
  }, [isDirty])

  const onSave = handleSubmit(dto => {
    if (hasImageError) {
      notification.warning({ message: t('common.invalidImage') })
      return
    }
    if (!selectedId) {
      onCreate(dto as C)
      return
    }
    onUpdate(dto as U)
  })

  const onCancel = () => {
    setOpenModal()
    setSelectedId()
    setIsChanged(false)
  }

  return (
    <FormProvider {...formMethods}>
      <OpenCreateButton modalKey={modalKey} {...buttonProps} />
      <Modal
        open={openModal === modalKey}
        onCancel={onCancel}
        onOk={onSave}
        okText={selectedId ? t('common.save') : t('common.create')}
        {...modalProps}
        okButtonProps={{
          ...modalProps?.okButtonProps,
          disabled:
            !!selectedId && (!isChanged || modalProps?.okButtonProps?.disabled),
        }}
      >
        <Form layout="vertical" size="middle">
          {children}
        </Form>
      </Modal>
    </FormProvider>
  )
}
