import { GrCopy } from "react-icons/gr";
import { FaXTwitter } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { ITokenInfo } from "@/types";
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen/index'
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'
import { auto } from '@cloudinary/url-gen/actions/resize'
import { Loading } from "./Loading";
const TokenInfo = ({ tokenInfo }: { tokenInfo: ITokenInfo }) => {
  const cld = new Cloudinary({ cloud: { cloudName: 'dsdovr1cq' } });

  const img = cld
  .image(tokenInfo?.image)
  .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
  .quality('auto')
  .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio
  if (!tokenInfo) return <Loading />

  return (
    <section className="sm:py-8">
      <div className="container px-4 mx-auto">
        <div className=" mx-auto">
          <div className="sm:px-10 px-3 pt-6 pb-10 mb-6  bg-gray-900 shadow-lg rounded-xl relative">
            <div className="absolute  flex gap-4 top-0 right-0 rounded-l-lg px-2 ">
              <FaXTwitter className="text-gray-500 hover:text-lg hover:text-gray-400 transition duration-300 ease-in-out" />
              <FaGlobe className="text-gray-500 hover:text-lg hover:text-gray-400 transition duration-300 ease-in-out" />
              <FaTelegramPlane className="text-gray-500 hover:text-lg hover:text-gray-400 transition duration-300 ease-in-out" />
            </div>
            <div className="">
              <div className="flex flex-wrap items-center justify-between sm:-mx-4 -mb-5">
                <div className="w-full sm:w-auto ">
                  <div className="sm:flex ">
                    {/* <img
                      className="w-[100px] h-[100px] sm:w-[200px] sm:h-[300px] mr-4 self-start rounded-xl"
                      src={tokenInfo.image}
                      alt=""
                    /> */}
                    <div className="w-[100px] h-[100px] sm:w-[200px] sm:h-[300px] mr-4 mb-3 self-start rounded-xl overflow-hidden">
                    {tokenInfo?.image?<AdvancedImage cldImg={img} /> :<Loading/>}
                    </div>
                    <div>
                      <h1 className="text-gray-200 text-sm sm:text-3xl sec_font font-bold mb-4">
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
                          >{tokenInfo?.curveAddr? `${tokenInfo?.curveAddr.slice(0, 6)}...${tokenInfo?.curveAddr.slice(-4)}`: <Loading/>}</a>
                        </span>
                        <span className="pl-2">
                          {/* implement a copy button with here  */}
                          
                          <GrCopy />
                        </span>
                      </div>
                          
                      <p className="text-xs sm:text-sm  font-semibold">
                        {!tokenInfo?.description ? "No description" : tokenInfo?.description}
                      </p>
                      <div className="flex mt-12">
                        <div className="stats bg-transparent">
                          <div className="sm:stat p-3">
                            <div className="stat-title text-sm">Price</div>
                            <div className="stat-value text-primary text-base">
                              0.034ETH
                            </div>
                            <div className="stat-desc text-green-300 font-semibold">
                              +544,599.36%
                            </div>
                          </div>
                          <div className="sm:stat p-3">
                            <div className="stat-title text-sm">Marketcap</div>
                            <div className="stat-value text-gray-300 text-base">
                              $27.35M
                            </div>
                          </div>
                          <div className="sm:stat p-3">
                            <div className="stat-title text-sm">Liquidity</div>
                            <div className="stat-value text-gray-300 text-base">
                              $609.02k
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
        </div>
      </div>
    </section>
  );
};

export default TokenInfo;
