import { Button, Form } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../apis";
import { FormInput, FormPassword } from "../../components";
import { RegisterPayload } from "../../models";
import { useAuthStore } from "../../stores";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const formMethods = useForm<RegisterPayload>();
  const { login } = useAuthStore();
  const { handleSubmit } = formMethods;

  const { mutate } = useRegisterMutation({
    onSuccess: login,
  });

  const handleRegister = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <FormProvider {...formMethods}>
      <Form
        layout="vertical"
        size="middle"
        className="flex flex-col"
        onFinish={handleRegister}
      >
        <FormInput name="email" label="Email" />
        <FormInput name="name" label="Name" />
        <FormPassword name="password" label="Password" />
        <span
          className="text-blue-500 cursor-pointer text-center underline"
          onClick={() => navigate("/auth/login")}
        >
          Login
        </span>
        <Button htmlType="submit" type="primary">
          Register
        </Button>
      </Form>
    </FormProvider>
  );
};
