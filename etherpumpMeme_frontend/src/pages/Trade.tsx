import React, { useState } from 'react';
import { useWalletStore } from '../store/useWalletStore';
import { AlertCircle } from 'lucide-react';
import { TradeForm } from '../components/Trade/TradeForm';
import { OrderBook } from '../components/Trade/OrderBook';
import type { TradeType } from '../components/Trade/OrderTypes';

const MOCK_ORDERS = {
  buyOrders: [
    { price: 1.23456, amount: 0.5, total: 0.617280 },
    { price: 1.23455, amount: 1.2, total: 1.481460 },
    { price: 1.23454, amount: 0.8, total: 0.987632 },
  ],
  sellOrders: [
    { price: 1.23459, amount: 0.3, total: 0.370377 },
    { price: 1.23458, amount: 0.7, total: 0.864206 },
    { price: 1.23457, amount: 0.4, total: 0.493828 },
  ],
};

export function Trade({curveAddr}:{curveAddr:`0x${string}`}) {
  const { isConnected } = useWalletStore();
  const [tradeType, setTradeType] = useState<TradeType>('buy');

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-purple-900 via-black to-blue-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Book */}
          <div className="lg:col-span-2">
            <OrderBook
              buyOrders={MOCK_ORDERS.buyOrders}
              sellOrders={MOCK_ORDERS.sellOrders}
            />
          </div>

          {/* Trading Form */}
          <div className="bg-gray-900 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Spot Trading</h2>
            
            {!isConnected && (
              <div className="mb-6 p-4 bg-yellow-900/20 rounded-lg flex items-center gap-2 text-yellow-400">
                <AlertCircle className="w-5 h-5" />
                <span>Please connect your wallet to trade</span>
              </div>
            )}

            <TradeForm
              tradeType={tradeType}
              onTradeTypeChange={setTradeType}
            />
          </div>
        </div>
      </div>
    </div>
  );
}