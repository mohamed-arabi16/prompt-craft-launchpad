// Comprehensive Instructor Course Content
// Based on: Instructor Operating Manual — Qobouli AI Intensive Course (5 Days)

import {
  DayContent,
  OperatingPrinciple,
  TroubleshootingScenario,
  SharedAsset
} from '@/types/instructorDashboard';

// Operating Principles (applicable all 5 days)
export const operatingPrinciples: OperatingPrinciple[] = [
  {
    id: 'crear',
    title: 'CREAR Framework',
    items: [
      'Context: what\'s happening, who it\'s for, where it will be used',
      'Role: who the AI should act as',
      'Examples: style reference or what "good" looks like',
      'Action/Format: what to produce + exact structure',
      'Refinement: small targeted tweak—not rewriting from scratch'
    ]
  },
  {
    id: 'aims',
    title: 'Goals',
    items: [
      'Aim for satisfying output in 1–3 tries for many real tasks',
      'Stop rule: if attempt 3–4 isn\'t improving → rewrite the foundation prompt'
    ]
  },
  {
    id: 'tools',
    title: 'Tool Roles (Simple)',
    items: [
      'ChatGPT = Draft/Plan',
      'Gemini = Verify (current facts + sources)',
      'Lovable = Build/Ship'
    ]
  },
  {
    id: 'arabic-first',
    title: 'Teaching Arabic-First Learners',
    items: [
      'Explain concepts in simple English + optional quick Arabic clarification',
      'Keep prompts/templates in English ("so you can reuse anywhere")',
      'If someone struggles, translate the instruction, not the prompt template'
    ]
  },
  {
    id: 'cohort-rules',
    title: 'Daily Cohort Rules (30 seconds)',
    items: [
      '"We\'ll time-box questions so we can ship outcomes."',
      '"If you\'re stuck, raise hand and show: your prompt + the output + what you wanted instead."',
      '"We improve by changing one thing at a time."'
    ]
  }
];

// Shared Assets (prepare before Day 1)
export const sharedAssets: SharedAsset[] = [
  { id: 'crear-template', name: 'CREAR Prompt Builder', description: 'Template for building structured prompts' },
  { id: 'refinement-cheat', name: 'Refinement Cheat Sheet', description: 'Quick reference for refinement moves' },
  { id: 'verification-plan', name: 'Verification Plan Template', description: 'Template for fact-checking process' },
  { id: 'mini-prd', name: 'Mini-PRD Template', description: 'Lightweight project requirements document' },
  { id: 'bug-report', name: 'Bug Report Template', description: 'Structured bug reporting for Lovable Day 5' },
  { id: 'mlp-definition', name: 'Minimum Lovable Product Definition', description: 'Capstone project requirements' }
];

// Troubleshooting Scenarios
export const troubleshootingScenarios: TroubleshootingScenario[] = [
  {
    id: 'low-energy',
    title: 'Low-Energy Room',
    symptoms: 'Silence, low participation, cameras off, slow practice',
    script: '"Quick reset. 60 seconds: type in chat one thing you want AI to help you with this week. No perfect answers—just real tasks." Then: "Pick one and we\'ll CREAR it together."',
    fallback: 'Do a 3-minute "bad prompt roast" (humor, no shaming): show a vague prompt and why it fails.'
  },
  {
    id: 'time-overrun',
    title: 'Time Overrun',
    symptoms: 'Teaching eats practice; you\'re behind',
    script: '"I\'m cutting the next section so you get practice time. Practice is where the skill forms." Then skip to exercise. Rule: never steal more than 10 minutes from practice.'
  },
  {
    id: 'confused-learner',
    title: 'Confused Learner (Lost, Overwhelmed)',
    symptoms: 'Learner appears lost or overwhelmed',
    script: '"Tell me your goal in one sentence." "Who is it for?" "What format do you need?" Then paste a CREAR skeleton and fill it with them. "Let\'s not fight the output. We\'ll fix the input. We\'re going to rewrite the foundation in CREAR."'
  },
  {
    id: 'tech-issues',
    title: 'Tech Issues (Tool Down, Login Problems)',
    symptoms: 'Tool is down or learner can\'t log in',
    script: 'Pair them with someone who has access (buddy system). Or they do the same exercise on paper: Write CREAR prompt + predicted improvement + refinement line. "Don\'t lose the learning because of a login. Write the prompt structure now; you can run it later."'
  },
  {
    id: 'endless-tweaking',
    title: 'Endless Tweaking (Tries 4, 5, 6...)',
    symptoms: 'Learner keeps refining without improvement',
    script: '"Stop. We hit the stop rule. Your foundation prompt is the problem. Rewrite using CREAR with tighter constraints."'
  },
  {
    id: 'feature-explosion',
    title: 'Day 5 Build Chaos (Feature Explosion)',
    symptoms: 'Learner wants to add too many features',
    script: '"That\'s version 2. Today we ship a working core. Put the rest in a backlog list. Ship beats perfect."'
  }
];

