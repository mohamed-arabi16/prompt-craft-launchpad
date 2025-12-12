import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CoursePhilosophy from "@/components/CoursePhilosophy";
import TargetAudienceSection from "@/components/TargetAudienceSection";
import CourseBreakdown from "@/components/CourseBreakdown";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import SectionProgress from "@/components/SectionProgress";
import { useTranslation } from "@/hooks/useTranslation";
import { pageTransition } from "@/lib/animations";

/**
 * The main landing page of the application.
 */
const Index = () => {
  const { t, tArray } = useTranslation();

  useEffect(() => {
    // Update meta tags
    document.title = t('metaTitle');
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', t('metaDescription'));

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) metaKeywords.setAttribute('content', t('metaKeywords'));

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', t('metaOgTitle') || t('metaTitle'));

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', t('metaOgDescription') || t('metaDescription'));

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', t('metaTwitterTitle') || t('metaTitle'));

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', t('metaTwitterDescription') || t('metaDescription'));

    // Update enhanced structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) existingScript.remove();

    const teaches = tArray('structuredDataTeaches');
    const structuredData = [
      {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": t('structuredDataName'),
        "description": t('structuredDataDescription'),
        "provider": {
          "@type": "Organization",
          "name": t('structuredDataProviderName'),
          "url": "https://qobouli.com",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "availableLanguage": ["Arabic", "English"]
          }
        },
        "courseCode": "AI-INTENSIVE-5D",
        "educationalLevel": "Beginner to Intermediate",
        "teaches": teaches.length > 0 ? teaches : ["AI Prompt Engineering"],
        "timeRequired": "P5D",
        "totalTime": "PT20H",
        "coursePrerequisites": t('structuredDataPrerequisites'),
        "learningResourceType": "Course",
        "educationalUse": "instruction",
        "audience": {
          "@type": "EducationalAudience",
          "educationalRole": "student",
          "audienceType": "professionals, students, content creators"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "500",
          "bestRating": "5"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": t('brandName'),
        "url": "https://qobouli.com",
        "description": t('metaDescription'),
        "inLanguage": ["ar", "en"]
      }
    ];
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [t, tArray]);

  return (
    <motion.main
      className="min-h-screen pt-20"
      role="main"
      aria-label="AI Course Landing Page"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Navbar />
      <SectionProgress />

      <section aria-label="Hero Section" id="hero">
        <HeroSection />
      </section>

      <section aria-label="Course Philosophy" id="course-philosophy">
        <CoursePhilosophy />
      </section>

      <section aria-label="Target Audience" id="target-audience-section">
        <TargetAudienceSection />
      </section>

      <section aria-label="Course Curriculum" id="course-curriculum-section">
        <CourseBreakdown />
      </section>

      <section aria-label="Course Benefits" id="course-benefits">
        <BenefitsSection />
      </section>

      <section aria-label="Participant Testimonials" id="testimonials-section">
        <TestimonialsSection />
      </section>

      <section aria-label="Enrollment Call to Action" id="enrollment-cta">
        <CTASection />
      </section>

      <Footer />
      <BackToTop />
    </motion.main>
  );
};

export default Index;
