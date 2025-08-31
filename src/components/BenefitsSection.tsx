
import { Brain, Zap, Target, Trophy, Users, Rocket } from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "Master AI Reasoning",
    description: "Learn to craft prompts that unlock sophisticated reasoning capabilities in AI models"
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "See immediate improvements in AI output quality from day one of the course"
  },
  {
    icon: Target,
    title: "Precision Prompting",
    description: "Develop the skills to get exactly the output you need, every time"
  },
  {
    icon: Trophy,
    title: "Industry Recognition",
    description: "Gain credentials that are valued by leading tech companies worldwide"
  },
  {
    icon: Users,
    title: "Expert Community",
    description: "Join a network of AI professionals and continue learning together"
  },
  {
    icon: Rocket,
    title: "Career Acceleration",
    description: "Open new opportunities in the rapidly growing AI and tech industry"
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Our Course?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your career with cutting-edge AI prompt engineering skills that top companies demand
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
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-ai rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
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