// Q&A Management
export const qaManagement = {
  qaGate: {
    title: 'The "Q&A Gate"',
    response: '"Show me three things: your prompt, the output, what you wanted instead (one sentence). Then I can help fast."',
    fallback: '"Cool—park it for now. After practice, we\'ll come back."'
  },
  timeboxRules: [
    'During teaching/demos: max 2 questions per section',
    'During practice: unlimited, but handle in 2-minute coaching bursts',
    'Pattern: diagnose → one prompt fix → rerun → move on'
  ],
  parkingLot: 'Parking Lot (we\'ll hit if time):\n\n___\n___\n___',
  hybridTip: 'Give online learners a keyword: "HELP:" in chat. Scan for "HELP:" only during practice blocks.'
};

// Session 0 (Free Intro Session)
export const session0Content: DayContent = {
  dayNumber: 0,
  title: 'Session 0 — Free Intro Session',
  subtitle: 'Convert visitors into qualified leads via form submission',
  sessionLength: '45–60 min',
  outcomes: [
    { id: 's0-1', description: 'Attendees understand the CREAR framework basics' },
    { id: 's0-2', description: 'Attendees complete one mini prompt transformation' },
    { id: 's0-3', description: 'Interested attendees submit enrollment form' }
  ],
  timeline: [
    { time: '0–5', duration: '5 min', title: 'Welcome + who it\'s for', description: 'Introduction for non-technical adults who feel AI is generic or frustrating' },
    { time: '5–12', duration: '7 min', title: 'The problem (no hype)', description: 'Most people don\'t get value because prompts are missing context + format' },
    { time: '12–22', duration: '10 min', title: 'Teach CREAR in 8 minutes', description: 'Context, Role, Examples, Action/Format, Refinement' },
    { time: '22–32', duration: '10 min', title: 'Mini demo: vague → CREAR', description: 'Show one transformation live' },
    { time: '32–42', duration: '10 min', title: 'Mini exercise', description: 'Write one vague prompt → rewrite with CREAR → share in chat' },
    { time: '42–48', duration: '6 min', title: 'What the 5-day bootcamp covers', description: 'Clear and grounded overview of each day' },
    { time: '48–50', duration: '2 min', title: 'CTA (form submission)', description: 'Direct to enrollment form' }
  ],
  talkTracks: [
    {
      id: 's0-welcome',
      title: 'Welcome',
      time: '0–5',
      script: '"This intro is for non-technical adults who feel AI is generic or frustrating. Today you\'ll learn one small method you can use immediately."'
    },
    {
      id: 's0-problem',
      title: 'The Problem',
      time: '5–12',
      script: '"Most people don\'t get value because prompts are missing context + format."'
    },
    {
      id: 's0-crear',
      title: 'Teach CREAR',
      time: '12–22',
      script: '"Here\'s the 5-part structure: Context, Role, Examples, Action/Format, Refinement."'
    },
    {
      id: 's0-bootcamp',
      title: 'Bootcamp Overview',
      time: '42–48',
      script: '"Day 1: CREAR foundations\\nDay 2: refine in 1–3 tries + stop rule\\nDay 3: verify facts fast\\nDay 4: plan your mini project\\nDay 5: build + ship a shareable link"'
    },
    {
      id: 's0-cta',
      title: 'CTA',
      time: '48–50',
      script: '"If you want a hands-on cohort experience, fill the form. After you submit, the team will contact you."'
    }
  ],
  exercises: [
    {
      id: 's0-ex1',
      title: 'Mini CREAR Exercise',
      duration: '10 min',
      instructions: [
        'Write one vague prompt',
        'Rewrite it with CREAR',
        'Share in chat'
      ],
      expectedOutput: 'Before/after prompt transformation shared in chat',
      debriefQuestions: ['Who wants to share their transformation?']
    }
  ]
};

