/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ContentEditable from "react-contenteditable";
import {
  CloseCircleIcon,
  CloseIcon,
  CopiedIcon,
  CopyIcon,
  EditIcon,
  SaveIcon,
} from "../icons";
import classNames from "classnames";
import Tooltip from "./Tooltip";

interface EditableFieldProps {
  className?: string;
  name: string;
  defaultValue: string;
}

const EditableField = ({
  className,
  name,
  defaultValue,
}: EditableFieldProps) => {
  const { control, watch, setValue } = useFormContext();

  const allValues = watch();
  const text = useRef(defaultValue);
  const ref = useRef(null);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (editable) {
      ref.current.focus();
    }
  }, [editable]);

  useEffect(() => {
    text.current = allValues[name];
  }, [allValues]);

  console.log({ allValues });

  return (
    <div className={classNames("group/item", className)} key={allValues[name]}>
      {/* <h5 className="text-gray-800 font-bold col-span-1 text-sm">{label}</h5> */}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <div className="flex gap-2 justify-between items-start">
            <ContentEditable
              innerRef={ref}
              // html={allValues[name]}
              html={text.current}
              disabled={!editable}
              className={classNames(
                "text-gray-800 text-sm p-1 -m-1 flex-1 max-w-[195px] ",
                {
                  "break-words outline-none": !editable,
                  "outline outline-gray-200": editable,
                }
              )}
              onChange={(e) => {
                text.current = e.target.value;

                // onChange(e);
              }}
              onBlur={() => {
                // setEditable(false);
              }}
            />

            <div className="flex gap-1">
              {editable && (
                <Tooltip text="Cancel">
                  <button
                    type="button"
                    className="self-start mt-1 text-gray-700 hover:text-gray-800"
                    onClick={() => {
                      setEditable(false);
                      text.current = allValues[name];
                    }}
                  >
                    <CloseIcon />
                  </button>
                </Tooltip>
              )}
              <Tooltip text={editable ? "Save" : "Edit"}>
                <button
                  type="button"
                  className="self-start mt-1 text-gray-700 hover:text-gray-800"
                  onClick={() => {
                    if (!editable) {
                      setEditable(true);
                    } else {
                      setValue(name, text.current);
                      setEditable(false);
                    }
                  }}
                >
                  {editable ? <SaveIcon /> : <EditIcon />}
                </button>
              </Tooltip>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default EditableField;
