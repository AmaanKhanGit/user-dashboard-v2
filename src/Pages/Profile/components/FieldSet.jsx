import { ErrorMessage, Field } from "formik";

const FieldSet = ({
  label,
  name,
  type = "text",
  placeholder,
  disabled = false,
  icon: Icon,
}) => {
  return (
    <fieldset className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="flex items-center gap-2 text-sm font-medium text-gray-700"
      >
        {Icon && <Icon size={16} className="text-violet-600" />}
        {label}
      </label>

      <Field
        id={name}
        name={name}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 transition-all outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500`}
      />

      <ErrorMessage
        name={name}
        component="p"
        className="text-xs font-medium text-red-500"
      />
    </fieldset>
  );
};

export default FieldSet;