// Day 1 Content
export const day1Content: DayContent = {
  dayNumber: 1,
  title: 'Day 1 — Foundations of Effective Prompting',
  subtitle: 'CREAR + failure→fix',
  sessionLength: '120 min (2 hours)',
  outcomes: [
    { id: 'd1-1', description: 'One real "before" vague prompt' },
    { id: 'd1-2', description: 'One improved CREAR prompt' },
    { id: 'd1-3', description: 'The improved output' },
    { id: 'd1-4', description: 'One refinement attempt (optional if already great)' }
  ],
  timeline: [
    { time: '0–5', duration: '5 min', title: 'Welcome + orientation' },
    { time: '5–10', duration: '5 min', title: 'Set rules + how the 5 days work' },
    { time: '10–20', duration: '10 min', title: 'The frustration + why vague prompts fail' },
    { time: '20–35', duration: '15 min', title: 'Teach CREAR (fast + concrete)' },
    { time: '35–50', duration: '15 min', title: 'Failure→Fix demo (live prompt transformation)' },
    { time: '50–55', duration: '5 min', title: 'Break' },
    { time: '55–80', duration: '25 min', title: 'Exercise: Rewrite a real prompt with CREAR' },
    { time: '80–95', duration: '15 min', title: 'Pair share + "spot the missing CREAR"' },
    { time: '95–110', duration: '15 min', title: 'Instructor debrief (patterns + fixes)' },
    { time: '110–120', duration: '10 min', title: 'Wrap + homework (tiny)' }
  ],
  talkTracks: [
    {
      id: 'd1-welcome',
      title: 'Welcome',
      time: '0–5',
      script: '"Welcome to the Qobouli AI Intensive. Over 5 days, we\'ll build a repeatable way to get useful results in 1–3 tries for many real tasks, and by Day 5 you\'ll ship a small working project link. No hype—just practical skill."'
    },
    {
      id: 'd1-rules',
      title: 'Rules + Structure',
      time: '5–10',
      script: '"Here\'s how we\'ll run every session: short teaching → live demo → hands-on practice.\\nTwo rules:\\n1. If you ask a question, show me your prompt + output + what you wanted instead.\\n2. We time-box Q&A so practice doesn\'t get eaten."'
    },
    {
      id: 'd1-frustration',
      title: 'Frustration + Root Cause',
      time: '10–20',
      script: '"Most \'bad AI\' experiences are actually missing input. AI can\'t read your mind. Generic in = generic out. Our fix is simple: we stop being vague."'
    },
    {
      id: 'd1-crear',
      title: 'Teach CREAR',
      time: '20–35',
      script: '"CREAR is our baseline prompt structure:\\n\\n• Context: what\'s happening, who it\'s for, where it will be used\\n• Role: who the AI should act as\\n• Examples: style reference or what \'good\' looks like\\n• Action/Format: what to produce + exact structure\\n• Refinement: small targeted tweak—not rewriting from scratch\\n\\nToday you\'ll use CREAR on a real task."'
    },
    {
      id: 'd1-demo',
      title: 'Live Demo Script',
      time: '35–50',
      script: '"I\'m going to show the difference between a vague prompt and a CREAR prompt."\\n\\n[Type the bad prompt]\\n"Write a caption for my post."\\n\\n[Say this:]\\n"See? It could fit any post. Because I gave it nothing."\\n\\n[Type the fixed CREAR prompt:]\\n"Context: IG Reel about a workspace makeover. Audience: young professionals. Platform: Instagram.\\nRole: social media copywriter.\\nExamples: energetic, practical, max one emoji.\\nAction/Format: Write 5 captions under 120 characters, each with a clear CTA question."\\n\\n[Say this after output:]\\n"Now it\'s usable—because we specified platform, audience, tone, and format."\\n\\n[Refinement:]\\n"Refine: Make the best option 15% shorter and more specific to \'small apartments\'."'
    },
    {
      id: 'd1-break',
      title: 'Break',
      time: '50–55',
      script: '"5-minute break. When you come back, open ChatGPT and pick a real task you actually need this week."'
    },
    {
      id: 'd1-debrief',
      title: 'Debrief',
      time: '95–110',
      script: '"I\'m seeing the same 3 gaps: missing audience, missing format, and no examples.\\nTomorrow we\'ll focus on when the output is close but not right—how to fix fast without rewriting everything."'
    },
    {
      id: 'd1-wrap',
      title: 'Wrap + Homework',
      time: '110–120',
      script: '"Homework (10 minutes): Bring tomorrow one output you want to improve—something that\'s close but needs work."'
    }
  ],
  exercises: [
    {
      id: 'd1-ex1',
      title: 'Rewrite a Vague Prompt with CREAR',
      duration: '25 min',
      instructions: [
        'Write your vague prompt (1 sentence)',
        'Rewrite it using CREAR',
        'Run both',
        'Save: before prompt, after prompt, best output'
      ],
      expectedOutput: 'A mini "before/after" prompt pair + improved answer',
      debriefQuestions: [
        'Which CREAR element changed the result the most?',
        'What did the AI stop guessing after you added context?',
        'If it\'s still generic—what\'s missing?'
      ]
    }
  ]
};

