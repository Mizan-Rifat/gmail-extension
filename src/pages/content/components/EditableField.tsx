/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

import ContentEditable from "react-contenteditable";

interface EditableFieldProps {
  label: string;
  name: string;
  defaultValue: string;
}

const EditableField = ({ label, name, defaultValue }: EditableFieldProps) => {
  const { control } = useFormContext();

  const text = useRef(defaultValue);

  return (
    <div className="grid grid-cols-3 mb-4 crx-class">
      <h5 className="text-gray-800 font-bold col-span-1 text-sm">{label}</h5>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <ContentEditable
            html={text.current}
            disabled={false}
            className="text-gray-500 text-sm col-span-2 p-1 -m-1"
            onChange={(e) => {
              text.current = e.target.value;
              onChange(e);
            }}
          />
        )}
      />
    </div>
  );
};

export default EditableField;
