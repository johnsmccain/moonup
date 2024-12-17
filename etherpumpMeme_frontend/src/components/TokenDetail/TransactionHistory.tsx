import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  timestamp: string;
  address: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  return (
    <div className="bg-gray-900 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Transaction History</h3>
      <div className="space-y-4">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center gap-3">
              {tx.type === 'buy' ? (
                <ArrowUpRight className="w-5 h-5 text-green-400" />
              ) : (
                <ArrowDownRight className="w-5 h-5 text-red-400" />
              )}
              <div>
                <p className="text-white">{tx.type === 'buy' ? 'Buy' : 'Sell'}</p>
                <p className="text-sm text-gray-400">{tx.address.slice(0, 6)}...{tx.address.slice(-4)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white">{tx.amount.toFixed(2)} tokens</p>
              <p className="text-sm text-gray-400">${tx.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}