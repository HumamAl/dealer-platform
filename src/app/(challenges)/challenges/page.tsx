import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { challenges, executiveSummary } from "@/data/challenges";
import {
  ArrowRight,
  Brain,
  Camera,
  CheckCircle,
  Clock,
  Eye,
  Layers,
  Network,
  Search,
  Shield,
  Sparkles,
  Wrench,
} from "lucide-react";

export default function ChallengesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold">My Approach</h1>
          <p className="text-sm text-muted-foreground mt-1">
            How I&apos;d tackle the core technical challenges of building your
            dealership platform
          </p>
        </div>

        {/* Executive Summary */}
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-6">
          <p className="text-sm leading-relaxed text-foreground/80">
            {executiveSummary}
          </p>
        </div>

        {/* Challenge Cards */}
        <div className="space-y-6">
          {challenges.map((challenge, index) => (
            <Card
              key={challenge.id}
              className="bg-gradient-to-br from-accent/5 to-background shadow-lg rounded-xl border border-primary/10 hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  {challenge.id === "multi-tenant" && (
                    <Shield className="h-5 w-5 text-primary" />
                  )}
                  {challenge.id === "dms-integration" && (
                    <Network className="h-5 w-5 text-primary" />
                  )}
                  {challenge.id === "ai-lead-scoring" && (
                    <Brain className="h-5 w-5 text-primary" />
                  )}
                  {challenge.id === "recon-pipeline" && (
                    <Wrench className="h-5 w-5 text-primary" />
                  )}
                  {challenge.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {challenge.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Inline Visualizations */}
                {challenge.id === "multi-tenant" && <MultiTenantDiagram />}
                {challenge.id === "dms-integration" && <DmsIntegrationFlow />}
                {challenge.id === "ai-lead-scoring" && (
                  <LeadScoringBeforeAfter />
                )}
                {challenge.id === "recon-pipeline" && <ReconPipelineFlow />}

                {/* Outcome Statement */}
                {challenge.outcome && (
                  <>
                    <Separator />
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[color:var(--success)] mt-0.5 shrink-0" />
                      <p className="text-sm font-medium text-[color:var(--success)]">
                        {challenge.outcome}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Closer */}
        <div className="text-center py-8 border-t border-border">
          <p className="text-lg font-semibold">
            Ready to discuss the approach?
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Let&apos;s walk through how these solutions apply to your specific
            setup.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ========== Inline Visualization Components ========== */

function MultiTenantDiagram() {
  return (
    <div className="space-y-3 py-2">
      {/* Tenant Row */}
      <div className="grid grid-cols-3 gap-3">
        {["Dealership A", "Dealership B", "Dealership C"].map((name) => (
          <div
            key={name}
            className="bg-primary/10 border border-primary/20 rounded-lg px-3 py-2 text-center text-xs font-medium"
          >
            <Layers className="h-3.5 w-3.5 mx-auto mb-1 text-primary" />
            {name}
          </div>
        ))}
      </div>

      {/* Arrow Down */}
      <div className="text-center text-muted-foreground text-lg">
        <div className="flex items-center justify-center gap-1">
          <div className="h-px w-12 bg-border" />
          <span>&#8595;</span>
          <div className="h-px w-12 bg-border" />
        </div>
      </div>

      {/* RBAC Layer */}
      <div className="bg-primary/15 border border-primary/25 rounded-lg px-4 py-3 text-center">
        <div className="flex items-center justify-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">
            API Gateway + RBAC Middleware
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Role-based access control per tenant, per user
        </p>
      </div>

      {/* Arrow Down */}
      <div className="text-center text-muted-foreground text-lg">
        <div className="flex items-center justify-center gap-1">
          <div className="h-px w-12 bg-border" />
          <span>&#8595;</span>
          <div className="h-px w-12 bg-border" />
        </div>
      </div>

      {/* RLS Layer */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-3 text-center">
        <div className="flex items-center justify-center gap-2">
          <Search className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Row-Level Security</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Every query automatically scoped to active tenant
        </p>
      </div>

      {/* Arrow Down */}
      <div className="text-center text-muted-foreground text-lg">
        <div className="flex items-center justify-center gap-1">
          <div className="h-px w-12 bg-border" />
          <span>&#8595;</span>
          <div className="h-px w-12 bg-border" />
        </div>
      </div>

      {/* Database Layer */}
      <div className="bg-muted rounded-lg px-4 py-3 text-center">
        <span className="text-sm font-medium">
          PostgreSQL (shared infra, isolated data)
        </span>
        <p className="text-xs text-muted-foreground mt-1">
          Single database, tenant_id on every table, enforced at DB level
        </p>
      </div>
    </div>
  );
}

function DmsIntegrationFlow() {
  const leftSystems = [
    { name: "PBS Systems", format: "REST API" },
    { name: "Dealertrack", format: "ADF/XML" },
    { name: "Keyloop", format: "REST API" },
  ];
  const rightSystems = [
    { name: "CDK Global", format: "REST API" },
    { name: "Tekion", format: "REST/GraphQL" },
  ];

  return (
    <div className="py-2">
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
        {/* Left Systems */}
        <div className="space-y-2">
          {leftSystems.map((sys) => (
            <div
              key={sys.name}
              className="bg-muted rounded-lg px-3 py-2 text-center"
            >
              <p className="text-xs font-medium">{sys.name}</p>
              <p className="text-[10px] text-muted-foreground">{sys.format}</p>
            </div>
          ))}
        </div>

        {/* Arrows In */}
        <div className="flex flex-col items-center justify-center gap-2">
          {leftSystems.map((sys) => (
            <div key={sys.name} className="h-8 flex items-center">
              <ArrowRight className="h-4 w-4 text-primary" />
            </div>
          ))}
        </div>

        {/* Center Hub */}
        <div className="bg-primary/15 border-2 border-primary/30 rounded-xl px-3 py-4 text-center self-center">
          <Network className="h-5 w-5 mx-auto mb-1.5 text-primary" />
          <p className="text-sm font-semibold">Unified API Layer</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            REST / ADF / XML Adapters
          </p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--success)]" />
            <span className="text-[10px] text-[color:var(--success)]">
              99.5% sync reliability
            </span>
          </div>
        </div>

        {/* Arrows Out */}
        <div className="flex flex-col items-center justify-center">
          <ArrowRight className="h-4 w-4 text-primary" />
        </div>

        {/* Right - Platform */}
        <div className="space-y-2">
          <div className="bg-primary/10 border border-primary/20 rounded-lg px-3 py-3 text-center">
            <Sparkles className="h-4 w-4 mx-auto mb-1 text-primary" />
            <p className="text-xs font-semibold">DealerHub Platform</p>
          </div>
          {rightSystems.map((sys) => (
            <div
              key={sys.name}
              className="bg-muted rounded-lg px-3 py-2 text-center"
            >
              <p className="text-xs font-medium">{sys.name}</p>
              <p className="text-[10px] text-muted-foreground">{sys.format}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LeadScoringBeforeAfter() {
  const beforeItems = [
    { icon: Clock, text: "4-hour average response time" },
    { icon: Clock, text: "Missed follow-ups on 30% of leads" },
    { icon: Clock, text: "Gut-feel prioritization" },
    { icon: Clock, text: "No engagement tracking" },
  ];
  const afterItems = [
    { icon: CheckCircle, text: "12-minute average response" },
    { icon: CheckCircle, text: "Automated follow-up sequences" },
    { icon: CheckCircle, text: "ML-based scoring 0-100" },
    { icon: CheckCircle, text: "Real-time engagement analytics" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
      {/* Before */}
      <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-destructive mb-3">
          Before — Manual Process
        </p>
        <ul className="space-y-2.5">
          {beforeItems.map((item) => (
            <li key={item.text} className="flex items-start gap-2">
              <item.icon className="h-3.5 w-3.5 text-destructive mt-0.5 shrink-0" />
              <span className="text-xs text-foreground/70">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* After */}
      <div className="bg-success/10 border border-success/20 rounded-xl p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-success mb-3">
          After — AI-Powered
        </p>
        <ul className="space-y-2.5">
          {afterItems.map((item) => (
            <li key={item.text} className="flex items-start gap-2">
              <item.icon className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />
              <span className="text-xs text-foreground/70">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ReconPipelineFlow() {
  const stages = [
    { name: "Inspection", icon: Eye, bottleneck: false },
    { name: "Mechanical", icon: Wrench, bottleneck: true },
    { name: "Body Work", icon: Wrench, bottleneck: false },
    { name: "Detailing", icon: Sparkles, bottleneck: false },
    { name: "Photography", icon: Camera, bottleneck: false },
    { name: "Lot Ready", icon: CheckCircle, bottleneck: false },
  ];

  return (
    <div className="space-y-3 py-2">
      {/* Pipeline Flow */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {stages.map((stage, i) => (
          <div key={stage.name} className="flex items-center shrink-0">
            <div
              className={`rounded-lg px-3 py-2 text-center border transition-all ${
                stage.bottleneck
                  ? "border-primary bg-primary/10 shadow-sm"
                  : "border-border bg-muted"
              }`}
            >
              <stage.icon
                className={`h-3.5 w-3.5 mx-auto mb-1 ${
                  stage.bottleneck ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <p
                className={`text-[10px] font-medium leading-tight ${
                  stage.bottleneck ? "text-primary" : ""
                }`}
              >
                {stage.name}
              </p>
              {stage.bottleneck && (
                <span className="text-[9px] text-primary/70 font-medium">
                  Bottleneck
                </span>
              )}
            </div>
            {i < stages.length - 1 && (
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground mx-0.5 shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
        <Clock className="h-3.5 w-3.5 shrink-0" />
        <span>
          Real-time stage tracking with automated bottleneck alerts when any
          stage exceeds its SLA
        </span>
      </div>
    </div>
  );
}
