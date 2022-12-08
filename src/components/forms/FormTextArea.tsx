import { FormItemProps, Input } from "antd";
import { TextAreaProps } from "antd/lib/input";
import React from "react";
import { ControllerProps } from "react-hook-form";
import { ControlledFormItem } from "./ControlledFormItem";

type Props = {
  name: string;
  label?: string;
  formItemProps?: FormItemProps;
  textAreaProps?: TextAreaProps;
} & Omit<ControllerProps, "render">;

export const FormTextArea: React.FC<Props> = ({ textAreaProps, ...rest }) => {
  return (
    <ControlledFormItem
      {...rest}
      render={({ value, onChange, onBlur }) => (
        <Input.TextArea
          rows={5}
          {...{ value, onChange, onBlur }}
          {...textAreaProps}
        />
      )}
    />
  );
};
