import { Button, Form } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../apis";
import { FormInput, FormPassword } from "../../components";
import { LoginPayload } from "../../models";
import { useAuthStore } from "../../stores";

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const formMethods = useForm<LoginPayload>();
  const { login } = useAuthStore();
  const { handleSubmit } = formMethods;

  const { mutate } = useLoginMutation({
    onSuccess: login,
  });

  const handleLogin = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <FormProvider {...formMethods}>
      <Form
        layout="vertical"
        size="middle"
        className="flex flex-col"
        onFinish={handleLogin}
      >
        <FormInput name="usernameOrEmail" label="Username or email" />
        <FormPassword name="password" label="Password" />
        <span
          className="text-blue-500 cursor-pointer text-center underline"
          onClick={() => navigate("/auth/register")}
        >
          Doesn't have account?
        </span>
        <Button htmlType="submit" type="primary">
          Login
        </Button>
      </Form>
    </FormProvider>
  );
};
