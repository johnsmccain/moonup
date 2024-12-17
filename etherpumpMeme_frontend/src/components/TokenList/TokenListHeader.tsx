import React from 'react';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';
import { useTokenStore } from '../../store/useTokenStore';

export function TokenListHeader() {
  const { isLoading } = useTokenStore();

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold text-white">Trending Tokens</h2>
        {!isLoading && <FilterBar />}
      </div>
      {!isLoading && <SearchBar />}
    </div>
  );
}