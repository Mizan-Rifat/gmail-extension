/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWRMutation from "swr/mutation";
import axiosFetcher from "../axiosFetcher";
import { paths } from "../constants";
import { FormValues } from "../../App";

const useCreateLead = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    any,
    any,
    any,
    { data: Omit<FormValues, "name"> }
  >([paths.createLead, { method: "POST" }], axiosFetcher);

  return {
    trigger,
    isMutating,
    error,
  };
};

export default useCreateLead;
