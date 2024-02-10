import useSWR from "swr";
import axiosFetcher from "../axiosFetcher";
import paths from "../paths";

const useFetchBusinesses = () => {
  const { data, error, isLoading } = useSWR(
    { url: paths.getBusiessList },
    axiosFetcher
  );

  return {
    businesses: data?.businessList || [],
    isLoading,
    isError: error,
  };
};

export default useFetchBusinesses;
