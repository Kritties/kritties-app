"use client";

import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = getDefaultConfig({
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
    chains: [mainnet, polygon, optimism, arbitrum],
    //ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();


export function Web3Provider({ children }: { children: React.ReactNode }) {
    return (
     <WagmiProvider config={config}>
     <QueryClientProvider client={queryClient}>
       <RainbowKitProvider>
         {children}
       </RainbowKitProvider>
     </QueryClientProvider>
   </WagmiProvider>
    );
}
