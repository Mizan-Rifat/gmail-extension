import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import classNames from "classnames";
import Creatable from "react-select/creatable";

interface MultiSelectProps {
  className?: string;
  placeholder?: string;
  name?: string;
  options: {
    value: string;
    label: string;
  }[];
}

const MultiSelect = ({ className, name, ...rest }: MultiSelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Creatable
          isMulti={true}
          className={classNames(className, "react-select no-indicator", {
            "is-invalid": !!errors.tags,
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
