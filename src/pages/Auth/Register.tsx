import { Button, Form } from 'antd'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../../apis'
import { FormInput, FormPassword } from '../../components'
import { RegisterPayload } from '../../models'
import { useAuthStore } from '../../stores'
import { requiredField } from '../../utils'

export const Register: React.FC = () => {
  const navigate = useNavigate()
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
        <FormInput name="email" label="Email" rules={requiredField} />
        <FormInput name="name" label="Name" rules={requiredField} />
        <FormPassword name="password" label="Password" rules={requiredField} />
        <span
          className="text-blue-500 cursor-pointer text-center underline pb-1"
          onClick={() => navigate('/auth/login')}
        >
          Login
        </span>
        <Button type="primary" onClick={handleRegister}>
          Register
        </Button>
      </Form>
    </FormProvider>
  )
}
