/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWRMutation from "swr/mutation";
import axiosFetcher from "../axiosFetcher";
import paths from "../paths";

interface CreateLeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  opprotunityStage: string;
  profileImg?: string;
}

const useCreateLead = (businessId: string) => {
  const { trigger, isMutating, error } = useSWRMutation<
    any,
    any,
    any,
    { data: CreateLeadFormData }
  >(paths.createLead(businessId), (key, { arg }) =>
    axiosFetcher({ url: key, config: { method: "post", ...arg } })
  );

  return {
    trigger,
    isMutating,
    error,
  };
};

export default useCreateLead;
