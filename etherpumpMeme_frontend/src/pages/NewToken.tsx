import { useState } from "react";
import Footer from "../components/Footer";
import { BiSolidImageAdd } from "react-icons/bi";
import {  useAccount, useWatchContractEvent, useWriteContract } from 'wagmi'
import { moonUpFactoryContract } from "../../contract/meme_abi";
// import { config } from "../wagmi";
import { parseEther } from "viem";
import { uploadJsonToPinata } from "../pinata";
// import { useToast } from "@/hooks/use-toast";
import axios from "axios";

import { Button } from "@/components/ui/button";
// import { uploadToken } from "@/utils/api";
import { Bounce, toast } from "react-toastify";
import { uploadToken } from "@/utils/api";
// import { config } from "@/wagmi";
 

const NewToken = () => {

  // const account = useAccount()
  const [filePreview, setFilePreview] = useState('');
  const [publicId, setPublicId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  // const [tokenUrl, setTokenUrl] = useState<string>("");
  // const toastId = React.useRef(null);

  const account = useAccount();




  const {
    data: _,
    writeContract } = useWriteContract();

    // console.log(contractData)
    // const unwatch = watchContractEvent(config, {
    //   ...moonUpFactoryContract,
    //   eventName: "MoonUpBeaconFactory__TokensCreated",
    //   onLogs(log) {
    //     console.log('New logs!', log)
    //   },
    // })
    // unwatch()
  // Form state for all input fields
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

  if(uploadProgress){
    toast.success('Photo uploaded Successfully', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
  }

  useWatchContractEvent({
    ...moonUpFactoryContract,
    eventName: "MoonUpBeaconFactory__TokensCreated",
    onLogs(log) {
      handleSend({...formData, address: log[0].args.MoonUpErc20, curveAddr: log[0].args.MoonUpTokenPair, createdBlock: log[0].blockNumber})
      toast.success('Token Created Successfully', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
        setIsLoading(false);
    }
  })


  const handleSend = async (data: any) => {  
    // const { tokenName, tokenSymbol, tokenDescription, website, twitter, telegram } = formData;
    toast('Token Created Successfully', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
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

  // async function getlogs() {
  //   const logs = await publicClient.getContractEvents({ 
  //     ...moonUpFactoryContract,
  //     eventName: "MoonUpBeaconFactory__TokensCreated",
  //     // fromBlock: 16330000n,
  //     toBlock: "latest"
  //   })
  //   console.log(logs)
  // }

// console.log(publicId)
  // Handle text inputs
  const handleInputChange = (e: any) => {
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

    const response = await axios.post(import.meta.env.VITE_PINATA_API_ENDPOINT, imageData, {
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
    // Handle the success response
    // console.log(response.data.url); // Assume the backend returns a `url` field
    setPublicId(response.data.public_id); // Assume the backend returns a `url` field  
  };


  // Handle form submission
  const handleSubmit = async (e: any) => {

    e.preventDefault();
    console.log("object")
    setIsLoading(true);
    if (publicId) {
      const metadata = {
        tokenName: formData.tokenName,
        tokenSymbol: formData.tokenSymbol,
        tokenDescription: formData.tokenDescription,
        website: formData.website,
        twitter: formData.twitter,
        telegram: formData.telegram,
        minExpectedAmount: formData.minExpectedAmount,
        amount: formData.creationFee,
        isBuy: formData.isBuy,
        image: publicId, // Link to image on IPFS
      }
      console.log("This line...")

      const jsonUploadCID = (await uploadJsonToPinata(metadata))?.cid;

      console.log("JSON uploaded:", jsonUploadCID);
      toast('Please Wait', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      writeContract(
        {
          ...moonUpFactoryContract,
          functionName: 'createTokensAndPair',
          args: [
            formData.tokenName,
            formData.tokenSymbol,
            jsonUploadCID,
            parseEther(`${formData?.minExpectedAmount as string}`),
            formData.isBuy
          ],
          value: parseEther(`${formData.creationFee as string}`),
        });
      console.log("object")
    }
  };



  return (
    <div>
      <section className="py-8">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4 mb-8">
            <div className="max-w-2xl mx-auto px-6">
              <h1 className="text-4xl sm:text-5xl sec_font text-center">
                Create Your Token on MoonPumps
              </h1>
            </div>
            <div className="w-full">
              <div className="px-4 pt-16 pb-8 rounded-xl">
                <div className="max-w-2xl mx-auto sm:border-2 px-4 sm:px-8 py-10 rounded-xl">
                  <form 
                  onSubmit={handleSubmit}
                  >
                    <div className="flex flex-wrap -mx-4 -mb-10">
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
                            value={formData.minExpectedAmount}
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
                    </div>

                    <div className="mt-8">

                      <Button
                        className="inline-block w-full py-2 px-4 mb-2 text-xs text-center font-semibold 
                        leading-6 rounded-lg 
                        transition duration-200"
                        // disabled={isLoading}
                        // onClick={handleSubmit}
                        type="submit"
                      >
                        {isLoading ? "Launching" : "Launch"}

                      </Button>

                    
                    </div>
                  </form>
                  {/* <Button onClick={getlogs}>see logs</Button> */}
                  <Button onClick={handleSend}>Send Data</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NewToken;