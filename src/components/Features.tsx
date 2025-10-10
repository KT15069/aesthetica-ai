import { Wand2, Image, Download, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Wand2,
    title: "AI-Powered Generation",
    description: "Describe your vision in natural language and watch as professional-grade visuals come to life instantly.",
    gradient: "from-primary to-primary-glow",
  },
  {
    icon: Image,
    title: "Visual Moodboards",
    description: "Organize and arrange your generated assets in an intuitive drag-and-drop workspace for cohesive campaigns.",
    gradient: "from-secondary to-accent",
  },
  {
    icon: Download,
    title: "Transparent Prompts",
    description: "Get the exact AI prompts used for every generation, allowing you to refine and reuse in other tools.",
    gradient: "from-accent to-secondary",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate images and videos in seconds. No more waiting days for agency photoshoots and revisions.",
    gradient: "from-primary-glow to-primary",
  },
];

const Features = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to Create
            <br />
            <span className="gradient-text">Professional Campaigns</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed for brands, creators, and marketing teams
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 bg-card border-border hover:border-primary/50 transition-smooth group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 glow-primary`}>
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-smooth">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
