import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Tabs from "./components/Tabs/Tabs";
import Video from "./assets/water3.mp4";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "862e2544b694a246addaff50ba2ab87e";

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const sepolia = {
  chainId: 11155111,
  name: "Sepolia",
  currency: "ETH",
  explorerUrl: "https://rpc.sepolia.org",
  rpcUrl: "https://ethereum-sepolia-rpc.publicnode.com",
};

const bsc = {
  chainId: 56,
  name: "Binance Smart Chain",
  currency: "BNB",
  explorerUrl: "https://bscscan.com",
  rpcUrl: "https://bsc.drpc.org",
};

const arbitrum = {
  chainId: 42161,
  name: "Arbitrum",
  currency: "ETH",
  explorerUrl: "https://arbiscan.io",
  rpcUrl: "https://arb1.arbitrum.io/rpc",
};

// 3. Create modal
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [arbitrum],
  projectId,
  enableAnalytics: true,
  themeVariables: {
    "--w3m-z-index`": 10000,
  },
});

function App() {
  return (
    <div className="app">
      <div className="video-container">
        <div className="video-background">
          <Navbar />
          <Tabs />

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
