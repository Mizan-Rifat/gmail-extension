import useSWR, { SWRConfiguration } from "swr";
import { paths } from "../constants";
import { LeadAttributes } from "../../types";
import axiosFetcher from "../axiosFetcher";

const useFetchLeadAttributes = (
  shouldFetch = true,
  config?: SWRConfiguration
) => {
  const { data, ...rest } = useSWR<{ data: LeadAttributes }>(
    shouldFetch ? paths.getLeadAttributes : null,
    axiosFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
      ...config,
    }
  );

  return {
    attributes: data?.data || {
      leadIndustries: [],
      leadOpportunityStages: [],
      leadSources: [],
      leadTags: [],
    },
    data,
    ...rest,
  };
};

export default useFetchLeadAttributes;
