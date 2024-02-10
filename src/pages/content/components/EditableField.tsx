/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ContentEditable from "react-contenteditable";
import { EditIcon } from "./icons";

interface EditableFieldProps {
  label: string;
  name: string;
  defaultValue: string;
}

const EditableField = ({ label, name, defaultValue }: EditableFieldProps) => {
  const { control } = useFormContext();
  const text = useRef(defaultValue);
  const ref = useRef(null);

  return (
    <div className="grid grid-cols-3 mb-4 crx-class">
      <h5 className="text-gray-800 font-bold col-span-1 text-sm">{label}</h5>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <div className=" col-span-2 flex gap-2">
            <ContentEditable
              innerRef={ref}
              html={text.current}
              disabled={false}
              className="text-gray-500 text-sm p-1 -m-1 flex-1"
              onChange={(e) => {
                text.current = e.target.value;
                onChange(e);
              }}
            />
            <button
              type="button"
              className="self-start mt-1 text-gray-500 hover:text-gray-600"
              onClick={() => {
                ref.current.focus();
              }}
            >
              <EditIcon />
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default EditableField;
