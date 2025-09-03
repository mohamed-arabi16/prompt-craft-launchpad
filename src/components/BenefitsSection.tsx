import { Brain, Zap, Target, Trophy, Users, Rocket, LucideIcon } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const benefitIcons: LucideIcon[] = [Brain, Zap, Target, Trophy, Users, Rocket];

/**
 * Renders the benefits section of the homepage.
 * This component displays a grid of benefits, each with an icon, title, and description.
 *
 * @returns {JSX.Element} The rendered benefits section.
 */
const BenefitsSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('benefitsTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('benefitsSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitIcons.map((IconComponent, index) => {
            const num = index + 1;
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
                  {t(`benefit${num}Title`)}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {t(`benefit${num}Description`)}
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
