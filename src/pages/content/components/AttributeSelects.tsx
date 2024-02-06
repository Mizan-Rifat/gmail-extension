import MultiSelect from "./MultiSelect";
import { useFormContext } from "react-hook-form";
import {
  LeadIndustry,
  LeadOpportunityStage,
  LeadSource,
  LeadTag,
  Stage,
} from "@root/src/pages/content/types";
import useFetchLeadAttributes from "@root/src/services/apiHooks/useFetchLeadAttributes";
import Select from "./Select";

const AttributeSelects = () => {
  const { watch } = useFormContext();

  const { business } = watch();

  const { attributes, isLoading } = useFetchLeadAttributes(
    business ? business.businessId : null
  );
  console.log({ attributes });

  return (
    <>
      <Select
        label="Opportunity Stage"
        isLoading={isLoading}
        name="opportunityStage"
        required
        options={attributes.leadOpportunityStages}
        getOptionLabel={(option: LeadOpportunityStage) => option.stageName}
        getOptionValue={(option: LeadOpportunityStage) => option.id}
      />
      <Select
        label="Lead Source"
        isLoading={isLoading}
        name="source"
        options={attributes.leadSources}
        getOptionLabel={(option: LeadSource) => option.name}
        getOptionValue={(option: LeadSource) => option.id}
      />
      <Select
        label="Lead Tags"
        isLoading={isLoading}
        name="tags"
        isMulti
        options={attributes.leadTags}
        getOptionLabel={(option: LeadTag) => option.name}
        getOptionValue={(option: LeadTag) => option.id}
      />

      <Select
        label="Industries"
        isLoading={isLoading}
        name="industry"
        options={attributes.leadIndustries}
        getOptionLabel={(option: LeadIndustry) => option.name}
        getOptionValue={(option: LeadIndustry) => option.id}
      />

      <Select
        label="Priority"
        name="priority"
        options={[
          { value: "very_high", label: "Very High" },
          { value: "high", label: "High" },
          { value: "medium", label: "Medium" },
          { value: "low", label: "Low" },
        ]}
      />
    </>
  );
};

export default AttributeSelects;
