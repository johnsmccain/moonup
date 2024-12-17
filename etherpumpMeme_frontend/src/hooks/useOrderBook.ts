import { useState, useEffect } from 'react';
import { orderBook } from '../data/dummyData';
// import type { OrderBook } from '../types';

export function useOrderBook() {
  const [data, setData] = useState<any>(orderBook);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const randomChange = Math.random() * 0.00000001;
      
      setData((prev:any) => ({
        buyOrders: prev.buyOrders.map((order:any) => ({
          ...order,
          price: order.price + randomChange,
          total: (order.price + randomChange) * order.amount,
        })),
        sellOrders: prev.sellOrders.map((order:any) => ({
          ...order,
          price: order.price + randomChange,
          total: (order.price + randomChange) * order.amount,
        })),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return data;
}