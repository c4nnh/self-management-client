import { useCreateSignedUrlMutation, useUploadImageMutation } from '@/apis'
import { FormItemProps, Upload, UploadFile } from 'antd'
import ImgCrop from 'antd-img-crop'
import { RcFile, UploadProps } from 'antd/es/upload'
import React, { useEffect, useState } from 'react'
import { ControllerProps, useFormContext } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { ControlledFormItem } from './ControlledFormItem'

type Props = {
  name: string
  label?: string | null
  formItemProps?: FormItemProps
} & Omit<ControllerProps, 'render'>

export const FormUploadImages: React.FC<Props> = ({ name, ...rest }) => {
  const formContext = useFormContext()
  const { watch } = formContext
  const urlsValue: string[] | undefined = watch(name)
  const { mutateAsync: createSignedUrlMutateAsync } =
    useCreateSignedUrlMutation({
      onSuccess: signedUrl => {
        setPublicUrl(signedUrl.publicUrl)
      },
    })
  const uploadImageMutation = useUploadImageMutation()

  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [publicUrl, setPublicUrl] = useState<string>()

  useEffect(() => {
    setFileList(
      (urlsValue || []).map(url => ({
        uid: uuidv4(),
        name: url,
        url,
        status: 'done',
      }))
    )
  }, [urlsValue])

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(
      newFileList.map(item => {
        if (item.status === 'done') {
          const {
            uid,
            name,
            response: { url },
          } = item
          return {
            uid,
            name,
            url,
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

  return (
    <ControlledFormItem
      name={name}
      {...rest}
      render={() => (
        <ImgCrop rotate>
          <Upload
            action={onUpload}
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            customRequest={customRequest}
          >
            {fileList.length < 5 && '+ Upload'}
          </Upload>
        </ImgCrop>
      )}
    />
  )
}
