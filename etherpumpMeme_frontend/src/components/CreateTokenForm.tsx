import { useState } from "react";
import { BiSolidImageAdd } from "react-icons/bi";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useAccount, useWaitForTransactionReceipt, useWatchContractEvent, useWriteContract } from "wagmi";
import { moonUpFactoryContract } from "../../contract/meme_abi";
import { uploadToken } from "../utils/api";
import { parseEther } from "viem";
import StepOne from "./Trade/TokenCreationSteps/StepOne";
import StepTwo from "./Trade/TokenCreationSteps/StepTwo";
import StepThree from "./Trade/TokenCreationSteps/StepThree";

export function CreateTokenForm() {
  const [step, setStep] = useState(1); // Current step
  const [filePreview, setFilePreview] = useState('');
  const [publicId, setPublicId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);

  const [uploadProgress, setUploadProgress] = useState<number>(0);
  // const [tokenUrl, setTokenUrl] = useState<string>("");
  // const toastId = React.useRef(null);

  const account = useAccount();
  // Navigation Handlers
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const { data, writeContract } = useWriteContract();
  

  
  const [formData, setFormData] = useState({
    tokenName: "",
    tokenSymbol: "",
    tokenDescription: "",
    website: "",
    twitter: "",
    telegram: "",
    minExpectedAmount: "",
    creationFee: "",
    file: null,
    isBuy: false
  });
  
  console.log(formData)


  const handleSend = async (data: any) => {  
    // const { tokenName, tokenSymbol, tokenDescription, website, twitter, telegram } = formData;

    const t = await uploadToken(
      {
        address: data.address || "", // Default to an empty string if not provided
        curveAddr: data.curveAddr || "",
        creator: account?.address || "",
        createdBlock: data.createdBlock || "",
        name: formData?.tokenName || "",
        symbol: formData?.tokenSymbol || "",
        totalSupply:  0,
        description: formData?.tokenDescription || "",
        image: publicId || "",
        website: formData?.website || "",
        telegram: formData?.telegram || "",
        twitter: formData?.twitter || "",
        replies: []
      }
     )
    //  setTokenUrl(t)
    console.log(t)
  }


  // Handle text inputs
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input and file preview
  const handleFileChange = async (e: any) => {
    const file = e.target.files[0]; // Get the uploaded file
    const imageData = new FormData();
    setFilePreview(URL.createObjectURL(file));
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    imageData.append("image", file);

    const response = await axios.post(`${import.meta.env.VITE_PINATA_API_ENDPOINT}upload`, imageData, {
      headers: {
        "Content-Type": "multipart/form-data",

      },
      onUploadProgress: (progressEvent: any) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(percentCompleted)
        setUploadProgress(percentCompleted);
      },
    })
    setPublicId(response.data.public_id); // Assume the backend returns a `url` field  
  };


  // Handle form submission
  const handleSubmit = async (e: any) => {

    e.preventDefault();
    // console.log("object")
    setIsLoading(true);

      writeContract(
        {
          ...moonUpFactoryContract,
          functionName: 'createTokensAndPair',
          args: [
            formData.tokenName,
            formData.tokenSymbol,
            "jsonUploadCID",
            parseEther(`${formData?.minExpectedAmount as string}`),
            formData.isBuy
          ],
          value: parseEther(`0.002`),
        });
      console.log("object")
    
  };

  const result = useWaitForTransactionReceipt({
    hash: data,
  })

  useWatchContractEvent({
    ...moonUpFactoryContract,
    eventName: 'MoonUpBeaconFactory__TokensCreated',
    onLogs(logs) {
      console.log('New logs!', logs)
    },
  })

  return (
    <div className="max-w-md mx-auto  mt-52  p-6 border rounded-lg shadow-lg  text-white  backdrop-blur-lg">
      <form className="h-fit">
        {step === 1 && <StepOne formData={formData as any} handleInputChange={handleInputChange} handleNext={nextStep} handleSubmit={handleSubmit} isDeployed={isDeployed} />}
        {step === 2 && <StepTwo formData={formData} handleInputChange={handleInputChange} handleNext={nextStep} handlePrev={prevStep}/>}
        {step === 3 && <StepThree formData={formData as any} handleInputChange={handleInputChange} handleNext={nextStep} handlePrev={prevStep} filePreview={filePreview} handleFileChange={handleFileChange}/>}
      </form>
    </div>
  );
}
