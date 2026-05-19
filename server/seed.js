import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Project from './models/Project.js';
import BlogPost from './models/BlogPost.js';
import TeamMember from './models/TeamMember.js';
import Settings from './models/Settings.js';

const UNSPLASH = {
  web: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80',
  mobile: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
  ai: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80',
  cloud: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&q=80',
  ecom: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
  team1: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
  team2: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80',
  team3: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  team4: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
  team5: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  blog1: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
  blog2: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  blog3: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
  blog4: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
};

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  await Promise.all([
    User.deleteMany({}),
    Project.deleteMany({}),
    BlogPost.deleteMany({}),
    TeamMember.deleteMany({}),
    Settings.deleteMany({}),
  ]);
  console.log('Collections cleared');

  const passwordHash = await bcrypt.hash('Admin@123', 12);
  await User.create({ email: 'admin@example.com', passwordHash, role: 'admin' });
  console.log('Admin user created: admin@example.com / Admin@123');

  const projects = [
    {
      title: 'FinTrack Pro — Enterprise Finance Dashboard',
      category: 'Web',
      client: 'FinCorp International',
      year: 2024,
      coverImage: UNSPLASH.web,
      gallery: [UNSPLASH.web, UNSPLASH.cloud, UNSPLASH.ai],
      summary: 'A real-time financial analytics dashboard processing $2B+ in daily transactions.',
      overview: 'FinTrack Pro is a comprehensive enterprise finance platform built for FinCorp International, one of Southeast Asia\'s leading financial conglomerates. The system aggregates data from 14 disparate legacy systems into a single, unified real-time dashboard.',
      problem: 'FinCorp\'s finance teams were spending 3+ hours daily manually reconciling data from spreadsheets and disconnected systems. Critical financial decisions were delayed by 48 hours due to data latency.',
      solution: 'We architected a microservices-based data pipeline using Apache Kafka for real-time streaming, paired with a React-based dashboard featuring customizable widgets, drill-down analytics, and automated alerting.',
      features: [
        'Real-time transaction monitoring with sub-second latency',
        'Customizable KPI dashboard with 50+ widget types',
        'Automated anomaly detection using ML models',
        'Multi-currency support across 32 currencies',
        'Role-based access control with audit trails',
        'PDF/Excel export and scheduled reporting',
      ],
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Apache Kafka', 'Docker', 'AWS', 'TypeScript', 'Redis'],
      metrics: [
        { label: 'Faster Reporting', value: '94%' },
        { label: 'Cost Reduction', value: '$1.2M/yr' },
        { label: 'User Adoption', value: '99.8%' },
      ],
      status: 'published',
      featured: true,
      order: 1,
    },
    {
      title: 'ShopSphere — Headless E-Commerce Platform',
      category: 'E-Commerce',
      client: 'RetailNext Group',
      year: 2024,
      coverImage: UNSPLASH.ecom,
      gallery: [UNSPLASH.ecom, UNSPLASH.web],
      summary: 'Headless commerce platform handling 50,000+ daily orders across 8 storefronts.',
      overview: 'ShopSphere is a headless e-commerce solution that decouples the frontend presentation layer from backend commerce logic, enabling RetailNext to run 8 distinct brand storefronts on a single backend.',
      problem: 'RetailNext was operating on a monolithic Shopify setup that couldn\'t scale during peak sales events. Black Friday 2022 saw 3 hours of downtime costing an estimated $800K in lost revenue.',
      solution: 'We designed a headless architecture using Next.js storefronts connected to a custom GraphQL API, with Redis caching, Elasticsearch for product search, and Kubernetes auto-scaling.',
      features: [
        'GraphQL API with real-time inventory sync',
        'Elasticsearch-powered product search (<100ms)',
        'Dynamic pricing engine with 200+ rule types',
        'A/B testing framework built-in',
        'Progressive Web App with offline support',
        'One-click checkout with 12 payment gateways',
      ],
      techStack: ['Next.js', 'GraphQL', 'Node.js', 'MongoDB', 'Redis', 'Elasticsearch', 'Kubernetes', 'Stripe'],
      metrics: [
        { label: 'Uptime', value: '99.99%' },
        { label: 'Revenue Increase', value: '340%' },
        { label: 'Page Load Time', value: '0.8s' },
      ],
      status: 'published',
      featured: true,
      order: 2,
    },
    {
      title: 'MediConnect — AI-Powered Telemedicine App',
      category: 'Mobile',
      client: 'HealthPlus Network',
      year: 2023,
      coverImage: UNSPLASH.mobile,
      gallery: [UNSPLASH.mobile, UNSPLASH.ai],
      summary: 'Cross-platform telemedicine app with AI symptom assessment serving 500K+ patients.',
      overview: 'MediConnect is a HIPAA-compliant telemedicine platform connecting patients with licensed physicians via video consultation, with an integrated AI triage system that reduces unnecessary ER visits.',
      problem: 'HealthPlus was losing patients to competitors with modern digital interfaces. Their legacy phone-based booking system had a 34% abandonment rate and couldn\'t handle post-pandemic demand.',
      solution: 'A React Native cross-platform app with WebRTC video consultations, an AI symptom checker trained on 2M+ clinical records, and deep integration with EHR systems via HL7 FHIR APIs.',
      features: [
        'HD video consultations with WebRTC',
        'AI symptom assessment (92% accuracy)',
        'e-Prescription with pharmacy integration',
        'Real-time appointment scheduling',
        'End-to-end encrypted health records',
        'Offline-first architecture for low-connectivity areas',
      ],
      techStack: ['React Native', 'Node.js', 'Python', 'TensorFlow', 'WebRTC', 'MongoDB', 'AWS', 'HL7 FHIR'],
      metrics: [
        { label: 'Patient Satisfaction', value: '4.9/5' },
        { label: 'ER Visit Reduction', value: '28%' },
        { label: 'Monthly Active Users', value: '520K' },
      ],
      status: 'published',
      featured: true,
      order: 3,
    },
    {
      title: 'Sentinel AI — Cloud Security Platform',
      category: 'AI/ML',
      client: 'CyberShield Inc.',
      year: 2023,
      coverImage: UNSPLASH.ai,
      gallery: [UNSPLASH.ai, UNSPLASH.cloud],
      summary: 'ML-powered threat detection system monitoring 10M+ events per second.',
      overview: 'Sentinel AI is an enterprise cloud security platform that uses deep learning models to detect anomalies, predict threats, and automate incident response across multi-cloud environments.',
      problem: 'CyberShield\'s SOC team was overwhelmed with 40,000+ daily security alerts, with 90% being false positives. Mean time to detect (MTTD) was 72 hours — far above industry standards.',
      solution: 'We built a real-time event processing pipeline using Apache Flink, coupled with ensemble ML models (Random Forest + LSTM) for anomaly detection and a React-based SOC dashboard.',
      features: [
        'Real-time threat detection with <1s latency',
        'Automated incident response playbooks',
        'Multi-cloud asset inventory (AWS, Azure, GCP)',
        'SOAR integration via REST/webhook APIs',
        'Compliance reporting (SOC2, ISO27001, PCI-DSS)',
        'Natural language threat intelligence queries',
      ],
      techStack: ['Python', 'Apache Flink', 'TensorFlow', 'React', 'Elasticsearch', 'Kafka', 'Kubernetes', 'PostgreSQL'],
      metrics: [
        { label: 'False Positive Reduction', value: '87%' },
        { label: 'MTTD Improvement', value: '95%' },
        { label: 'Events Processed/sec', value: '10M+' },
      ],
      status: 'published',
      featured: false,
      order: 4,
    },
    {
      title: 'CloudForge — Multi-Cloud Infrastructure Platform',
      category: 'Cloud',
      client: 'TechGiant Corp.',
      year: 2023,
      coverImage: UNSPLASH.cloud,
      gallery: [UNSPLASH.cloud, UNSPLASH.web],
      summary: 'Infrastructure-as-code platform managing 2,000+ cloud resources across 3 providers.',
      overview: 'CloudForge is a unified multi-cloud management platform that enables TechGiant\'s DevOps teams to provision, monitor, and optimize cloud infrastructure across AWS, Azure, and GCP from a single control plane.',
      problem: 'TechGiant\'s infrastructure was fragmented across 3 cloud providers with no unified visibility. Cloud spend had grown 300% in 2 years with no attribution, and provisioning new environments took 2 weeks.',
      solution: 'We developed a Terraform-based IaC abstraction layer with a visual topology editor, GitOps workflows, cost analytics with anomaly alerts, and a self-service developer portal.',
      features: [
        'Visual infrastructure topology editor',
        'Multi-cloud cost analytics and optimization',
        'GitOps-based deployment pipelines',
        'Self-service developer portal',
        'Policy-as-code with OPA integration',
        'One-click environment cloning',
      ],
      techStack: ['Terraform', 'React', 'Go', 'Node.js', 'Kubernetes', 'ArgoCD', 'PostgreSQL', 'Prometheus'],
      metrics: [
        { label: 'Provisioning Time', value: '2 weeks → 20 min' },
        { label: 'Cloud Cost Reduction', value: '41%' },
        { label: 'Resources Managed', value: '2,000+' },
      ],
      status: 'published',
      featured: false,
      order: 5,
    },
    {
      title: 'LogiTrack — Supply Chain Management System',
      category: 'Web',
      client: 'Global Logistics Co.',
      year: 2022,
      coverImage: UNSPLASH.web,
      gallery: [UNSPLASH.web, UNSPLASH.ecom],
      summary: 'End-to-end supply chain visibility platform tracking 1M+ shipments globally.',
      overview: 'LogiTrack provides real-time visibility into Global Logistics Co.\'s entire supply chain, from manufacturer to last-mile delivery, integrating with 200+ carrier APIs and IoT sensors.',
      problem: 'Global Logistics was operating with a 6-hour delay in shipment status updates, leading to poor customer satisfaction scores and inefficient exception management.',
      solution: 'A microservices architecture with an event-driven update pipeline, carrier API integrations, IoT sensor data ingestion, and a beautiful customer-facing tracking portal.',
      features: [
        'Real-time shipment tracking with GPS integration',
        '200+ carrier API integrations',
        'IoT sensor data for cold chain monitoring',
        'Predictive delay detection with ML',
        'Customer self-service portal',
        'Automated exception management workflows',
      ],
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'MQTT', 'Docker', 'AWS IoT', 'Python'],
      metrics: [
        { label: 'Tracking Accuracy', value: '99.6%' },
        { label: 'Customer Satisfaction', value: '+42 NPS' },
        { label: 'Shipments Tracked', value: '1M+/mo' },
      ],
      status: 'published',
      featured: false,
      order: 6,
    },
  ];

  await Project.insertMany(projects);
  console.log('6 projects seeded');

  const blogPosts = [
    {
      title: 'Building Scalable Microservices with Node.js and Kubernetes',
      category: 'Engineering',
      tags: ['Node.js', 'Kubernetes', 'Microservices', 'DevOps'],
      coverImage: UNSPLASH.blog1,
      excerpt: 'Learn how to architect and deploy production-grade microservices using Node.js, Docker, and Kubernetes — with real-world patterns from our enterprise projects.',
      content: `<h2>Introduction</h2><p>Microservices architecture has become the de-facto standard for building scalable enterprise applications. In this deep-dive, we share patterns and anti-patterns we've learned from deploying dozens of microservices systems in production.</p><h2>Service Decomposition</h2><p>The most critical decision in a microservices project is how to decompose your domain into services. We recommend Domain-Driven Design (DDD) as your primary tool: identify bounded contexts, aggregate roots, and domain events before writing a single line of code.</p><h3>Key Principles</h3><p>Each service should own its data, communicate via well-defined APIs, and be independently deployable. The "two-pizza team" rule (if you can't feed the team building it with two pizzas, the service is too large) remains a useful heuristic.</p><h2>Container Orchestration with Kubernetes</h2><p>Once your services are containerized with Docker, Kubernetes becomes your orchestration layer. We use Helm charts for templating, ArgoCD for GitOps-based deployment, and Prometheus + Grafana for observability.</p><h2>Conclusion</h2><p>Microservices offer tremendous scalability benefits but introduce operational complexity. Start with a modular monolith and extract services as team and scale demands require.</p>`,
      author: { name: 'Alex Chen', avatar: UNSPLASH.team1, role: 'Lead Engineer' },
      status: 'published',
    },
    {
      title: 'The Complete Guide to React Performance Optimization in 2024',
      category: 'Frontend',
      tags: ['React', 'Performance', 'Web Vitals', 'TypeScript'],
      coverImage: UNSPLASH.blog2,
      excerpt: 'From code splitting to virtualization, here are the battle-tested techniques our frontend team uses to achieve sub-second LCP scores on enterprise React applications.',
      content: `<h2>Why React Performance Matters</h2><p>A 100ms delay in page load reduces conversions by 7%. For enterprise applications serving millions of users, performance is not a luxury — it's a business requirement.</p><h2>Measuring Before Optimizing</h2><p>Always start with measurement. Use Chrome DevTools Performance tab, React DevTools Profiler, and Web Vitals library to establish baselines before applying optimizations.</p><h3>Core Web Vitals Targets</h3><p>Aim for LCP under 2.5s, FID under 100ms, and CLS under 0.1. These are Google's thresholds for "Good" user experience and directly impact SEO rankings.</p><h2>Code Splitting and Lazy Loading</h2><p>React.lazy() and Suspense enable route-level code splitting out of the box. Combined with Vite's rollup-based bundler, you can dramatically reduce initial bundle size.</p><h2>Memoization Strategies</h2><p>useMemo, useCallback, and React.memo are powerful but often misused. Apply them only after profiling — premature memoization adds complexity without benefit.</p><h2>Virtualization for Large Lists</h2><p>For lists exceeding 100 items, use a virtualization library like TanStack Virtual. Rendering only visible rows reduces DOM nodes from thousands to dozens.</p>`,
      author: { name: 'Sarah Kim', avatar: UNSPLASH.team2, role: 'Senior Frontend Engineer' },
      status: 'published',
    },
    {
      title: 'Implementing Zero-Trust Security Architecture in Cloud-Native Applications',
      category: 'Security',
      tags: ['Security', 'Zero-Trust', 'Cloud', 'DevSecOps'],
      coverImage: UNSPLASH.blog3,
      excerpt: 'Zero-trust is no longer optional for enterprise applications. This guide walks through implementing a complete zero-trust architecture using modern cloud-native tools.',
      content: `<h2>The Zero-Trust Paradigm</h2><p>"Never trust, always verify" — this is the core principle of zero-trust security. In a world of remote work, cloud infrastructure, and sophisticated APTs, the traditional network perimeter is obsolete.</p><h2>Identity as the New Perimeter</h2><p>In a zero-trust model, identity becomes your primary security control. Every request must be authenticated and authorized, regardless of its origin — internal network or external.</p><h3>Implementation Components</h3><p>A complete zero-trust implementation requires: strong identity verification (MFA, passwordless), device health attestation, least-privilege access policies, continuous monitoring, and micro-segmentation.</p><h2>Service-to-Service Authentication</h2><p>For microservices, use mutual TLS (mTLS) for service-to-service communication. Service meshes like Istio automate certificate management and enforce mTLS transparently.</p><h2>Secrets Management</h2><p>Never hardcode secrets. Use HashiCorp Vault or AWS Secrets Manager with dynamic secret rotation. Integrate secret injection at the orchestration layer, not the application layer.</p>`,
      author: { name: 'Marcus Johnson', avatar: UNSPLASH.team3, role: 'Security Architect' },
      status: 'published',
    },
    {
      title: 'Designing AI-Powered Features That Users Actually Trust',
      category: 'AI/ML',
      tags: ['AI', 'UX', 'Machine Learning', 'Product Design'],
      coverImage: UNSPLASH.blog4,
      excerpt: 'Integrating AI into your product is easy. Getting users to trust and adopt it is the hard part. Here\'s what we\'ve learned from shipping AI features to millions of users.',
      content: `<h2>The Trust Problem in AI Products</h2><p>AI features have extraordinary potential but face a unique challenge: users are inherently skeptical of "black box" decisions. Building trust requires transparency, explainability, and graceful handling of uncertainty.</p><h2>Design for Explainability</h2><p>When an AI makes a decision or recommendation, show the reasoning. "We recommend X because of factors A, B, and C" dramatically outperforms unexplained recommendations in user studies.</p><h3>Confidence Scores</h3><p>Show confidence levels honestly. A recommendation presented as "75% confident" builds more trust long-term than one presented as absolute — because when the AI is wrong, users understand why.</p><h2>Human-in-the-Loop Design</h2><p>Design every AI feature with easy human override. This isn't just a UX nicety — it's how you capture feedback to improve your models. Make it trivial for users to say "that was wrong."</p><h2>Progressive Trust Building</h2><p>Start with low-stakes AI suggestions and expand to higher-stakes decisions as users build trust through successful interactions. Trying to automate high-stakes decisions on day one is a trust-killer.</p>`,
      author: { name: 'Priya Patel', avatar: UNSPLASH.team4, role: 'AI Product Manager' },
      status: 'published',
    },
  ];

  await BlogPost.insertMany(blogPosts);
  console.log('4 blog posts seeded');

  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'Co-Founder & CEO',
      photo: UNSPLASH.team1,
      bio: 'Alex has 15 years of engineering leadership experience at Google, Stripe, and two successful exits. He architects the technical vision and drives strategic partnerships with Fortune 500 clients.',
      order: 1,
      socials: { linkedin: 'https://linkedin.com', github: 'https://github.com', twitter: 'https://twitter.com' },
    },
    {
      name: 'Sarah Kim',
      role: 'Co-Founder & CTO',
      photo: UNSPLASH.team2,
      bio: 'Sarah is a full-stack architect specializing in distributed systems and cloud infrastructure. She leads our engineering teams and ensures we deliver solutions that scale to millions of users.',
      order: 2,
      socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
    },
    {
      name: 'Marcus Johnson',
      role: 'VP of Engineering',
      photo: UNSPLASH.team3,
      bio: 'Marcus brings deep expertise in DevSecOps and cloud-native architectures. He previously led platform engineering at Cloudflare and has a passion for building secure, reliable systems.',
      order: 3,
      socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
    },
    {
      name: 'Priya Patel',
      role: 'Head of AI/ML',
      photo: UNSPLASH.team4,
      bio: 'Priya holds a PhD in Machine Learning from Stanford and has published 12 papers on applied AI. She leads our AI practice, delivering intelligent features that users trust and love.',
      order: 4,
      socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
    },
    {
      name: 'James Rivera',
      role: 'Head of Design',
      photo: UNSPLASH.team5,
      bio: 'James is an award-winning product designer with experience at Apple, Airbnb, and several Series A startups. He ensures every product we ship meets the highest standards of usability and aesthetics.',
      order: 5,
      socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
    },
  ];

  await TeamMember.insertMany(teamMembers);
  console.log('5 team members seeded');

  const settings = [
    { key: 'company_name', value: 'KLD TECHNOLOGIES' },
    { key: 'tagline', value: 'We Build. We Scale. We Transform.' },
    { key: 'email', value: 'hello@kldtech.io' },
    { key: 'phone', value: '+1 (415) 555-0190' },
    { key: 'address', value: '101 Market Street, Suite 1800, San Francisco, CA 94105' },
    { key: 'social_twitter', value: 'https://twitter.com/kldtech' },
    { key: 'social_linkedin', value: 'https://linkedin.com/company/kldtech' },
    { key: 'social_github', value: 'https://github.com/kldtech' },
  ];

  await Settings.insertMany(settings);
  console.log('6 settings seeded');

  console.log('\nSeed complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
