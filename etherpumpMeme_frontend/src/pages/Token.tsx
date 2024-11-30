import { useEffect, useState } from "react";

import TokenInfo from "../components/TokenInfo";
import TradingHistory from "../components/TradingHistory";
import HolderDistribution from "../components/HolderDistribution";
import Trade from "../components/Trade";


import { HiOutlineChartSquareBar } from "react-icons/hi";
import { BiPurchaseTagAlt } from "react-icons/bi";
import Footer from "../components/Footer";


import TradingViewChart from "../components/TradingViewChart";
import { useParams } from "react-router-dom";
import { useReadContract} from "wagmi";
// import {readContract} from "@wagmi/core";
import { moonUpFactoryContract} from "../../contract/meme_abi";
// import { parseEther } from "viem";
// import { config } from "@/wagmi";
import {fetchDynamicData} from "../utils/api"
import { ITokenInfo } from "@/types";

const Token = () => {

  const [activeTab, setActiveTab] = useState("trade");
  const [tokenMetaInfo, setTokenMetaInfo] = useState<ITokenInfo>()
  const {curveAddr } = useParams();
  // const { 
  //   data: _, 
  //   writeContract } = useWriteContract();
  /**
   * Read functions
   */

  useEffect(() => {
    fetchDynamicData(`/curves/${curveAddr}`, { params: { category: "", limit: 0 } }).then((data) => {
      setTokenMetaInfo(data);
    })
  },[])
  
  const {data: allPairLength} = useReadContract({
    ...moonUpFactoryContract,
    functionName:"allPairsLength",
    // args:[parseEther("9")]
  })

  // async function fetchTokens(index:number) {}

  console.log(`allPairs: ${allPairLength}`)

  // useEffect(() => {
  //   for (let i = 0; i < Number(allPairs); i++) {
  //     fetchTokens(i);
  //   }
  // },[allPairs]);
  // const {data: getAvailableToken} = useReadContract({
  //   abi: moonUpMarketContract.abi,
  //   address: curveId as `0x${string}`,
  //   functionName:"getAvailableToken",
  // })
  // console.log(`getAvailableToken: ${getAvailableToken}`)
  // const {data: getPrice} = useReadContract({
  //   abi: moonUpMarketContract.abi,
  //   address: curveId as `0x${string}`,
  //   functionName:"getPrice",
  // })
  // console.log(`getPrice: ${getPrice}`)



  // const {data: getPriceOfAvailableTokens} = useReadContract({
  //   abi: moonUpMarketContract.abi,
  //   address: curveId as `0x${string}`,
  //   functionName:"getPriceOfAvailableTokens",
  // })
  // console.log(`getPriceOfAvailableTokens: ${getPriceOfAvailableTokens}`)
  
  // const {data: getTokenQoute} = useReadContract({
  //   abi: moonUpMarketContract.abi,
  //   address: curveId as `0x${string}`,
  //   functionName:"getTokenQoute",
  //   args:[parseEther("0.001")]
  // })
  // console.log(`getTokenQoute: ${getTokenQoute}`)

  // const {data: token} = useReadContract({
  //   abi: moonUpMarketContract.abi,
  //   address: curveId as `0x${string}`,
  //   functionName:"token",
  // })
  // console.log(`token: ${token}`)

  // const {data: weth} = useReadContract({
  //   abi: moonUpMarketContract.abi,
  //   address: curveId as `0x${string}`,
  //   functionName:"weth",
  // })

  // useWatchContractEvent({
  //   ...moonUpFactoryContract,
  //   eventName: 'MoonUpBeaconFactory__TokensCreated',
  //   onLogs(logs) {
  //     console.log('New logs!', logs)
  //   },
  // })


  


  // console.log(`weth: ${weth}`);
  return (
    <div>

      <TokenInfo tokenInfo={tokenMetaInfo as ITokenInfo}/>
      <section className="py-3">
        <div className="container px-4 mx-auto mb-4 sm:hidden flex gap-4">
          <div onClick={() => setActiveTab("chart")}>
            <div className="flex items-center gap-1 border-b-2 border-blue-900" >
              <BiPurchaseTagAlt className="text-xl" />
              <h1 className="text-sm font-bold">Trade</h1> 
             
            </div>
          </div>
          <div onClick={() => setActiveTab("trade")}>
            <div className="flex items-center gap-1">
              <HiOutlineChartSquareBar className="text-xl" />
              <h1 className="text-sm font-bold">Charts</h1>
            </div>
          </div>
        </div>

        <div className="container px-4 mx-auto sm:hidden">
          <div className="flex flex-wrap -mx-3">
            {activeTab == "chart" && (
              <div className="w-full  px-3 mb-6 lg:mb-0">
                {/* <TradingHistory className="sm-hidden" /> */}
                <TradingHistory />

              </div>
            )}
            {activeTab == "trade" && (
              <div className="w-full px-3">
              <Trade curveAddr={curveAddr}/>
              <HolderDistribution />
              </div>
            )}
          </div>
        </div>

        <div className="container px-4 mx-auto hidden sm:block">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full lg:w-3/5 px-3 mb-6 lg:mb-0">
              <TradingViewChart />
              {/* <TradingHistory className="sm-hidden" /> */}
              <TradingHistory />

            </div>
            <div className="w-full lg:w-2/5 px-3">
              <Trade curveAddr={curveAddr}/>
              <HolderDistribution />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Token;
