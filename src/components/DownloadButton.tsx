import { Button } from "@/components/ui/button";
import { Download, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "sonner";
import { useCourseMaterials } from "@/hooks/useCourseMaterials";

interface DownloadButtonProps {
  variant?: "default" | "outline";
  className?: string;
  children?: React.ReactNode;
  signInText?: string;
  downloadText?: string;
  materialId?: string;
  materialCategory?: string;
  courseDay?: number;
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
  downloadText = "Access Dashboard",
  materialId,
  materialCategory,
  courseDay
}: DownloadButtonProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { downloadMaterial, getMaterialByDay, getCourseGuide } = useCourseMaterials();

  const handleClick = async () => {
    setIsLoading(true);
    
    if (!user) {
      toast.info("Please sign in to download course materials");
      await new Promise(resolve => setTimeout(resolve, 500));
      navigate('/auth?redirectTo=dashboard');
    } else {
      // If we have specific material info, try to download it
      if (materialId) {
        await downloadMaterial(materialId);
      } else if (courseDay) {
        const material = getMaterialByDay(courseDay);
        if (material) {
          await downloadMaterial(material.id);
        } else {
          toast.error('Material not found for this day');
        }
      } else if (materialCategory === 'course_guide') {
        const guide = getCourseGuide();
        if (guide) {
          await downloadMaterial(guide.id);
        } else {
          toast.error('Course guide not found');
        }
      } else {
        // Default: navigate to dashboard
        await new Promise(resolve => setTimeout(resolve, 300));
        navigate('/dashboard');
      }
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