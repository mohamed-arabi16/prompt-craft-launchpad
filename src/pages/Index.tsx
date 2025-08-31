
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CoursePhilosophy from "@/components/CoursePhilosophy";
import CourseBreakdown from "@/components/CourseBreakdown";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";

const Index = () => {
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

    updateMetaTags();
    window.addEventListener('languageChanged', updateMetaTags);

    // Add comprehensive structured data for rich snippets
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "5-Day AI Prompt Engineering Intensive Course",
      "description": "Master advanced AI prompt engineering techniques in just 5 days. Learn from industry experts and transform your career with cutting-edge AI skills.",
      "provider": {
        "@type": "Organization",
        "name": "AI Prompt Academy",
        "url": "https://aipromptacademy.com",
        "logo": "https://aipromptacademy.com/logo.png"
      },
      "courseCode": "AIPE-101",
      "educationalLevel": "Intermediate",
      "teaches": [
        "AI Prompt Engineering",
        "Chain-of-Thought Prompting", 
        "Few-Shot Learning",
        "Prompt Optimization",
        "Advanced AI Techniques",
        "Creative Writing Prompts",
        "Technical Documentation",
        "Data Analysis Prompts",
        "Code Generation"
      ],
      "timeRequired": "P5D",
      "totalTime": "PT14H",
      "coursePrerequisites": "Basic understanding of AI concepts",
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
          "name": "AI Prompt Academy Instructors"
        }
      }
    };

    // Remove existing structured data script if present
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add structured data script to head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

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
      
      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-foreground/80 text-lg font-medium">
            <span data-i18n="footerCopyright">© 2024 AI Academy. All rights reserved.</span>
          </p>
          <div className="mt-6 flex justify-center space-x-8">
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors text-base font-medium">
              <span data-i18n="footerPrivacy">Privacy Policy</span>
            </a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors text-base font-medium">
              <span data-i18n="footerTerms">Terms of Service</span>
            </a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors text-base font-medium">
              <span data-i18n="footerContact">Contact</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
