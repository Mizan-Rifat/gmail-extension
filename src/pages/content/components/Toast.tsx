import React, { useEffect } from "react";
import { CheckIcon, CloseCircleIcon, CloseIcon } from "./icons";
import classNames from "classnames";

interface ToastProps {
  variant: "success" | "error";
  handleClose: () => void;
  message: string;
}

const Toast = ({ variant, handleClose, message }: ToastProps) => {
  useEffect(() => {
    const tt = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => clearTimeout(tt);
  }, []);
  return (
    <div
      className={classNames(
        "flex flex-col justify-center items-center min-w-[300px]",
        {
          "bg-green-400": variant === "success",
          "bg-red-400": variant === "error",
        }
      )}
    >
      <div
        className={classNames(
          "bg-grey-lightest border-l-4 px-4 py-2 rounded shadow-lg flex items-center justify-between gap-2 w-full text-white",
          {
            "border-green-600": variant === "success",
            "border-red-600": variant === "error",
          }
        )}
        role="alert"
      >
        {/* {variant === "success" && (
          <CheckIcon className="text-green-600 w-5 h-5" />
        )}
        {variant === "error" && (
          <CloseCircleIcon className="text-red-600 w-5 h-5" />
        )} */}
        <p className="font-bold flex-1">{message}</p>
        {/* <p className="text-grey-dark inline-block">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut.
          </p> */}

        <button onClick={handleClose}>
          <CloseIcon className="text-gray-100 hover:text-gray-300 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
