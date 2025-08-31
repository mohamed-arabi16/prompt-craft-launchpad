
import { Brain, Zap, Target, Trophy, Users, Rocket } from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "Master Text, Image, and Code Generation",
    description: "Learn to create content, visuals, and applications across three powerful AI platforms in one comprehensive course."
  },
  {
    icon: Zap,
    title: "Move Beyond Simple Prompts to Strategic Design",
    description: "Develop sophisticated problem formulation skills that transform how you collaborate with AI systems."
  },
  {
    icon: Target,
    title: "Build a Portfolio Across Multiple AI Platforms",
    description: "Create impressive projects using ChatGPT, Midjourney, and Lovable to showcase your diverse AI capabilities."
  },
  {
    icon: Trophy,
    title: "Learn the Cognitive Architecture Approach",
    description: "Master the mental frameworks that top AI practitioners use to consistently achieve professional-grade results."
  },
  {
    icon: Users,
    title: "From User to AI Creative Director",
    description: "Transition from basic AI usage to directing AI as your creative partner, co-engineer, and problem-solving ally."
  },
  {
    icon: Rocket,
    title: "Future-Proof Your Career",
    description: "Gain expertise in the three most important AI tools for content creation, design, and development in today's market."
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-i18n="benefitsTitle">
            Why This Course?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-i18n="benefitsSubtitle">
            Master three distinct AI platforms with one comprehensive methodology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div 
                key={index}
                className="course-card fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-8 w-8 text-primary-foreground" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
