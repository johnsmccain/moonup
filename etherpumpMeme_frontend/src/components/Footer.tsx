import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Footer = () => {
  return (
    <div>
      <div className="pt-24 pb-12 ">
        <div className="container mx-auto px-4 py-6 border-t border-gray-400">
          <div className="flex items-center justify-between flex-wrap gap-8">
            <a href="#">
              <img className="w-10 rounded-lg" src={logo} alt="" />
            </a>

            <div className="flex items-center gap-6 flex-wrap">
              <Link
                className="text-gray-400 hover:text-gray-600 transition duration-200"
                to="#"
              >
                <FaXTwitter className="text-gray-300 text-lg  hover:text-gray-600 transition duration-300 ease-in-out" />
              </Link>
              <Link
                className="text-gray-400 hover:text-gray-600 transition duration-200"
                to="#"
              >
                <FaTelegramPlane className="text-gray-300 text-lg  hover:text-gray-600 transition duration-300 ease-in-out" />
              </Link>
              <Link
                className="text-gray-400 hover:text-gray-600 transition duration-200"
                to="#"
              >
                <FaInstagram className="text-gray-300 text-lg  hover:text-gray-600 transition duration-300 ease-in-out" />
              </Link>
            </div>
          </div>
        </div>
        <div className="pt-12">
          <p className="text-center text-sm text-gray-400 font-bold">
            © 2024 Etherpump.Meme. All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
