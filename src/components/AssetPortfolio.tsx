import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Send, ArrowDownToLine, Coins } from "lucide-react";

interface Asset {
  symbol: string;
  name: string;
  balance: string;
  value: string;
  change: string;
  changePercent: number;
  icon: string;
  chain: string;
}

const mockAssets: Asset[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    balance: "2.5",
    value: "$4,250.00",
    change: "+$125.50",
    changePercent: 3.04,
    icon: "⟠",
    chain: "Ethereum"
  },
  {
    symbol: "MATIC",
    name: "Polygon",
    balance: "1,250.0",
    value: "$1,125.00",
    change: "-$45.25",
    changePercent: -3.87,
    icon: "⬢",
    chain: "Polygon"
  },
  {
    symbol: "SOL",
    name: "Solana",
    balance: "15.75",
    value: "$2,362.50",
    change: "+$89.75",
    changePercent: 3.95,
    icon: "◊",
    chain: "Solana"
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    balance: "5,000.00",
    value: "$5,000.00",
    change: "$0.00",
    changePercent: 0,
    icon: "$",
    chain: "Multi"
  }
];

interface AssetPortfolioProps {
  selectedChain?: string;
}

export const AssetPortfolio = ({ selectedChain }: AssetPortfolioProps) => {
  const filteredAssets = selectedChain 
    ? mockAssets.filter(asset => 
        asset.chain.toLowerCase() === selectedChain || asset.chain === "Multi"
      )
    : mockAssets;

  const totalValue = filteredAssets.reduce((sum, asset) => {
    return sum + parseFloat(asset.value.replace(/[$,]/g, ''));
  }, 0);

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
      <div className="space-y-6">
        {/* Portfolio Header */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Portfolio Balance</h3>
          <div className="text-3xl font-bold gradient-text">
            ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <Badge variant="secondary" className="flex items-center space-x-1 w-fit mx-auto">
            <Coins className="h-3 w-3" />
            <span>Testnet Assets</span>
          </Badge>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button className="flex items-center space-x-2 glow">
            <Send className="h-4 w-4" />
            <span>Send</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <ArrowDownToLine className="h-4 w-4" />
            <span>Receive</span>
          </Button>
        </div>

        {/* Assets List */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Assets
          </h4>
          {filteredAssets.map((asset, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="text-xl">{asset.icon}</div>
                <div>
                  <div className="font-semibold">{asset.symbol}</div>
                  <div className="text-sm text-muted-foreground">{asset.name}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-semibold">{asset.balance}</div>
                <div className="text-sm text-muted-foreground">{asset.value}</div>
                <div className={`text-xs flex items-center space-x-1 ${
                  asset.changePercent > 0 
                    ? 'text-accent' 
                    : asset.changePercent < 0 
                      ? 'text-destructive' 
                      : 'text-muted-foreground'
                }`}>
                  {asset.changePercent > 0 && <TrendingUp className="h-3 w-3" />}
                  {asset.changePercent < 0 && <TrendingDown className="h-3 w-3" />}
                  <span>{asset.change} ({asset.changePercent > 0 ? '+' : ''}{asset.changePercent}%)</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Faucet Info */}
        <div className="p-3 bg-primary/10 rounded-md border border-primary/20">
          <p className="text-sm text-primary">
            🚰 <strong>Need testnet tokens?</strong> Use the built-in faucet to get demo assets for testing
          </p>
        </div>
      </div>
    </Card>
  );
};