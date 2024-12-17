import React from 'react';
import { Wallet } from 'lucide-react';

interface Holder {
  address: string;
  balance: number;
  percentage: number;
}

interface MajorHoldersProps {
  holders: Holder[];
}

export function MajorHolders({ holders }: MajorHoldersProps) {
  return (
    <div className="bg-gray-900 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Major Holders</h3>
      <div className="space-y-4">
        {holders.map((holder, index) => (
          <div key={holder.address} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <Wallet className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white">#{index + 1} {holder.address.slice(0, 6)}...{holder.address.slice(-4)}</p>
                <p className="text-sm text-gray-400">{holder.balance.toLocaleString()} tokens</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white">{holder.percentage.toFixed(2)}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}