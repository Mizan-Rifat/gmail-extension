import Select, { SelectProps } from "./Select";

const FormSelect = ({ label, ...rest }: { label: string } & SelectProps) => {
  return (
    <div className="mb-4">
      <h5 className="text-gray-800 font-bold text-xs mb-2">{label}</h5>
      <Select {...rest} />
    </div>
  );
};

export default FormSelect;
