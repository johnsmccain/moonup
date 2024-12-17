import { useState } from "react";
import { VscSettings } from "react-icons/vsc";
import { useAccount, useWriteContract } from "wagmi";
import { moonUpMarketContract } from "../../../contract/meme_abi";
import { parseEther } from "viem";
// import { simulateContract, writeContract } from '@wagmi/core'
// import { config } from "@/wagmi";

const Trade = ({ curveAddr }: any) => {
  const [activeTab, setActiveTab] = useState("buy");
  const [ethValue, setEthValue] = useState("");
  const { data: _, writeContract } = useWriteContract()

  const account = useAccount();
  // const [tokenValue, 
  //   // setTokenValue
  // ] = useState("12033");
  const [tokenBalance,
    // setTokenBalance
  ] = useState(1000);
  const [sellTokenValue, setSellTokenValue] = useState("");
  // const [buyTokenValue, setBuyTokenValue] = useState("");
  // const [walletConnected, 
  //   // setWalletConnected
  // ] = useState(false);
  const [loading,
    // setLoading
  ] = useState(false);


  /**
 * Write Functions
 */


  // Handle wallet connection
  const handleConnectWallet = () => {
    console.log("connect");

  };

  // Handle percentage clicks
  // const handlePercentageClick = (percentage: number) => {
  //   const calculatedValue = (tokenValue * percentage).toFixed(3);
  //   setEthValue(calculatedValue);
  // };

  // Handle token percentage clicks for sell form
  const handleTokenPercentageClick = (percentage: number) => {
    const calculatedTokenValue = (tokenBalance * percentage).toFixed(2);
    setSellTokenValue(calculatedTokenValue);
  };

  const handleTradeSubmission = async () => {

    // const { request } = await simulateContract(config, {
    //   abi: moonUpMarketContract.abi,
    //   address: curveAddr as `0x${string}`,
    //   functionName: 'buy',
    //   args:[parseEther(`0`)],
    //   value: parseEther(`${ethValue}`)
    // })
    // const hash = await writeContract(config, request)
    // console.log(request);
    // console.log(hash);
    // writeContract({
    // abi: moonUpMarketContract.abi,
    // address: curveAddr as `0x${string}`,
    //   functionName:"buy",
    //   args:[parseEther(ethValue)]
    // })
    console.log("Trade form submitted", ethValue);
  };

  const handleSellSubmission = () => {
    const mininumExpected = "0.000001"


    writeContract({
      abi: moonUpMarketContract.abi,
      address: curveAddr as `0x${string}`,
      functionName: "sell",
      args: [parseEther(sellTokenValue), parseEther(mininumExpected)]
    })
    console.log("Sell form submitted", sellTokenValue);
  };

  return (
    <div className="text-white">
      {/* SLIPPAGE MODAL */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Slippage Settings</h3>
          <p className="py-4">Adjust the slippage tolerance here.</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
      {/* SLIPPAGE MODAL */}

      <div className="bg-gray-900 p-4 rounded-md mb-6">
        <div className="flex justify-center gap-1 bg-gray-800 rounded-md p-1 mb-4">
          <button
            onClick={() => setActiveTab("buy")}

            className={`w-full rounded-md px-12 py-2 text-3xl font-bold ${activeTab === "buy" ? "bg-purple-600" : ""
              }`}
          >
            Buy
          </button>
          <button
            onClick={() => setActiveTab("sell")}
            className={`w-full rounded-md px-12 py-2 text-3xl font-bold ${activeTab === "sell" ? "bg-pink-600" : ""
              }`}
          >
            Sell
          </button>
        </div>
        {/* </div> */}


        {/* BUY TAB */}
        {activeTab === "buy" && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="bg-gray-800 hover:bg-gray-700 px-4 py-1 rounded-md cursor-pointer">
                <p className="text-xs font-bold">Switch to token</p>
              </div>
              <div
                onClick={() => {
                  // Get the dialog element by ID
                  const modal = document.getElementById("my_modal_2") as HTMLDialogElement;

                  // Check if the modal exists and is a dialog element
                  if (modal) {
                    modal.showModal();
                  } else {
                    console.error("Dialog element with ID 'my_modal_2' not found.");
                  }
                }}
                className="px-4 py-1 rounded-md cursor-pointer"
              >
                <VscSettings className="text-xl text-gray-400 hover:text-gray-200" />
              </div>
            </div>

            {/* <label className="input rounded-md bg-gray-900 input-bordered flex items-center gap-1 mb-2">
            <input
                    type="number"
                    placeholder="0.0"
                    className="w-full bg-gray-700 rounded p-2 text-white"
                  />
                  <select className="w-full bg-gray-700 rounded p-2 mt-2 text-white">
                    <option value="eth">ETH</option>
                    <option value="usdc">USDC</option>
                  </select>
              <input
                type="text"
                className="grow font-bold"
                placeholder="0.0"
                value={ethValue}
                onChange={(e) => setEthValue(e.target.value)}
              />
              <kbd className="kbd kbd-sm bg-transparent border-none font-bold">
                ETH
              </kbd>
              <kbd className="kbd kbd-sm">
                <img
                  className="w-6"
                  src="https://w7.pngwing.com/pngs/268/1013/png-transparent-ethereum-eth-hd-logo-thumbnail.png"
                  alt="ETH"
                />
              </kbd>
            </label> */}

            <div className="input rounded-md bg-gray-900 input-bordered flex items-center gap-1 mb-2 w-full">
              <label className="block text-sm text-gray-400 mb-2 w-full">You Pay
                <input
                  type="number"
                  className="w-full bg-gray-700 rounded p-2 text-white"
                  placeholder="0.0"
                  value={ethValue}
                  onChange={(e) => setEthValue(e.target.value)}
                />
              </label>
              <select className="w-fit bg-gray-700 rounded p-2 mt-2 text-white">
                <option value="eth">ETH</option>
                <option value="usdc">USDC</option>
              </select>
            </div>
            <p className="text-[10px] font-semibold">
              <span>Balance: </span>
              {/* <span>{balance ? ${balance} ETH : "--ETH"}</span> */}
            </p>
            <div className="flex gap-2 mt-4 mb-4">
              {["0.001", "0.01", "0.1", "1"].map((amt) => (
                <div
                  key={amt}
                  onClick={() => setEthValue(amt)}
                  className="bg-gray-800 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-700"
                >
                  <p className="text-xs">{amt}ETH</p>
                </div>
              ))}
            </div>
            <button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium"
              onClick={
                account.status == "connected" ? handleTradeSubmission : handleConnectWallet
              }

            >
              {loading
                ? "Connecting..."
                : account.status == "connected"
                  ? "Buy"
                  : "Connect Wallet"}
            </button>
          </div>
        )}
        {/* BUY TAB */}

        {/* SELL TAB */}
        {activeTab === "sell" && (
          <div>
            <div className="flex justify-end mb-1">
              <div
                onClick={() => {
                  // Get the dialog element by ID
                  const modal = document.getElementById("my_modal_2") as HTMLDialogElement;

                  // Check if the modal exists and is a dialog element
                  if (modal) {
                    modal.showModal();
                  } else {
                    console.error("Dialog element with ID 'my_modal_2' not found.");
                  }
                }}
                className="px-4 py-1 rounded-md"
              >
                <VscSettings className="text-xl text-gray-400 hover:text-gray-200" />
              </div>
            </div>


            <div className="input rounded-md bg-gray-900 input-bordered flex items-center gap-1 mb-2 w-full">
              <label className="block text-sm text-gray-400 mb-2 w-full">You Pay
                <input
                  type="number"
                  className="w-full bg-gray-700 rounded p-2 text-white"
                  placeholder="0.0"
                value={sellTokenValue} // Bind the input to the sell token value
                onChange={(e) => setSellTokenValue(e.target.value)}
                />
              </label>
              <select className="w-fit bg-gray-700 rounded p-2 mt-2 text-white">
                <option value="eth">Tai</option>
              </select>
            </div>
            <p className="text-[10px] font-semibold">
              <span>Balance: </span>
              {/* <span>{tokenBalance ? ${tokenBalance} Token : "-- Token"}</span> */}
            </p>
            <div className="flex items-center gap-2 mt-4 mb-4">
              {["25%", "50%", "75%", "100%"].map((percentage, index) => (
                <div
                  key={index}
                  onClick={() =>
                    handleTokenPercentageClick(parseFloat(percentage) / 100)
                  }
                  className="bg-gray-800 px-4 py-1 rounded-md cursor-pointer hover:bg-gray-700"
                >
                  <p className="text-xs">{percentage}</p>
                </div>
              ))}
            </div>
            <button
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-medium"
              onClick={
                account.status == "connected" ? handleSellSubmission : handleConnectWallet
              }
              disabled={loading}
            >
              {loading
                ? "Connecting..."
                : account.status == "connected"
                  ? "Sell"
                  : "Connect Wallet"}
            </button>
          </div>
        )}
        {/* SELL TAB */}
      </div>

      {/* Bonding Curve Section */}
      <div className="bg-gray-900 p-4 rounded-md mb-6">
        <h1 className="font-bold text-lg mb-1">
          <span>Bonding Curve Progress: </span>
          <span> 10%</span>
        </h1>
        <div>
          <progress
            className="progress progress-primary h-4 w-full rounded-xl"
            value="10"
            max="100"
          ></progress>
        </div>
        <p className="text-xs mt-1">
          There are{" "}
          <span className="text-xs uppercase text-blue-400">0 SUNJUSTIN</span>{" "}
          still available for sale in the bonding curve and there are{" "}
          <span className="text-xs uppercase text-blue-400">0 ETH</span> in the
          bonding curve.
        </p>
        <p className="text-xs mt-1">
          When the market cap reaches
          <span className="text-xs uppercase text-blue-400">
            {" "}
            $80,185.16
          </span>{" "}
          all the liquidity from the bonding curve will be deposited into
          Sunswap and burned. Progression increases as the price goes up.
        </p>
      </div>
    </div>
  );
};

export default Trade;
