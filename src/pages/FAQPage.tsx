import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect } from "react";

/**
 * Dedicated FAQ page with full SEO optimization
 */
const FAQPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('faqTitle')} | ${t('brandName')}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('faqSubtitle'));
    }
  }, [t]);

  return (
    <main className="min-h-screen pt-20" role="main">
      <Navbar />
      <FAQ />
      <Footer />
    </main>
  );
};

export default FAQPage;
