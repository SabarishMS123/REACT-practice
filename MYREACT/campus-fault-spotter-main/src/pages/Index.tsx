import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, Zap, BarChart } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-primary to-primary-light shadow-elegant">
            <Shield className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Campus Infrastructure
          </h1>
          <h2 className="text-3xl font-semibold mb-6 text-foreground">Fault Reporting System</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Report campus infrastructure issues quickly and efficiently with AI-powered analysis
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          <div className="p-6 rounded-xl bg-card shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Quick Reporting</h3>
            <p className="text-muted-foreground">
              Submit infrastructure issues with photos in seconds using our mobile-friendly interface
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-secondary/10">
              <CheckCircle className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
            <p className="text-muted-foreground">
              Automatic issue severity assessment and priority classification powered by AI
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-accent/10">
              <BarChart className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
            <p className="text-muted-foreground">
              Real-time status updates and comprehensive reporting for administrators
            </p>
          </div>
        </div>

        <div className="text-center space-y-4 animate-fade-in">
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="text-lg px-8 py-6 shadow-elegant hover:shadow-lg transition-all"
          >
            Get Started
          </Button>
          <p className="text-sm text-muted-foreground">
            Sign in to report issues or manage complaints
          </p>
        </div>

        <div className="mt-20 p-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-center">How It Works</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-primary">For Reporters</h4>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li>1. Sign up or log in to your account</li>
                <li>2. Take a photo of the infrastructure issue</li>
                <li>3. Fill in details and submit the report</li>
                <li>4. Track the status of your complaint</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-secondary">For Accounters</h4>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li>1. View all submitted complaints in one dashboard</li>
                <li>2. Review AI analysis and prioritization</li>
                <li>3. Update complaint status as work progresses</li>
                <li>4. Download detailed PDF reports</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
