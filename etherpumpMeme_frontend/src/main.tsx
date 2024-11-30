import {Buffer} from 'buffer'
// import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
// import {WagmiProvider} from 'wagmi'
import {BrowserRouter} from "react-router-dom";
// import { store } from './redux/store.ts';
// import { Provider } from 'react-redux'
import '@rainbow-me/rainbowkit/styles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App.tsx'

import './index.css'
// import {RainbowKitProvider} from '@rainbow-me/rainbowkit'
import {ThemeProvider} from './components/theme-provider.tsx'
// import { Toaster } from 'react-hot-toast'


globalThis.Buffer = Buffer
import { createAppKit } from '@reown/appkit/react'

import { Config, WagmiProvider } from 'wagmi'
import { arbitrum, mainnet, sepolia } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
// import { RainbowKitProvider } from '@rainbow-me/rainbowkit';


// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.reown.com
const projectId = '602fa2d218dad279c7df08b58b46f594'

// 2. Create a metadata object - optional
const metadata = {
  name: 'moonup',
  description: 'MoonUp',
  url: 'https://reown.com/appkit', // origin must match your domain & subdomain
  icons: ['https://assets.reown.com/reown-profile-pic.png']
}

// 3. Set the networks
const networks = [mainnet, arbitrum, sepolia] as any

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
});

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})



// const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <WagmiProvider config={wagmiAdapter.wagmiConfig as Config}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
        </WagmiProvider>
        <ToastContainer />
        {/* </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider> */}
        </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <BrowserRouter>
//         <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//          <WagmiProvider config={config}>
//       <QueryClientProvider client={queryClient}>
//         <RainbowKitProvider> 
//           <App />
//         <Toaster />
//         </RainbowKitProvider>
//       </QueryClientProvider>
//     </WagmiProvider>
//         </ThemeProvider>
//     </BrowserRouter>
//   </React.StrictMode>,
// )