import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Chain {
  id: string;
  name: string;
  icon: string;
  testnet: string;
  color: string;
  enabled: boolean;
}

const chains: Chain[] = [
  {
    id: "ethereum",
    name: "Ethereum",
    icon: "⟠",
    testnet: "Goerli",
    color: "hsl(225 100% 60%)",
    enabled: true,
  },
  {
    id: "polygon",
    name: "Polygon",
    icon: "⬢",
    testnet: "Mumbai",
    color: "hsl(260 100% 65%)",
    enabled: true,
  },
  {
    id: "solana",
    name: "Solana",
    icon: "◊",
    testnet: "Devnet",
    color: "hsl(75 100% 50%)",
    enabled: true,
  },
];

interface ChainSelectorProps {
  selectedChain?: string;
  onChainSelect?: (chainId: string) => void;
}

export const ChainSelector = ({ selectedChain, onChainSelect }: ChainSelectorProps) => {
  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Select Blockchain</h3>
          <p className="text-sm text-muted-foreground">
            Choose a testnet to demo wallet functionality
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {chains.map((chain) => (
            <Button
              key={chain.id}
              variant={selectedChain === chain.id ? "default" : "outline"}
              onClick={() => onChainSelect?.(chain.id)}
              className={cn(
                "h-auto p-4 flex flex-col items-center space-y-2 transition-all duration-300",
                selectedChain === chain.id && "glow",
                !chain.enabled && "opacity-50 cursor-not-allowed"
              )}
              disabled={!chain.enabled}
            >
              <div 
                className="text-2xl"
                style={{ color: selectedChain === chain.id ? "white" : chain.color }}
              >
                {chain.icon}
              </div>
              <div className="text-center">
                <div className="font-semibold">{chain.name}</div>
                <Badge 
                  variant="secondary" 
                  className="text-xs mt-1"
                >
                  {chain.testnet}
                </Badge>
              </div>
            </Button>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-muted/50 rounded-md">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Demo Mode:</strong> All transactions use testnet tokens with no real value
          </p>
        </div>
      </div>
    </Card>
  );
};