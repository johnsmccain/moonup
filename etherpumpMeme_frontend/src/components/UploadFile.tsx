// components/FileUploader.tsx
import React from "react";
import { BiSolidImageAdd } from "react-icons/bi";

interface FileUploaderProps {
  filePreview: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ filePreview, onFileChange }) => {
  return (
    <div className="w-full px-4 mb-10">
      <div className="flex flex-wrap sm:flex-nowrap">
        <label
          htmlFor="fileInput"
          className="w-full py-8 px-4 text-center border-dashed border border-gray-400 hover:border-white rounded-lg cursor-pointer"
        >
          <div className="relative group h-14 w-14 mx-auto mb-4">
            {!filePreview && (
              <div className="flex items-center justify-center rounded-full">
                <BiSolidImageAdd className="text-6xl" />
              </div>
            )}
            <input
              className="hidden"
              id="fileInput"
              type="file"
              onChange={onFileChange}
            />
          </div>
          {!filePreview ? (
            <>
              <p className="font-semibold leading-normal mb-1">
                <span className="text-blue-400">Click to upload a file</span>
              </p>
              <p className="font-semibold text-xs sm:text-sm leading-normal mb-1">
                PNG, JPG, GIF, WEBP
              </p>
              <span className="text-xs text-gray-300 font-semibold">
                image less than 10MB
              </span>
            </>
          ) : (
            <div className="mt-4">
              <img src={filePreview} alt="Image Preview" className="w-full" />
            </div>
          )}
        </label>
      </div>
    </div>
  );
};

export default FileUploader;
