import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-hero">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-glow-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center animate-fade-in">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-card border border-primary/20 glow-primary">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">AI Creative Studio</span>
        </div>

        {/* Main headline */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
          Create Stunning
          <br />
          <span className="gradient-text">Brand Campaigns</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          Generate professional photoshoots and campaign visuals with AI.
          No agencies, no expensive shoots—just powerful creative tools at your fingertips.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-gradient-primary hover:opacity-90 glow-primary transition-smooth group"
          >
            Start Creating Free
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/10 transition-smooth"
          >
            View Examples
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
            <span>2-Week Free Trial</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary animate-glow-pulse" style={{ animationDelay: '0.5s' }} />
            <span>No Credit Card Required</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
