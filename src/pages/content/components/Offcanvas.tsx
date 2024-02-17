/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import classNames from "classnames";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import logo from "@assets/img/logo.png";
import { CloseIcon } from "./icons";
import useCreateLead from "@root/src/services/apiHooks/useCreateLead";
import EditableField from "./base/EditableField";
import {
  BusinessListItem,
  EmailDetails,
  LeadIndustry,
  LeadOpportunityStage,
  LeadSource,
  LeadTag,
} from "@root/src/pages/content/types";
import Toast from "./base/Toast";
import AttributeSelects from "./AttributeSelects";
import { getStorageValue } from "../utils";
import { CLIENT_URL } from "@root/src/services/constants";
interface OffcanvasProps {
  emailDetails: EmailDetails;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface FormValues {
  avatar: string;
  business: BusinessListItem;
  date: string;
  email: string;
  industry?: LeadIndustry;
  name: string;
  opportunityStage: LeadOpportunityStage;
  priority?: { value: string; label: string };
  source?: LeadSource;
  tags?: LeadTag[];
}

const Offcanvas = ({ emailDetails, open, setOpen }: OffcanvasProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const methods = useForm<FormValues>({
    defaultValues: {
      avatar: `https:${emailDetails.avatar}`,
      name: emailDetails.from.name,
      email: emailDetails.from.email,
      date: emailDetails.date,
    },
  });

  const [toast, setToast] = useState<{
    variant: "error" | "success";
    message: string;
  } | null>(null);

  const { handleSubmit, watch, reset } = methods;

  const { business, name, email } = watch();

  const { trigger, isMutating } = useCreateLead(business?.businessId);

  const handleAuthChange = useCallback(async () => {
    const token = await getStorageValue("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [setIsLoggedIn]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const nameSplit = data.name.split(" ");

    console.log({ data });

    const formData = {
      firstName: nameSplit[0],
      lastName: nameSplit.slice(1).join(" "),
      email: data.email,
      profileImg: data.avatar,
      opprotunityStage: data.opportunityStage.stageName,
    };

    if (data.industry) {
      formData.industry = data.industry.id;
    }
    if (data.source) {
      formData.source = data.source.id;
    }
    if (data.priority) {
      formData.priority = data.priority.value;
    }
    if (data.tags) {
      formData.tags = data.tags.map((tag) => ({
        key: tag.id,
      }));
    }
    console.log({ formData });

    try {
      await trigger({
        data: formData,
      });

      setToast({
        variant: "success",
        message: "Successfully added.",
      });

      reset();
      setOpen(false);
    } catch (error) {
      setToast({
        variant: "error",
        message: error.data.message,
      });
    }
  };

  useEffect(() => {
    handleAuthChange();
    document.addEventListener("authChanged", handleAuthChange);

    return () => {
      document.removeEventListener("authChanged", handleAuthChange);
    };
  }, []);

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
          "fixed top-0 bottom-0 right-0 bg-white w-96 z-[1000] border-l border-gray-300 ease-in duration-300 p-6 overflow-auto flex flex-col",
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
            <a
              href="https://staging.onesuite.io"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={chrome.runtime.getURL(logo)}
                alt="onesuite"
                width={150}
              />
            </a>
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
            className={classNames("flex-1 flex flex-col", {
              "opacity-50 pointer-events-none": isMutating,
            })}
          >
            <div className="bg-white border border-gray-200 p-4 rounded-md mb-4">
              <h5 className="text-gray-800 font-bold col-span-1 text-sm">
                Lead Details
              </h5>
              <div className="flex justify-center mb-4 ">
                <img
                  className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                  src={emailDetails.avatar}
                  alt=""
                />
              </div>

              <EditableField label="Name" name="name" defaultValue={name} />

              <EditableField label="Email" name="email" defaultValue={email} />
            </div>

            {isLoggedIn ? (
              <>
                <div className="bg-white border border-gray-200 p-4 rounded-md mb-4">
                  <AttributeSelects />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                  Save
                </button>
              </>
            ) : (
              <div className="flex flex-col justify-center flex-1 text-center">
                <p className="mb-2">
                  You're not signed in. Please sign in to OneSuite first.
                </p>
                <p className="text-sm mb-2">
                  If you are already logged in, please refresh the page.{" "}
                </p>
                <a
                  href={CLIENT_URL}
                  target="_blank"
                  rel="noreferrer"
                  type="button"
                  className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-center"
                >
                  Sign in to OneSuite
                </a>
              </div>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
    // </Portal>
  );
};

export default Offcanvas;
