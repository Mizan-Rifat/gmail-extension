import useSWR from "swr";
import axiosFetcher from "../axiosFetcher";
import paths from "../paths";
import { Stage } from "@root/src/types";

const useFetchBusinessStages = (id: string) => {
  const { data, error, isLoading } = useSWR<{ opportunityStages: Stage[] }>(
    paths.getStages(id),
    axiosFetcher
  );

  console.log({ data });

  return {
    stages: data?.opportunityStages || [],
    isLoading,
    isError: error,
  };
};

export default useFetchBusinessStages;
