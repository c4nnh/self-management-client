import { Button, Form } from 'antd'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../../apis'
import { FormInput, FormPassword } from '../../components'
import { RegisterPayload } from '../../models'
import { useAuthStore } from '../../stores'
import { requiredField } from '../../utils'

export const Register: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const formMethods = useForm<RegisterPayload>()
  const { login } = useAuthStore()
  const { handleSubmit } = formMethods

  const { mutate } = useRegisterMutation({
    onSuccess: login,
  })

  const handleRegister = handleSubmit(data => {
    mutate(data)
  })

  return (
    <FormProvider {...formMethods}>
      <Form layout="vertical" size="middle" className="flex flex-col">
        <FormInput name="email" label="Email" rules={requiredField(t)} />
        <FormInput name="name" label="Name" rules={requiredField(t)} />
        <FormPassword
          name="password"
          label="Password"
          rules={requiredField(t)}
        />
        <span
          className="text-blue-500 cursor-pointer text-center underline pb-1"
          onClick={() => navigate('/auth/login')}
        >
          {t('login.title')}
        </span>
        <Button type="primary" onClick={handleRegister}>
          {t('register.title')}
        </Button>
      </Form>
    </FormProvider>
  )
}
