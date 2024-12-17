import { useState } from "react";
import axios from "axios";
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
  

  const [_, setUploadProgress] = useState<number>(0);
  // const [tokenUrl, setTokenUrl] = useState<string>("");
  // const toastId = React.useRef(null);
interface TokenData {
  address: `0x${string}` | undefined;
  curveAddr: `0x${string}` | undefined;
  createdBlock: bigint;
}
  const account = useAccount();
  // Navigation Handlers
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const { data, writeContract } = useWriteContract();
  
  const [tokenData, setTokenData] = useState<TokenData>({
    address: "0x",
    curveAddr: "0x",
    createdBlock: 0n,
  });
  
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


  const handleUploadToken = async (e: any) => {  
    e.preventDefault();
    // const { tokenName, tokenSymbol, tokenDescription, website, twitter, telegram } = formData;

    const t = await uploadToken(
      {
        address: tokenData.address || "", // Default to an empty string if not provided
        curveAddr: tokenData.curveAddr || "",
        creator: account?.address || "",
        createdBlock: tokenData.createdBlock || 0n,
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
    console.log(response)
    setPublicId(response.data.public_id); // Assume the backend returns a `url` field  
  };


  // Handle form submission
  const handleCreateToken = async (e: any) => {

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

  const { data: receipt } = useWaitForTransactionReceipt({
    hash: data,
  })
  console.log(receipt)

  useWatchContractEvent({
    ...moonUpFactoryContract,
    eventName: 'MoonUpBeaconFactory__TokensCreated',
    onLogs(logs) {
      console.log('New logs!', logs[0].args.MoonUpErc20)
      setTokenData({ address: logs[0].args.MoonUpErc20, curveAddr: logs[0].args.MoonUpTokenPair, createdBlock: logs[0].blockNumber })
      setIsDeployed(true)
    },
  })

  return (
    <div className="max-w-md mx-auto  mt-52  p-6 border rounded-lg shadow-lg  text-white  backdrop-blur-lg">
      <form className="h-fit">
        {step === 1 && <StepOne isLoading={isLoading} formData={formData as any} handleInputChange={handleInputChange} handleNext={nextStep} handleSubmit={handleCreateToken} isDeployed={isDeployed} />}
        {step === 2 && <StepTwo formData={formData} handleInputChange={handleInputChange} handleNext={nextStep} handlePrev={prevStep}/>}
        {step === 3 && <StepThree formData={formData as any} handleInputChange={handleInputChange}  handlePrev={prevStep} filePreview={filePreview} handleFileChange={handleFileChange} handleUploadToken={handleUploadToken}/>}
      </form>
    </div>
  );
}
