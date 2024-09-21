import React from "react";
import { FormField } from "../../models/FormModel";
import { useAllContext } from "../../contexts/AllContext";

export const FormFieldPage: React.FC<{ formField: FormField, index: number }> = ({ formField, index }) => {
  const { setFormFields } = useAllContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = e.target;

    setFormFields((prevFields: FormField[]) =>
      prevFields.map((field, idx) =>
        idx === index ? { ...field, value } : field
      )
    );
  };

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    optionIndex: number
  ) => {
    if (e.target instanceof HTMLInputElement) {
      // checkbox
      const isChecked = e.target.checked;
      setFormFields((prevFields: FormField[]) =>
        prevFields.map((field, idx) => {
          if (idx === index) {
            const updatedOptions = field.options?.map((option, optIdx) =>
              optIdx === optionIndex ? { ...option, value: isChecked } : option
            );
            return { ...field, options: updatedOptions };
          }
          return field;
        })
      );
    } else if (e.target instanceof HTMLSelectElement) {
      // For dropdowns
      const selectedValue = e.target.value;
      setFormFields((prevFields: FormField[]) =>
        prevFields.map((field, idx) => {
          if (idx === index) {
            const updatedOptions = field.options?.map((option) => ({
              ...option,
              value: option.label === selectedValue,
            }));
            return { ...field, options: updatedOptions };
          }
          return field;
        })
      );
    }
  };

  // Render different input elements based on form field type
  const renderInputField = () => {
    switch (formField.type) {
      case "checkbox":
        return (
          <div className="flex flex-col items-center space-x-4">
            <div className="flex flex-col gap-2">
              {formField.options?.map((option, optionIndex) => (
                <label key={optionIndex} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={option.value}
                    onChange={(e) => handleOptionChange(e, optionIndex)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        );
      case "dropdown":
        return (
          <select
            className="mt-1 block w-full md:w-1/3 border border-gray-300 rounded-md p-2"
            onChange={(e) => handleOptionChange(e, 0)} // assuming a single dropdown
            value={formField.options?.find((opt) => opt.value === true)?.label || ""}
          >
            {formField.options?.map((option, optionIndex) => (
              <option key={optionIndex} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type={formField.type}
            required={formField.isRequired}
            className="mt-1 block w-full md:w-1/3 border border-gray-300 rounded-md p-2"
            value={formField.value ?? ""}
            onChange={handleInputChange}
          />
        );
    }
  };

  return (
    <div className="p-4 w-full md:h-[90vh] flex flex-col items-center justify-center">
      <label className="block text-xl mb-2">{formField.label}</label>
      {renderInputField()}
    </div>
  );
};
