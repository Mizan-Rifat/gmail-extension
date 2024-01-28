import { BusinessListItem } from "@root/src/types";
import MultiSelect from "./MultiSelect";
import useFetchBusinesses from "@root/src/services/apiHooks/useFetchBusinesses";

const BusinessSelect = () => {
  const { businesses, isLoading } = useFetchBusinesses();

  return (
    <div className="mb-4">
      <h5 className="text-gray-800 font-bold text-xs mb-2">Business</h5>
      <MultiSelect
        name="business"
        isLoading={isLoading}
        options={businesses}
        getOptionLabel={(option: BusinessListItem) =>
          option.business.businessName
        }
        required
        getOptionValue={(option: BusinessListItem) => option.businessId}
      />
    </div>
  );
};

export default BusinessSelect;
