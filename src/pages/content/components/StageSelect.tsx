import MultiSelect from "./MultiSelect";
import useFetchBusinessStages from "@root/src/services/apiHooks/useFetchBusinessStages";
import { useFormContext } from "react-hook-form";
import { Stage } from "@root/src/types";

const StageSelect = () => {
  const { watch } = useFormContext();

  const { business } = watch();

  const { stages, isLoading } = useFetchBusinessStages(
    business ? business.businessId : null
  );

  return (
    <div className="mb-4">
      <h5 className="text-gray-800 font-bold text-xs mb-2">Stage</h5>
      <MultiSelect
        isLoading={isLoading}
        name="stage"
        required
        options={stages}
        getOptionLabel={(option: Stage) => option.stageName}
        getOptionValue={(option: Stage) => option.stageName}
      />
    </div>
  );
};

export default StageSelect;
