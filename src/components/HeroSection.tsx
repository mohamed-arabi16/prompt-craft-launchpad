
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Brain, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 hero-gradient opacity-90"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-bounce">
        <Sparkles className="h-8 w-8 text-white/30" />
      </div>
      <div className="absolute bottom-40 right-16 animate-pulse">
        <Brain className="h-12 w-12 text-white/20" />
      </div>
      <div className="absolute top-1/3 right-10 animate-bounce delay-700">
        <Zap className="h-6 w-6 text-white/25" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 fade-in-up">
        <div className="mb-6 fade-in-up-delay-1">
          <span className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20">
            <Sparkles className="h-4 w-4 mr-2" />
            5-Day Intensive Program
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight fade-in-up-delay-2">
          Master AI Prompt
          <br />
          <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
            Engineering
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed fade-in-up-delay-3">
          Transform your AI interactions with advanced prompting techniques. 
          Learn from industry experts and unlock the full potential of AI tools in just 5 days.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 fade-in-up-delay-3">
          <Button className="btn-ai-primary group">
            Start Learning Today
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" className="btn-ai-secondary">
            View Course Outline
          </Button>
        </div>
        
        <div className="flex items-center justify-center gap-8 text-white/80 text-sm fade-in-up-delay-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-400 rounded-full"></div>
            <span>5 Interactive Days</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
            <span>Expert Instruction</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-purple-400 rounded-full"></div>
            <span>Practical Projects</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
