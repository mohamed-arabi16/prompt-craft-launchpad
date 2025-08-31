import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  return (
    <Button
      variant="outline"
      size="sm"
      data-language-switcher
      className="flex items-center gap-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
    >
      <Globe className="h-4 w-4" />
      <span data-i18n="languageSwitcher">English</span>
    </Button>
  );
}