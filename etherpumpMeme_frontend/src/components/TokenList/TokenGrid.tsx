// import { TokenCard } from '../TokenCard';
import { useTokenList } from '../../hooks/useTokenList';
import { useTokenStore } from '../../store/useTokenStore';
import { Loader } from 'lucide-react';
import TokenCard from '../TokenCard';
import { useEffect, useState } from 'react';
import { fetchDynamicData } from '../../utils/api';

export function TokenGrid() {
  const { isLoading, error } = useTokenStore();
  const filteredTokens = useTokenList();
  // const [selectedOption, setSelectedOption] = useState("default");
  const [allTokens, setAllTokens] = useState([]);
console.log(filteredTokens)
  useEffect(() => {
   
      fetchDynamicData("/api/tokens", { params: { category: "", limit: 15 } }).then((data) => {
        setAllTokens(data)
      })

  
  }, [])


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 p-4 bg-red-900/20 rounded-lg">
        {error}
      </div>
    );
  }

  if (allTokens?.length === 0) {
    return (
      <div className="text-center text-gray-400 p-4">
        No tokens found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {allTokens?.map((token, id) => (
        <TokenCard
          key={id}
          item={token}
        />
      ))}
    </div>
  );
}