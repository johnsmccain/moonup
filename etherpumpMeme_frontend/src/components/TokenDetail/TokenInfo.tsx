import { GrCopy } from "react-icons/gr";
import { FaXTwitter } from "react-icons/fa6";
import { FaGlobe, FaTruckLoading } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
// import { ITokenInfo } from "@/types";
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen/index'
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'
import { auto } from '@cloudinary/url-gen/actions/resize'
import { ITokenInfo } from "../../types";
import { LucidePersonStanding } from "lucide-react";
// import { Loading } from "./Loading";
const TokenInfo = ({ tokenInfo }: { tokenInfo: ITokenInfo }) => {
  const cld = new Cloudinary({ cloud: { cloudName: 'dsdovr1cq' } });

  const img = cld
  .image(tokenInfo?.image)
  .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
  .quality('auto')
  .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio
  if (!tokenInfo) return <FaTruckLoading />

  return (
    <section className="sm:py-8 relative">
      <div className="container px-4 mx-auto">
        <div className=" mx-auto">
          <div className="px-4 max-sm:px-3 max-sm:pt-6 max-sm:pb-10 mb-6  shadow-lg rounded-xl relative ">
            <div className="absolute  flex gap-4 top-0 right-0 rounded-l-lg px-2 ">
              <FaXTwitter className="text-gray-500 hover:text-lg hover:text-gray-400 transition duration-300 ease-in-out" />
              <FaGlobe className="text-gray-500 hover:text-lg hover:text-gray-400 transition duration-300 ease-in-out" />
              <FaTelegramPlane className="text-gray-500 hover:text-lg hover:text-gray-400 transition duration-300 ease-in-out" />
            </div>
            <div className="">
              <div className="flex flex-wrap items-center sm:-mx-4 -mb-5">
                <div className="w-full  ">
                  <div className="sm:flex ">
                    {/* <img
                      className="w-[100px] h-[100px] sm:w-[200px] sm:h-[300px] mr-4 self-start rounded-xl"
                      src={tokenInfo.image}
                      alt=""
                    /> */}
                    <div className="h-full w-96 mr-4 max-sm:mb-3 self-start rounded-tl-xl rounded-bl-xl overflow-hidden">
                    {tokenInfo?.image?<AdvancedImage  cldImg={img} /> :<LucidePersonStanding/>}
                    </div>
                    <div className=" w-full sm:py-2 sm:pr-5 flex flex-col justify-between">
                      <h1 className="text-gray-200 text-sm sm:text-3xl sec_font font-bold mb-4 capitalize">
                        {`${tokenInfo?.name} ($${tokenInfo?.symbol})`}
                      </h1>
                      <div className="flex items-center mb-4 font-bold">
                        <span className="text-gray-400 hidden pr-2 sm:block">
                          contract:
                        </span>
                        <span className="text-gray-300 text-xs sm:text-base ">
                          <a
                            href={`https://sepolia.etherscan.io/address/${tokenInfo?.curveAddr}`}
                            className="pl-1 underline text-blue-400"
                            target='_blank'
                          >{tokenInfo?.curveAddr? `${tokenInfo?.curveAddr.slice(0, 6)}...${tokenInfo?.curveAddr.slice(-4)}`: <FaTruckLoading/>}</a>
                        </span>
                        <span className="pl-2">
                          {/* implement a copy button with here  */}
                          
                          <GrCopy />
                        </span>
                      </div>
                          
                      <p className="text-xs sm:text-sm  font-semibold ">
                        {!tokenInfo?.description ? "No description" : tokenInfo?.description}
                      </p>
                      <div className="flex mt-5 text-white">
                        <div className="w-full flex items-center gap-5">
                          <div className="sm:stat p-3 w-36 h-24 flex  gap-1 items-center justify-center flex-col  bg-black bg-opacity-25 backdrop-blur-lg rounded-xl">
                            <div className="stat-title text-sm">Price</div>
                            <div className="stat-value text-blue-300 text-xl font-bold">
                              0.034ETH
                            </div>
                            <div className="stat-desc text-green-300 font-semibold">
                              +544,599.36%
                            </div>
                          </div>
                          <div className="sm:stat p-3  w-36 h-24 flex gap-1  items-center justify-center flex-col  bg-green-400 bg-opacity-25 backdrop-blur-lg rounded-xl">
                            <div className="stat-title text-sm">Marketcap</div>
                            <div className="stat-value text-gray-300 text-xl font-bold">
                              $27.35M
                            </div>
                          </div>
                          <div className="sm:stat p-3 w-36 h-24 flex gap-1  items-center justify-center flex-col  bg-white bg-opacity-25 backdrop-blur-lg rounded-xl">
                            <div className="stat-title text-sm">Liquidity</div>
                            <div className="stat-value text-gray-300 text-xl font-bold">
                              $609.02k
                            </div>
                          </div>
                        </div>
                        <div className="text-xl ml-1 bg-purple-600 rounded-tl-xl p-3 w-fit absolute right-0 bottom-0">
                          <span className=" text-sm">Ethereum</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenInfo;
