import { FormItemProps, Radio, RadioGroupProps } from "antd";
import React from "react";
import { ControllerProps } from "react-hook-form";
import { ControlledFormItem } from "./ControlledFormItem";

type Option = {
  value: any;
  label: React.ReactNode;
};

type Props = {
  name: string;
  options: Option[];
  formItemProps?: FormItemProps;
  formRadioGroupProps?: RadioGroupProps;
} & Omit<ControllerProps, "render">;

export const FormRadio: React.FC<Props> = ({
  formRadioGroupProps,
  options,
  ...rest
}) => {
  return (
    <ControlledFormItem
      {...rest}
      render={({ value, onChange }) => (
        <Radio.Group
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...formRadioGroupProps}
        >
          {options.map((item) => (
            <Radio value={item.value} key={item.value}>
              {item.label}
            </Radio>
          ))}
        </Radio.Group>
      )}
    />
  );
};
