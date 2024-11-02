import {
  Autocomplete,
  CircularProgress,
  FormControl,
  FormLabel,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import useFetchLeadAttributes from "../services/apiHooks/useFetchLeadAttributes";
import { Controller, useFormContext } from "react-hook-form";
import { FormValues } from "./MainDrawer";

const AttributesFormCard = () => {
  const { attributes, isLoading } = useFetchLeadAttributes();

  return (
    <Paper component={Stack} gap={2} sx={{ p: 2 }}>
      <SelectField
        label="Opportunity Stage"
        options={attributes.leadOpportunityStages.map((stage) => ({
          label: stage.stageName,
          value: stage.id,
        }))}
        name="opportunityStageId"
        isLoading={isLoading}
      />
      <SelectField
        label="Lead Source"
        options={attributes.leadSources.map((source) => ({
          label: source.name,
          value: source.id,
        }))}
        name="source"
        isLoading={isLoading}
      />
      <SelectField
        label="Lead Tags"
        options={attributes.leadTags.map((tag) => ({
          label: tag.name,
          value: tag.id,
        }))}
        name="tags"
        multiple
        isLoading={isLoading}
      />
      <SelectField
        label="Industries"
        options={attributes.leadIndustries.map((industry) => ({
          label: industry.name,
          value: industry.id,
        }))}
        name="industry"
        isLoading={isLoading}
      />
      <SelectField
        label="Priority"
        options={[
          { value: "very_high", label: "Very High" },
          { value: "high", label: "High" },
          { value: "medium", label: "Medium" },
          { value: "low", label: "Low" },
        ]}
        name="priority"
        isLoading={isLoading}
      />
    </Paper>
  );
};

interface SelectFieldProps {
  label: string;
  options: { label: string; value: number | string }[];
  name: keyof FormValues;
  multiple?: boolean;
  isLoading?: boolean;
}

const SelectField = ({
  label,
  options,
  name,
  multiple,
  isLoading,
}: SelectFieldProps) => {
  const { control } = useFormContext<FormValues>();

  return (
    <FormControl>
      <FormLabel
        sx={{ fontSize: 14, fontWeight: 600, mb: 0.5, color: "text.primary" }}
      >
        {label}
      </FormLabel>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <Autocomplete
            multiple={multiple}
            disablePortal
            options={options}
            sx={{ width: 300 }}
            loading
            size="small"
            filterSelectedOptions
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            onChange={(e, value) => {
              if (Array.isArray(value)) {
                onChange(value.map((v) => ({ key: v.value })));
              } else if (value) {
                onChange(value.value);
              }
            }}
            renderInput={(params) => (
              <TextField
                variant="outlined"
                {...params}
                slotProps={{
                  input: {
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {isLoading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  },
                }}
              />
            )}
          />
        )}
      />
    </FormControl>
  );
};

export default AttributesFormCard;
