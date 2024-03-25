/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ContentEditable from "react-contenteditable";
import {
  CheckIcon,
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
  fieldUpdated: any;
}

const EditableField = ({
  className,
  name,
  defaultValue,
  fieldUpdated,
}: EditableFieldProps) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const { watch, setValue } = useFormContext();

  const allValues = watch();

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    setInputValue(allValues[name]);
  }, [allValues[name]]);

  return (
    <div className={classNames("group/item", className)} key={allValues[name]}>
      {/* <h5 className="text-gray-800 font-bold col-span-1 text-sm">{label}</h5> */}

      <div className="flex gap-2 justify-between items-start">
        {editable ? (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="text-gray-800 text-sm p-1 -m-1 flex-1 max-w-[195px] border border-gray-200 outline-none focus:border-gray-400"
          />
        ) : (
          <div
            className={classNames(
              "text-gray-800 text-sm p-1 -m-1 flex-1 max-w-[195px] ",
              {
                "break-words outline-none": !editable,
                "outline outline-gray-200": editable,
              }
            )}
          >
            {allValues[name]}
          </div>
        )}

        <div className="flex gap-1">
          {editable && (
            <Tooltip text="Cancel">
              <button
                type="button"
                className="self-start mt-1 text-gray-700 hover:text-gray-800"
                onClick={() => {
                  setEditable(false);
                  setInputValue(allValues[name]);
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
                  setValue(name, inputValue);
                  fieldUpdated.current = true;
                  setEditable(false);
                }
              }}
            >
              {editable ? <CheckIcon /> : <EditIcon />}
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default EditableField;
