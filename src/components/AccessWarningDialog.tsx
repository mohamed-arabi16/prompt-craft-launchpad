import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Dialog component that shows access warning to users who signed in but don't have course access
 */
const AccessWarningDialog = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if we should show the access warning
    const shouldShow = localStorage.getItem('show_access_warning');
    if (shouldShow === 'true') {
      setOpen(true);
      localStorage.removeItem('show_access_warning');
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-warning">
            <AlertCircle className="h-5 w-5" />
            Course Access Required
          </DialogTitle>
          <DialogDescription className="text-left pt-2">
            You have successfully signed in, but you need to complete the payment and enroll in the course to have access to the materials.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-4">
          <Button asChild className="w-full">
            <Link to="/enrollment">
              Complete Enrollment
            </Link>
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)} className="w-full">
            Continue Browsing
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccessWarningDialog;