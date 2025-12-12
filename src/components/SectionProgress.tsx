import { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface Section {
  id: string;
  labelKey: string;
}

const sections: Section[] = [
  { id: "hero", labelKey: "navHome" },
  { id: "course-philosophy", labelKey: "navCourse" },
  { id: "course-curriculum", labelKey: "navCurriculum" },
  { id: "course-benefits", labelKey: "navBenefits" },
  { id: "testimonials", labelKey: "navTestimonials" },
  { id: "enrollment-cta", labelKey: "navEnroll" },
];

/**
 * Sticky section progress indicator with clickable dots
 */
const SectionProgress = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id || "hero");
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-20% 0px -60% 0px",
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="fixed ltr:left-6 rtl:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
      aria-label="Section navigation"
    >
      {sections.map(({ id, labelKey }) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className="group relative flex items-center"
          aria-label={t(labelKey) || labelKey}
          aria-current={activeSection === id ? "true" : undefined}
        >
          <span
            className={`h-3 w-3 rounded-full border-2 transition-all duration-300 ${
              activeSection === id
                ? "bg-primary border-primary scale-125"
                : "bg-transparent border-muted-foreground/50 hover:border-primary"
            }`}
          />
          <span
            className={`absolute ltr:left-6 rtl:right-6 px-2 py-1 text-sm rounded bg-card border border-border shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none ${
              activeSection === id ? "text-primary" : "text-foreground"
            }`}
          >
            {t(labelKey) || labelKey}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default SectionProgress;
