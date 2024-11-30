import  { useEffect, useRef } from "react";

const TradingViewChart = () => {
  const chartContainerRef = useRef<any>(null);

  useEffect(() => {
    // Load TradingView widget script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js"; // TradingView widget script
    script.async = true;
    // chartContainerRef.current.appendChild(script);
    chartContainerRef.current?.appendChild(script);

    script.onload = () => {
      // Initialize the TradingView widget once the script is loaded
      new window.TradingView.widget({
        container_id: "tradingview_chart",
        autosize: true,
        symbol: "ETHUSDT", // Example: Bitcoin to USDT pair
        interval: "D", // Default timeframe (D = Daily)
        theme: "dark", // Chart theme (light or dark)
        style: "1", // 1 = candle, 3 = line, 5 = hollow candles
        locale: "en",
        toolbar_bg: "#f1f3f6", // Background color for the toolbar
        enable_publishing: false,
        hide_side_toolbar: false,
        allow_symbol_change: true,
      });
    };
  }, []);

  return (
   <div className="mb-4 bg-gray-900 p-4 rounded-xl">
     <div
      ref={chartContainerRef}
      id="tradingview_chart"
      style={{ height: "500px" }} // Set the chart height
    ></div>
   </div>
  );
};

export default TradingViewChart;
