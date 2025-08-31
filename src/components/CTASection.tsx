
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Clock } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start Your AI Journey Today
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Don't wait - the AI revolution is happening now. Secure your spot in our next cohort and transform your career in just 5 days.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12 fade-in-up-delay-1">
          <div className="flex items-center gap-3 justify-center">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <span className="text-white">5-Day Intensive Program</span>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <span className="text-white">Expert Instruction</span>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <span className="text-white">Lifetime Access</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 fade-in-up-delay-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">Limited Time Offer</span>
          </div>
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-white mb-2">$497</div>
            <div className="text-white/70">Usually $997 - Save 50%</div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-ai-primary group text-lg px-8 py-4">
              Enroll Now - Start Learning
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4">
              Download Syllabus
            </Button>
          </div>
        </div>

        <p className="text-white/70 text-sm fade-in-up-delay-3">
          30-day money-back guarantee • Instant access • Join 10,000+ satisfied students
        </p>
      </div>
    </section>
  );
};

export default CTASection;
