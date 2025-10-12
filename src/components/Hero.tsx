import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 parallax-container"
    >
      {/* Animated gradient background with parallax */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 bg-gradient-hero parallax-bg"
      >
        <div className="absolute inset-0 opacity-30">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-glow-pulse"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-glow-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-6xl mx-auto text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-card border border-primary/20 glow-primary"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">AI Creative Studio</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
        >
          Create Stunning
          <br />
          <span className="gradient-text">Brand Campaigns</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Generate professional photoshoots and campaign visuals with AI.
          No agencies, no expensive shoots—just powerful creative tools at your fingertips.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-primary hover:opacity-90 glow-primary transition-smooth group"
            >
              Start Creating Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/10 transition-smooth"
            >
              View Examples
            </Button>
          </motion.div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 flex items-center justify-center gap-8 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
            <span>2-Week Free Trial</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full bg-secondary animate-glow-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <span>No Credit Card Required</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
