import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function LanguageSwitcher() {
  const { currentLanguage, isLoading, toggleLanguage } = useTranslation();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      disabled={isLoading}
      className="flex items-center gap-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
    >
      <Globe className="h-4 w-4" />
      <span>{currentLanguage === 'en' ? 'العربية' : 'English'}</span>
    </Button>
  );
}