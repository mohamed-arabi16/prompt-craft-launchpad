
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CoursePhilosophy from "@/components/CoursePhilosophy";
import CourseBreakdown from "@/components/CourseBreakdown";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * The main landing page of the application.
 * It is composed of several sections, including a hero section, course philosophy, course breakdown, benefits, testimonials, and a call-to-action.
 * It also handles SEO-related tasks like updating meta tags and structured data.
 *
 * @returns {JSX.Element} The rendered index page.
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

    // Update structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) existingScript.remove();

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": t('structuredDataName'),
      "description": t('structuredDataDescription'),
      "provider": {
        "@type": "Organization",
        "name": t('structuredDataProviderName'),
        "url": "https://aipromptacademy.com",
        "logo": "https://aipromptacademy.com/logo.png"
      },
      "courseCode": "AIPE-101",
      "educationalLevel": "Intermediate",
      "teaches": tArray('structuredDataTeaches'),
      "timeRequired": "P5D",
      "totalTime": "PT14H",
      "coursePrerequisites": t('structuredDataPrerequisites'),
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "1247",
        "bestRating": "5"
      },
      "offers": {
        "@type": "Offer",
        "price": "399",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2025-12-31",
        "url": "https://aipromptacademy.com/enroll"
      },
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "online",
        "instructor": {
          "@type": "Person",
          "name": t('structuredDataInstructorName')
        }
      }
    };
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
    <div className="min-h-screen pt-20">
      <Navbar />
      <HeroSection />
      <CoursePhilosophy />
      <CourseBreakdown />
      <BenefitsSection />
      <TestimonialsSection />
      <CTASection />
      
      <Footer />
    </div>
  );
};

export default Index;
