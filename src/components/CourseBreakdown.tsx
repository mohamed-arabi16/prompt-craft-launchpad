import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown, Clock, BookOpen, Zap, Search, Palette, Rocket, Package } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import DownloadButton from "./DownloadButton";
import { SectionReveal, GlassCard } from "./premium";
import { accordionAnimation, iconRotate } from "@/lib/animations";

/**
 * Course breakdown section with 5-day program and daily deliverables
 */
const CourseBreakdown = () => {
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const { t, tArray } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  const dayIcons = [BookOpen, Zap, Search, Palette, Rocket];

  return (
    <section id="course-curriculum" className="py-12 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <SectionReveal>
          <div className="text-center mb-10">
            <motion.span
              className="inline-block px-4 py-1.5 mb-3 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              {t('courseBreakdownBadge')}
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('courseTitle')}
            </h2>
          </div>
        </SectionReveal>

        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => {
            const day = index + 1;
            const isExpanded = expandedDay === day;
            const DayIcon = dayIcons[index % dayIcons.length];
            const deliverable = t(`day${day}Deliverable`);

            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard
                  variant="subtle"
                  interactive={false}
                  glow={isExpanded}
                  className={`overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'border-primary/40' : 'border-border/50'
                  }`}
                >
                  <motion.div
                    className="p-4 sm:p-5 cursor-pointer flex items-center justify-between hover:bg-muted/30 transition-colors rounded-t-2xl"
                    onClick={() => toggleDay(day)}
                    whileHover={prefersReducedMotion ? {} : { x: 4 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.99 }}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <motion.div
                        className={`flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-primary-foreground font-bold text-base sm:text-lg transition-all duration-300 ${
                          isExpanded
                            ? 'bg-gradient-to-br from-primary to-cyan shadow-lg shadow-primary/30'
                            : 'bg-primary/80'
                        }`}
                        animate={isExpanded && !prefersReducedMotion ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {day}
                      </motion.div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-0.5 truncate">
                          {t(`day${day}Title`)}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">
                          {t(`day${day}Description`)}
                        </p>
                        {/* Daily Deliverable - shown in header */}
                        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-primary">
                          <Package className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{deliverable}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 ms-2">
                      <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted/50 text-xs text-muted-foreground">
                        <DayIcon className="h-3.5 w-3.5" />
                        <span>{t(`day${day}Badge`)}</span>
                      </div>
                      <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{t(`day${day}Duration`)}</span>
                      </div>
                      <motion.div
                        variants={iconRotate}
                        animate={isExpanded ? 'expanded' : 'collapsed'}
                      >
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      </motion.div>
                    </div>
                  </motion.div>

                  <AnimatePresence mode="wait">
                    {isExpanded && (
                      <motion.div
                        variants={prefersReducedMotion ? {} : accordionAnimation}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-5 pb-5 border-t border-border/50">
                          <div className="grid md:grid-cols-2 gap-6 mt-5">
                            {/* Main Topics */}
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <div className="p-1.5 rounded-lg bg-primary/10">
                                  <BookOpen className="h-4 w-4 text-primary" />
                                </div>
                                <h4 className="font-semibold text-foreground text-sm">
                                  {t('mainTopicsLabel')}
                                </h4>
                              </div>
                              <ul className="space-y-2">
                                {tArray(`day${day}Topics`).map((topic, idx) => (
                                  <motion.li
                                    key={idx}
                                    className="flex items-start gap-2"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + idx * 0.05 }}
                                  >
                                    <div className="h-1.5 w-1.5 bg-gradient-to-r from-primary to-cyan rounded-full mt-2 flex-shrink-0" />
                                    <span className="text-muted-foreground text-sm">{topic}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>

                            {/* Techniques */}
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <div className="p-1.5 rounded-lg bg-cyan/10">
                                  <Zap className="h-4 w-4 text-cyan" />
                                </div>
                                <h4 className="font-semibold text-foreground text-sm">
                                  {t('techniquesLabel')}
                                </h4>
                              </div>
                              <ul className="space-y-2">
                                {tArray(`day${day}Techniques`).map((technique, idx) => (
                                  <motion.li
                                    key={idx}
                                    className="flex items-start gap-2"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.15 + idx * 0.05 }}
                                  >
                                    <div className="h-1.5 w-1.5 bg-gradient-to-r from-cyan to-primary rounded-full mt-2 flex-shrink-0" />
                                    <span className="text-muted-foreground text-sm">{technique}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <motion.div
                            className="mt-5 pt-4 border-t border-border/50"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <DownloadButton
                              variant="outline"
                              className="group hover:bg-primary/10 hover:border-primary transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10"
                              courseDay={day}
                              signInText={t('downloadDayLabel')}
                              downloadText={t('downloadDayLabel')}
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CourseBreakdown;
