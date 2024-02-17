import { useFormContext } from "react-hook-form";
import {
  BusinessListItem,
  LeadIndustry,
  LeadOpportunityStage,
  LeadSource,
  LeadTag,
} from "@root/src/pages/content/types";
import useFetchLeadAttributes from "@root/src/services/apiHooks/useFetchLeadAttributes";
import FormSelect from "./base/FormSelect";
import useFetchBusinesses from "@root/src/services/apiHooks/useFetchBusinesses";

const AttributeSelects = () => {
  const { watch } = useFormContext();

  const { business } = watch();

  const { attributes, isLoading } = useFetchLeadAttributes(
    business ? business.businessId : null
  );
  const { businesses, isLoading: businessesLoading } = useFetchBusinesses();

  return (
    <>
      <FormSelect
        label="Business"
        name="business"
        isLoading={businessesLoading}
        options={businesses}
        getOptionLabel={(option: BusinessListItem) =>
          option.business.businessName
        }
        required
        getOptionValue={(option: BusinessListItem) => option.businessId}
      />
      <FormSelect
        label="Opportunity Stage"
        isLoading={isLoading}
        name="opportunityStage"
        required
        options={attributes.leadOpportunityStages}
        getOptionLabel={(option: LeadOpportunityStage) => option.stageName}
        getOptionValue={(option: LeadOpportunityStage) => option.id}
      />
      <FormSelect
        label="Lead Source"
        isLoading={isLoading}
        name="source"
        options={attributes.leadSources}
        getOptionLabel={(option: LeadSource) => option.name}
        getOptionValue={(option: LeadSource) => option.id}
      />
      <FormSelect
        label="Lead Tags"
        isLoading={isLoading}
        name="tags"
        isMulti
        options={attributes.leadTags}
        getOptionLabel={(option: LeadTag) => option.name}
        getOptionValue={(option: LeadTag) => option.id}
      />

      <FormSelect
        label="Industries"
        isLoading={isLoading}
        name="industry"
        options={attributes.leadIndustries}
        getOptionLabel={(option: LeadIndustry) => option.name}
        getOptionValue={(option: LeadIndustry) => option.id}
      />

      <FormSelect
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
