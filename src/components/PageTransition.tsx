import { useEffect, useState } from 'react';
import { Brain, Zap, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageTransitionProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const PageTransition = ({ isLoading, children }: PageTransitionProps) => {
  const [showContent, setShowContent] = useState(!isLoading);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setShowContent(false);
      setAnimationStep(0);
      
      // Cycle through animation steps
      const timer1 = setTimeout(() => setAnimationStep(1), 200);
      const timer2 = setTimeout(() => setAnimationStep(2), 400);
      const timer3 = setTimeout(() => setAnimationStep(0), 600);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      // Delay showing content to ensure smooth transition
      const timer = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
        <div className="text-center">
          {/* AI-themed loading animation */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className={cn(
              "transition-all duration-300",
              animationStep === 0 ? "scale-125 text-primary" : "scale-100 text-muted-foreground"
            )}>
              <Brain className="h-8 w-8" />
            </div>
            <div className={cn(
              "transition-all duration-300",
              animationStep === 1 ? "scale-125 text-primary" : "scale-100 text-muted-foreground"
            )}>
              <Zap className="h-8 w-8" />
            </div>
            <div className={cn(
              "transition-all duration-300", 
              animationStep === 2 ? "scale-125 text-primary" : "scale-100 text-muted-foreground"
            )}>
              <Target className="h-8 w-8" />
            </div>
          </div>
          
          {/* Loading text */}
          <div className="text-foreground font-medium">
            Loading AI Course Platform...
          </div>
          
          {/* Progress dots */}
          <div className="flex justify-center gap-1 mt-4">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-300",
                  animationStep === index ? "bg-primary scale-125" : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "transition-all duration-500",
      showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      {children}
    </div>
  );
};

export default PageTransition;