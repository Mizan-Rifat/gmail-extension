/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext } from "react-hook-form";
import classNames from "classnames";

interface EditableFieldProps {
  className?: string;
  name: string;
}

const EditableField = ({ className, name }: EditableFieldProps) => {
  const { watch } = useFormContext();
  const allValues = watch();

  return (
    <div className={classNames("group/item", className)}>
      {/* <h5 className="text-gray-800 font-bold col-span-1 text-sm">{label}</h5> */}

      <p className="text-gray-800 text-sm p-1 -m-1 flex-1 max-w-[195px]">
        {allValues[name]}
      </p>
    </div>
  );
};

export default EditableField;
