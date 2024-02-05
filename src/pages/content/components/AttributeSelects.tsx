import MultiSelect from "./MultiSelect";
import { useFormContext } from "react-hook-form";
import { Stage } from "@root/src/pages/content/types";
import useFetchLeadAttributes from "@root/src/services/apiHooks/useFetchLeadAttributes";
import Select from "./Select";

const AttributeSelects = () => {
  const { watch } = useFormContext();

  const { business } = watch();

  const { attributes, isLoading } = useFetchLeadAttributes(
    business ? business.businessId : null
  );

  return (
    <>
      <Select
        label="Lead Source"
        isLoading={isLoading}
        name="stage"
        required
        options={attributes.leadSources}
        getOptionLabel={(option: Stage) => option.stageName}
        getOptionValue={(option: Stage) => option.stageName}
      />
    </>
  );
};

export default AttributeSelects;
