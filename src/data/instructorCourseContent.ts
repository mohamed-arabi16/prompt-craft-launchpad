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
    id: 'daily-opening',
    title: '1.1 Daily Opening Script (45 sec)',
    title_ar: '1.1 نص الافتتاح اليومي (45 ثانية)',
    items: [
      'Say this at the start of every day:',
      'Quick reminder: we use CREAR, aim for 1–3 tries, apply the stop rule if improvement stalls, and follow tool-switching logic: ChatGPT for draft/plan, Gemini for verify (facts + sources), Lovable for build/ship.',
      'Questions require: Prompt + Output + Intended result.'
    ],
    items_ar: [
      'تقرأه حرفيًا في بداية كل يوم:',
      'Reminder سريع: اليوم بنشتغل بـ CREAR، وبعقلية 1–3 tries. لو attempt 3–4 ما فيه تحسن واضح نطبق stop rule ونرجع نكتب foundation prompt.',
      'وعندنا tool-switching logic: ChatGPT للـDraft/Plan، Gemini للـVerify (facts + sources)، Lovable للـBuild/Ship.',
      'وأي سؤال لازم معه: Prompt + Output + Intended result.'
    ]
  },
  {
    id: 'qa-gate',
    title: '1.2 Q&A Gate',
    title_ar: '1.2 بوابة الأسئلة (Q&A Gate)',
    items: [
      'Before answering any question, say:',
      '"Before I answer: show me your Prompt + Output + Intended result in one sentence… and I’ll fix it fast."',
      'If they don\'t have it: "Cool—let’s put it in the Parking Lot and revisit in the last 10 minutes if time allows."'
    ],
    items_ar: [
      'جملة ثابتة قبل الإجابة:',
      '"قبل ما أجاوب: ورّيني Prompt + Output + Intended result بجملة… وبحلها بسرعة."',
      'إذا ما عنده الثلاثة: "تمام، نخليها Parking Lot ونرجع لها آخر 10 دقائق لو بقي وقت."'
    ]
  },
  {
    id: 'coaching-rule',
    title: '1.3 2-Minute Coaching Rule',
    title_ar: '1.3 قاعدة الكوتشينج (2 دقيقة)',
    items: [
      'Ask: "Goal in one sentence?"',
      'Ask: "Who is the audience? Which platform?"',
      'Ask: "What is the Output format?"',
      'Fix one CREAR element or write one Refinement.',
      'Rerun -> Move on.',
      'End with: "We made one change and it improved. Now repeat the same logic on your next task."'
    ],
    items_ar: [
      'اسأل: "Goal بجملة؟"',
      'اسأل: "مين audience؟ وأي platform؟"',
      'اسأل: "إيش Output format المطلوب؟"',
      'أصلّح عنصر واحد من CREAR أو أكتب Refinement واحد -> Rerun -> انتقل.',
      'جملة إنهاء: "نفّذنا تغيير واحد وطلع فرق. الآن كرر نفس المنطق على المهمة الثانية."'
    ]
  },
  {
    id: 'time-dist',
    title: '1.4 Time Distribution',
    title_ar: '1.4 توزيع الوقت (قاعدة مقدّسة)',
    items: [
      'Never less than 40–55 mins practice daily.',
      'Fixed Break (5–10 mins).',
      'Any extra time goes to "Fix Clinic", not new content.'
    ],
    items_ar: [
      'لا تقل عن 40–55 دقيقة practice يوميًا.',
      'Break ثابت (5–10 دقائق) للحفاظ على التركيز.',
      'أي زيادة وقت تروح "Fix Clinic" وليس محتوى جديد.'
    ]
  }
];

// Shared Assets (prepare before Day 1)
export const sharedAssets: SharedAsset[] = [
  {
    id: 'crear-template',
    name: 'CREAR Prompt Builder',
    name_ar: 'باني الـ Prompt (CREAR)',
    description: 'Template for building structured prompts',
    description_ar: 'قالب لبناء prompts منظمة'
  },
  {
    id: 'refinement-pack',
    name: 'Refinement Pack',
    name_ar: 'حزمة التحسين (Refinement Pack)',
    description: 'Ready-to-use refinement prompts',
    description_ar: 'قوالب تحسين جاهزة للاستخدام'
  },
  {
    id: 'verification-prompt',
    name: 'Verification Prompt (Gemini)',
    name_ar: 'أمر التحقق (Gemini)',
    description: 'Prompt to verify facts and sources',
    description_ar: 'أمر للتحقق من الحقائق والمصادر'
  },
  {
    id: 'mini-prd',
    name: 'Mini-PRD Template',
    name_ar: 'قالب Mini-PRD',
    description: 'Lightweight project requirements',
    description_ar: 'وثيقة متطلبات المشروع المصغرة'
  },
  {
    id: 'lovable-build',
    name: 'Lovable Build Prompt Template',
    name_ar: 'قالب البناء (Lovable)',
    description: 'Instructions to build MLP in Lovable',
    description_ar: 'تعليمات بناء المنتج الأولي في Lovable'
  },
  {
    id: 'bug-report',
    name: 'Bug Report Template',
    name_ar: 'قالب تقرير الأخطاء (Bug Report)',
    description: 'Structured bug reporting',
    description_ar: 'نموذج منظم لالإبلاغ عن الأخطاء'
  },
  {
    id: 'mlp-def',
    name: 'Minimum Lovable Product Def',
    name_ar: 'تعريف المنتج المحبوب الأولي',
    description: 'Criteria for the capstone project',
    description_ar: 'معايير مشروع التخرج'
  }
];

