import { Brain, MessageSquare, Code2 } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Renders the course philosophy section.
 * This component highlights the three core principles of the course, each with an icon, title, and description.
 *
 * @returns {JSX.Element} The rendered course philosophy section.
 */
const CoursePhilosophy = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {t('philosophyTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {t('philosophySubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300">
              <MessageSquare className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">{t('philosophyFeature1Title')}</h3>
            <p className="text-muted-foreground">{t('philosophyFeature1Description')}</p>
          </div>

          <div className="text-center fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300">
              <Brain className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">{t('philosophyFeature2Title')}</h3>
            <p className="text-muted-foreground">{t('philosophyFeature2Description')}</p>
          </div>

          <div className="text-center fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300">
              <Code2 className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">{t('philosophyFeature3Title')}</h3>
            <p className="text-muted-foreground">{t('philosophyFeature3Description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursePhilosophy;