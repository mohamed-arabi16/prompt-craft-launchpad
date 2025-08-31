
import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
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
          entry.target.classList.add('animate-fade-in');
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
    <div className="min-h-screen">
      {/* SEO: H1 tag is in HeroSection component */}
      <HeroSection />
      
      {/* SEO: H2 tags are in each section component for proper heading hierarchy */}
      <CourseBreakdown />
      <BenefitsSection />
      <TestimonialsSection />
      <CTASection />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">AI Prompt Academy</h3>
              <p className="text-gray-400">
                Empowering professionals with cutting-edge AI skills for the future of work.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Course</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#syllabus" className="hover:text-white transition-colors">Syllabus</a></li>
                <li><a href="#instructors" className="hover:text-white transition-colors">Instructors</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#help" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#community" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#refund" className="hover:text-white transition-colors">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AI Prompt Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
