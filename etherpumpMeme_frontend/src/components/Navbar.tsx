import { useEffect, useState } from "react";
import { RiMenu4Line } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { RootState } from "../redux/store";
// import { connectWalletThunk, disconnectWalletThunk } from "../redux/Slices/walletSlice";
import logo from "../assets/logo.jpg";
// import { ConnectWallet } from "./ConnectWallet";
import ConnectButton from "./ConnectButton";

// import { useDispatch, useSelector } from 'react-redux'

const Navbar = () => {

  
  const [_, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // const navbarBgColor = scrolled ? "shadow-bg" : "";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // adjust the value as needed
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`fixed z-50 bg-[#15173033] w-full transition-all duration-300 ${isScrolled ? '  border-b border-[#1E1E33] backdrop-blur-md shadow-md text-[#1E1E33]' : 'text-white'}`}>
      <section className="container mx-auto py-1 md:px-4 md:py-4 flex justify-between items-center sec_font">
        <nav className={`md:flex w-full`}>
          <div className="container mx-auto px-4 z-50">
            <div className="relative flex  items-center">
              <Link className="inline-block" to="/home">
                <img className="w-12 rounded-lg" src={logo} alt="" />
              </Link>
              <button
                onClick={() => setOpen(true)}
                className="lg:hidden flex items-center justify-center h-10 w-10 ml-auto  rounded-lg"
              >
                <RiMenu4Line className="text-2xl hover:text-3xl" />
              </button>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center">
                <Link
                  className="inline-block  hover:text-teal-400 mr-10"
                  to="/"
                >
                  Home
                </Link>
                <Link
                  className="inline-block  hover:text-teal-400 mr-10"
                  to="/newtoken"
                >
                  Create Token
                </Link>
                <Link
                  className="inline-block  hover:text-teal-400 mr-10"
                  to="#"
                >
                  How it Works
                </Link>
              </div>

              <div className="hidden lg:block ml-auto">
                {/* <button
                  className="inline-flex items-center justify-center h-10 px-4 text-center leading-loose
                   text-sm text-gray-200 font-bold hover:text-gray-800 bg-blue-500 hover:bg-white rounded-lg transition duration-200"
                   
                > */}
                  {/* {walletConnected
                    ? ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}
                    : "Connect Wallet"} */}
                    {/* Connect Wallet
                </button> */}
                {/* <ConnectWallet/> */}
                <ConnectButton/>
                
              </div>
            </div>
          </div>
        </nav>
        <div
          className={`fixed top-0 left-0 bottom-0 w-5/6 max-w-md z-50 bg-black bg-opacity-80 transition-slide transform ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="fixed inset-0" />
          <nav className="relative flex flex-col py-6 px-10 w-full h-full bg-black bg-opacity-80 overflow-y-auto">
            <div className="flex mb-auto items-center">
              <Link className="inline-block mr-auto" to="#">
                <img className="h-10" src={logo} alt="" />
              </Link>
              <button onClick={() => setOpen(false)}>
                <FaTimes className="text-2xl" />
              </button>
            </div>
            <div className="py-12 mb-auto">
              <ul className="flex-col gap-8">
                <li className="mb-6">
                  <Link
                    className="inline-block font-bold text-lg text-white"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="mb-6">
                  <Link
                    className="inline-block font-bold text-lg text-white"
                    to="/newtoken"
                  >
                    Create Token
                  </Link>
                </li>
                <li className="mb-6">
                  <Link
                    className="inline-block font-bold text-lg text-white"
                    to="#"
                  >
                    How it Works
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div
                className="flex items-center justify-center "
              >
                {/* {walletConnected ? ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}
                  : "Connect Wallet"} */}
                  {/* <ConnectWallet/> */}
                <ConnectButton />

              </div>
            </div>
          </nav>
        </div>
      </section>
    </header>
  );
};

export default Navbar;
