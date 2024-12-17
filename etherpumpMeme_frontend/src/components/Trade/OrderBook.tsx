import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useOrderBook } from '../../hooks/useOrderBook';
import type { Order } from '../../types';

export function OrderBook() {
  const { buyOrders, sellOrders } = useOrderBook();

  const renderOrder = (order: Order, type: 'buy' | 'sell') => (
    <div className="grid grid-cols-3 gap-4 text-sm">
      <div className={`${type === 'buy' ? 'text-green-400' : 'text-red-400'} flex items-center gap-1`}>
        {type === 'buy' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
        {order.price.toFixed(9)}
      </div>
      <div className="text-right text-gray-300">{order.amount.toLocaleString()}</div>
      <div className="text-right text-gray-300">{order.total.toFixed(4)}</div>
    </div>
  );

  return (
    <div className="bg-gray-900 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Order Book</h3>
      
      <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-400 mb-2">
        <div>Price (ETH)</div>
        <div className="text-right">Amount</div>
        <div className="text-right">Total</div>
      </div>

      <div className="space-y-1 mb-4">
        {sellOrders.map((order, i) => (
          <div key={i}>{renderOrder(order, 'sell')}</div>
        ))}
      </div>

      <div className="text-center text-gray-400 text-sm py-2 border-y border-gray-800">
        Spread: {((sellOrders[0].price - buyOrders[0].price) / sellOrders[0].price * 100).toFixed(2)}%
      </div>

      <div className="space-y-1 mt-4">
        {buyOrders.map((order, i) => (
          <div key={i}>{renderOrder(order, 'buy')}</div>
        ))}
      </div>
    </div>
  );
}