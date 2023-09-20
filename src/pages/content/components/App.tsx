import classNames from "classnames";
import { useEffect, useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default function App({ emailDetails }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    console.log("content view loaded");
  }, []);

  return (
    <>
      <div className="text-center">
        <button
          className="h-8 w-8 inline-flex justify-center items-center rounded-full border border-gray-200 hover:bg-gray-200"
          onClick={() => setOpen(true)}
        >
          +
        </button>
      </div>
      <div
        className={classNames(
          "fixed top-0 bottom-0 right-0 bg-gray-50 w-96 z-[1000] border-l border-gray-300 ease-in duration-300 p-6 overflow-auto",
          {
            "translate-x-full": !open,
          }
        )}
      >
        <div className="text-right mb-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold">Details</h2>
            <button
              className="h-8 w-8 inline-flex justify-center items-center rounded-full border border-gray-200 hover:bg-gray-200"
              onClick={() => setOpen(false)}
            >
              x
            </button>
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-md mb-4">
          <div className="flex justify-center mb-4">
            <img
              className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
              src={emailDetails.avatar}
              alt=""
            />
          </div>

          <div className="mb-4">
            <h5 className="text-gray-800 font-bold text-xs">Name</h5>
            <p className="text-gray-500 text-sm">{emailDetails.from.name}</p>
          </div>
          <div className="mb-4">
            <h5 className="text-gray-800 font-bold text-xs">Email</h5>
            <p className="text-gray-500 text-sm">{emailDetails.from.email}</p>
          </div>
          <div className="mb-4">
            <h5 className="text-gray-800 font-bold text-xs">Date</h5>
            <p className="text-gray-500 text-sm">{emailDetails.date}</p>
          </div>
          <div>
            <h5 className="text-gray-800 font-bold text-xs">Subject</h5>
            <p className="text-gray-500 text-sm">{emailDetails.subject}</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-md mb-4">
          <div className="mb-4">
            <h5 className="text-gray-800 font-bold text-xs mb-2">Category</h5>
            <CreatableSelect isClearable options={options} />
          </div>
          <div className="mb-4">
            <h5 className="text-gray-800 font-bold text-xs mb-2">Priority</h5>
            <CreatableSelect isClearable options={options} />
          </div>
          <div className="mb-4">
            <h5 className="text-gray-800 font-bold text-xs mb-2">Stage</h5>
            <CreatableSelect isClearable options={options} />
          </div>
          <div className="mb-4">
            <h5 className="text-gray-800 font-bold text-xs mb-2">
              Lead Source
            </h5>
            <CreatableSelect isClearable options={options} />
          </div>
          <div>
            <h5 className="text-gray-800 font-bold text-xs mb-2">
              Campaign Source
            </h5>
            <CreatableSelect isClearable options={options} />
          </div>
        </div>
        <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
          Save
        </button>
      </div>
    </>
  );
}
