import React, { useState } from 'react';
import { OrderTypes, type OrderType, type TradeType } from './OrderTypes';
import { PriceInput } from './PriceInput';
import { useTokenOperations } from '../../hooks';
import { parseEther } from 'viem';

interface TradeFormProps {
  tradeType: TradeType;
  onTradeTypeChange: (type: TradeType) => void;
}

export function TradeForm({ tradeType, onTradeTypeChange }: TradeFormProps) {
  const [orderType, setOrderType] = useState<OrderType>('market');
  const [amount, setAmount] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [stopPrice, setStopPrice] = useState('');
  const { buyToken } = useTokenOperations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    try {
      const value = parseEther(amount);
      const minExpected = parseEther('0'); // Calculate based on price type
      await buyToken(minExpected, value);
    } catch (error) {
      console.error('Trade failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => onTradeTypeChange('buy')}
          className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
            tradeType === 'buy'
              ? 'bg-green-600 text-white'
              : 'bg-gray-800 text-gray-300'
          }`}
        >
          Buy
        </button>
        <button
          type="button"
          onClick={() => onTradeTypeChange('sell')}
          className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
            tradeType === 'sell'
              ? 'bg-red-600 text-white'
              : 'bg-gray-800 text-gray-300'
          }`}
        >
          Sell
        </button>
      </div>

      <OrderTypes
        selectedOrderType={orderType}
        setSelectedOrderType={setOrderType}
        tradeType={tradeType}
      />

      <PriceInput
        label="Amount"
        value={amount}
        onChange={setAmount}
        placeholder="Enter amount"
      />

      {orderType === 'limit' && (
        <PriceInput
          label="Limit Price"
          value={limitPrice}
          onChange={setLimitPrice}
          placeholder="Set limit price"
        />
      )}

      {orderType === 'stop' && (
        <>
          <PriceInput
            label="Stop Price"
            value={stopPrice}
            onChange={setStopPrice}
            placeholder="Set stop price"
          />
          <PriceInput
            label="Limit Price"
            value={limitPrice}
            onChange={setLimitPrice}
            placeholder="Set limit price"
          />
        </>
      )}

      <button
        type="submit"
        className={`w-full py-4 rounded-lg font-medium transition-colors ${
          tradeType === 'buy'
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-red-600 hover:bg-red-700'
        } text-white`}
      >
        {tradeType === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
      </button>
    </form>
  );
}