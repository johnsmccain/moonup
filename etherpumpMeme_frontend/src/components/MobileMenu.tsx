import { Link } from 'react-router-dom';
import { WalletConnect } from './WalletConnect';
import { Home, TrendingUp, Laugh } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50 pt-20 bg-slate-900">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-gray-900 h-full ">
        <nav className="flex flex-col p-4 space-y-4 bg-black">
          <Link
            to="/"
            className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg transition-colors"
            onClick={onClose}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
          
          <Link
            to="/create-token"
            className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg transition-colors"
            onClick={onClose}
          >
            <TrendingUp className="w-5 h-5" />
            <span>Create-token</span>
          </Link>
          
          <Link
            to="/memes"
            className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg transition-colors"
            onClick={onClose}
          >
            <Laugh className="w-5 h-5" />
            <span>Memes</span>
          </Link>

          <div className="p-3">
            <WalletConnect />
          </div>
        </nav>
      </div>
    </div>
  );
}