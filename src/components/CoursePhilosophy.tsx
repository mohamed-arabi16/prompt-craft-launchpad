import { useTranslation } from "@/hooks/useTranslation";
import { SectionReveal } from "./premium";

/**
 * Renders the course philosophy section with the new simplified content.
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

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <SectionReveal>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              {t('philosophyTitle')}
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              {t('philosophySubtitle')}
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

export default CoursePhilosophy;
