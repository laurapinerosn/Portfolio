export const site = {
  name: "Laura Piñeros",
  title: "Mathematician · Data Scientist · Curious mind",
  email: "laumath140@gmail.com",
  github: "https://github.com/laurapinerosn/Portfolio",
  linkedin: "https://www.linkedin.com/in/",
};

export type Project = {
  id: string;
  number: string;
  title: string;
  tagline: string;
  visual: "football" | "forecast" | "mmm" | "media" | "credit";
  href: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    id: "football",
    number: "01",
    title: "Football Analytics",
    tagline: "Understanding the game through data.",
    visual: "football",
    href: "/case-studies/scoutmetrics-football",
    tags: ["Spatial stats", "Scouting", "Trajectories"],
  },
  {
    id: "forecast",
    number: "02",
    title: "Forecasting",
    tagline: "Looking at what comes next.",
    visual: "forecast",
    href: "/case-studies/msc-pv-load-curves",
    tags: ["Time series", "Uncertainty", "Horizon"],
  },
  {
    id: "mmm",
    number: "03",
    title: "Marketing Mix Modeling",
    tagline: "From investment to impact.",
    visual: "mmm",
    href: "/case-studies/d2b-meridian-mmm",
    tags: ["MMM", "ROI", "Response curves"],
  },
  {
    id: "media",
    number: "04",
    title: "Media Analytics",
    tagline: "Understanding audiences.",
    visual: "media",
    href: "/case-studies/caracol-ditu-crossmedia",
    tags: ["Cross-media", "Audience", "Signals"],
  },
  {
    id: "credit",
    number: "05",
    title: "Credit Risk",
    tagline: "Making uncertainty measurable.",
    visual: "credit",
    href: "/case-studies/nae-claro-banking",
    tags: ["Probability", "Risk", "Features"],
  },
];

export const principles = [
  {
    number: "01",
    title: "Ask",
    body: "Before building a model, I want to understand the question behind the question.",
  },
  {
    number: "02",
    title: "Connect",
    body: "Sometimes the most interesting solution comes from connecting ideas that don’t seem related at first.",
  },
  {
    number: "03",
    title: "Simplify",
    body: "Complexity is not always intelligence. I like finding the structure underneath it.",
  },
  {
    number: "04",
    title: "Build",
    body: "An analysis becomes valuable when it helps someone see something differently.",
  },
];

export const curiosities = [
  {
    id: "q1",
    question: "Can we understand football tactics through spatial statistics?",
    hint: "Pitch geometry · heat fields · passing graphs",
  },
  {
    id: "q2",
    question: "What does a good forecast actually mean?",
    hint: "Calibration · horizon · decision usefulness",
  },
  {
    id: "q3",
    question:
      "Can marketing attribution be explained without turning it into a black box?",
    hint: "Response curves · interpretable structure",
  },
  {
    id: "q4",
    question: "What can mathematical models tell us about human behavior?",
    hint: "Probability · patterns · incentives",
  },
  {
    id: "q5",
    question:
      "What happens when we combine football + mathematics + computer vision?",
    hint: "Trajectories · pose · spatial models",
  },
];

export const skillGroups = [
  {
    title: "Mathematics",
    items: [
      "Statistics",
      "Probability",
      "Mathematical Modeling",
      "Optimization",
    ],
  },
  {
    title: "Data Science",
    items: ["Machine Learning", "Forecasting", "Bayesian Modeling", "NLP"],
  },
  {
    title: "Analytics",
    items: [
      "Business Analytics",
      "Marketing Analytics",
      "Media Analytics",
      "Football Analytics",
    ],
  },
  {
    title: "Tools",
    items: [
      "Python",
      "SQL",
      "R",
      "BigQuery",
      "Power BI",
      "Snowflake",
      "Git",
    ],
  },
];
