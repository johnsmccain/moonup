// components/FormInput.tsx
import React from "react";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextArea?: boolean;
}

/**
 * FormInput component.
 *
 * FormInput is a controlled component that can be used to collect user input in a form.
 *
 * @prop {string} label - The label to display above the input field.
 * @prop {string} name - The name of the field.
 * @prop {string} [type=text] - The type of input to display.
 * @prop {string} [placeholder] - A placeholder to display in the input field.
 * @prop {string} value - The current value of the input.
 * @prop {(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void} onChange - A callback to call when the input value changes.
 * @prop {boolean} [isTextArea=false] - Whether to display a textarea as opposed to a standard input field.
 *
 * @example
 * <FormInput label="Name" name="name" value={name} onChange={setName} />
 */


const FormInput: React.FC<FormInputProps> = ({ label, name, type = "text", placeholder, value, onChange, isTextArea = false }) => {
  return (
    <div className="w-full px-4 mb-10 ">
      <div className="relative w-full py-4 px-3 border-2 border-gray-400 hover:border-white focus-within:border-blue-500 rounded-lg">
        <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-black">
          {label}
        </span>
        {isTextArea ? (
          <textarea
            className="block w-full h-30 outline-none bg-transparent text-gray-50 placeholder-gray-50 font-semibold resize-none"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        ) : (
          <input
            className="block w-full outline-none bg-transparent text-gray-50 placeholder-gray-50 font-semibold"
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
};


export default FormInput;
