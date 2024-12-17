import { createAppKit } from '@reown/appkit/react'

import { WagmiProvider } from 'wagmi'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ReactNode } from 'react'
import { metadata, networks, projectId, solanaWeb3JsAdapter, wagmiAdapter } from '../config/wagmi'


const queryClient = new QueryClient()

const generalConfig = {
  projectId,
  metadata,
  networks
}

// Create modal
createAppKit({
  adapters: [wagmiAdapter, solanaWeb3JsAdapter] as any,
  ...generalConfig as any,
})
export function AppKitProvider({ children }: {children:ReactNode}) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}