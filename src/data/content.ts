export const navLinks = [
  { label: "Services", href: "#solution" },
  { label: "Packages", href: "#packages" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "FAQ", href: "#faq" },
];

export const problems = [
  {
    title: "Your site looks like it was built in 2018",
    description:
      "First impressions happen in milliseconds. An outdated site tells customers to look elsewhere before you've said a word.",
    icon: "AlertTriangle",
  },
  {
    title: "Visitors leave confused",
    description:
      "If someone can't figure out what you do and why you're the right choice within 5 seconds, they're gone.",
    icon: "MessageCircleX",
  },
  {
    title: "Pretty doesn't pay",
    description:
      "A good-looking site without a lead flow is just an expensive brochure. Looks mean nothing without structure.",
    icon: "TrendingDown",
  },
];

export const solutionValues = [
  {
    title: "Fast Launch",
    description:
      "Your website goes live in 7 days. No waiting months for a build that should take a week.",
    stat: "5.2 days",
    statLabel: "average build time",
    icon: "Rocket",
  },
  {
    title: "Conversion-Focused Design",
    description:
      "Every element is placed with intent. Structure, copy, and CTAs designed to turn visitors into enquiries.",
    stat: "4.8%",
    statLabel: "avg conversion rate (industry: 2.1%)",
    icon: "Target",
  },
  {
    title: "Simple, Guided Process",
    description:
      "We make it easy on you. A clear, step-by-step process with minimal lift required from your end.",
    stat: "2 calls",
    statLabel: "needed from you — that's it",
    icon: "ListChecks",
  },
];

export const packages = [
  {
    id: "fast",
    name: "Fast",
    price: "$1,500",
    period: "one-time",
    description:
      "Get a clean, modern website online in 7 days. Everything you need to launch fast.",
    features: [
      "1–5 pages",
      "Mobile-optimized design",
      "Modern, clean layout",
      "Contact or booking integration",
      "Basic SEO setup",
      "7-day turnaround",
    ],
    highlighted: false,
    badge: null,
    cta: "Get Started",
  },
  {
    id: "professional",
    name: "Professional",
    price: "$1,500",
    period: "one-time",
    description:
      "A conversion-focused website built to generate leads and grow your business.",
    features: [
      "Everything in Fast",
      "Conversion-focused structure",
      "Strong call-to-action flow",
      "Lead capture sections",
      "Automation-ready setup",
      "Priority support",
    ],
    highlighted: true,
    badge: "Most Popular",
    cta: "Book a Call",
  },
];

export const addons = [
  {
    name: "Automation Setup",
    price: "from $300",
    description: "CRM, email sequences, and lead routing.",
    icon: "Zap",
  },
  {
    name: "SEO Setup",
    price: "from $250",
    description: "On-page SEO, sitemap, and schema markup.",
    icon: "Search",
  },
  {
    name: "Funnel Page",
    price: "from $350",
    description: "High-converting landing page for campaigns.",
    icon: "TrendingUp",
  },
  {
    name: "Chatbot Integration",
    price: "from $250",
    description: "AI chatbot to capture and qualify leads 24/7.",
    icon: "MessageSquare",
  },
  {
    name: "Copywriting",
    price: "from $200",
    description: "Conversion copy written for your business.",
    icon: "PenLine",
  },
];

export const growthPlans = [
  {
    name: "Care",
    price: "$49",
    period: "month",
    description: "Keep your site running smoothly.",
    features: ["Maintenance & updates", "Small content edits", "Basic support"],
    highlighted: false,
    badge: null,
  },
  {
    name: "Growth",
    price: "$99",
    period: "month",
    description: "Continuously improve performance.",
    features: [
      "Monthly improvements",
      "Conversion tweaks",
      "Priority support",
    ],
    highlighted: true,
    badge: "Best Value",
  },
  {
    name: "Scale",
    price: "$149",
    period: "month",
    description: "Full ongoing growth and optimisation.",
    features: [
      "Funnel improvements",
      "Automation support",
      "Ongoing optimisation",
    ],
    highlighted: false,
    badge: null,
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We learn your business, your goals, and your audience in a short kick-off call.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "We map out site structure, conversion flow, and messaging before a single pixel is placed.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Your site is built fast, clean, and exactly to spec. You'll see a live preview before launch.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "We deploy, test across devices, and hand over your fully optimised, ready-to-go website.",
  },
];

