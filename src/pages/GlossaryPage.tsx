import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Glossary from "@/components/Glossary";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect } from "react";

/**
 * Dedicated Glossary page with full SEO optimization
 */
const GlossaryPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('glossaryTitle')} | ${t('brandName')}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('glossarySubtitle'));
    }
  }, [t]);

  return (
    <main className="min-h-screen pt-20" role="main">
      <Navbar />
      <Glossary />
      <Footer />
    </main>
  );
};

export default GlossaryPage;
