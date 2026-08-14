export const personal = {
  name: 'Rishabh Raj Gupta',
  shortName: 'Rishabh Raj',
  initials: 'RG',
  role: 'Flutter Developer & Full Stack Engineer',
  tagline: 'Building secure, scalable mobile & web applications',
  email: 'rishabhraj021official@gmail.com',
  phone: '+91 88266 08330',
  github: 'https://github.com/Rishabhraj0212',
  linkedin: 'https://www.linkedin.com/in/rishabh-raj-a28118220/',
  resumeUrl: '/Rishabh_Raj_Gupta_Resume.pdf',
  location: 'Delhi, India',
};

export const summary =
  "Flutter & Full-Stack Developer with 1.75+ years of experience building secure, scalable mobile and web applications for fintech and enterprise clients. Specializes in Flutter (BLoC, Provider) and Node.js/React full-stack systems, with hands-on expertise in application security (SSL pinning, root/emulator detection, token-based auth), offline-first architecture, and Azure cloud deployment.";

export const stats = [
  { value: '1.75+', label: 'Years Experience' },
  { value: '500+', label: 'Users Served' },
  { value: '3', label: 'Production Apps' },
  { value: '0', label: 'Critical Vulnerabilities' },
];

export const highlights = [
  'SSL Pinning',
  'Flutter / BLoC',
  'Node.js + Express',
  'PostgreSQL',
  'Offline-First / SQLite',
  'Root & Emulator Detection',
  'Azure Cloud',
];

export const skillGroups = [
  {
    title: 'Mobile Development',
    skills: [
      { name: 'Flutter / Dart', pct: 92 },
      { name: 'BLoC / Provider', pct: 88 },
      { name: 'Offline-First / SQLite Sync', pct: 85 },
    ],
  },
  {
    title: 'Backend & Databases',
    skills: [
      { name: 'Node.js / Express', pct: 85 },
      { name: 'PostgreSQL', pct: 80 },
      { name: 'MongoDB', pct: 74 },
    ],
  },
  {
    title: 'Security & Cloud',
    skills: [
      { name: 'App Security (SSL Pinning)', pct: 88 },
      { name: 'REST API Design', pct: 85 },
      { name: 'Azure / CI-CD', pct: 72 },
    ],
  },
];

export const skillTags = [
  'Flutter', 'Dart', 'React.js', 'Node.js', 'Express.js', 'PostgreSQL',
  'MongoDB', 'SQLite', 'REST APIs', 'Firebase', 'Azure', 'Application Security',
  'Android', 'JavaScript', 'Python', 'C++', 'Git / GitHub', 'CI/CD',
];

export const experience = [
  {
    period: 'Jan 2026 — Present',
    role: 'Software Developer',
    company: 'BNB Cognira',
    current: true,
    bullets: [
      'Build enterprise-grade Flutter and Node.js applications serving 500+ end users, architecting modular systems that support rapid feature delivery across multiple product teams.',
      'Implement BLoC architecture for state management across 10+ feature modules, reducing UI rebuild overhead by 35% and improving widget re-render performance.',
      'Architect offline-first data solutions using SQLite with bi-directional sync mechanisms, ensuring 100% app functionality in zero-connectivity environments for field users.',
      'Drive Agile sprint cycles with structured planning and retrospectives, delivering 3 production releases on schedule within the first 6 months.',
    ],
    tags: ['Flutter', 'BLoC', 'Node.js', 'SQLite', 'Agile'],
  },
  {
    period: 'Nov 2024 — Dec 2025',
    role: 'Software Developer',
    company: 'Sarabhai Information Technology',
    current: false,
    bullets: [
      'Developed and shipped 3 Flutter applications with integrated RESTful APIs, serving enterprise clients across security-sensitive operational domains.',
      'Implemented end-to-end application security layer including SSL pinning, root detection, emulator detection, and token-based authentication — achieving zero critical security vulnerabilities in production.',
      'Built Node.js backend APIs with PostgreSQL integration, handling 50+ endpoints across user management, reporting, and file operations.',
      'Integrated Firebase Cloud Messaging for real-time push notifications, lazy loading for performance optimisation, and multi-file upload pipeline supporting 10+ file formats simultaneously.',
    ],
    tags: ['Flutter', 'App Security', 'Node.js', 'PostgreSQL', 'Firebase'],
  },
];

export const education = {
  period: '2020 — 2024',
  degree: 'B.Tech, Information Technology',
  school: 'Maharaja Agrasen Institute of Technology, Delhi',
  detail: 'CGPA: 8.13 / 10',
  bullets: [
    'Specialized in software development, data structures, and system design',
    'Built foundational knowledge in OOP, DBMS, and application security',
  ],
  tags: ['C++', 'Python', 'DSA', 'DBMS'],
};

export const projects = [
  {
    icon: '🔥',
    color: 'blue',
    title: 'Fire Safety & Management App',
    badge: 'Confidential',
    badgeType: 'conf',
    stack: ['Flutter', 'Firebase', 'Maps'],
    desc: 'Enterprise-level Flutter application for incident reporting, safety tracking, and real-time monitoring built under NDA.',
    features: [
      'Incident reporting with media upload (image, video, PDF)',
      'Map-based severity visualization',
      'Email sharing & notification system',
    ],
    metric: null,
    noLinkLabel: '🔒 Under NDA',
    link: null,
  },
  {
    icon: '💬',
    color: 'green',
    title: 'Motivational Quotes App',
    badge: 'Demo Available',
    badgeType: 'demo',
    stack: ['Flutter', 'REST API'],
    desc: 'A lightweight Flutter app that fetches and displays motivational quotes dynamically via API integration with smooth, clean UI.',
    features: [
      'Dynamic API-driven content',
      'Clean, minimal Flutter UI',
      'Lightweight & fast performance',
    ],
    metric: null,
    link: 'https://www.loom.com/share/8a823591eac947a9b0c78d0a6c1c12b3',
    linkLabel: '▶ Watch Demo',
  },
  {
    icon: '🏢',
    color: 'purple',
    title: 'CRM Application',
    badge: 'Confidential',
    badgeType: 'conf',
    stack: ['Flutter', 'Node.js', 'PostgreSQL'],
    desc: 'Full-featured Flutter CRM system built under NDA for managing leads, opportunities, accounts, and products with role-based access and secure backend.',
    features: [
      'Lead & opportunity pipeline tracking',
      'Role-based access control',
      'Secure Node.js + PostgreSQL backend',
    ],
    metric: null,
    noLinkLabel: '🔒 Under NDA',
    link: null,
  },
  {
    icon: '📸',
    color: 'amber',
    title: 'Smart Screenshot Manager',
    badge: 'Personal Project',
    badgeType: 'personal',
    stack: ['Android'],
    desc: 'Android utility app that automatically schedules and deletes screenshots to reduce storage clutter using intelligent background processing.',
    features: [
      'Automated cleanup scheduler',
      'Storage optimization algorithms',
      'Background processing service',
    ],
    metric: null,
    noLinkLabel: 'Android App',
    link: null,
  },
];

export const certifications = [
  {
    name: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft',
    icon: '☁️',
  },
];

export const achievements = [
  {
    title: 'TCS CodeVita Season 11',
    detail: 'Qualified Round 1 — Rank 2740 out of 100,000+ global participants',
    icon: '🏆',
  },
];

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];
