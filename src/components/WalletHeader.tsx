import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Copy, ExternalLink, Shield } from "lucide-react";

interface WalletHeaderProps {
  address?: string;
  chain?: string;
  isConnected?: boolean;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export const WalletHeader = ({ 
  address, 
  chain, 
  isConnected = false, 
  onConnect, 
  onDisconnect 
}: WalletHeaderProps) => {
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-full bg-primary/10 glow">
            <Wallet className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold gradient-text">
              Wristkey Demo Wallet
            </h2>
            <p className="text-muted-foreground">Multi-chain demo wallet</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Shield className="h-3 w-3" />
            <span>Non-Custodial</span>
          </Badge>
          
          {isConnected ? (
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-accent border-accent/50">
                {chain || "Unknown Chain"}
              </Badge>
              <div className="flex items-center space-x-2 px-3 py-2 bg-secondary rounded-md">
                <span className="text-sm font-mono">
                  {address ? formatAddress(address) : "No address"}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyAddress}
                  className="h-6 w-6 p-0"
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
              <Button variant="outline" onClick={onDisconnect}>
                Disconnect
              </Button>
            </div>
          ) : (
            <Button onClick={onConnect} className="glow">
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};