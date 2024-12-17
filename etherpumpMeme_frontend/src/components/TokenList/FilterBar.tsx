import { useTokenStore } from '../../store/useTokenStore';

export function FilterBar() {
  const { sortBy, setSortBy, filterBy, setFilterBy } = useTokenStore();

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="marketCap">Market Cap</option>
        <option value="price">Price</option>
        <option value="priceChange">24h Change</option>
      </select>

      <select
        value={filterBy}
        onChange={(e) => setFilterBy(e.target.value)}
        className="bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="all">All Tokens</option>
        <option value="gainers">Top Gainers</option>
        <option value="losers">Top Losers</option>
      </select>
    </div>
  );
}