export const projects = [
  {
    category: "Construction & Trades",
    title: "Pezcrete",
    summary:
      "A modern, lead-focused website for a concrete specialist. Clean layout with clear CTAs designed to drive quote requests and phone enquiries.",
    tags: ["Website", "SEO"],
    image: "/portfolio-images/pezcrete/pezcrete.png",
    url: "https://pezcrete.vercel.app/",
    domain: null,
  },
  {
    category: "Health & Fitness",
    title: "Hyperfit",
    summary:
      "Full website build for a fitness brand. Conversion-focused design with membership CTAs and a bold visual identity that drives sign-ups.",
    tags: ["Website", "Funnel"],
    image: "/portfolio-images/hyperfit/hyperfit.png",
    url: "https://hyperfit.com.au/",
    domain: "hyperfit.com.au",
  },
  {
    category: "Construction & Building",
    title: "Bayliss Building Group",
    summary:
      "Professional website for a building and construction company. Strong brand presence with a project showcase and streamlined enquiry flow.",
    tags: ["Website", "Booking"],
    image: "/portfolio-images/bayliss-building-group/bayliss-building-group.png",
    url: "https://bayliss-building-group.vercel.app/",
    domain: null,
  },
  {
    category: "Finance & Planning",
    title: "BudgetFlow",
    summary:
      "Clean, trust-focused website for a financial planning service. Structured to build credibility and convert visitors into booked consultations.",
    tags: ["Website", "Funnel", "SEO"],
    image: "/portfolio-images/budgetflow/budgetflow.png",
    url: "https://financial-budget-planning.vercel.app/",
    domain: null,
  },
];

export const testimonials = [
  {
    name: "Jason P.",
    role: "Owner",
    business: "Pezcrete",
    url: "https://pezcrete.vercel.app/",
    content:
      "Got our site up in under a week. Looks professional, loads fast, and we've already had enquiries coming through the form. Exactly what we needed.",
    rating: 5,
  },
  {
    name: "Liam T.",
    role: "Founder",
    business: "Hyperfit",
    url: "https://hyperfit.com.au/",
    content:
      "We needed something that matched our brand and drove sign-ups. The result was better than expected — clean, modern, and it actually converts.",
    rating: 5,
  },
  {
    name: "Mark B.",
    role: "Director",
    business: "Bayliss Building Group",
    url: "https://bayliss-building-group.vercel.app/",
    content:
      "Our old site was holding us back. The new one looks premium and has made a real difference in how we present to clients. Great experience throughout.",
    rating: 5,
  },
  {
    name: "Sarah M.",
    role: "Founder",
    business: "BudgetFlow",
    url: "https://financial-budget-planning.vercel.app/",
    content:
      "Fast turnaround, clear communication, and the final product was exactly what we needed. The process was painless. Would 100% recommend.",
    rating: 5,
  },
];

export const faqs = [
  {
    question: "How fast can you really build the website?",
    answer:
      "Most builds go live within 7 business days from the start of the build phase. Before we begin, we complete a short discovery and strategy session to align on scope. The 7-day clock starts once we have your content, brand assets, and final scope confirmed.",
  },
  {
    question: "What do I need to provide?",
    answer:
      "We keep it simple. You'll need your logo, brand colours (if you have them), any photos you want to use, and a rough idea of the copy for each page. If you don't have everything, that's fine — copywriting and photo sourcing are available as add-ons.",
  },
  {
    question: "Can you help with copywriting?",
    answer:
      "Yes. We offer a copywriting add-on from $200 that covers website copy written to convert visitors into enquiries. We'll send you a short brief to complete, then we write the content for you.",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Yes — that's what our Website Growth Plan is for. Starting from $49/month, you stay on for maintenance, edits, monthly improvements, and priority support depending on which plan suits you best.",
  },
  {
    question: "Can I add automation or extra features later?",
    answer:
      "Absolutely. All our builds are automation-ready from day one. Whether you want to add a CRM integration, a chatbot, lead nurture sequences, or a funnel page down the track — we can handle it. Add-on services are available at any time.",
  },
];
