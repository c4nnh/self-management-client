import { useLoginMutation } from '@/apis'
import { FormInput, FormPassword } from '@/components'
import { LoginPayload } from '@/models'
import { useAuthStore } from '@/stores'
import { requiredField } from '@/utils'
import { Button, Form } from 'antd'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const formMethods = useForm<LoginPayload>()
  const { login } = useAuthStore()
  const { handleSubmit } = formMethods

  const { mutate, isLoading } = useLoginMutation({
    onSuccess: login,
  })

  const handleLogin = handleSubmit(data => {
    mutate(data)
  })

  return (
    <FormProvider {...formMethods}>
      <Form layout="vertical" size="middle" className="flex flex-col">
        <FormInput
          name="email"
          label="Email"
          rules={requiredField(t)}
          inputProps={{ readOnly: isLoading }}
        />
        <FormPassword
          name="password"
          label="Password"
          rules={requiredField(t)}
          inputProps={{ readOnly: isLoading }}
        />
        <span
          className="text-blue-500 cursor-pointer text-center underline pb-1"
          onClick={() => navigate('/auth/register')}
        >
          {t('login.doNotHaveAccount')}
        </span>
        <Button type="primary" loading={isLoading} onClick={handleLogin}>
          {t('login.title')}
        </Button>
      </Form>
    </FormProvider>
  )
}
