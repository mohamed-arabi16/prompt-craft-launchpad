
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Download, Calendar, Clock, Target } from "lucide-react";

interface DayContent {
  day: number;
  title: string;
  description: string;
  topics: string[];
  techniques: string[];
  duration: string;
}

const courseData: DayContent[] = [
  {
    day: 1,
    title: "The Foundational Science of Prompting",
    description: "Master the engineering mindset and core components that transform basic prompts into sophisticated communication systems.",
    topics: [
      "The Engineer's Mindset: From Prompts to Communication",
      "Anatomy of a Perfect Prompt",
      "The 6 Core Components (Directive, Role, Context, Format, Constraints, Examples)",
      "Building Systematic Prompt Architecture",
      "Cognitive Load Management in AI Interaction",
      "Establishing Communication Protocols"
    ],
    techniques: [
      "Component-Based Prompt Construction",
      "Systematic Prompt Architecture",
      "Cognitive Framework Development",
      "Communication Protocol Design",
      "Prompt Template Engineering",
      "Foundational Iteration Methods"
    ],
    duration: "2.5 hours"
  },
  {
    day: 2,
    title: "Advanced Reasoning & Human-in-the-Loop Techniques",
    description: "Develop sophisticated dialogue patterns and transparent reasoning systems for complex problem-solving.",
    topics: [
      "The Art of Dialogue and Iteration",
      "Chain-of-Thought (CoT) for Transparent Reasoning",
      "Designing Human-in-the-Loop Approval Flows",
      "Meta-Cognitive Prompting Strategies",
      "Iterative Refinement Protocols",
      "Quality Gate Implementation"
    ],
    techniques: [
      "Multi-Turn Dialogue Management",
      "Transparent Reasoning Chains",
      "Human-AI Collaboration Workflows",
      "Iterative Improvement Cycles",
      "Quality Assessment Frameworks",
      "Approval Flow Design"
    ],
    duration: "3 hours"
  },
  {
    day: 3,
    title: "Mastering Conversational & Creative AI: ChatGPT",
    description: "Leverage ChatGPT's conversational model for productivity and consistent AI persona development.",
    topics: [
      "Leveraging the multi-turn conversational model",
      "Core Productivity Use Cases",
      "Crafting a Consistent AI Persona",
      "Zero-Shot vs. Few-Shot Prompting",
      "Context Window Management",
      "Advanced ChatGPT Techniques"
    ],
    techniques: [
      "Conversational Flow Design",
      "Persona Engineering",
      "Context Optimization",
      "Shot Strategy Selection",
      "Memory Management",
      "Productivity Automation"
    ],
    duration: "2.5 hours"
  },
  {
    day: 4,
    title: "The Generative Artist's Studio: Midjourney",
    description: "Transform visual concepts into precise prompts and master advanced image generation control.",
    topics: [
      "The Cinematographer's Brief: Translating Vision to Words",
      "Mastering Technical Parameters (--ar, --s, --no)",
      "Advanced Control with Image, Style (--sref), and Character (--cref) References",
      "Prompt Weight and Structure Optimization",
      "Style Consistency and Brand Development",
      "Commercial Application Strategies"
    ],
    techniques: [
      "Visual Concept Translation",
      "Parameter Optimization",
      "Reference-Based Generation",
      "Style Control Methods",
      "Brand Consistency Frameworks",
      "Commercial Workflow Design"
    ],
    duration: "3 hours"
  },
  {
    day: 5,
    title: "The AI Co-Engineer: Lovable",
    description: "Build functional applications through collaborative AI engineering and shared cognitive frameworks.",
    topics: [
      "The 'AI Co-Engineer' Workflow: From Idea to Functional App",
      "The 5 Laws of Lovable Prompting (Concise, Logical, Explicit, Adaptive, Reflective)",
      "Building a Shared Cognitive Framework for complex projects",
      "Iterative Development with AI Partners",
      "Code Quality and Architecture Guidance",
      "Project Management with AI Collaboration"
    ],
    techniques: [
      "Collaborative Development Workflows",
      "Systematic Prompt Laws Application",
      "Shared Framework Construction",
      "AI-Human Pair Programming",
      "Architectural Decision Making",
      "Agile AI Collaboration"
    ],
    duration: "3.5 hours"
  }
];

const CourseBreakdown = () => {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-i18n="courseBreakdownTitle">
            Your 5-Day Transformation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-i18n="courseBreakdownSubtitle">
            Master three distinct AI platforms through our proven methodology
          </p>
        </div>

        <div className="space-y-4">
          {courseData.map((dayData) => (
            <div 
              key={dayData.day} 
              className="day-card overflow-hidden fade-in-up"
              style={{ animationDelay: `${dayData.day * 0.1}s` }}
            >
              {/* Day Header - Always Visible */}
                <div 
                className="p-6 cursor-pointer flex items-center justify-between hover:bg-muted/50 transition-colors"
                onClick={() => toggleDay(dayData.day)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {dayData.day}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      Day {dayData.day}: {dayData.title}
                    </h3>
                    <p className="text-muted-foreground">{dayData.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{dayData.duration}</span>
                  </div>
                  <ChevronDown 
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                      expandedDay === dayData.day ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </div>

              {/* Expandable Content */}
              <div 
                className={`accordion-content overflow-hidden ${
                  expandedDay === dayData.day 
                    ? 'max-h-[600px] opacity-100 expanded' 
                    : 'max-h-0 opacity-0 collapsed'
                }`}
              >
                <div className="px-6 pb-6 border-t border-border">
                  <div className="grid md:grid-cols-2 gap-6 mt-4">
                    {/* Topics */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        <h4 className="label">
                          <span className="static-label">Key Topics:</span>
                        </h4>
                      </div>
                      <ul className="space-y-2">
                        {dayData.topics.map((topic, index) => (
                          <li key={index} className="flex items-start gap-2 fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="h-1.5 w-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="content editable-content text-muted-foreground">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Techniques */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <h4 className="label">
                          <span className="static-label">Techniques Covered:</span>
                        </h4>
                      </div>
                      <ul className="space-y-2">
                        {dayData.techniques.map((technique, index) => (
                          <li key={index} className="flex items-start gap-2 fade-in-up" style={{ animationDelay: `${(index + dayData.topics.length) * 0.1}s` }}>
                            <div className="h-1.5 w-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="content editable-content text-muted-foreground">{technique}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="mt-6 pt-4 border-t border-border">
                    <Button 
                      variant="outline" 
                      className="group hover:bg-primary/10 hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Placeholder link - would connect to actual PDF download
                        window.open('#', '_blank');
                      }}
                    >
                      <Download className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                      <span className="static-label">Download Day</span>{' '}
                      <span className="editable-content">{dayData.day}</span>{' '}
                      <span className="static-label">Summary (PDF)</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseBreakdown;
