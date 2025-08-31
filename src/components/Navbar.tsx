import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";

export default function Navbar() {
  const { t } = useTranslation();
  
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-primary">
          {t('brandName')}
        </div>
        <LanguageSwitcher />
      </div>
    </nav>
  );
}