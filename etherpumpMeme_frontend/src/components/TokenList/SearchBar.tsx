import React from 'react';
import { Search } from 'lucide-react';
import { useTokenStore } from '../../store/useTokenStore';

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useTokenStore();

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search tokens..."
        className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}