import { Button } from "@/components/ui/button";
import { ArrowRight, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface DashboardButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  className?: string;
  signInText?: string;
  dashboardText?: string;
}

/**
 * A button component that shows "Sign In" for unauthenticated users
 * and "Access Dashboard" for authenticated users, with proper routing.
 */
const DashboardButton = ({ 
  variant = "outline", 
  className, 
  signInText = "Sign In",
  dashboardText = "Access Dashboard"
}: DashboardButtonProps) => {
  const { user } = useAuth();

  if (user) {
    return (
      <Link to="/dashboard">
        <Button 
          variant={variant}
          className={cn("group", className)}
        >
          <span>{dashboardText}</span>
          <ArrowRight className="ltr:ml-2 rtl:mr-2 h-5 w-5 transition-transform group-hover:ltr:translate-x-1 group-hover:rtl:-translate-x-1" />
        </Button>
      </Link>
    );
  }

  return (
    <Link to="/auth">
      <Button 
        variant={variant}
        className={cn("group", className)}
      >
        <User className="ltr:mr-2 rtl:ml-2 h-5 w-5" />
        <span>{signInText}</span>
      </Button>
    </Link>
  );
};

export default DashboardButton;