import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

const Terms = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('termsTitle')}
          </h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="bg-card rounded-lg p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using our AI Prompt Engineering Course platform, you accept and agree 
                to be bound by the terms and provision of this agreement. If you do not agree to abide 
                by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Course Access and Usage</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Course content is for personal, non-commercial use only</li>
                <li>You may not share, distribute, or resell course materials</li>
                <li>Access to course content is provided for the lifetime of the platform</li>
                <li>We reserve the right to update or modify course content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">User Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed">
                You are responsible for maintaining the confidentiality of your account information 
                and for all activities that occur under your account. You agree to notify us immediately 
                of any unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All course content, including but not limited to text, graphics, videos, and software, 
                is the property of AI Prompt Engineering Course and is protected by copyright and other 
                intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Refund Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We offer a 30-day money-back guarantee. If you are not satisfied with the course within 
                30 days of purchase, you may request a full refund. Refunds will be processed within 
                5-7 business days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall AI Prompt Engineering Course be liable for any indirect, incidental, 
                special, consequential, or punitive damages, including without limitation, loss of profits, 
                data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-foreground">Email: legal@aipromptcourse.com</p>
                <p className="text-foreground">Phone: +1 (555) 123-4567</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;