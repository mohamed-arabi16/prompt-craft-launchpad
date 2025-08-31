
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

const Index = () => {
  const { t } = useTranslation();
  // SEO and animations setup
  useEffect(() => {
    // Update meta tags based on current language
    const updateMetaTags = () => {
      const currentLang = localStorage.getItem('language') || 'ar';
      const isArabic = currentLang === 'ar';
      
      if (window.translations) {
        document.title = window.translations.metaTitle || (isArabic 
          ? "دورة هندسة أوامر الذكاء الاصطناعي - 5 أيام | AI Prompt Engineering Course"
          : "5-Day AI Prompt Engineering Course | Master AI Across Text, Images & Code");
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', window.translations.metaDescription || (isArabic 
            ? 'تعلم هندسة أوامر الذكاء الاصطناعي المتقدمة في 5 أيام. حوّل مسيرتك المهنية مع التدريب المتخصص'
            : 'Learn advanced AI prompt engineering in 5 days. Transform from simple prompting to strategic problem formulation'));
        }

        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
          metaKeywords.setAttribute('content', window.translations.metaKeywords || (isArabic 
            ? 'هندسة أوامر الذكاء الاصطناعي, دورة الذكاء الاصطناعي, تحسين الأوامر, تدريب الذكاء الاصطناعي'
            : 'AI prompt engineering, artificial intelligence course, prompt optimization, ChatGPT training'));
        }

        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
          ogTitle.setAttribute('content', window.translations.metaOgTitle || window.translations.metaTitle);
        }

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
          ogDescription.setAttribute('content', window.translations.metaOgDescription || window.translations.metaDescription);
        }

        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle) {
          twitterTitle.setAttribute('content', window.translations.metaTwitterTitle || window.translations.metaTitle);
        }

        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        if (twitterDescription) {
          twitterDescription.setAttribute('content', window.translations.metaTwitterDescription || window.translations.metaDescription);
        }
      }
    };

    const updateStructuredData = () => {
      // Remove existing structured data script if present
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }

      if (window.translations) {
        const structuredData = {
          "@context": "https://schema.org",
          "@type": "Course",
          "name": window.translations.structuredDataName,
          "description": window.translations.structuredDataDescription,
          "provider": {
            "@type": "Organization",
            "name": window.translations.structuredDataProviderName,
            "url": "https://aipromptacademy.com",
            "logo": "https://aipromptacademy.com/logo.png"
          },
          "courseCode": "AIPE-101",
          "educationalLevel": "Intermediate",
          "teaches": window.translations.structuredDataTeaches,
          "timeRequired": "P5D",
          "totalTime": "PT14H",
          "coursePrerequisites": window.translations.structuredDataPrerequisites,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "1247",
            "bestRating": "5"
          },
          "offers": {
            "@type": "Offer",
            "price": "497",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "priceValidUntil": "2024-12-31",
            "url": "https://aipromptacademy.com/enroll"
          },
          "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": "online",
            "instructor": {
              "@type": "Person",
              "name": window.translations.structuredDataInstructorName
            }
          }
        };

        // Add structured data script to head
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
      }
    };

    const handleLanguageChange = () => {
      updateMetaTags();
      updateStructuredData();
    };

    handleLanguageChange(); // Initial call
    window.addEventListener('languageChanged', handleLanguageChange);

    // Intersection Observer for fade-in animations
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      window.removeEventListener('languageChanged', updateMetaTags);
      // Clean up structured data script on unmount
      const script = document.querySelector('script[type="application/ld+json"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

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