// Day 2 Content
export const day2Content: DayContent = {
  dayNumber: 2,
  title: 'Day 2 — Iterating to Excellence',
  subtitle: 'Refinement templates + stop rule',
  sessionLength: '120 min',
  outcomes: [
    { id: 'd2-1', description: 'One output improved through 1–2 refinements' },
    { id: 'd2-2', description: 'A personal "refinement move" they reuse (shorter / tone / format / add example)' },
    { id: 'd2-3', description: 'Understanding of the stop rule' }
  ],
  timeline: [
    { time: '0–5', duration: '5 min', title: 'Recap (1 win)' },
    { time: '5–15', duration: '10 min', title: 'Why first drafts need work (normalize iteration)' },
    { time: '15–30', duration: '15 min', title: 'Common output problems + fix moves' },
    { time: '30–45', duration: '15 min', title: 'Live demo: 2 refinements to polished' },
    { time: '45–50', duration: '5 min', title: 'Break' },
    { time: '50–85', duration: '35 min', title: 'Exercise: Two-Try Refinement (real task)' },
    { time: '85–100', duration: '15 min', title: 'Stop rule drill (when to rewrite)' },
    { time: '100–115', duration: '15 min', title: 'Debrief + share best refinement prompts' },
    { time: '115–120', duration: '5 min', title: 'Wrap' }
  ],
  talkTracks: [
    {
      id: 'd2-recap',
      title: 'Recap',
      time: '0–5',
      script: '"Yesterday you learned how to ask. Today you learn how to direct. First drafts are normal. Your job is to give feedback the AI can use."'
    },
    {
      id: 'd2-normalize',
      title: 'Normalize Iteration',
      time: '5–15',
      script: '"AI gives a draft. You\'re the editor. But \'make it better\' is not feedback. We refine with specific changes."'
    },
    {
      id: 'd2-refinement-rules',
      title: 'Refinement Rules',
      time: '15–30',
      script: '"Refinement rules:\\n\\n1. Change 1–2 things per try\\n2. Use measurable language: shorter by X%, bullet count, tone words\\n3. Test after each change\\n\\nAnd remember: if try 3–4 isn\'t improving, rewrite the foundation prompt."'
    },
    {
      id: 'd2-demo',
      title: 'Live Demo',
      time: '30–45',
      script: '"I\'ll show two refinements."\\n\\n[Run a decent but generic prompt (any topic)]\\n[Say:] "Problem: too long and too generic."\\n\\nRefinement 1: "Cut by 40%, format as 5 bullets."\\nRefinement 2: "Add one concrete example to bullet 2."\\n\\n[Say:] "Two small tweaks beat rewriting everything."'
    },
    {
      id: 'd2-stop-rule',
      title: 'Stop Rule Drill',
      time: '85–100',
      script: '"If you\'re on attempt 4 and it\'s not improving, stop. The foundation is broken. You rewrite using CREAR."'
    }
  ],
  exercises: [
    {
      id: 'd2-ex1',
      title: 'Two-Try Refinement',
      duration: '35 min',
      instructions: [
        'Start with an output you dislike (yesterday or new)',
        'Identify the single biggest issue',
        'Refinement #1 (format/tone)',
        'Refinement #2 (add missing specifics)',
        'Save final output + your two refinement prompts'
      ],
      expectedOutput: 'Final version + 2 refinement prompts + note of what changed',
      debriefQuestions: [
        'What was your refinement #1?',
        'What did you change in #2?',
        'Did you stop at 2? If not, why?'
      ]
    },
    {
      id: 'd2-ex2',
      title: 'Stop Rule Rewrite',
      duration: '15 min',
      instructions: [
        'Take something that didn\'t improve after multiple tries',
        'Rewrite the foundation prompt using CREAR'
      ],
      expectedOutput: 'A new foundation prompt (not more refinements)',
      debriefQuestions: [
        'What was missing in the foundation?'
      ]
    }
  ]
};

