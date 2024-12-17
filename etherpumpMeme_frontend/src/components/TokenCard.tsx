
// import React from 'react'
import { useEffect } from 'react'
import { FaTelegramPlane } from 'react-icons/fa'
import { FaGlobe, FaXTwitter } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen/index'
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'
import { auto } from '@cloudinary/url-gen/actions/resize'
import { data } from '../utils/dummy'
const TokenCard = ({item}:any) => {
  const navigate = useNavigate()
  const cardItem = data[1]

  const cld = new Cloudinary({ cloud: { cloudName: 'dsdovr1cq' } });
  console.log(item.image)
  // Use this sample image or upload your own via the Media Explorer
  const img = cld
        .image(item.image)
        .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio



  console.log(item)
  useEffect(() => {
    // getMetaData();
    
  }, [])
  
  return (
    <div key={cardItem.id} className="w-full md:hover:max-w-full transition-all ease-in-out md:max-w-[95%] cursor-pointer gap-5 mb-3">
      <div className="border-blue-0" onClick={()=>navigate(`/token/${item.curveAddr}`)}>
        <div className="hover:border-blue-500 border-2 rounded-2xl h-full relative overflow-hidden">
          <div
            className="relative "
            style={{ height: "240px" }}
          >
            <div
              className={`absolute top-[20px] left-0 px-2 rounded-r-md ${
                cardItem.percentageChange.isPositive
                  ? "bg-blue-400"
                  : "bg-pink-600"
              }`}
            >
              <p className="text-gray-800 text-[13px]">
                {cardItem.percentageChange.isPositive
                  ? `+${cardItem.percentageChange.value}%`
                  : `${cardItem.percentageChange.value}%`}
              </p>
            </div>
            <AdvancedImage cldImg={img}/>
            {/* <img
              className="w-full h-full rounded-t-2xl object-cover"
              src={cardItem.imageUrl}
              alt={cardItem.title}
            /> */}
          </div>
          <div className="pt-6 pb-3 px-4 relative backdrop-blur-lg ">
            <div className="absolute flex gap-2 top-3 right-0 rounded-l-lg px-2 bg-black w-fit p-1  mr-1">
              <FaXTwitter className="text-gray-200 hover:text-lg hover:text-gray-400 transition duration-300 ease-in-out" />
              <FaGlobe className="text-gray-200 hover:text-lg hover:text-gray-400 transition duration-300 ease-in-out" />
              <FaTelegramPlane className="text-gray-200 hover:text-lg hover:text-gray-400 transition duration-300 ease-in-out" />
            </div>
            <h2 className="font-bold text-sm text-gray-200 font-heading pb-1 bg-black w-fit p-2 rounded-tr-xl rounded-tl-xl">
              {`${item.name}(${item.symbol})`}
            </h2>
            <p className="pb-3 text-xs bg-black w-fit p-2 text-white rounded-tr-xl">
              <span>Created by:</span>
              <a
                href={`https://sepolia.etherscan.io/address/${item.creator}`}
                className="pl-1 underline text-blue-400"
                target='_blank'
              >
                {`${item.creator.slice(0, 4)}...${item.creator.slice(-4)}`}
              </a>
            </p>
            <p className="text-gray-100 text-xs mb-4 bg-black w-fit p-2 rounded-br-xl rounded-bl-xl rounded-tr-xl ">
              {cardItem.description}
            </p>
            <h2 className="mt-6 mb-2">
              <span className="text-gray-200 text-sm mb-3">
                Marketcap:
              </span>
              <span className="text-gray-100 text-sm mb-3 pl-1">
                ${cardItem.marketCap.toLocaleString()}
              </span>
            </h2>
            {/* <div className="bg-gray-500 h-1 mt-8" /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TokenCard