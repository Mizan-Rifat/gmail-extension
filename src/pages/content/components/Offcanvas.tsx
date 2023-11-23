import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { EmailDetails } from ".";
import MultiSelect from "./MultiSelect";
import Portal from "./Portal";

interface OffcanvasProps {
  emailDetails: EmailDetails;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface FormValues {
  avatar: string;
  date: string;
  name: string;
  email: string;
  subject: string;
}

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla", ft: "jhjh" },
];

const Offcanvas = ({ emailDetails, open, setOpen }: OffcanvasProps) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      avatar: `https:${emailDetails.avatar}`,
      name: emailDetails.from.name,
      email: emailDetails.from.email,
      date: emailDetails.date,
      subject: emailDetails.subject,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <Portal>
      <div className="gmail-extension-offcanvas">
        <div
          style={{
            boxShadow:
              "0px 4px 5px 0px rgba(0,0,0,.14), 0px 1px 10px 0px rgba(0,0,0,.12), 0px 2px 4px -1px rgba(0,0,0,.2)",
          }}
          className={classNames(
            "fixed top-0 bottom-0 right-0 bg-white w-96 z-[1000] border-l border-gray-300 ease-in duration-300 p-6 overflow-auto",
            {
              "translate-x-full": !open,
            }
          )}
        >
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="text-right mb-4">
                <div className="flex justify-between items-center">
                  <h2>Add new lead</h2>
                  <button
                    className="h-8 w-8 inline-flex justify-center items-center rounded-full hover:bg-gray-200"
                    onClick={() => setOpen(false)}
                  >
                    x
                  </button>
                </div>
              </div>
              <div className="bg-white border border-gray-200 p-4 rounded-md mb-4">
                <div className="flex justify-center mb-4 ">
                  <img
                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                    src={emailDetails.avatar}
                    alt=""
                  />
                </div>

                <div className="grid grid-cols-3 mb-4 crx-class">
                  <h5 className="text-gray-800 font-bold col-span-1 text-sm">
                    Name
                  </h5>
                  <p className="text-gray-500 text-sm col-span-2">
                    {emailDetails.from.name}
                  </p>
                </div>
                <div className="grid grid-cols-3 mb-4">
                  <h5 className="text-gray-800 font-bold col-span-1 text-sm">
                    Email
                  </h5>
                  <p className="text-gray-500 text-sm col-span-2">
                    {emailDetails.from.email}
                  </p>
                </div>
                <div className="grid grid-cols-3 mb-4">
                  <h5 className="text-gray-800 font-bold col-span-1 text-sm">
                    Date
                  </h5>
                  <p className="text-gray-500 text-sm col-span-2">
                    {emailDetails.date}
                  </p>
                </div>
                <div className="grid grid-cols-3">
                  <h5 className="text-gray-800 font-bold col-span-1 text-sm">
                    Subject
                  </h5>
                  <p className="text-gray-500 text-sm col-span-2">
                    {emailDetails.subject}
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-4 rounded-md mb-4">
                <div className="mb-4">
                  <h5 className="text-gray-800 font-bold text-xs mb-2">
                    Category
                  </h5>
                  <MultiSelect name="category" options={options} />
                </div>
                <div className="mb-4">
                  <h5 className="text-gray-800 font-bold text-xs mb-2">
                    Priority
                  </h5>
                  <MultiSelect name="priority" options={options} />
                </div>
                <div className="mb-4">
                  <h5 className="text-gray-800 font-bold text-xs mb-2">
                    Stage
                  </h5>
                  <MultiSelect name="stage" options={options} />
                </div>
                <div className="mb-4">
                  <h5 className="text-gray-800 font-bold text-xs mb-2">
                    Lead Source
                  </h5>
                  <MultiSelect name="lead_source" options={options} />
                </div>
                <div>
                  <h5 className="text-gray-800 font-bold text-xs mb-2">
                    Campaign Source
                  </h5>
                  <MultiSelect name="campaign_source" options={options} />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              >
                Save
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
    </Portal>
  );
};

export default Offcanvas;
