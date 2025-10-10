import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Layout, Download, Share2 } from "lucide-react";

const Workspace = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your Creative
            <br />
            <span className="gradient-text">Command Center</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Intuitive moodboard workspace for organizing and refining your visual campaigns
          </p>
        </div>

        {/* Mock workspace interface */}
        <Card className="p-6 bg-card border-border animate-fade-in">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Button size="sm" className="bg-gradient-primary glow-primary">
                <Plus className="w-4 h-4 mr-2" />
                New Generation
              </Button>
              <Button size="sm" variant="outline">
                <Layout className="w-4 h-4 mr-2" />
                Templates
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost">
                <Download className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Canvas area */}
          <div className="bg-muted/30 rounded-lg border-2 border-dashed border-border min-h-[500px] flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="inline-flex p-4 rounded-full bg-card border border-primary/20 mb-4 glow-primary">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Start Your First Project</h3>
              <p className="text-muted-foreground mb-6">
                Upload product images or describe your campaign vision to generate stunning visuals
              </p>
              <Button className="bg-gradient-primary glow-primary">
                Create Your First Campaign
              </Button>
            </div>
          </div>

          {/* Asset library preview */}
          <div className="mt-6 grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-muted/50 border border-border hover:border-primary/50 transition-smooth cursor-pointer"
              />
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

const Sparkles = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export default Workspace;
