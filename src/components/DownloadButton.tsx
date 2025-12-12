import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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
 * A reusable download button component for public course guide downloads.
 * Course guide can be downloaded without authentication.
 */
const DownloadButton = ({ 
  variant = "outline", 
  className = "", 
  children,
  signInText = "Download Course Guide",
  downloadText = "Download Course Guide",
  materialCategory
}: DownloadButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    
    try {
      // For course guide, allow public download
      if (materialCategory === 'course_guide') {
        // Fetch the course guide material info
        const { data: material, error: materialError } = await supabase
          .from('course_materials')
          .select('*')
          .eq('category', 'course_guide')
          .eq('is_active', true)
          .single();

        if (materialError || !material) {
          toast.error('Course guide not found');
          setIsLoading(false);
          return;
        }

        // Get public URL or signed URL for course guide
        const { data: signedUrl, error: signedError } = await supabase.storage
          .from('course-materials')
          .createSignedUrl(material.file_path, 3600);

        if (signedError || !signedUrl) {
          toast.error('Failed to generate download link');
          setIsLoading(false);
          return;
        }

        // Trigger download
        const link = document.createElement('a');
        link.href = signedUrl.signedUrl;
        link.download = material.file_name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast.success('Download started!');
      }
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download file');
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
      ) : (
        <Download className="ltr:mr-2 rtl:ml-2 h-5 w-5" />
      )}
      <span>
        {children || downloadText || signInText}
      </span>
    </Button>
  );
};

export default DownloadButton;