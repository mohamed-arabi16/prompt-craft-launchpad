
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
    // Update document title and meta description for SEO
    document.title = "5-Day AI Prompt Engineering Course - Master AI in 5 Days";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Transform your AI skills with our intensive 5-day prompt engineering course. Learn advanced techniques from industry experts. Join 10,000+ students.');
    }

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
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-muted-foreground" data-i18n="footerCopyright">
                © 2024 AI Prompt Academy. All rights reserved.
              </p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-i18n="footerPrivacy">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-i18n="footerTerms">
                Terms & Conditions
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-i18n="footerContact">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
