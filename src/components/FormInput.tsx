import React from "react";

import { IFormField } from "../types/form";

interface IFormInputProps {
  field: IFormField;
  removeField: (field: IFormField) => void;
  value?: string;
  setValue: (value: string, id: string) => void;
}

const FormInput = ({ field, removeField, setValue }: IFormInputProps) => {
  const inputClass = `border border-gray-200 rounded p-2 w-full`;

  return (
    <div className="flex flex-col" key={field.id}>
      <label htmlFor={field.id}>{field.placeholder}</label>
      <div className="flex gap-2">
        <input
          {...field}
          className={inputClass}
          value={field.placeholder}
          onChange={(e) => setValue(e.target.value, field.id)}
        />
        <button
          type="button"
          className="w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => removeField(field)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default FormInput;
