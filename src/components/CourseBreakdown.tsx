
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
    title: "Foundation & Fundamentals",
    description: "Build a solid understanding of AI prompt engineering principles and core concepts.",
    topics: [
      "Introduction to Prompt Engineering",
      "Understanding AI Model Behavior", 
      "Basic Prompt Structure & Syntax",
      "Common Pitfalls and How to Avoid Them",
      "Setting Up Your AI Workspace",
      "Ethics in AI Prompt Engineering"
    ],
    techniques: [
      "Direct Prompting",
      "Context Setting",
      "Role Assignment", 
      "Clear Instructions",
      "Prompt Templates",
      "Basic Iteration Methods"
    ],
    duration: "2.5 hours"
  },
  {
    day: 2,
    title: "Advanced Techniques & Strategies",
    description: "Master sophisticated prompting methods for complex problem-solving.",
    topics: [
      "Chain-of-Thought Prompting",
      "Few-Shot Learning Principles",
      "Prompt Decomposition Strategies",
      "Self-Critique and Reflection Methods",
      "Meta-Prompting Techniques",
      "Advanced Context Management"
    ],
    techniques: [
      "Reasoning Chains",
      "Example-Based Learning",
      "Step-by-Step Breakdown",
      "Quality Assessment",
      "Iterative Refinement",
      "Context Switching"
    ],
    duration: "3 hours"
  },
  {
    day: 3,
    title: "Specialized Applications",
    description: "Apply prompt engineering to specific domains and use cases.",
    topics: [
      "Creative Writing & Content Generation",
      "Technical Documentation & APIs",
      "Data Analysis & Visualization Prompts",
      "Code Generation & Debugging",
      "Research & Information Synthesis",
      "Marketing & Business Applications"
    ],
    techniques: [
      "Genre-Specific Prompting",
      "Template Creation",
      "Analytical Frameworks",
      "Programming Assistance",
      "Information Architecture",
      "Multi-Modal Prompting"
    ],
    duration: "2.5 hours"
  },
  {
    day: 4,
    title: "Optimization & Refinement",
    description: "Learn to iterate and improve your prompts for maximum effectiveness.",
    topics: [
      "Prompt Testing & Evaluation Methods",
      "A/B Testing Strategies",
      "Performance Metrics & KPIs",
      "Iterative Improvement Workflows",
      "Quality Assurance Frameworks",
      "Prompt Version Control"
    ],
    techniques: [
      "Systematic Testing",
      "Metric Definition",
      "Comparative Analysis",
      "Continuous Refinement",
      "Error Analysis",
      "Performance Benchmarking"
    ],
    duration: "3 hours"
  },
  {
    day: 5,
    title: "Real-World Implementation",
    description: "Put your skills into practice with hands-on projects and deployment strategies.",
    topics: [
      "End-to-End Project Development",
      "Integration with Business Systems",
      "Scaling Best Practices",
      "Team Collaboration Strategies",
      "Future Trends & Emerging Technologies",
      "Building Your AI Prompt Portfolio"
    ],
    techniques: [
      "Project Planning & Management",
      "System Integration",
      "Workflow Optimization",
      "Trend Analysis",
      "Portfolio Development",
      "Continuous Learning Strategies"
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
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your 5-Day Learning Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each day builds upon the previous, creating a comprehensive foundation in AI prompt engineering
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
                className="p-6 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => toggleDay(dayData.day)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-ai rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    {dayData.day}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      Day {dayData.day}: {dayData.title}
                    </h3>
                    <p className="text-gray-600">{dayData.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{dayData.duration}</span>
                  </div>
                  <ChevronDown 
                    className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
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
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="grid md:grid-cols-2 gap-6 mt-4">
                    {/* Topics */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-purple-600" />
                        <h4 className="label">
                          <span className="static-label">Key Topics:</span>
                        </h4>
                      </div>
                      <ul className="space-y-2">
                        {dayData.topics.map((topic, index) => (
                          <li key={index} className="flex items-start gap-2 fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="h-1.5 w-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="content editable-content">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Techniques */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <h4 className="label">
                          <span className="static-label">Techniques Covered:</span>
                        </h4>
                      </div>
                      <ul className="space-y-2">
                        {dayData.techniques.map((technique, index) => (
                          <li key={index} className="flex items-start gap-2 fade-in-up" style={{ animationDelay: `${(index + dayData.topics.length) * 0.1}s` }}>
                            <div className="h-1.5 w-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="content editable-content">{technique}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <Button 
                      variant="outline" 
                      className="group hover:bg-purple-50 hover:border-purple-200 transition-all duration-300 hover:scale-105 hover:shadow-lg pulse-glow"
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
