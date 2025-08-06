import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Zap, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const chains = [
  { id: "ethereum", name: "Ethereum", icon: "⟠", color: "hsl(225 100% 60%)" },
  { id: "polygon", name: "Polygon", icon: "⬢", color: "hsl(260 100% 65%)" },
  { id: "solana", name: "Solana", icon: "◊", color: "hsl(75 100% 50%)" },
];

interface CrossChainDemoProps {
  selectedChain?: string;
}

export const CrossChainDemo = ({ selectedChain }: CrossChainDemoProps) => {
  const [fromChain, setFromChain] = useState(selectedChain || "ethereum");
  const [toChain, setToChain] = useState("polygon");
  const [amount, setAmount] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);

  const steps = [
    { name: "Initiate Transfer", icon: Clock, status: "pending" },
    { name: "CCIP Processing", icon: Zap, status: "pending" },
    { name: "Cross-Chain Verification", icon: AlertCircle, status: "pending" },
    { name: "Destination Confirmed", icon: CheckCircle, status: "pending" },
  ];

  const simulateTransfer = async () => {
    setIsSimulating(true);
    setSimulationStep(0);

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSimulationStep(i + 1);
    }

    setTimeout(() => {
      setIsSimulating(false);
      setSimulationStep(0);
      setAmount("");
    }, 3000);
  };

  const getStepStatus = (index: number) => {
    if (index < simulationStep) return "completed";
    if (index === simulationStep) return "active";
    return "pending";
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center space-x-2">
            <Zap className="h-5 w-5 text-primary" />
            <span>Chainlink CCIP Demo</span>
          </h3>
          <p className="text-sm text-muted-foreground">
            Simulate cross-chain token transfers using Chainlink's Cross-Chain Interoperability Protocol
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* From Chain */}
          <div className="space-y-2">
            <Label>From Chain</Label>
            <Select value={fromChain} onValueChange={setFromChain}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {chains.map((chain) => (
                  <SelectItem key={chain.id} value={chain.id}>
                    <div className="flex items-center space-x-2">
                      <span>{chain.icon}</span>
                      <span>{chain.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* To Chain */}
          <div className="space-y-2">
            <Label>To Chain</Label>
            <Select value={toChain} onValueChange={setToChain}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {chains.filter(chain => chain.id !== fromChain).map((chain) => (
                  <SelectItem key={chain.id} value={chain.id}>
                    <div className="flex items-center space-x-2">
                      <span>{chain.icon}</span>
                      <span>{chain.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Transfer Visualization */}
        <div className="flex items-center justify-center space-x-4 py-4">
          <div className="flex items-center space-x-2">
            <div className="text-2xl">
              {chains.find(c => c.id === fromChain)?.icon}
            </div>
            <Badge variant="outline">
              {chains.find(c => c.id === fromChain)?.name}
            </Badge>
          </div>
          <ArrowRight className="h-6 w-6 text-primary animate-pulse" />
          <div className="flex items-center space-x-2">
            <div className="text-2xl">
              {chains.find(c => c.id === toChain)?.icon}
            </div>
            <Badge variant="outline">
              {chains.find(c => c.id === toChain)?.name}
            </Badge>
          </div>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <Label>Amount (USDC)</Label>
          <Input
            type="number"
            placeholder="Enter amount to transfer"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isSimulating}
          />
        </div>

        {/* Simulation Steps */}
        {isSimulating && (
          <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold text-sm">Transfer Progress</h4>
            {steps.map((step, index) => {
              const status = getStepStatus(index);
              const StepIcon = step.icon;
              
              return (
                <div key={index} className="flex items-center space-x-3">
                  <div className={cn(
                    "p-2 rounded-full",
                    status === "completed" && "bg-accent text-accent-foreground",
                    status === "active" && "bg-primary text-primary-foreground animate-pulse",
                    status === "pending" && "bg-muted"
                  )}>
                    <StepIcon className="h-4 w-4" />
                  </div>
                  <span className={cn(
                    "text-sm",
                    status === "completed" && "text-accent",
                    status === "active" && "text-primary font-semibold",
                    status === "pending" && "text-muted-foreground"
                  )}>
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        <Button
          onClick={simulateTransfer}
          disabled={!amount || isSimulating || fromChain === toChain}
          className="w-full glow"
        >
          {isSimulating ? "Simulating Transfer..." : "Simulate Cross-Chain Transfer"}
        </Button>

        <div className="p-3 bg-primary/10 rounded-md border border-primary/20">
          <p className="text-sm text-primary">
            ⚡ <strong>Chainlink CCIP:</strong> This demo simulates cross-chain messaging and token transfers using Chainlink's infrastructure
          </p>
        </div>
      </div>
    </Card>
  );
};