/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWRMutation from "swr/mutation";
import axiosFetcher from "../axiosFetcher";
import paths from "../paths";

interface CreateLeadFormData {
  firstName: string;
  lastName: string;
  emai: string;
  opprotunityStage: string;
  profileImg?: string;
}

const useCreateLead = (businessId: string) => {
  const { trigger } = useSWRMutation<
    any,
    any,
    any,
    { data: CreateLeadFormData }
  >(paths.createLead(businessId), (key, { arg }) => axiosFetcher(key, arg));

  return {
    trigger,
  };
};

export default useCreateLead;
