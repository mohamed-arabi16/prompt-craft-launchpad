import { Button } from "@/components/ui/button";
import { Download, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "sonner";

interface DownloadButtonProps {
  variant?: "default" | "outline";
  className?: string;
  children?: React.ReactNode;
  signInText?: string;
  downloadText?: string;
}

/**
 * A reusable download button component that handles authentication flow.
 * Shows different states based on user authentication status.
 */
const DownloadButton = ({ 
  variant = "outline", 
  className = "", 
  children,
  signInText = "Sign in to Download",
  downloadText = "Access Dashboard"
}: DownloadButtonProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    
    if (!user) {
      toast.info("Please sign in to download course materials");
      await new Promise(resolve => setTimeout(resolve, 500)); // Small delay for UX
      navigate('/auth?redirectTo=dashboard');
    } else {
      await new Promise(resolve => setTimeout(resolve, 300)); // Small delay for UX
      navigate('/dashboard');
    }
    
    setIsLoading(false);
  };

  return (
    <Button 
      variant={variant}
      className={`${className} transition-all duration-200 hover:scale-105`}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <LoadingSpinner size="sm" className="ltr:mr-2 rtl:ml-2" />
      ) : user ? (
        <Download className="ltr:mr-2 rtl:ml-2 h-5 w-5" />
      ) : (
        <LogIn className="ltr:mr-2 rtl:ml-2 h-5 w-5" />
      )}
      <span>
        {children || (user ? downloadText : signInText)}
      </span>
    </Button>
  );
};

export default DownloadButton;