// Troubleshooting Scenarios
export const troubleshootingScenarios: TroubleshootingScenario[] = [
  {
    id: 'low-energy',
    title: '6.1 Low Energy Room',
    title_ar: '6.1 طاقة منخفضة (Low Energy)',
    symptoms: 'Silence, low participation',
    symptoms_ar: 'صمت، مشاركة منخفضة',
    script: 'Fix (60s): "Type in chat one thing you want AI to help you with this week." Then pick 1-2 and do CREAR live.',
    script_ar: 'حل (60 ثانية): "اكتبوا في الشات: مهمة واحدة تبغوا AI يساعدكم فيها هذا الأسبوع." ثم تختار 1–2 وتعمل CREAR live.'
  },
  {
    id: 'time-overrun',
    title: '6.2 Time Overrun',
    title_ar: '6.2 تأخرنا في الوقت',
    symptoms: 'Behind schedule',
    symptoms_ar: 'متأخرين عن الجدول',
    script: '"I will shorten this part so we don\'t lose practice." Skip to exercise.',
    script_ar: '"أنا رح أختصر هنا عشان ما نخسر practice." اقفز مباشرة للتمرين.'
  },
  {
    id: 'confused-learner',
    title: '6.3 Confused Learner',
    title_ar: '6.3 طالب ضايع',
    symptoms: 'Lost',
    symptoms_ar: 'ضائع',
    script: '2-min rescue: "Goal in one sentence?" "Who is audience/platform?" "Output format?" -> Paste CREAR skeleton and fill with them.',
    script_ar: 'إنقاذ دقيقتين: "قلّي Goal بجملة." "مين audience؟ وأي platform؟" "إيش Output format؟" ثم تلصق CREAR skeleton وتملأ معه.'
  },
  {
    id: 'tech-issues',
    title: '6.4 Tech Issues',
    title_ar: '6.4 مشاكل تقنية',
    symptoms: 'Login issues',
    symptoms_ar: 'مشاكل دخول/تسجيل',
    script: 'Buddy system or write prompt structure on Notes. "Don\'t lose learning because of login. Write structure now."',
    script_ar: 'Buddy system (يشوف مع زميل) أو يكتب prompt structure على Notes. "لا نخسر التعلم بسبب login. اكتب Prompt structure الآن."'
  },
  {
    id: 'endless-tweaking',
    title: '6.5 Endless Tweaking',
    title_ar: '6.5 تعديلات لا نهائية',
    symptoms: '5+ tries without improvement',
    symptoms_ar: 'يحاول 5 مرات بلا فائدة',
    script: '"Stop rule now. Rewrite foundation prompt with CREAR instead of random tweaks."',
    script_ar: '"Stop rule الآن. نعيد foundation prompt بـCREAR بدل تعديلات عشوائية."'
  },
  {
    id: 'day5-chaos',
    title: '6.6 Day 5 Chaos',
    title_ar: '6.6 فوضى اليوم الخامس (Scope Explosion)',
    symptoms: 'Scope exploded',
    symptoms_ar: 'السكوب انفجر',
    script: '"That is Version 2. Today is Minimum Lovable Product only."',
    script_ar: '"هذا Version 2. اليوم Minimum Lovable Product فقط."'
  }
];

// Q&A Management
export const qaManagement = {
  qaGate: {
    title: 'Q&A Gate',
    title_ar: 'بوابة الأسئلة',
    response: '"Before I answer: show me your Prompt + Output + Intended result in one sentence… and I’ll fix it fast."',
    response_ar: '"قبل ما أجاوب: ورّيني Prompt + Output + Intended result بجملة… وبحلها بسرعة."',
    fallback: '"Cool—let’s put it in the Parking Lot and revisit in the last 10 minutes if time allows."',
    fallback_ar: '"تمام، نخليها Parking Lot ونرجع لها آخر 10 دقائق لو بقي وقت."'
  },
  timeboxRules: [
    'Teaching: 2 questions only.',
    'Demo: 1 question only (if needed).',
    'Practice: Unlimited, but 2 mins per person.'
  ],
  timeboxRules_ar: [
    'أثناء Teaching: سؤالين فقط ثم نكمل.',
    'أثناء Demo: سؤال واحد فقط (لو يلزم).',
    'أثناء Practice: أسئلة كثيرة عادي، لكن كل شخص 2 دقائق.'
  ],
  parkingLot: 'Parking Lot',
  parkingLot_ar: 'موقف الانتظار (Parking Lot)',
  hybridTip: 'Online: Type "HELP: sentence". In-person: Raise hand + open prompt/output.',
  hybridTip_ar: 'الأونلاين: يكتبوا في الشات: HELP: ثم جملة واحدة. الموجودين بالقاعة: يرفعوا اليد + يفتحوا prompt/output جاهز.',
  helpRule: 'I only address HELP: messages during practice blocks.',
  helpRule_ar: 'أنا أتعامل مع رسائل HELP: فقط أثناء الـpractice blocks.'
};

