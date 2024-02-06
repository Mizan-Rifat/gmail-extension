/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames";
import { Dispatch, SetStateAction, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import MultiSelect from "./MultiSelect";
import BusinessSelect from "@root/src/pages/content/components/BusinessSelect";
import StageSelect from "@root/src/pages/content/components/StageSelect";
import logo from "@assets/img/logo.jpeg";
import { CloseIcon } from "./icons";
import useCreateLead from "@root/src/services/apiHooks/useCreateLead";
import EditableField from "./EditableField";
import { BusinessListItem, EmailDetails } from "@root/src/pages/content/types";
import Toast from "./Toast";
import LeadSourceSelect from "./LeadSourceSelect";
import AttributeSelects from "./AttributeSelects";
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

  const [toast, setToast] = useState<{
    variant: "error" | "success";
    message: string;
  } | null>(null);

  const { handleSubmit, watch } = methods;

  const { business, name } = watch();

  const { trigger, isMutating } = useCreateLead(business?.businessId);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const nameSplit = data.name.split(" ");

    console.log({ data });

    // try {
    //   await trigger({
    //     data: {
    //       firstName: nameSplit[0],
    //       lastName: nameSplit.slice(1).join(" "),
    //       email: data.email,
    //       opprotunityStage: data.stage.stageName,
    //       profileImg: data.avatar,
    //     },
    //   });

    //   setToast({
    //     variant: "success",
    //     message: "Successfully added.",
    //   });
    // } catch (error) {
    //   setToast({
    //     variant: "error",
    //     message: error.data.message,
    //   });
    // }
  };

  return (
    // <Portal>
    <div className="gmail-extension-offcanvas">
      <div
        className={classNames(
          "fixed top-6 right-0 z-[1200] ease-in duration-300",
          {
            "translate-x-full": !toast,
          }
        )}
      >
        {toast && (
          <Toast
            variant={toast.variant}
            message={toast.message}
            handleClose={() => setToast(null)}
          />
        )}
      </div>
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
        {isMutating && (
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
              "opacity-50 pointer-events-none": isMutating,
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

              <AttributeSelects />

              {/* <div className="mb-4">
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
              </div> */}
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
