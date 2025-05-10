import { http, createConfig } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { metaMask, safe, coinbaseWallet } from 'wagmi/connectors'

const config = createConfig({
  chains: [baseSepolia],
  connectors: [
    metaMask(),
    safe(),
    coinbaseWallet(),
  ],
  transports: {
    [baseSepolia.id]: http(),
  },
  ssr: true,
})

export default config;