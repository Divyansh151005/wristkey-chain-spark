import { useState } from "react";
import { WalletHeader } from "@/components/WalletHeader";
import { ChainSelector } from "@/components/ChainSelector";
import { AssetPortfolio } from "@/components/AssetPortfolio";
import { CrossChainDemo } from "@/components/CrossChainDemo";
import { DemoFeatures } from "@/components/DemoFeatures";
import heroImage from "@/assets/wallet-hero.jpg";

const Index = () => {
  const [selectedChain, setSelectedChain] = useState<string>("ethereum");
  const [isConnected, setIsConnected] = useState(false);
  const [mockAddress] = useState("0x742d35Cc6543C068Bc123456789abcdef0123456");

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  const handleChainSelect = (chainId: string) => {
    setSelectedChain(chainId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-64 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text">
              Wristkey Global Solutions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Experience the future of multi-chain wallet technology
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Wallet Header */}
        <WalletHeader
          address={isConnected ? mockAddress : undefined}
          chain={selectedChain}
          isConnected={isConnected}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
        />

        {/* Chain Selector */}
        <ChainSelector
          selectedChain={selectedChain}
          onChainSelect={handleChainSelect}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Portfolio */}
          <AssetPortfolio selectedChain={selectedChain} />
          
          {/* Cross-Chain Demo */}
          <CrossChainDemo selectedChain={selectedChain} />
        </div>

        {/* Demo Features */}
        <DemoFeatures />
      </div>
    </div>
  );
};

export default Index;