// Day 3 Content
export const day3Content: DayContent = {
  dayNumber: 3,
  title: 'Day 3 — Trust but Verify',
  subtitle: 'Verification + tool switching',
  sessionLength: '120 min',
  outcomes: [
    { id: 'd3-1', description: 'One verified/corrected claim (with source name)' },
    { id: 'd3-2', description: 'A personal "verification trigger list"' },
    { id: 'd3-3', description: 'Ability to switch: Draft → Verify → return to Draft' }
  ],
  timeline: [
    { time: '0–5', duration: '5 min', title: 'Recap' },
    { time: '5–20', duration: '15 min', title: 'Why AI can be confidently wrong' },
    { time: '20–35', duration: '15 min', title: 'When to verify (triggers list)' },
    { time: '35–50', duration: '15 min', title: 'Live demo: Draft claim → verify → update' },
    { time: '50–55', duration: '5 min', title: 'Break' },
    { time: '55–85', duration: '30 min', title: 'Exercise: Verify one claim' },
    { time: '85–105', duration: '20 min', title: 'Debrief: source quality + safe phrasing' },
    { time: '105–120', duration: '15 min', title: 'Wrap + Day 4 preview (capstone planning)' }
  ],
  talkTracks: [
    {
      id: 'd3-explain',
      title: 'Why AI Can Be Wrong',
      time: '5–20',
      script: '"AI predicts likely text. It can sound confident and be wrong—especially on numbers, recent changes, and tool features."'
    },
    {
      id: 'd3-triggers',
      title: 'Verification Triggers',
      time: '20–35',
      script: '"Verify when you see:\\n\\n• Specific numbers/statistics\\n• Recent/current info\\n• Product/tool capabilities\\n• Anything legal/medical/financial or high-stakes\\n\\nWhen in doubt, verify fast."'
    },
    {
      id: 'd3-demo',
      title: 'Demo Script',
      time: '35–50',
      script: '"I\'ll draft in ChatGPT, then verify in Gemini, then update my draft."\\n\\n[Draft:] "Write a paragraph about [topic] including a growth statistic."\\n[Say:] "This number looks confident. I don\'t trust it yet."\\n[Verify in Gemini:] "Find credible recent statistics about [topic]. Provide sources."\\n[Say:] "Now I replace the unverified line with the verified one."'
    },
    {
      id: 'd3-debrief',
      title: 'Debrief',
      time: '85–105',
      script: '"Two wins today:\\n\\n1. You caught a claim before it embarrassed you.\\n2. You learned how to write a safe sentence even when evidence is weak."'
    }
  ],
  exercises: [
    {
      id: 'd3-ex1',
      title: 'Verify One Claim',
      duration: '30 min',
      instructions: [
        'Pick one claim from your work that might be wrong',
        'In Gemini, search/ask for verification + sources',
        'Capture: the corrected fact + source name',
        'Update your original output to include only the verified info'
      ],
      expectedOutput: 'Original claim, verified replacement sentence, source name, updated paragraph/post',
      debriefQuestions: [
        'Was the original claim correct?',
        'What source did you trust most and why?',
        'If evidence was unclear, what cautious phrasing did you use?'
      ]
    }
  ]
};