// Session 0 (Free Intro Session)
export const session0Content: DayContent = {
  dayNumber: 0,
  title: 'Session 0 — Free Intro Session',
  title_ar: 'الجلسة 0 — جلسة تعريفية مجانية',
  subtitle: 'Convert visitors into qualified leads',
  subtitle_ar: 'تحويل الزوار إلى عملاء محتملين عبر CREAR',
  sessionLength: '50–60 min',
  outcomes: [
    { id: 's0-1', description: 'Know value of CREAR', description_ar: 'يعرفوا قيمة CREAR عمليًا' },
    { id: 's0-2', description: 'Strong CTA to form', description_ar: 'CTA محترمة لتعبئة form (بدون hype)' }
  ],
  timeline: [
    { time: '00:00–00:05', duration: '5 min', title: 'Welcome + who it’s for', title_ar: 'ترحيب + لمن هذه الجلسة' },
    { time: '00:05–00:12', duration: '7 min', title: 'The real problem', title_ar: 'المشكلة الحقيقية' },
    { time: '00:12–00:22', duration: '10 min', title: 'Teach CREAR + example', title_ar: 'شرح CREAR + مثال' },
    { time: '00:22–00:32', duration: '10 min', title: 'Demo: vague → CREAR', title_ar: 'ديمو: تحويل Prompt مبهم إلى CREAR' },
    { time: '00:32–00:42', duration: '10 min', title: 'Mini exercise', title_ar: 'تمرين مصغر' },
    { time: '00:42–00:50', duration: '8 min', title: 'What the 5 days cover', title_ar: 'ماذا تغطي الـ 5 أيام' },
    { time: '00:50–00:55', duration: '5 min', title: 'CTA (Form)', title_ar: 'الخاتمة وتسجيل' }
  ],
  talkTracks: [
    {
      id: 's0-welcome',
      title: 'Welcome',
      title_ar: 'ترحيب',
      time: '00:00–00:05',
      script: '"This session is for non-techies who feel AI is generic. Today you get one tool: CREAR."',
      script_ar: '"هذه الجلسة لغير التقنيين اللي يحسون AI يطلع outputs عامة. اليوم بتطلع بأداة واحدة: CREAR."'
    },
    {
      id: 's0-problem',
      title: 'The Real Problem',
      title_ar: 'المشكلة الحقيقية',
      time: '00:05–00:12',
      script: '"The problem is usually a vague prompt, not the tool."',
      script_ar: '"المشكلة غالبًا في prompt مبهم، مو الأداة."'
    },
    {
      id: 's0-cta',
      title: 'CTA',
      title_ar: 'الخاتمة',
      time: '00:50–00:55',
      script: '"If you want a fully hands-on cohort, fill the form. The team will contact you."',
      script_ar: '"إذا حاب تدخل cohort عملي بالكامل، عبّي form. بعد الإرسال الفريق يتواصل معك."'
    }
  ],
  exercises: [
    {
      id: 's0-ex1',
      title: 'Mini Exercise',
      title_ar: 'تمرين مصغر',
      duration: '10 min',
      instructions: [
        'Write a Before prompt (one line)',
        'Rewrite it using CREAR',
        'Run both and compare'
      ],
      instructions_ar: [
        'اكتب Prompt (Before) بسطر واحد',
        'اكتب نفس الـPrompt باستخدام CREAR (After)',
        'شغّل الاثنين وقارن'
      ],
      expectedOutput: 'Before/After Comparison',
      expectedOutput_ar: 'مقارنة قبل وبعد',
      debriefQuestions: [],
      debriefQuestions_ar: []
    }
  ]
};

