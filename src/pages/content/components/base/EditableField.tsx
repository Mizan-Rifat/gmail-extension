/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ContentEditable from "react-contenteditable";
import { CopiedIcon, CopyIcon, EditIcon } from "../icons";
import classNames from "classnames";
import Tooltip from "./Tooltip";

interface EditableFieldProps {
  className?: string;
  name: string;
  defaultValue: string;
  copyAble?: boolean;
}

const EditableField = ({
  className,
  name,
  defaultValue,
  copyAble,
}: EditableFieldProps) => {
  const { control, watch } = useFormContext();
  const allValues = watch();
  const text = useRef(defaultValue);
  const ref = useRef(null);
  const [editable, setEditable] = useState(false);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(allValues[name]);
    setCopied(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (copied) {
        setCopied(false);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [copied]);

  useEffect(() => {
    if (editable) {
      ref.current.focus();
    }
  }, [editable]);

  return (
    <div className={classNames("group/item", className)}>
      {/* <h5 className="text-gray-800 font-bold col-span-1 text-sm">{label}</h5> */}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <div className="flex gap-2 justify-between items-start">
            <ContentEditable
              innerRef={ref}
              html={allValues[name]}
              disabled={!editable}
              className={classNames(
                "text-gray-800 text-sm p-1 -m-1 flex-1 max-w-[195px]",
                {
                  "break-words": !editable,
                }
              )}
              onChange={(e) => {
                // text.current = e.target.value;
                onChange(e);
              }}
              onBlur={() => {
                setEditable(false);
              }}
            />
            {copyAble && (
              <Tooltip text={copied ? "Copied" : "Copy"}>
                <button
                  type="button"
                  className="self-start mt-1 text-gray-700 hover:text-gray-800"
                  onClick={handleCopy}
                >
                  {copied ? <CopiedIcon /> : <CopyIcon />}
                </button>
              </Tooltip>
            )}

            <Tooltip text="Edit">
              <button
                type="button"
                className="self-start mt-1 text-gray-700 hover:text-gray-800"
                onClick={() => {
                  setEditable(true);
                }}
              >
                <EditIcon />
              </button>
            </Tooltip>
          </div>
        )}
      />
    </div>
  );
};

export default EditableField;
