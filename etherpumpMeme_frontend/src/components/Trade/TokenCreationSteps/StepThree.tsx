import React from 'react'
import { BiSolidImageAdd } from 'react-icons/bi'

interface FormData {
  [key: string]: string | number | boolean; // Adjust the types based on your form data structure
}
interface StepThreeProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handlePrev: () => void;
  filePreview: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUploadToken: (e: React.FormEvent) => void
}

const StepThree = ({ handleInputChange, formData ,  handlePrev,filePreview, handleFileChange, handleUploadToken  }:StepThreeProps) => {

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Step 3: Upload File</h2>
      {/* Initial Buy */}
      <div className="w-full px-4 mb-10">
        <div className="relative w-full h-20 py-4 px-3 border-2 border-gray-400 hover:border-white focus-within:border-blue-500 rounded-lg">
          <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-black">
            Min expected amount *
          </span>
          <input
            className="block w-full outline-none bg-transparent text-gray-50 placeholder-gray-50 font-semibold"
            name="minExpectedAmount"
            // type="number"
            value={formData.minExpectedAmount as any}
            onChange={handleInputChange}
            // min={"0.002"}

            // max={"10000"}
            placeholder="Optional. Enter amount in ETH"
          />
          {/* Display TRX Balance inside the input */}

          <span className="transform -translate-y-1/2 text-xs text-gray-300">
            Balance: 0 ETH
          </span>
        </div>
      </div>
      <div className="w-full px-4 mb-10">
        <div className="relative w-full h-20 py-4 px-3 border-2 border-gray-400 hover:border-white focus-within:border-blue-500 rounded-lg">
          <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-black">
            Creation fee *
          </span>
          <input
            className="block w-full outline-none bg-transparent text-gray-50 placeholder-gray-50 font-semibold"
            name="creationFee"
            // type="number"
            // value={formData.amount}
            onChange={handleInputChange}
            // min={"0.002"}

            // max={"10000"}
            placeholder="Required. Enter amount in ETH"
          />
          {/* Display TRX Balance inside the input */}
        </div>
      </div>

      {/* File upload */}

      <div className="w-full px-4 mb-10">
        <div className="flex flex-wrap sm:flex-nowrap">
          <label
            htmlFor="formInput2-6"
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
                id="formInput2-6"
                type="file"
                name="filephoto"
                onChange={handleFileChange} // Call this on file change
              />
            </div>

            {/* Conditionally display content based on file selection */}
            {!filePreview ? (
              <>
                <p className="font-semibold leading-normal mb-1">
                  <span className="text-blue-400">
                    Click to upload a file
                  </span>
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
                <img
                  src={filePreview}
                  alt="Image Preview"
                  className="w-full"
                />
              </div>
            )}
          </label>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <button onClick={handlePrev} className="bg-gray-400 text-white px-4 py-2 rounded">
          Back
        </button>
        <button onClick={handleUploadToken} className="bg-green-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>
    </>
  )
}

export default StepThree
