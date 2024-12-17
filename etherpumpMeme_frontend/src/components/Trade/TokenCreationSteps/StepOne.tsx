import React, { useEffect, useState } from 'react'



interface StepOneProps {
  formData: any;
  handleSubmit: (e: React.FormEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleNext: () => void;
  isDeployed: boolean;
  isLoading: boolean;
}
function StepOne({ formData, handleInputChange, handleNext, handleSubmit, isDeployed, isLoading}:StepOneProps) {
  const [isCompleted, setisCompleted] = useState(false)
  
  useEffect(() => {
    if (formData.tokenName && formData.tokenSymbol) {
      setisCompleted(true)
    }
  }, [formData])
  
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Step 1: Basic Information</h2>
      {/* Token Name */}

      <div className="w-full px-4 mb-10">
        <div className="relative w-full h-14 py-4 px-3 border-2 border-gray-400 hover:border-white focus-within:border-blue-500 rounded-lg">
          <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-black">
            Token Name *
          </span>
          <input
            className="block w-full outline-none bg-transparent text-gray-50 placeholder-gray-50 font-semibold border-none hover:border-none focus:border-none hover:outline-none focus:outline-none"
            name="tokenName"
            type="text"
            value={formData.tokenName}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* Token Symbol */}
      <div className="w-full px-4 mb-10">
        <div className="relative w-full h-14 py-4 px-3 border-2 border-gray-400 hover:border-white focus-within:border-blue-500 rounded-lg">
          <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-black">
            Token Symbol *
          </span>
          <input
            className="block w-full outline-none bg-transparent text-gray-50 placeholder-gray-50 font-semibold border-none hover:border-none focus:border-none"
            name="tokenSymbol"
            type="text"
            value={formData.tokenSymbol}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <p className={`text-purple-900 bg-purple-300 px-4 py-2 rounded `}>Creation fee: 0.002ETH</p>
        {isLoading? "Loading":<button disabled={ !isCompleted} onClick={isDeployed ? handleNext : handleSubmit} className={`"bg-purple-500 cursor-pointer text-white px-4 py-2 rounded"  ${isCompleted ? "bg-purple-500 cursor-pointer rounded" : "cursor-not-allowed disabled:bg-slate-600"}`}>
          {isDeployed? "Next" : "Deploy Token"}
        </button>}
      </div>
    </>
  )
}

export default StepOne