// Day 1 Content
export const day1Content: DayContent = {
  dayNumber: 1,
  title: 'Day 1 — Foundations of Effective Prompting',
  title_ar: 'اليوم الأول — أسس التلقين الفعال',
  subtitle: 'CREAR + failure→fix',
  subtitle_ar: 'CREAR + من الفشل إلى الإصلاح',
  sessionLength: '120 min',
  outcomes: [
    { id: 'd1-1', description: 'Prompt Before (vague)', description_ar: 'Prompt Before (مبهم)' },
    { id: 'd1-2', description: 'Prompt After (CREAR)', description_ar: 'Prompt After مكتوب بـCREAR' },
    { id: 'd1-3', description: 'Improved Output', description_ar: 'Output محسّن واضح' },
    { id: 'd1-4', description: 'One Refinement (if needed)', description_ar: 'Refinement واحد (إذا احتاج)' }
  ],
  timeline: [
    { time: '00:00–00:05', duration: '5 min', title: 'Opening + Frame', title_ar: 'الافتتاح + الإطار' },
    { time: '00:05–00:10', duration: '5 min', title: 'Daily Opening Script + Q&A Rules', title_ar: 'السكريبت اليومي + قواعد الأسئلة' },
    { time: '00:10–00:20', duration: '10 min', title: 'Problem framing: Generic in → Generic out', title_ar: 'تأطير المشكلة: مدخل عام → مخرج عام' },
    { time: '00:20–00:35', duration: '15 min', title: 'Teach CREAR', title_ar: 'شرح CREAR' },
    { time: '00:35–00:50', duration: '15 min', title: 'Live Demo: failure→fix', title_ar: 'ديمو حي: من الفشل للإصلاح' },
    { time: '00:50–00:55', duration: '5 min', title: 'Break', title_ar: 'استراحة' },
    { time: '00:55–01:20', duration: '25 min', title: 'Exercise 1: Before/After CREAR', title_ar: 'تمرين 1: قبل وبعد CREAR' },
    { time: '01:20–01:35', duration: '15 min', title: 'Pair Share: Spot missing CREAR', title_ar: 'مشاركة ثنائية: اكتشف الناقص' },
    { time: '01:35–01:50', duration: '15 min', title: 'Debrief: Patterns → Fixes', title_ar: 'مراجعة جماعية: الأنماط والحلول' },
    { time: '01:50–02:00', duration: '10 min', title: 'Wrap + Homework', title_ar: 'الختام + الواجب' }
  ],
  talkTracks: [
    {
      id: 'd1-opening',
      title: 'Opening',
      title_ar: 'الافتتاح',
      time: '00:00–00:05',
      script: '"Welcome… today we lock the foundation: why outputs become generic, and how CREAR makes results clear and useful fast."',
      script_ar: '"أهلًا… اليوم بنثبت الأساس: ليش outputs تطلع generic؟ وكيف CREAR يخلي النتائج واضحة ومفيدة بسرعة."'
    },
    {
      id: 'd1-framing',
      title: 'Problem Framing',
      title_ar: 'تأطير المشكلة',
      time: '00:10–00:20',
      script: '"AI can’t read your mind. A vague prompt forces guesses: audience, platform, goal, constraints. Today we stop guessing."',
      script_ar: '"AI ما يقرأ ذهنك. لما تعطي Prompt عام، الأداة تضطر تخمن: الجمهور؟ المنصة؟ الهدف؟ القيود؟ إحنا اليوم بنوقف التخمين."'
    },
    {
      id: 'd1-crear',
      title: 'Teach CREAR',
      title_ar: 'شرح CREAR',
      time: '00:20–00:35',
      script: 'CREAR = Context + Role + Examples + Action/Format + Refinement.',
      script_ar: 'CREAR = Context (سياق) + Role (دور) + Examples (أمثلة) + Action/Format (فعل/تنسيق) + Refinement (تحسين).'
    },
    {
      id: 'd1-demo',
      title: 'Live Demo',
      title_ar: 'ديمو حي',
      time: '00:35–00:50',
      script: 'Show Bad Prompt: "Write a caption for my post." -> Then show CREAR Prompt (Context, Role, Examples...). Refinement: "Make it 15% shorter."',
      script_ar: 'Bad Prompt: "اكتب Caption لمنشوري." -> CREAR Prompt: "Context: IG Reel... Role: Copywriter...". Refinement: "Make the best option 15% shorter."'
    },
    {
      id: 'd1-homework',
      title: 'Homework',
      title_ar: 'الواجب',
      time: '01:50–02:00',
      script: '"Homework: bring one ‘almost good’ Output tomorrow. We’ll improve it with Refinement in 1–3 tries."',
      script_ar: '"Homework بسيط: جيب بكرا Output ‘almost good’—قريب من المطلوب لكنه يحتاج Refinement. لا تجيب شيء من الصفر."'
    }
  ],
  exercises: [
    {
      id: 'd1-ex1',
      title: 'Before/After CREAR',
      title_ar: 'قبل وبعد CREAR',
      duration: '25 min',
      instructions: [
        'Task: Choose a real task you need this week.',
        'Write a one-line Prompt (Before).',
        'Rewrite it using CREAR (After).',
        'Run both. Save Best Output.'
      ],
      instructions_ar: [
        'المهمة: اختر مهمة حقيقية تحتاجها هذا الأسبوع.',
        'اكتب Prompt (Before) بسطر واحد.',
        'اكتب نفس الـPrompt باستخدام CREAR (After).',
        'Run الاثنين. احفظ أفضل Output.'
      ],
      expectedOutput: 'Before Prompt, After Prompt (CREAR), Best Output',
      expectedOutput_ar: 'Before Prompt + After Prompt + Best Output',
      debriefQuestions: ['Which CREAR element changed the result the most?'],
      debriefQuestions_ar: ['أي عنصر من CREAR غيّر النتيجة أكثر شيء؟']
    }
  ]
};

