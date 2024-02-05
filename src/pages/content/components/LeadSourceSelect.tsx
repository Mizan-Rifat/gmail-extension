import MultiSelect from "./MultiSelect";
import { useFormContext } from "react-hook-form";
import { Stage } from "@root/src/pages/content/types";
import useFetchLeadAttributes from "@root/src/services/apiHooks/useFetchLeadAttributes";

const LeadSourceSelect = () => {
  const { watch } = useFormContext();

  const { business } = watch();

  const {
    attributes: { leadSources },
    isLoading,
  } = useFetchLeadAttributes(business ? business.businessId : null);

  console.log({ leadSources });

  return (
    <div className="mb-4">
      <h5 className="text-gray-800 font-bold text-xs mb-2">Lead Source</h5>
      <MultiSelect
        isLoading={isLoading}
        name="stage"
        required
        options={leadSources}
        getOptionLabel={(option: Stage) => option.stageName}
        getOptionValue={(option: Stage) => option.stageName}
      />
    </div>
  );
};

export default LeadSourceSelect;
