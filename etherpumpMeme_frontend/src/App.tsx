// import { useAccount, useConnect, useDisconnect } from "wagmi";
import {  Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import { Toaster } from "react-hot-toast";
import Token from "./pages/Token";
import NewToken from "./pages/NewToken";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import { Header } from "./components/Header";

function App() {
  // const account = useAccount();
  // const { connectors, connect, status, error } = useConnect();
  // const { disconnect } = useDisconnect();

  return (
    <div className="min-h-screen bg-dark-gradient text-white relative overflow-hidden h-full flex flex-col justify-between">
    {/* <Header/> */}
    {/* Background Blurs */}
    {/* <div className="fixed inset-0 pointer-events-none">
      <div className="absolute top-40 left-20 w-[500px] h-[500px] bg-blur-purple"/>
      <div className="absolute top-[60%] right-20 w-[400px] h-[400px] bg-blur-purple rounded-full"/>
      <div className="absolute bottom-20 left-1/2 w-[300px] h-[300px] bg-blur-purple rounded-full"/>
    </div> */}
    <Navbar />


    {/* <div className="pattern-isometric pattern-indigo-500 pattern-bg-white 
  
  pattern-size-8 pattern-opacity-10"> */}

     <div className=" mx-auto pt-48 min-w-[700px]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/newtoken" element={<NewToken />} />
          <Route path="/curve/:curveAddr" element={<Token />} />
        </Routes>
        <Toaster />
      </div>

      <Footer />

    </div>
  );
}

export default App;