// Day 2 Content
export const day2Content: DayContent = {
  dayNumber: 2,
  title: 'Day 2 — Iterating to Excellence',
  title_ar: 'اليوم الثاني — التكرار نحو التميز',
  subtitle: 'Refinement templates + stop rule',
  subtitle_ar: 'قوالب التحسين + قاعدة التوقف',
  sessionLength: '120 min',
  outcomes: [
    { id: 'd2-1', description: 'Improved Output via Refinement #1 & #2', description_ar: 'Output محسّن عبر Refinement #1 و #2' },
    { id: 'd2-2', description: 'Practical understanding of stop rule', description_ar: 'فهم عملي لـ stop rule' }
  ],
  timeline: [
    { time: '00:00–00:05', duration: '5 min', title: 'Opening', title_ar: 'الافتتاح' },
    { time: '00:05–00:15', duration: '10 min', title: 'Why first draft is normal', title_ar: 'لماذا المسودة الأولى طبيعية' },
    { time: '00:15–00:30', duration: '15 min', title: 'Teach Refinement Moves', title_ar: 'شرح حركات التحسين' },
    { time: '00:30–00:45', duration: '15 min', title: 'Live Demo: Two refinements only', title_ar: 'ديمو: تحسينين فقط' },
    { time: '00:45–00:50', duration: '5 min', title: 'Break', title_ar: 'استراحة' },
    { time: '00:50–01:25', duration: '35 min', title: 'Exercise 1: Two-Try Refinement', title_ar: 'تمرين 1: تحسين بمحاولتين' },
    { time: '01:25–01:40', duration: '15 min', title: 'Stop rule drill', title_ar: 'تمرين قاعدة التوقف' },
    { time: '01:40–01:55', duration: '15 min', title: 'Debrief: Best Refinement prompts', title_ar: 'مراجعة: أفضل أوامر التحسين' },
    { time: '01:55–02:00', duration: '5 min', title: 'Wrap', title_ar: 'الختام' }
  ],
  talkTracks: [
    {
      id: 'd2-why-draft',
      title: 'Why First Draft',
      title_ar: 'لماذا المسودة الأولى',
      time: '00:05–00:15',
      script: '"Today we work as editors. First output is a draft. Difference is specific feedback, not ‘make it better’."',
      script_ar: '"اليوم بنشتغل كمحررين. أول output غالبًا draft. الفرق: feedback واضح ومحدد، مش ‘make it better’."'
    },
    {
      id: 'd2-rules',
      title: 'Refinement Rules',
      title_ar: 'قواعد التحسين',
      time: '00:15–00:30',
      script: 'Rule: Change 1-2 things only per try. Use measurements (cut 40%, 5 bullets). If try 3-4 no good -> stop rule.',
      script_ar: 'قاعدة Refinement: كل محاولة تغيّر 1–2 أشياء فقط. استخدم قياس: cut by 40%, 5 bullets. لو attempt 3–4 ما يتحسن: stop rule.'
    },
    {
      id: 'd2-stop-rule',
      title: 'Stop Rule',
      title_ar: 'قاعدة التوقف',
      time: '01:25–01:40',
      script: '"If you reach try 4 with same problem... foundation prompt is weak. Stop rule: rewrite foundation with CREAR."',
      script_ar: '"إذا وصلت محاولة 4 ولسه نفس المشكلة… هذا دليل إن foundation prompt ناقص. stop rule: نعيد الكتابة بـCREAR."'
    }
  ],
  exercises: [
    {
      id: 'd2-ex1',
      title: 'Two-Try Refinement',
      title_ar: 'تحسين بمحاولتين',
      duration: '35 min',
      instructions: [
        '1) Pick "almost good" output.',
        '2) Write biggest problem in one sentence.',
        '3) Refinement #1: fix one thing.',
        '4) Refinement #2: add specificity.',
        '5) Save.'
      ],
      instructions_ar: [
        '1) اختر Output ‘almost good’.',
        '2) اكتب المشكلة الأكبر بجملة واحدة.',
        '3) Refinement #1: أصلّح شيء واحد.',
        '4) Refinement #2: أضف specificity.',
        '5) احفظ.'
      ],
      expectedOutput: 'Problem, Refinement #1, Refinement #2, Final output',
      expectedOutput_ar: 'مشكلة، Refinement #1، Refinement #2، النتيجة النهائية',
      debriefQuestions: [],
      debriefQuestions_ar: []
    }
  ]
};