// Day 4 Content
export const day4Content: DayContent = {
  dayNumber: 4,
  title: 'Day 4 — From Plan to Prep',
  subtitle: 'Mini-PRD, scope control, assets, build prompt',
  sessionLength: '120 min',
  outcomes: [
    { id: 'd4-1', description: 'Mini-PRD (must-haves ≤ 5, nice-to-haves listed separately)' },
    { id: 'd4-2', description: 'Any key facts verified' },
    { id: 'd4-3', description: 'At least one saved image/asset' },
    { id: 'd4-4', description: 'A ready-to-paste Lovable build prompt' }
  ],
  timeline: [
    { time: '0–5', duration: '5 min', title: 'Recap + Plan→Verify→Build loop' },
    { time: '5–15', duration: '10 min', title: 'Minimum Lovable Product definition' },
    { time: '15–30', duration: '15 min', title: 'Mini-PRD template walkthrough' },
    { time: '30–45', duration: '15 min', title: 'Live demo: mini-PRD → build prompt' },
    { time: '45–50', duration: '5 min', title: 'Break' },
    { time: '50–90', duration: '40 min', title: 'Exercise: Write mini-PRD + verification list' },
    { time: '90–110', duration: '20 min', title: 'Exercise: Prep 1 asset + final build prompt' },
    { time: '110–120', duration: '10 min', title: 'Readiness check + wrap' }
  ],
  talkTracks: [
    {
      id: 'd4-mlp',
      title: 'Minimum Lovable Product',
      time: '5–15',
      script: '"Your capstone is a Minimum Lovable Product:\\n\\n• Minimum: buildable in one session\\n• Lovable: one delightful feature\\n• Product: works and you can share a link\\n\\nIf it\'s more than one session, it\'s too big—cut scope."'
    },
    {
      id: 'd4-prd-rules',
      title: 'Mini-PRD Rules',
      time: '15–30',
      script: '"Your must-haves are max five. If you have six, one gets cut.\\nEverything else becomes \'version 2\'."'
    },
    {
      id: 'd4-demo',
      title: 'Demo Script',
      time: '30–45',
      script: '"I\'ll turn an idea into a mini-PRD, then into a Lovable build prompt."\\n\\n[Use any example relevant to the cohort]\\n\\nExample Qobouli site constraints:\\n• Must-have sections short/scannable\\n• Booking intent = form submission (no payment)\\n• Signed-in users see dashboard path; guests see booking path\\n• Arabic RTL spacing/typography and accessibility basics\\n• Footer includes Assets/Resources section"'
    }
  ],
  exercises: [
    {
      id: 'd4-ex1',
      title: 'Mini-PRD',
      duration: '40 min',
      instructions: [
        'Overview (1 sentence): "This is a ___ for ___ to ___."',
        'Must-haves (max 5)',
        'Nice-to-haves (later)',
        'Explicit exclusions (what we will NOT build)',
        'Content/assets needed (text, images)',
        'What must be verified (facts/claims)'
      ],
      expectedOutput: 'Completed mini-PRD',
      debriefQuestions: [
        'Read your must-haves. If it\'s more than 5, cut now.'
      ]
    },
    {
      id: 'd4-ex2',
      title: 'Build Prompt + Asset Prep',
      duration: '20 min',
      instructions: [
        'Save 1 real image asset (logo/header/illustration)',
        'Write the Lovable build prompt using only must-haves + style notes',
        'Add a "test steps" line'
      ],
      expectedOutput: 'Asset saved, Final Lovable prompt ready',
      debriefQuestions: [
        'Show me your build prompt—does it list sections/features clearly?'
      ]
    }
  ]
};

