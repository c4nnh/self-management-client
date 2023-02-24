import { DEFAULT_COLUMN_CONFIG } from '@/constants'
import { ModalKey, TableConfig } from '@/models'
import { useAppStore, useLocalSettingStore } from '@/stores'
import { Form, ModalProps, notification } from 'antd'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import tw from 'twin.macro'
import { ColumnConfigButton } from '../button'
import { FormCheckbox } from '../form'
import { Modal } from './Modal'

type Props = {
  modalKey: ModalKey
  tableConfigKey: keyof TableConfig
  modalProps?: ModalProps
}

export const ColumnConfigModal: React.FC<Props> = ({
  modalKey,
  tableConfigKey,
  modalProps,
}) => {
  const { t } = useTranslation()
  const formMethods = useForm()
  const { openModal, columnLabel, setOpenModal } = useAppStore()
  const { columnConfig, setColumnConfig } = useLocalSettingStore()
  const { reset, handleSubmit } = formMethods

  useEffect(() => {
    reset({
      types: Object.entries(columnConfig[tableConfigKey])
        .filter(([_, value]) => value)
        .map(([key]) => key),
    })
  }, [])

  const onCancel = () => {
    reset({}, { keepValues: false })
    setOpenModal()
  }

  const onApply = handleSubmit(({ types: selectedColumns }) => {
    const hiddenColumns = Object.entries(DEFAULT_COLUMN_CONFIG[tableConfigKey])
      .filter(([key]) => !selectedColumns.includes(key))
      .map(([key]) => ({
        [key]: false,
      }))
    const visibleColumns: { [key: string]: boolean }[] = selectedColumns.map(
      (item: string) => ({
        [item]: true,
      })
    )

    if (!visibleColumns.length) {
      notification.warning({
        message: t('common.visibleAtLeastOneColumn'),
      })
    }

    setColumnConfig({
      [tableConfigKey]: [...hiddenColumns, ...visibleColumns].reduce(
        (pre, curr) => ({ ...pre, ...curr }),
        {}
      ),
    })
    setOpenModal()
  })

  return (
    <FormProvider {...formMethods}>
      <ColumnConfigButton modalKey={modalKey} />
      <StyledModal
        open={openModal === modalKey}
        onCancel={onCancel}
        onOk={onApply}
        okText={t('common.apply')}
        destroyOnClose
        title={t('common.configColumn.title')}
        {...modalProps}
      >
        <StyledForm layout="vertical" size="middle">
          <FormCheckbox<string>
            name="types"
            options={Object.keys(DEFAULT_COLUMN_CONFIG[tableConfigKey]).map(
              key => ({
                value: key,
                // @ts-ignore
                label: columnLabel[tableConfigKey][key],
              })
            )}
          />
        </StyledForm>
      </StyledModal>
    </FormProvider>
  )
}

const StyledModal = styled(Modal)`
  .ant-modal-body {
    min-height: 200px;
  }
`

const StyledForm = styled(Form)`
  .ant-form-item {
    ${tw`mt-10`}

    .ant-row
      > .ant-col
      > .ant-form-item-control-input
      > .ant-form-item-control-input-content
      > .form-checkbox-container
      > .ant-checkbox-group {
      ${tw`grid gap-x-10 gap-y-5`};
      grid-template-columns: repeat(auto-fill, minmax(calc(10% + 150px), 1fr));

      label {
        ${tw`ml-0`}
      }
    }
  }
`
