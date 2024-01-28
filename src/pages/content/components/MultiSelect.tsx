import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import classNames from "classnames";
import Creatable from "react-select/creatable";
import { Props } from "react-select";

interface MultiSelectProps extends Props {
  className?: string;
  name?: string;
  required?: boolean;
}

const MultiSelect = ({
  className,
  name,
  required,
  ...rest
}: MultiSelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: required ? "This field is required." : undefined }}
      render={({ field }) => (
        <Creatable
          className={classNames(className, "react-select no-indicator", {
            "[&>div]:border-2 [&>div]:border-red-400": !!errors[name],
          })}
          classNamePrefix="react-select"
          {...rest}
          {...field}
        />
      )}
    />
  );
};

export default MultiSelect;
