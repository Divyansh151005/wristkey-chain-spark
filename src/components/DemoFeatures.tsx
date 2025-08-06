import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { 
  Smartphone, 
  Fingerprint, 
  Shield, 
  Zap, 
  Globe, 
  Coins,
  CheckCircle,
  Clock
} from "lucide-react";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: any;
  status: "available" | "demo" | "coming-soon";
  category: string;
}

const features: Feature[] = [
  {
    id: "multi-chain",
    title: "Multi-Chain Support",
    description: "Seamlessly interact with Ethereum, Polygon, and Solana",
    icon: Globe,
    status: "available",
    category: "Core"
  },
  {
    id: "ccip",
    title: "Chainlink CCIP Integration",
    description: "Cross-chain messaging and token transfers",
    icon: Zap,
    status: "demo",
    category: "Interoperability"
  },
  {
    id: "sms",
    title: "Solana Mobile Stack",
    description: "Native mobile wallet integration for Solana",
    icon: Smartphone,
    status: "demo",
    category: "Mobile"
  },
  {
    id: "biometric",
    title: "Biometric Authentication",
    description: "Secure login with fingerprint and face recognition",
    icon: Fingerprint,
    status: "coming-soon",
    category: "Security"
  },
  {
    id: "non-custodial",
    title: "Non-Custodial Security",
    description: "Your keys, your crypto - no third-party access",
    icon: Shield,
    status: "available",
    category: "Security"
  },
  {
    id: "testnet-faucet",
    title: "Testnet Faucet",
    description: "Get demo tokens for testing and development",
    icon: Coins,
    status: "available",
    category: "Development"
  }
];

export const DemoFeatures = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const categories = ["All", ...Array.from(new Set(features.map(f => f.category)))];
  
  const filteredFeatures = selectedCategory === "All" 
    ? features 
    : features.filter(f => f.category === selectedCategory);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-accent text-accent-foreground">Available</Badge>;
      case "demo":
        return <Badge variant="secondary">Demo</Badge>;
      case "coming-soon":
        return <Badge variant="outline">Coming Soon</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="h-4 w-4 text-accent" />;
      case "demo":
        return <Clock className="h-4 w-4 text-primary" />;
      case "coming-soon":
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Demo Features</h3>
          <p className="text-sm text-muted-foreground">
            Explore the capabilities of Wristkey Global Solutions wallet
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "glow" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-all duration-300 cursor-pointer border border-border/50 hover:border-primary/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(feature.status)}
                    {getStatusBadge(feature.status)}
                  </div>
                </div>
                
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {feature.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {feature.category}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>

        {/* Demo Notice */}
        <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
          <h4 className="font-semibold mb-2 flex items-center space-x-2">
            <Shield className="h-4 w-4 text-primary" />
            <span>Demo Environment</span>
          </h4>
          <p className="text-sm text-muted-foreground">
            This is a demonstration wallet for showcasing Wristkey Global Solutions' capabilities. 
            All transactions use testnet tokens with no real value. Do not use this wallet for actual cryptocurrency transactions.
          </p>
        </div>
      </div>
    </Card>
  );
};