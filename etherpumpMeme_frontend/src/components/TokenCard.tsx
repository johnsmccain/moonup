// import React from 'react'
import { data } from '@/utils/dummy'
import { useEffect } from 'react'
import { FaTelegramPlane } from 'react-icons/fa'
import { FaGlobe, FaXTwitter } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen/index'
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'
import { auto } from '@cloudinary/url-gen/actions/resize'
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
    <div key={cardItem.id} className="w-full md:hover:max-w-72 transition-all ease-in-out md:max-w-60">
      <div className="border-blue-0" onClick={()=>navigate(`/curve/${item.curveAddr}`)}>
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
          <div className="pt-6 pb-3 px-4 relative backdrop-blur-md">
            <div className="absolute flex gap-2 top-3 right-0 rounded-l-lg px-2">
              <FaXTwitter className="text-gray-700 hover:text-lg hover:text-gray-400 transition duration-300 ease-in-out" />
              <FaGlobe className="text-gray-700 hover:text-lg hover:text-gray-400 transition duration-300 ease-in-out" />
              <FaTelegramPlane className="text-gray-700 hover:text-lg hover:text-gray-400 transition duration-300 ease-in-out" />
            </div>
            <h2 className="font-bold text-sm text-gray-400 font-heading mb-1">
              {`${item.name}(${item.symbol})`}
            </h2>
            <p className="mb-3 text-xs">
              <span>Created by:</span>
              <a
                href={`https://sepolia.etherscan.io/address/${item.creator}`}
                className="pl-1 underline text-blue-400"
                target='_blank'
              >
                {`${item.creator.slice(0, 4)}...${item.creator.slice(-4)}`}
              </a>
            </p>
            <p className="text-gray-500 text-xs mb-4">
              {cardItem.description}
            </p>
            <h2 className="mt-6 mb-2">
              <span className="text-gray-500 text-sm mb-3">
                Marketcap:
              </span>
              <span className="text-gray-300 text-sm mb-3 pl-1">
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

{/* <div class="flex min-h-screen items-center justify-center bg-blue-900 text-white">
  <div class="max-w-sm space-y-4 rounded-xl bg-blue-950 p-6">
    <img src="https://i.ibb.co/TkbnsyH/image-equilibrium.jpg" alt="" class="rounded-xl" />
    <h1 class="font-bold">Equilibrium #3429</h1>
    <p class="text-s text-blue-200">Our Equilibrium collection promotes balance and calm.</p>

    <div class="flex justify-between">
      <h1 class="flex items-center text-cyan-300">
        <img src="https://svgur.com/i/1Bao.svg" alt="" class="mr-2" />
        0.041 ETH
      </h1>

      <h1 class="flex items-center text-blue-200">
        <img src="https://svgur.com/i/1Bbi.svg" class="mr-2" alt="" />
        3 days Left
      </h1>
    </div>

    <div class="border-t border-blue-300 border-opacity-70"></div>

    <div class="flex items-center space-x-4">
      <img src="https://i.ibb.co/gdghc6B/image-avatar.png" alt="" class="h-10 w-10 rounded-full border-2" />
      <h1 class="text-blue-200">Creation of <span class="text-white">Jules Wyvern</span></h1>
    </div>
  </div>
</div> */}