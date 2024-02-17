import { Controller, useFormContext } from "react-hook-form";
import classNames from "classnames";
import ReactSelect from "react-select";

import { Props } from "react-select";

export interface SelectProps extends Props {
  className?: string;
  name?: string;
  required?: boolean;
}

const Select = ({ className, name, required, ...rest }: SelectProps) => {
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
        <ReactSelect
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

export default Select;
