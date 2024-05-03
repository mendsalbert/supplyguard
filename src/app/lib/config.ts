// lib/config.ts

import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { cookieStorage, createStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

export const projectId = "6a1ea1cb75d52415bb4110fa68566498";

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "Web3Modal Example",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const LiskSepolia = {
  id: 4202,
  name: "Lisk Sepolia Testnet",
  network: "Lisk Sepolia Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Lisk Sepolia Testnet",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.sepolia-api.lisk.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Apothem Explorer",
      url: "https://sepolia-blockscout.lisk.com",
    },
  },
  testnet: true,
};

const BitTorrent = {
  id: 1029,
  name: "BitTorrent Chain Donau",
  network: "BitTorrent Chain Donau",
  nativeCurrency: {
    decimals: 18,
    name: "BitTorrent Chain Donau",
    symbol: "BTTC",
  },
  rpcUrls: {
    default: {
      http: ["https://pre-rpc.bt.io/"],
    },
  },
  blockExplorers: {
    default: {
      name: "Apothem Explorer",
      url: "https://testscan.bt.io",
    },
  },
  testnet: true,
};

export const config = defaultWagmiConfig({
  chains: [BitTorrent],
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  enableEmail: true,
});
