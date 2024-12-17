import React from 'react';
import { RadioGroup } from '@headlessui/react';
import { CircleDot } from 'lucide-react';

export type OrderType = 'market' | 'limit' | 'stop';
export type TradeType = 'buy' | 'sell';

interface OrderTypesProps {
  selectedOrderType: OrderType;
  setSelectedOrderType: (type: OrderType) => void;
  tradeType: TradeType;
}

export function OrderTypes({ selectedOrderType, setSelectedOrderType, tradeType }: OrderTypesProps) {
  const orderTypes: { type: OrderType; label: string }[] = [
    { type: 'market', label: 'Market' },
    { type: 'limit', label: 'Limit' },
    { type: 'stop', label: 'Stop' },
  ];

  return (
    <RadioGroup value={selectedOrderType} onChange={setSelectedOrderType} className="mb-4">
      <div className="flex gap-2">
        {orderTypes.map(({ type, label }) => (
          <RadioGroup.Option
            key={type}
            value={type}
            className={({ checked }) =>
              `${checked ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'}
               px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 flex-1 transition-colors`
            }
          >
            {({ checked }) => (
              <>
                <CircleDot className={`w-4 h-4 ${checked ? 'opacity-100' : 'opacity-0'}`} />
                <span className="font-medium">{label}</span>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}