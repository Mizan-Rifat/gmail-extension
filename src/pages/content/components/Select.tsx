import MultiSelect, { MultiSelectProps } from "./MultiSelect";

const Select = ({ label, ...rest }: { label: string } & MultiSelectProps) => {
  return (
    <div className="mb-4">
      <h5 className="text-gray-800 font-bold text-xs mb-2">{label}</h5>
      <MultiSelect {...rest} />
    </div>
  );
};

export default Select;