// Day 3 Content
export const day3Content: DayContent = {
  dayNumber: 3,
  title: 'Day 3 — Trust but Verify',
  title_ar: 'اليوم الثالث — ثق ولكن تحقق',
  subtitle: 'Verification + tool-switching logic',
  subtitle_ar: 'التحقق + منطق تبديل الأدوات',
  sessionLength: '120 min',
  outcomes: [
    { id: 'd3-1', description: 'Verified claim + source name', description_ar: 'claim تم verified + source name' },
    { id: 'd3-2', description: 'Updated output based on verification', description_ar: 'تحديث output بناءً على verification' },
    { id: 'd3-3', description: 'Understand Draft → Verify → Update', description_ar: 'فهم Draft → Verify → Update' }
  ],
  timeline: [
    { time: '00:00–00:05', duration: '5 min', title: 'Opening', title_ar: 'الافتتاح' },
    { time: '00:05–00:20', duration: '15 min', title: 'Why AI can be confidently wrong', title_ar: 'لماذا يخطئ الذكاء الاصطناعي بثقة' },
    { time: '00:20–00:35', duration: '15 min', title: 'Verification triggers', title_ar: 'متى نتحقق؟' },
    { time: '00:35–00:50', duration: '15 min', title: 'Live Demo: Draft -> Verify -> Update', title_ar: 'ديمو: مسودة -> تحقق -> تحديث' },
    { time: '00:50–00:55', duration: '5 min', title: 'Break', title_ar: 'استراحة' },
    { time: '00:55–01:25', duration: '30 min', title: 'Exercise: Verify one claim', title_ar: 'تمرين: تحقق من ادعاء واحد' },
    { time: '01:25–01:45', duration: '20 min', title: 'Debrief: Source quality + safe phrasing', title_ar: 'مراجعة: جودة المصادر والصياغة الآمنة' },
    { time: '01:45–02:00', duration: '15 min', title: 'Wrap + Day 4 preview', title_ar: 'الختام + مقدمة اليوم الرابع' }
  ],
  talkTracks: [
    {
      id: 'd3-wrong',
      title: 'Confident Errors',
      title_ar: 'أخطاء واثقة',
      time: '00:05–00:20',
      script: '"AI is great at phrasing, not facts. It fails on numbers, recent updates, pricing. If it causes embarrassment -> Verify."',
      script_ar: '"AI ممتاز بالصياغة، لكن مش ضمان حقيقة. يغلط في: أرقام، تحديثات حديثة، ميزات أدوات. إذا ممكن يسبب إحراج -> لازم Verification."'
    },
    {
      id: 'd3-triggers',
      title: 'Verification Triggers',
      title_ar: 'محفزات التحقق',
      time: '00:20–00:35',
      script: 'Verify if: numbers/stats, dates/recent updates, tool features/pricing, high-stakes.',
      script_ar: 'نعمل Verification عندما يكون عندنا: numbers/statistics, dates/recent updates, tool features/pricing, أي شيء high-stakes.'
    },
    {
      id: 'd3-demo',
      title: 'Demo Script',
      title_ar: 'ديمو',
      time: '00:35–00:50',
      script: '"I will write a claim. Then ask Gemini to verify + sources. Then update the text. Goal: one verified sentence."',
      script_ar: '"سأكتب فقرة فيها claim. بعدين أروح Gemini: verify + sources. بعدين أرجع وأحدث النص. هدفنا مش 20 رابط. هدفنا جملة واحدة verified قابلة للاستخدام."'
    }
  ],
  exercises: [
    {
      id: 'd3-ex1',
      title: 'Verify one claim',
      title_ar: 'تحقق من ادعاء واحد',
      duration: '30 min',
      instructions: [
        '1) Pick one claim.',
        '2) Gemini: request verification + sources.',
        '3) Write: original + verified replacement + source name.',
        '4) Update final output.'
      ],
      instructions_ar: [
        '1) اختر claim واحد.',
        '2) في Gemini: اطلب verification + sources.',
        '3) اكتب: original claim + verified replacement + source name.',
        '4) حدّث output النهائي.'
      ],
      expectedOutput: 'Original, Verified replacement, Source Name, Updated Output',
      expectedOutput_ar: 'الأصل، البديل الموثق، اسم المصدر، النتيجة المحدثة',
      debriefQuestions: [],
      debriefQuestions_ar: []
    }
  ]
};

// Day 4 Content
export const day4Content: DayContent = {
  dayNumber: 4,
  title: 'Day 4 — From Plan to Prep',
  title_ar: 'اليوم الرابع — من التخطيط للتجهيز',
  subtitle: 'Mini-PRD + scope control + assets + build prompt',
  subtitle_ar: 'Mini-PRD + التحكم بالنطاق + الأصول + أمر البناء',
  sessionLength: '120 min',
  outcomes: [
    { id: 'd4-1', description: 'Complete Mini-PRD', description_ar: 'Mini-PRD كامل' },
    { id: 'd4-2', description: 'Must-haves ≤ 5', description_ar: 'Must-haves ≤ 5' },
    { id: 'd4-3', description: 'One Asset Ready', description_ar: 'asset واحد جاهز' },
    { id: 'd4-4', description: 'Lovable Build Prompt Ready', description_ar: 'Lovable build prompt جاهز' }
  ],
  timeline: [
    { time: '00:00–00:05', duration: '5 min', title: 'Opening', title_ar: 'الافتتاح' },
    { time: '00:05–00:15', duration: '10 min', title: 'Minimum Lovable Product', title_ar: 'المنتج المحبوب الأولي' },
    { time: '00:15–00:30', duration: '15 min', title: 'Mini-PRD walkthrough', title_ar: 'شرح Mini-PRD' },
    { time: '00:30–00:45', duration: '15 min', title: 'Live Demo: Idea -> Mini-PRD -> Build Prompt', title_ar: 'ديمو: فكرة -> Mini-PRD -> أمر بناء' },
    { time: '00:45–00:50', duration: '5 min', title: 'Break', title_ar: 'استراحة' },
    { time: '00:50–01:30', duration: '40 min', title: 'Exercise 1: Write Mini-PRD + Verify List', title_ar: 'تمرين 1: كتابة Mini-PRD + قائمة التحقق' },
    { time: '01:30–01:50', duration: '20 min', title: 'Exercise 2: Asset Prep + Final Prompt', title_ar: 'تمرين 2: تجهيز الأصول + الأمر النهائي' },
    { time: '01:50–02:00', duration: '10 min', title: 'Readiness check', title_ar: 'فحص الجاهزية' }
  ],
  talkTracks: [
    {
      id: 'd4-mlp',
      title: 'MLP Definition',
      title_ar: 'تعريف MLP',
      time: '00:05–00:15',
      script: '"Capstone must be Minimum Lovable Product. Minimum: one session. Lovable: one delightful feature. Product: works + link. Anything bigger = scope cut."',
      script_ar: '"capstone اليوم لازم يكون Minimum Lovable Product. Minimum: ينتهي بجلسة واحدة. Lovable: ميزة واحدة مبهجة. Product: شغال + shareable link."'
    },
    {
      id: 'd4-prd',
      title: 'Mini-PRD',
      title_ar: 'وثيقة Mini-PRD',
      time: '00:15–00:30',
      script: '"Mini-PRD prevents chaos. Must-haves max 5. Anything else is Nice-to-have."',
      script_ar: '"Mini-PRD يمنع الفوضى. Must-haves خمسة فقط. أي زيادة تتحول Nice-to-haves."'
    },
    {
      id: 'd4-demo',
      title: 'Demo',
      title_ar: 'ديمو',
      time: '00:30–00:45',
      script: '"I convert Mini-PRD into clear build instructions for Lovable."',
      script_ar: '"أنا الآن أحوّل الـMini-PRD إلى build instructions واضحة لـLovable."'
    }
  ],
  exercises: [
    {
      id: 'd4-ex1',
      title: 'Mini-PRD',
      title_ar: 'Mini-PRD',
      duration: '40 min',
      instructions: [
        'Write Mini-PRD.',
        'Rules: Must-haves <= 5.',
        'Add verify list.',
        'Add test steps.'
      ],
      instructions_ar: [
        'اكتب Mini-PRD لفكرة capstone الخاصة بك.',
        'Rules: Must-haves ≤ 5.',
        'أضف verify list لأي facts.',
        'أضف Test steps (3 checks).'
      ],
      expectedOutput: 'Mini-PRD, Must-haves <= 5, Verify list, Test steps',
      expectedOutput_ar: 'Mini-PRD كامل، Must-haves 5 أو أقل، verify list، test steps',
      debriefQuestions: [],
      debriefQuestions_ar: []
    }
  ]
};

