import { FormItemProps, Select, SelectProps } from "antd";
import { ControllerProps } from "react-hook-form";
import { ControlledFormItem } from "./ControlledFormItem";

export type SelectOption = {
  value: string;
  label: string | React.ReactNode;
};

type Props = {
  name: string;
  options: SelectOption[];
  label?: string;
  formItemProps?: FormItemProps;
  selectProps?: SelectProps;
} & Omit<ControllerProps, "render">;

export const FormSelect: React.FC<Props> = ({
  selectProps,
  options,
  ...rest
}) => {
  return (
    <ControlledFormItem
      {...rest}
      render={({ value, onChange, onBlur }) => (
        <Select {...{ value, onChange, onBlur }} {...selectProps}>
          {options
            .filter(
              (item, index, self) =>
                index === self.findIndex((i) => i.value === item.value)
            )
            .map((item) => (
              <Select.Option value={item.value} key={item.value}>
                {item.label}
              </Select.Option>
            ))}
        </Select>
      )}
    />
  );
};
