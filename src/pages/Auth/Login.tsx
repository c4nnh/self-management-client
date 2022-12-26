import { Button, Form } from 'antd'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../apis'
import { FormInput, FormPassword } from '../../components'
import { LoginPayload } from '../../models'
import { useAuthStore } from '../../stores'
import { requiredField } from '../../utils'

export const Login: React.FC = () => {
  const navigate = useNavigate()

  const formMethods = useForm<LoginPayload>()
  const { login } = useAuthStore()
  const { handleSubmit } = formMethods

  const { mutate, isLoading } = useLoginMutation({
    onSuccess: login,
  })

  const handleLogin = handleSubmit(data => {
    console.log(data)

    mutate(data)
  })

  return (
    <FormProvider {...formMethods}>
      <Form layout="vertical" size="middle" className="flex flex-col">
        <FormInput name="email" label="Email" rules={requiredField} />
        <FormPassword name="password" label="Password" rules={requiredField} />
        <span
          className="text-blue-500 cursor-pointer text-center underline pb-1"
          onClick={() => navigate('/auth/register')}
        >
          Doesn't have account?
        </span>
        <Button type="primary" loading={isLoading} onClick={handleLogin}>
          Login
        </Button>
      </Form>
    </FormProvider>
  )
}