// Day 5 Content
export const day5Content: DayContent = {
  dayNumber: 5,
  title: 'Day 5 — Build & Ship',
  title_ar: 'اليوم الخامس — البناء والإطلاق',
  subtitle: 'Lovable build + iterations + deploy',
  subtitle_ar: 'بناء Lovable + تكرار + إطلاق',
  sessionLength: '120 min',
  outcomes: [
    { id: 'd5-1', description: 'Working Project', description_ar: 'مشروع شغال' },
    { id: 'd5-2', description: 'Shareable Link', description_ar: 'رابط قابل للمشاركة' },
    { id: 'd5-3', description: 'At least one iteration via Bug Report', description_ar: 'iteration واحد على الأقل عبر Bug Report' },
    { id: 'd5-4', description: '30 sec Showcase', description_ar: 'showcase 30 ثانية' }
  ],
  timeline: [
    { time: '00:00–00:10', duration: '10 min', title: 'Build rules', title_ar: 'قواعد البناء' },
    { time: '00:10–00:25', duration: '15 min', title: 'Live Demo: build->test->bug->fix->deploy', title_ar: 'ديمو: بناء -> اختبار -> إصلاح -> إطلاق' },
    { time: '00:25–00:30', duration: '5 min', title: 'Q&A', title_ar: 'أسئلة' },
    { time: '00:30–01:25', duration: '55 min', title: 'Build Sprint #1', title_ar: 'جولة البناء 1' },
    { time: '01:25–01:35', duration: '10 min', title: 'Break', title_ar: 'استراحة' },
    { time: '01:35–01:50', duration: '15 min', title: 'Build Sprint #2: Deploy', title_ar: 'جولة البناء 2: الإطلاق' },
    { time: '01:50–02:00', duration: '10 min', title: 'Showcase Lightning Round', title_ar: 'جولة العرض السريع' }
  ],
  talkTracks: [
    {
      id: 'd5-rules',
      title: 'Build Rules',
      title_ar: 'قواعد البناء',
      time: '00:00–00:10',
      script: '"Today one goal: Ship. Not perfect. Rules: Start simple, Test after every change, Fix one thing at a time, Feature explosion = backlog."',
      script_ar: '"اليوم هدف واحد: Ship. مش perfect. قواعد: Start simple, Test بعد كل تغيير, Fix مشكلة واحدة كل مرة, Feature explosion = backlog (Version 2)."'
    },
    {
      id: 'd5-bug-report',
      title: 'Bug Report',
      title_ar: 'تقرير الأخطاء',
      time: '00:10–00:25',
      script: '"Without Steps to reproduce, there is no bug report. We must write the problem in a fixable way."',
      script_ar: '"بدون Steps to reproduce ما في bug report. لازم نكتب المشكلة بطريقة قابلة للإصلاح."'
    }
  ],
  exercises: [
    {
      id: 'd5-ex1',
      title: 'Build Sprint',
      title_ar: 'جولة البناء',
      duration: '55 min',
      instructions: [
        'Build.',
        'If scope is too big -> Cut to Must-haves.',
        'If output is bad -> Go back to CREAR.',
        'If stuck -> Use Bug Report template.'
      ],
      instructions_ar: [
        'إذا scope كبير → تقصه فورًا إلى Must-haves فقط',
        'إذا output سيء → رجّعه لـCREAR',
        'إذا stuck في iteration → bug report template'
      ],
      expectedOutput: 'Working core',
      expectedOutput_ar: 'نسخة أولية تعمل',
      debriefQuestions: [],
      debriefQuestions_ar: []
    }
  ]
};

