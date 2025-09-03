import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Renders the navigation bar for the application.
 * It includes the brand name and a language switcher component.
 * The navbar is fixed at the top of the viewport.
 *
 * @returns {JSX.Element} The rendered navigation bar.
 */
export default function Navbar() {
  const { t } = useTranslation();
  const { isAdmin } = useAdmin();
  
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-primary">
          {t('brandName')}
        </div>
        <div className="flex items-center gap-4">
          {isAdmin && (
            <Link to="/admin">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Admin
              </Button>
            </Link>
          )}
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}