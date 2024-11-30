// global.d.ts or in any .d.ts file you are using
declare global {
    interface Window {
      TradingView: any; // You can replace `any` with a more specific type if you have one
    }
  }
  
  export {};
  