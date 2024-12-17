import React, { useState } from 'react';
import { Sun, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WalletConnect } from './WalletConnect';
import { MobileMenu } from './MobileMenu';
import logo from "../assets/icons/logo.svg"
import ConnectButton from './ConnectButton';
export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 w-full bg-black/90 backdrop-blur-sm text-white p-4 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          {/* <Sun className="w-8 h-8 text-yellow-400 animate-spin-slow" /> */}
          <img className="w-12 rounded-lg" src={logo} alt="" />
          <span className="text-2xl font-bold">MOONUP </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link>
          <Link to="/create-token" className="hover:text-yellow-400 transition-colors">Create-Token</Link>
          <Link to="/memes" className="hover:text-yellow-400 transition-colors">Memes</Link>
          <WalletConnect />
          {/* <ConnectButton/> */}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}