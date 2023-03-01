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

  const [fileList, setFileList] = useState<UploadFile[]>([])

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
    console.log(newFileList)
    setFileList(newFileList)
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

  const onUpload: UploadProps['action'] = (file: File) => {
    console.log(file)

    return 'https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg'
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
          >
            {fileList.length < 5 && '+ Upload'}
          </Upload>
        </ImgCrop>
      )}
    />
  )
}
