import { Brain, MessageSquare, Code2 } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const CoursePhilosophy = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto px-6">
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