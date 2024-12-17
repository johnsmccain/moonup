import React from 'react'


interface StepTwoProps {
    formData: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleNext: () => void;
    handlePrev: () => void;
  }
const StepTwo = ({ handleInputChange, formData , handleNext, handlePrev}:StepTwoProps) => {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Step 2: Token Details</h2>
      {/* Token Description */}
      <div className="w-full px-4 mb-10">
        <div className="relative w-full py-4 px-3 border-2 border-gray-400 hover:border-white focus-within:border-blue-500 rounded-lg">
          <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-bold text-gray-300 px-1 bg-black">
            Token Description *
          </span>
          <textarea
            className="block w-full h-30 outline-none bg-transparent text-gray-50 placeholder-gray-50 font-semibold resize-none border-none hover:border-none focus:border-none"
            name="tokenDescription"
            value={formData.tokenDescription}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Website (optional) */}
      <div className="w-full px-4 mb-10">
        <div className="relative w-full h-14 py-4 px-3 border-2 border-gray-400 hover:border-white focus-within:border-blue-500 rounded-lg">
          <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-black">
            Website (optional)
          </span>
          <input
            className="block w-full outline-none bg-transparent text-gray-50 placeholder-gray-50 font-semibold border-none hover:border-none focus:border-none"
            name="website"
            type="text"
            value={formData.website}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Twitter (optional) */}
      <div className="w-full px-4 mb-10">
        <div className="relative w-full h-14 py-4 px-3 border-2 border-gray-400 hover:border-white focus-within:border-blue-500 rounded-lg">
          <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-black">
            Twitter (optional)
          </span>
          <input
            className="block w-full outline-none bg-transparent text-gray-50 placeholder-gray-50 font-semibold border-none hover:border-none focus:border-none"
            name="twitter"
            type="text"
            value={formData.twitter}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Telegram (optional) */}
      <div className="w-full px-4 mb-10">
        <div className="relative w-full h-20 py-4 px-3 border-2 border-gray-400 hover:border-white focus-within:border-blue-500 rounded-lg">
          <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-black">
            Telegram (optional)
          </span>
          <input
            className="block w-full outline-none bg-transparent text-gray-50 placeholder-gray-50 font-semibold border-none hover:border-none focus:border-none"
            name="telegram"
            type="text"
            value={formData.telegram}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <button onClick={handlePrev} className="bg-gray-400 text-white px-4 py-2 rounded">
          Back
        </button>
        <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">
          Next
        </button>
      </div>
    </>
  )
}

export default StepTwo
