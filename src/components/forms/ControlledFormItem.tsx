import { Form, FormItemProps } from "antd";
import { PropsWithChildren } from "react";
import {
  Controller,
  ControllerProps,
  ControllerRenderProps,
  useFormContext,
} from "react-hook-form";

type Props = PropsWithChildren<
  {
    name: string;
    label?: string;
    formItemProps?: FormItemProps;
    render: (
      props: Pick<ControllerRenderProps, "value" | "onChange" | "onBlur">
    ) => React.ReactNode;
  } & Omit<ControllerProps, "render">
>;

export const ControlledFormItem: React.FC<Props> = ({
  name,
  label,
  formItemProps = {},
  render,
  ...controllerProps
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      {...controllerProps}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : "validating"}
          help={error?.message}
          {...formItemProps}
        >
          {render({ value, onChange, onBlur })}
        </Form.Item>
      )}
    />
  );
};
