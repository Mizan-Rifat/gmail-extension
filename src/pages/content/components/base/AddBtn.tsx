import React from "react";
import Tooltip from "./Tooltip";

const AddBtn = ({ innerText }: any) => {
  console.log({ innerText });

  const handleClick = (e) => {
    console.log(e.target);

    const td = e.target.closest("td");
    console.log({ td });
  };
  return (
    <Tooltip text="Add to OneSuite">
      <button
        className="text-blue-500 hover:text-blue-600"
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </Tooltip>
  );
};

export default AddBtn;
