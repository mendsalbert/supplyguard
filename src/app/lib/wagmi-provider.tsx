"use client";

import React, { ReactNode } from "react";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { State, WagmiProvider } from "wagmi";
import { config, projectId } from "./config";

const LiskSepolia = {
  chainId: 4202,
  name: "Lisk Sepolia Testnet",
  currency: "ETH",
  explorerUrl: "https://sepolia-blockscout.lisk.com",
  rpcUrl: "https://rpc.sepolia-api.lisk.com",
} as any;

const BitTorrent = {
  chainId: 1029,
  name: "BitTorrent Chain Donau",
  currency: "BTTC",
  explorerUrl: "https://testscan.bt.io",
  rpcUrl: "https://pre-rpc.bt.io/",
} as any;

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  defaultChain: BitTorrent,
  enableAnalytics: true, // Optional
  themeMode: "light",
});

export const WagmiProviderComp = ({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // configure as per your needs
          },
        },
      })
  );

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};
export default WagmiProviderComp;
