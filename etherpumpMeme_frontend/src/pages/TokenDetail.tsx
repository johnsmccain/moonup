import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createChart } from 'lightweight-charts';
import { ArrowDownUp } from 'lucide-react';
import { TransactionHistory } from '../components/TokenDetail/TransactionHistory';
import { ChatSection } from '../components/TokenDetail/ChatSection';
import { MajorHolders } from '../components/TokenDetail/MajorHolders';
import { useTokenDetailStore } from '../store/useTokenDetailStore';
import TokenInfo from '../components/TokenDetail/TokenInfo';
import { ITokenInfo } from '../types';
import { fetchDynamicData } from '../utils/api';
import Trade from '../components/Trade/Trade';


export function TokenDetail() {

  const chartContainerRef = React.useRef<HTMLDivElement>(null);
  const { transactions, messages, holders, fetchTransactions, fetchMessages, fetchHolders, sendMessage } = useTokenDetailStore();
  const [activeTab, setActiveTab] = useState("trade");
  const [tokenMetaInfo, setTokenMetaInfo] = useState<ITokenInfo>()
  const { curveAddr } = useParams();
  useEffect(() => {
    if (curveAddr) {
      fetchTransactions(curveAddr);
      fetchMessages(curveAddr);
      fetchHolders(curveAddr);
      fetchDynamicData(`/api/tokens/${curveAddr}`, { params: { category: "", limit: 0 } }).then((data) => {
        setTokenMetaInfo(data);
      })
    }
  }, [curveAddr, fetchTransactions, fetchMessages, fetchHolders]);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { color: '#111827' },
          textColor: '#D1D5DB',
        },
        grid: {
          vertLines: { color: '#1F2937' },
          horzLines: { color: '#1F2937' },
        },
        width: chartContainerRef.current.clientWidth,
        height: 400,
      });

      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#22C55E',
        downColor: '#EF4444',
        borderVisible: false,
        wickUpColor: '#22C55E',
        wickDownColor: '#EF4444',
      });

      candlestickSeries.setData([
        { time: '2024-01-01', open: 10, high: 12, low: 9, close: 11 },
        { time: '2024-01-02', open: 11, high: 15, low: 10, close: 13 },
      ]);

      return () => {
        chart.remove();
      };
    }
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-purple-900 via-black to-blue-900">
      <TokenInfo tokenInfo={tokenMetaInfo as ITokenInfo} />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart and Trade Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-900 rounded-xl p-6">
              <div ref={chartContainerRef} className="w-full h-[400px]" />
            </div>

            <TransactionHistory transactions={transactions} />
          </div>

          {/* Trade Panel and Info */}
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Trade Token</h2>
              <Trade curveAddr={curveAddr} />
            </div>

            <MajorHolders holders={holders} />
          </div>


        </div>

        {/* Chat Section */}
        <div className="mt-6">
          <ChatSection messages={messages} onSendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}