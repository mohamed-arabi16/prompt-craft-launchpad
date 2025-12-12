import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CoursePhilosophy from "@/components/CoursePhilosophy";
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

    // Update enhanced structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) existingScript.remove();

    const structuredData = [
      {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": t('structuredDataName'),
        "description": t('structuredDataDescription'),
        "provider": {
          "@type": "Organization",
          "name": t('structuredDataProviderName'),
          "url": "https://ai-prompt-academy.lovable.app",
          "logo": "https://ai-prompt-academy.lovable.app/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-555-AI-PROMPT",
            "contactType": "customer service",
            "availableLanguage": ["Arabic", "English"]
          },
          "sameAs": [
            "https://linkedin.com/company/ai-prompt-academy",
            "https://twitter.com/aipromptacademy"
          ]
        },
        "courseCode": "AIPE-101",
        "educationalLevel": "Intermediate",
        "teaches": tArray('structuredDataTeaches'),
        "timeRequired": "P5D",
        "totalTime": "PT14H",
        "coursePrerequisites": t('structuredDataPrerequisites'),
        "learningResourceType": "Course",
        "educationalUse": "instruction",
        "audience": {
          "@type": "EducationalAudience",
          "educationalRole": "student",
          "audienceType": "professional developers, product managers, researchers"
        },
        "competencyRequired": "Basic understanding of AI and technology",
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
          "url": "https://ai-prompt-academy.lovable.app/enrollment",
          "validFrom": "2024-01-01"
        },
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": "online",
          "courseWorkload": "PT2H30M",
          "instructor": {
            "@type": "Person",
            "name": t('structuredDataInstructorName'),
            "jobTitle": "AI Prompt Engineering Expert",
            "worksFor": {
              "@type": "Organization",
              "name": t('structuredDataProviderName')
            }
          }
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "AI Prompt Engineering Academy",
        "url": "https://ai-prompt-academy.lovable.app",
        "description": "Master AI prompt engineering in 5 days with expert-led courses",
        "inLanguage": ["ar", "en"],
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://ai-prompt-academy.lovable.app/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is AI Prompt Engineering?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "AI Prompt Engineering is the practice of crafting effective instructions and queries to get optimal responses from AI systems like ChatGPT, Claude, and other language models."
            }
          },
          {
            "@type": "Question", 
            "name": "Who should take this course?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This course is designed for professionals, developers, product managers, and researchers who want to master AI interaction for professional results."
            }
          },
          {
            "@type": "Question",
            "name": "How long does the course take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The course is designed to be completed in 5 days with approximately 2.5 hours of content per day, totaling 14 hours of comprehensive training."
            }
          }
        ]
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
      aria-label="AI Prompt Engineering Course Landing Page"
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

      <section aria-label="Course Curriculum" id="course-curriculum">
        <CourseBreakdown />
      </section>

      <section aria-label="Course Benefits" id="course-benefits">
        <BenefitsSection />
      </section>

      <section aria-label="Student Testimonials" id="testimonials">
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
