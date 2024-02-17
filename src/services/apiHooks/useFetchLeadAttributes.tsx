import useSWR from "swr";
import axiosFetcher from "../axiosFetcher";
import { paths } from "../constants";
import { LeadAttributes } from "@root/src/pages/content/types";

const useFetchLeadAttributes = (id: string) => {
  const { data, error, isLoading } = useSWR<{ data: LeadAttributes }>(
    id ? { url: paths.getLeadAttributes(id) } : null,
    axiosFetcher
  );

  return {
    attributes: data?.data || {
      leadIndustries: [],
      leadOpportunityStages: [],
      leadSources: [],
      leadTags: [],
    },
    isLoading,
    isError: error,
  };
};

export default useFetchLeadAttributes;
