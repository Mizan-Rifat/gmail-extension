import {
  Autocomplete,
  AutocompleteProps,
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
        loading={isLoading}
      />
      <SelectField
        label="Lead Source"
        options={attributes.leadSources.map((source) => ({
          label: source.name,
          value: source.id,
        }))}
        name="source"
        loading={isLoading}
      />
      <SelectField
        label="Lead Tags"
        options={attributes.leadTags.map((tag) => ({
          label: tag.name,
          value: tag.id,
        }))}
        name="tags"
        multiple
        loading={isLoading}
      />
      <SelectField
        label="Industries"
        options={attributes.leadIndustries.map((industry) => ({
          label: industry.name,
          value: industry.id,
        }))}
        name="industry"
        loading={isLoading}
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
        loading={isLoading}
      />
      <SelectField
        label="Notes"
        options={[]}
        name="notes"
        loading={isLoading}
        freeSolo
        multiple
        filterSelectedOptions={false}
        isOptionEqualToValue={undefined}
        filterOptions={(options, params) => {
          const { inputValue } = params;
          if (!inputValue) {
            return [];
          }
          return [inputValue];
        }}
        renderOption={(props: any, option) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              Add &quot;{option}&quot;
            </li>
          );
        }}
      />
    </Paper>
  );
};

interface SelectFieldProps
  extends Omit<
    AutocompleteProps<any, boolean, boolean, boolean>,
    "renderInput"
  > {
  label: string;
  name: keyof FormValues;
}

const SelectField = ({ label, name, loading, ...rest }: SelectFieldProps) => {
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
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            disablePortal
            sx={{ width: 300 }}
            size="small"
            loading={loading}
            filterSelectedOptions
            isOptionEqualToValue={(option, value) => {
              return option.value === value.value;
            }}
            value={value}
            onChange={(e, value) => {
              if (Array.isArray(value)) {
                if (typeof value[0] === "string") {
                  onChange(value);
                } else {
                  onChange(value.map((v) => ({ key: v.value })));
                }
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
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  },
                }}
              />
            )}
            {...rest}
          />
        )}
      />
    </FormControl>
  );
};

export default AttributesFormCard;
