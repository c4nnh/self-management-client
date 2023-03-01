import { useCreateSignedUrlMutation, useUploadImageMutation } from '@/apis'
import { useImageStore } from '@/stores'
import { FormItemProps, Upload, UploadFile } from 'antd'
import ImgCrop from 'antd-img-crop'
import { RcFile, UploadProps } from 'antd/es/upload'
import React, { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { ControllerProps, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'
import { ControlledFormItem } from './ControlledFormItem'

type Props = {
  initialUrls?: string[]
  name: string
  max?: number
  label?: string | null
  formItemProps?: FormItemProps
} & Omit<ControllerProps, 'render'>

export const FormUploadImages: React.FC<Props> = ({
  initialUrls = [],
  name,
  max = 5,
  label,
  ...rest
}) => {
  const { t } = useTranslation()
  const { setHasError, setIsChanged } = useImageStore()
  const formContext = useFormContext()
  const { setValue } = formContext
  const { mutateAsync: createSignedUrlMutateAsync } =
    useCreateSignedUrlMutation()
  const uploadImageMutation = useUploadImageMutation()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [publicUrl, setPublicUrl] = useState<string>()
  const [aspect, setAspect] = useState(1)

  useEffect(() => {
    setFileList(
      initialUrls.map(url => ({
        uid: uuidv4(),
        name: url,
        url,
        status: 'done',
      }))
    )
  }, [])

  useEffect(() => {
    const newUrls = fileList.map(item => item.url)
    setValue(name, newUrls)
    setHasError(fileList.some(item => item.status !== 'done'))
    setIsChanged(
      JSON.stringify(initialUrls.sort()) !== JSON.stringify(newUrls.sort())
    )
  }, [fileList])

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(
      newFileList.map(item => {
        if (item.status === 'done' && !item.url) {
          const { uid, name, response } = item
          return {
            uid,
            name,
            url: response?.response?.url,
            status: 'done',
          }
        }
        return item
      })
    )
  }

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  const onUpload: UploadProps['action'] = async (file: File) => {
    const { name: fileName, type: fileType } = file

    const data = await createSignedUrlMutateAsync({
      fileName,
      fileType,
    })

    flushSync(() => setPublicUrl(data.publicUrl))

    return data?.uploadUrl
  }

  const customRequest: UploadProps['customRequest'] = async ({
    file,
    action,
    onSuccess = () => {},
    onError = () => {},
  }) => {
    const isSuccess = await uploadImageMutation.mutateAsync({
      file: file as File,
      url: action,
    })
    const uploadFile = file as UploadFile

    if (isSuccess) {
      onSuccess({
        ...uploadFile,
        response: {
          ...uploadFile,
          url: publicUrl,
        },
      })
      return
    }
    onError({} as Error)
  }

  const getImageAspect = (file: RcFile): Promise<number> => {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener('load', event => {
        const _loadedImageUrl = event.target?.result
        const image = document.createElement('img')
        image.src = _loadedImageUrl as string
        image.addEventListener('load', () => {
          const { width, height } = image
          resolve(width / height)
        })
      })
    })
  }

  const beforeCrop = async (file: RcFile, []) => {
    const imageAspect = await getImageAspect(file)
    setAspect(imageAspect)
    return true
  }

  return (
    <ControlledFormItem
      name={name}
      {...rest}
      render={() => (
        <ImgCrop
          rotate
          modalTitle={`${t('common.cropImage')}`}
          quality={1}
          beforeCrop={beforeCrop}
          aspect={aspect}
          modalOk={`${t('common.ok')}`}
          modalCancel={`${t('common.cancel')}`}
        >
          <Upload
            action={onUpload}
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            customRequest={customRequest}
          >
            {fileList.length < max && t('common.selectImage')}
          </Upload>
        </ImgCrop>
      )}
    />
  )
}
