import useSWR from "swr";
import axiosFetcher from "../axiosFetcher";
import paths from "../paths";
import { Stage } from "@root/src/types";

const useFetchBusinessStages = (id: string) => {
  const { data, error, isLoading } = useSWR<{ opportunityStages: Stage[] }>(
    id ? paths.getStages(id) : null,
    axiosFetcher
  );

  return {
    stages: data?.opportunityStages || [],
    isLoading,
    isError: error,
  };
};

export default useFetchBusinessStages;
