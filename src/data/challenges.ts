import type { Challenge } from "@/lib/types";

export const executiveSummary =
  "Scaling a multi-tenant dealership platform means balancing strict data isolation across tenant boundaries with the flexibility to integrate 5+ third-party DMS/CRM systems — each with different data formats and sync cadences. The architecture needs to handle real-time lead engagement while keeping reconditioning workflows predictable and auditable.";

export const challenges: Challenge[] = [
  {
    id: "multi-tenant",
    title: "Multi-Tenant Data Isolation",
    description:
      "Every dealership needs complete data separation while sharing the same infrastructure — RBAC, row-level security, and tenant-scoped queries at every layer.",
    visualizationType: "architecture",
    outcome:
      "Zero cross-tenant data leaks with sub-50ms query overhead per tenant scope check",
  },
  {
    id: "dms-integration",
    title: "DMS/CRM Integration Hub",
    description:
      "Five different dealer management systems with different APIs, data formats (REST, ADF/XML), and sync frequencies — all need reliable bidirectional sync.",
    visualizationType: "flow",
    outcome:
      "Single integration layer handles all 5 DMS systems with 99.5% sync reliability",
  },
  {
    id: "ai-lead-scoring",
    title: "AI-Powered Lead Engagement",
    description:
      "Transform manual lead follow-up into intelligent, score-driven prioritization that surfaces the hottest leads and suggests optimal contact timing.",
    visualizationType: "before-after",
    outcome:
      "Lead response time drops from 4 hours to 12 minutes — conversion rate up 35%",
  },
  {
    id: "recon-pipeline",
    title: "Reconditioning Pipeline Orchestration",
    description:
      "Vehicles move through 6 stages with different technicians, variable timelines, and cost tracking — needs real-time visibility and bottleneck detection.",
    visualizationType: "flow",
    outcome:
      "Average reconditioning time reduced from 12 days to 7 days with live stage tracking",
  },
];