// Day 5 Content
export const day5Content: DayContent = {
  dayNumber: 5,
  title: 'Day 5 — Build & Ship',
  subtitle: 'Lovable build, bug reports, deploy, showcase',
  sessionLength: '120 min',
  outcomes: [
    { id: 'd5-1', description: 'A working project' },
    { id: 'd5-2', description: 'A shareable link' },
    { id: 'd5-3', description: 'Ability to iterate with specific bug reports' },
    { id: 'd5-4', description: '30-second showcase delivery' }
  ],
  timeline: [
    { time: '0–10', duration: '10 min', title: 'Build rules + how we\'ll work today' },
    { time: '10–25', duration: '15 min', title: 'Live demo: build → test → fix → deploy' },
    { time: '25–30', duration: '5 min', title: 'Q&A (time-boxed)' },
    { time: '30–85', duration: '55 min', title: 'Build sprint #1 (instructor circulates)' },
    { time: '85–95', duration: '10 min', title: 'Break' },
    { time: '95–110', duration: '15 min', title: 'Build sprint #2 (finish + deploy)' },
    { time: '110–120', duration: '10 min', title: 'Showcase lightning round' }
  ],
  talkTracks: [
    {
      id: 'd5-rules',
      title: 'Set Build Discipline',
      time: '0–10',
      script: '"Today\'s goal is simple: ship something real. Not perfect. Working. Shareable.\\n\\nRules:\\n• Start with the simplest version\\n• Test after every change\\n• Fix one issue at a time\\n• No feature explosion—backlog it."'
    },
    {
      id: 'd5-demo',
      title: 'Demo Script',
      time: '10–25',
      script: '"I paste a clear build prompt. Then I test. Then I report one issue clearly."\\n\\nBug report template:\\n• "Steps to reproduce: …"\\n• "Expected: …"\\n• "Actual: …"\\n• "Fix only this."'
    },
    {
      id: 'd5-qa',
      title: 'Q&A Control',
      time: '25–30',
      script: '"I\'m going to take two questions, then we build. If you have more, drop them in chat/parking lot and I\'ll handle them during circulation."'
    },
    {
      id: 'd5-showcase',
      title: 'Showcase Script (give to learners)',
      time: '110–120',
      script: '"30 seconds each:\\n\\n1. \'This is a ___ for ___.\'\\n2. \'My lovable feature is ___.\'\\n3. \'One thing I learned about prompts/tools is ___.\'"'
    }
  ],
  exercises: [
    {
      id: 'd5-ex1',
      title: 'Build Sprint #1',
      duration: '55 min',
      instructions: [
        'Paste your build prompt into Lovable',
        'Test after every change',
        'Report bugs using the template',
        'Focus on core functionality first'
      ],
      expectedOutput: 'Working core features',
      debriefQuestions: []
    },
    {
      id: 'd5-ex2',
      title: 'Build Sprint #2 + Deploy',
      duration: '15 min',
      instructions: [
        'Finish any remaining must-haves',
        'Deploy your project',
        'Get your shareable link',
        'Prepare 30-second showcase'
      ],
      expectedOutput: 'Deployed project with shareable link',
      debriefQuestions: []
    }
  ]
};

// All days content
export const allDaysContent: DayContent[] = [
  session0Content,
  day1Content,
  day2Content,
  day3Content,
  day4Content,
  day5Content
];

// Refinement starters (for Day 2)
export const refinementStarters = [
  'Cut by 40%…',
  'Rewrite in [tone]…',
  'Convert to [table/bullets/steps]…',
  'Add one concrete example to point 2…'
];

// Safe phrasing templates (for Day 3)
export const safePhrasing = [
  'According to [source], …',
  'Recent reporting suggests…',
  'Evidence varies; a safe summary is…'
];

// Scope cutter phrases (for Day 4)
export const scopeCutterPhrases = [
  'That\'s version 2.',
  'Cut to one core flow.',
  'Remove login/payments/admin.'
];

// Mini-PRD Template
export const miniPrdTemplate = `## Mini-PRD Template

**Overview (1 sentence):**
"This is a ___ for ___ to ___."

**Must-haves (max 5):**
1.
2.
3.
4.
5.

**Nice-to-haves (later):**
-

**Explicit exclusions (what we will NOT build):**
-

**Content/assets needed:**
- Text:
- Images:

**What must be verified:**
- `;

// Bug Report Template
export const bugReportTemplate = `## Bug Report

**Steps to reproduce:**
1.

**Expected:**


**Actual:**


**Fix only this.**`;

// CREAR Template
export const crearTemplate = `## CREAR Prompt Builder

**Context:**
(What's happening, who it's for, where it will be used)


**Role:**
(Who the AI should act as)


**Examples:**
(Style reference or what "good" looks like)


**Action/Format:**
(What to produce + exact structure)


**Refinement:**
(Small targeted tweak—not rewriting from scratch)
`;
