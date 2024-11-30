import List from "../components/List";
// import Footer from "../components/Footer";
import { useReadContract } from "wagmi";
import {moonUpFactoryContract, 
  // moonUpProxyABI
} from "../../contract/meme_abi";
// import { config } from "@/wagmi";
// import { readContract } from '@wagmi/core'
// import { useEffect, useState } from "react";
import ethIcon from "../assets/icons/eth-icon.svg";
import { ConnectingWallet } from "@/components/Loading";

const HomePage =  () => {
  // const [allTokenPair, setAllTokenPair] = useState<`0x${string}`[]>([]); 

  // Fetch all pairs length from the contract
  const { data: allPairsLength } = useReadContract({
    ...moonUpFactoryContract,
    functionName: "allPairsLength",
  });

  // const allPairLength = Number(allPairsLength?.toString());



  // useEffect(() => {
   
  //   if (allPairLength > 0) {
  //     fetchTokenPairs();
  //     console.log("useEffect fired", allPairLength)
  //   }
  // }, [allPairLength]); // Fetch pairs when allPairLength is available or changes

  return (
    <div className="relative">
    
      <div className="hero">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold sec_font">MOON UP</h1>
            <p className="py-6 text-xl">
              The First Meme Fair Launch Platform on Etherum. Meme Your Way to
              the Moon
            </p>
          </div>
        </div>
      </div>
      <div className="z-50 flex justify-center">
        {allPairsLength? 
          <List allPairsLength={allPairsLength}/>
          : 
          <ConnectingWallet/>
        }
        
      </div>

      {/* Decorative Elements */}
  
        <div className="absolute left-0 top-20 -z-0">
          <img src={ethIcon} alt="icon" className="h-32 w-32 animate-spin-slow opacity-50" />
        </div>
        <div className="absolute right-0 top-40 -z-0">
          <img src={ethIcon} alt="icon" className="h-32 w-32 animate-spin-slow opacity-50" />
        </div>    
        <div className="absolute -left-20 top-40 -z-0">
          <div className="h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"/>
        </div>    
        <div className="absolute -right-0 top-60 -z-0">
        <div className="h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"/>  
        </div>

    </div>
  );
};

export default HomePage;
