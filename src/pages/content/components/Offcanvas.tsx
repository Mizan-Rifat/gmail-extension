/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { EmailDetails } from ".";
import MultiSelect from "./MultiSelect";
import BusinessSelect from "./BusinessSelect";
import StageSelect from "./StageSelect";
import logo from "@assets/img/logo.jpeg";
import { CloseIcon } from "./icons";
import useCreateLead from "@root/src/services/apiHooks/useCreateLead";
import { BusinessListItem } from "@root/src/types";
import EditableField from "./EditableField";
interface OffcanvasProps {
  emailDetails: EmailDetails;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface FormValues {
  avatar: string;
  name: string;
  email: string;
  date: string;
  subject: string;
  business?: BusinessListItem;
  stage?: any;
  lead_source?: any;
  category?: any;
  priority?: any;
  campaign_source?: any;
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

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const { business, name } = watch();

  const { trigger } = useCreateLead(business?.businessId);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const nameSplit = data.name.split(" ");
    // trigger({
    //   data: {
    //     firstName: data.name,
    //     lastName: data.name,
    //     emai: data.email,
    //     opprotunityStage: data.stage.stageName,
    //     profileImg: data.avatar,
    //   },
    // });
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log({
          firstName: nameSplit[0],
          lastName: nameSplit.slice(1).join(" "),
          emai: data.email,
          opprotunityStage: data.stage.stageName,
          profileImg: data.avatar,
        });
        resolve("asd");
      }, 500);
    });
  };

  return (
    // <Portal>
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
        {isSubmitting && (
          <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 z-10">
            <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-500 border-4 h-8 w-8" />
          </div>
        )}

        <div className="text-right mb-4">
          <div className="flex justify-between items-center">
            <img src={chrome.runtime.getURL(logo)} alt="onesuite" width={150} />

            <button
              className="h-8 w-8 inline-flex justify-center items-center rounded-full hover:bg-gray-200 border border-200 mb-1"
              onClick={() => setOpen(false)}
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={classNames({
              "opacity-50 pointer-events-none": isSubmitting,
            })}
          >
            <div className="bg-white border border-gray-200 p-4 rounded-md mb-4">
              <div className="flex justify-center mb-4 ">
                <img
                  className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                  src={emailDetails.avatar}
                  alt=""
                />
              </div>

              <EditableField label="Name" name="name" defaultValue={name} />

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
              <BusinessSelect />
              <StageSelect />
              <div className="mb-4">
                <h5 className="text-gray-800 font-bold text-xs mb-2">
                  Lead Source
                </h5>
                <MultiSelect name="lead_source" options={options} />
              </div>
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
    // </Portal>
  );
};

export default Offcanvas;
