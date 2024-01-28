import useSWR from "swr";
import axiosFetcher from "../axiosFetcher";
import paths from "../paths";
import { BusinessListItem } from "@root/src/types";

const useFetchBusinesses = () => {
  const { data, error, isLoading } = useSWR<{
    businessList: BusinessListItem[];
  }>(paths.getBusiessList, axiosFetcher);

  return {
    businesses: data?.businessList || [],
    isLoading,
    isError: error,
  };
};

export default useFetchBusinesses;
