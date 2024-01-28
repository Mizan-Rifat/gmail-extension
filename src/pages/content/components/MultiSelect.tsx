import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import classNames from "classnames";
import Creatable from "react-select/creatable";
import CreatableSelect from "react-select/dist/declarations/src/Creatable";
import { Props } from "react-select";

interface MultiSelectProps extends Props {
  className?: string;
  // placeholder?: string;
  name?: string;
  // options: {
  //   value: string;
  //   label: string;
  // }[];
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
