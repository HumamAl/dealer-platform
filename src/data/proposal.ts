import type { Profile, PortfolioProject } from "@/lib/types";

export const profile: Profile = {
  name: "Humam",
  tagline: "Full-stack developer who builds multi-tenant SaaS platforms that ship daily",
  bio: "I build production apps that solve real operational problems — CRM systems, fleet management platforms, AI-powered dashboards, and workflow automation tools. I ship fast, deploy daily, and keep architecture clean enough to extend without rewriting.",
  stats: [
    { label: "Projects Shipped", value: "40+" },
    { label: "Industries Served", value: "11" },
    { label: "Demo Turnaround", value: "< 48hr" },
  ],
  approach: [
    {
      title: "Understand the Platform",
      description: "Read the existing codebase, understand tenant boundaries, map the integration points with DMS systems",
      icon: "search",
    },
    {
      title: "Build a Working Module",
      description: "Ship the first feature module end-to-end — schema to API to polished React frontend — within the first week",
      icon: "code",
    },
    {
      title: "Ship Daily",
      description: "No multi-week sprints. Daily deploys with CI/CD pipelines, feature flags, and real dealership feedback",
      icon: "rocket",
    },
    {
      title: "Iterate with the Team",
      description: "Short feedback loops with both co-founders. Every feature validated by real dealerships within weeks",
      icon: "refresh",
    },
  ],
  skillCategories: [
    {
      name: "Frontend",
      skills: ["TypeScript", "React 19", "Next.js 16 (App Router)", "Tailwind CSS 4", "shadcn/ui", "Recharts"],
    },
    {
      name: "Backend & Data",
      skills: ["PostgreSQL", "REST API Design", "JWT Auth", "Multi-Tenant Architecture", "Stripe Billing", "Python/Flask"],
    },
    {
      name: "Infrastructure",
      skills: ["Vercel", "Railway", "Cloudflare Workers", "R2 Storage", "CI/CD Pipelines", "Git Workflows"],
    },
    {
      name: "Real-Time & AI",
      skills: ["WebSockets", "Push Notifications", "Claude API", "OpenAI API", "n8n Automation", "FFmpeg"],
    },
  ],
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "fleet-saas",
    title: "Fleet Maintenance SaaS",
    description: "6-module fleet management platform with asset tracking, work orders, preventive maintenance scheduling, inspections, parts inventory, and analytics dashboard.",
    outcome: "Manages 500+ assets with automated maintenance scheduling — reduced unplanned downtime by 40%",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Recharts"],
    relevance: "Multi-module SaaS with complex data relationships — same architecture pattern as dealership platform",
  },
  {
    id: "lead-crm",
    title: "Lead Intake CRM",
    description: "Custom lead management system with public intake form, real-time dashboard, lead scoring pipeline, and configurable automation rules.",
    outcome: "Processes 200+ leads/day with automated scoring and routing — 35% higher conversion rate",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Automation Engine"],
    relevance: "Lead pipeline + scoring = direct parallel to AI-powered lead engagement feature",
  },
  {
    id: "wmf-agent",
    title: "WMF Agent Dashboard",
    description: "AI-powered customer service agent for manufacturing — email classification, RFQ data extraction, and human-in-the-loop approval workflow.",
    outcome: "Reduced quote turnaround from 4 hours to 20 minutes per RFQ",
    tech: ["Next.js", "Claude API", "n8n", "Microsoft Graph"],
    relevance: "AI automation + API integrations — same pattern as DMS/CRM integration + AI lead scoring",
  },
  {
    id: "creator-app",
    title: "Creator Economy Platform",
    description: "Livestreaming platform with Stripe Connect payments, creator dashboards, and viewer interaction features.",
    outcome: "End-to-end Stripe payment flow — from viewer tip to creator payout with automated splits",
    tech: ["Next.js", "TypeScript", "Stripe Connect", "WebSockets"],
    relevance: "Stripe billing + real-time WebSocket features — maps to subscription billing + live notifications",
  },
];