export const allDaysContent: DayContent[] = [
  session0Content,
  day1Content,
  day2Content,
  day3Content,
  day4Content,
  day5Content
];

// Templates Library
export const templatesLibrary = {
  crearBuilder: {
    title: 'CREAR Prompt Builder',
    content_en: `Context: [2–3 lines: situation + platform + audience + goal]
Role: You are a [role].
Examples: [style reference or small sample / what ‘good’ looks like]
Action/Format: [exact task] + Output format: [bullets/table/steps/outline] + constraints: [length/tone]
Refinement: After output, apply: [one measurable change]`,
    content_ar: `Context: [اشرح الوضع بالعربي + platform + audience + goal في 2–3 أسطر]
Role: You are a [role].
Examples: [style reference أو sample صغير أو what ‘good’ looks like]
Action/Format: [المطلوب بالضبط] + Output format: [bullets/table/steps/outline] + constraints: [length/tone]
Refinement: After output, apply: [تعديل واحد measurable]`
  },
  refinementPack: {
    title: 'Refinement Pack',
    content_en: `Refinement: Cut by 40% and keep only actionable points.
Refinement: Convert into 5 bullets with strong verbs.
Refinement: Rewrite in a practical, confident tone. No clichés.
Refinement: Add one concrete example to point #2.
Refinement: Make it specific to [audience] on [platform].`,
    content_ar: `Refinement: Cut by 40% and keep only actionable points.
Refinement: Convert into 5 bullets with strong verbs.
Refinement: Rewrite in a practical, confident tone. No clichés.
Refinement: Add one concrete example to point #2.
Refinement: Make it specific to [audience] on [platform].
(نفس القائمة بالإنجليزية لضمان الدقة)`
  },
  stopRule: {
    title: 'Stop Rule Prompt',
    content_en: `Stop rule: attempts are not improving. Rewrite the foundation prompt using CREAR. Strengthen Context and Action/Format. Add Examples. Then generate again.`,
    content_ar: `Stop rule: attempts are not improving. Rewrite the foundation prompt using CREAR. Strengthen Context and Action/Format. Add Examples. Then generate again.`
  },
  verification: {
    title: 'Verification Prompt (Gemini)',
    content_en: `Verify the following claim and provide credible sources (include source name and date if possible):
Claim: ‘[claim]’
Context: [where it will be used]
Return: 1) verified statement, 2) sources list, 3) uncertainty notes.`,
    content_ar: `Verify the following claim and provide credible sources (include source name and date if possible):
Claim: ‘[اكتب الـclaim]’
Context: [أين سيستخدم؟]
Return: 1) verified statement, 2) sources list, 3) uncertainty notes.`
  },
  miniPrd: {
    title: 'Mini-PRD Template',
    content_en: `Overview: "This is a [product] for [audience] to [job-to-be-done]."

Must-haves (max 5):
1. ...
2. ...
3. ...
4. ...
5. ...

Nice-to-haves (later): ...
Explicit exclusions (not building): ...
Assets needed (text/images/links): ...
What must be verified (facts/claims): ...

Test steps (3 checks):
Check 1: ...
Check 2: ...
Check 3: ...`,
    content_ar: `Overview: "This is a [product] for [audience] to [job-to-be-done]."

Must-haves (max 5):
1. ...
2. ...
3. ...
4. ...
5. ...

Nice-to-haves (later): ...
Explicit exclusions (not building): ...
Assets needed (text/images/links): ...
What must be verified (facts/claims): ...

Test steps (3 checks):
Check 1: ...
Check 2: ...
Check 3: ...`
  },
  lovableBuild: {
    title: 'Lovable Build Prompt Template',
    content_en: `Build a Minimum Lovable Product based on this Mini-PRD.
Constraints: keep it short, scannable, consistent spacing, clear hierarchy, accessible labels and error states if forms exist.
Must-haves:
...
Lovable feature (one only): ...
Assets: [paste text + links]
Output requirements: [pages/components]
Test steps:
Step 1: ... Expected: ...`,
    content_ar: `Build a Minimum Lovable Product based on this Mini-PRD.
Constraints: keep it short, scannable, consistent spacing, clear hierarchy, accessible labels and error states if forms exist.
Must-haves:
...
Lovable feature (one only): ...
Assets: [paste text + links]
Output requirements: [pages/components]
Test steps:
Step 1: ... Expected: ...`
  },
  bugReport: {
    title: 'Bug Report Template',
    content_en: `Bug Report
Steps to reproduce: 1) ... 2) ... 3) ...
Expected: ...
Actual: ...
Fix only this: ...
Notes: ...`,
    content_ar: `Bug Report
Steps to reproduce: 1) ... 2) ... 3) ...
Expected: ...
Actual: ...
Fix only this: ...
Notes: ...`
  },
  helpMsg: {
    title: 'HELP Message Template',
    content_en: `HELP:
Prompt: [paste]
Output: [paste]
Intended result: [one sentence]`,
    content_ar: `HELP:
Prompt: [paste]
Output: [paste]
Intended result: [one sentence]`
  }
};
