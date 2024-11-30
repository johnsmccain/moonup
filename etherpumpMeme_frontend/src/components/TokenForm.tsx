// components/TokenForm.tsx
import React from "react";
import FormInput from "./FormInput";
import FileUploader from "./FileUploader";

interface TokenFormProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  filePreview: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const TokenForm: React.FC<TokenFormProps> = ({ formData, filePreview, handleInputChange, handleFileChange, handleSubmit, isLoading }) => {
  return (
    <form onSubmit={handleSubmit} className=" w-full">
      <FormInput
        label="Token Name *"
        name="tokenName"
        value={formData.tokenName}
        onChange={handleInputChange}
      />
      <FormInput
        label="Token Symbol *"
        name="tokenSymbol"
        value={formData.tokenSymbol}
        onChange={handleInputChange}
      />
      <FormInput
        label="Token Description *"
        name="tokenDescription"
        value={formData.tokenDescription}
        onChange={handleInputChange}
        isTextArea
      />
      <FormInput
        label="Website (optional)"
        name="website"
        value={formData.website}
        onChange={handleInputChange}
      />
       <FormInput
        label="Telegram (optional)"
        name="telegram"
        value={formData.telegram}
        onChange={handleInputChange}
      />
      <FileUploader
        filePreview={filePreview}
        onFileChange={handleFileChange}
      />
      <button
        className="inline-block w-full py-2 px-4 mb-2 text-xs text-center font-semibold leading-6 text-blue-50 bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? "Launching" : "Launch"}
      </button>
    </form>
  );
};

export default TokenForm;
