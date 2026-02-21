import { profile, portfolioProjects } from "@/data/proposal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Code,
  Rocket,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  search: <Search className="h-4 w-4" />,
  code: <Code className="h-4 w-4" />,
  rocket: <Rocket className="h-4 w-4" />,
  refresh: <RefreshCw className="h-4 w-4" />,
};

export default function ProposalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-4xl mx-auto p-6 space-y-12">
        {/* Section 1 — Hero */}
        <section className="text-center py-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium">
            <CheckCircle2 className="h-3 w-3" />
            Built this demo for your project
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{profile.name}</h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            {profile.tagline}
          </p>
          <div className="flex items-center justify-center gap-8 pt-4">
            {profile.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2 — Proof of Work */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Relevant Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolioProjects.map((project, index) => (
              <Card
                key={project.id}
                className="bg-gradient-to-br from-accent/5 to-background shadow-lg border-primary/10 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration: "400ms",
                }}
              >
                <CardContent className="p-5 space-y-3">
                  <h3 className="font-semibold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  <p className="text-sm font-medium text-[color:var(--success)]">
                    {project.outcome}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="bg-primary/10 text-primary border-0 rounded-full px-2 py-0.5 text-xs"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                  {project.relevance && (
                    <p className="text-xs italic text-muted-foreground pt-1">
                      {project.relevance}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 3 — How I Work */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">How I Work</h2>
          {/* Desktop: horizontal flow */}
          <div className="hidden md:flex items-start gap-0">
            {profile.approach.map((step, i) => (
              <div key={i} className="flex items-start flex-1">
                <div className="flex flex-col items-center text-center flex-1">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                    {step.icon ? iconMap[step.icon] : (
                      <span className="text-sm font-bold">{i + 1}</span>
                    )}
                  </div>
                  <p className="text-sm font-semibold mb-1">{step.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed px-2">
                    {step.description}
                  </p>
                </div>
                {i < profile.approach.length - 1 && (
                  <div className="border-t-2 border-dashed border-primary/20 w-8 mt-5 shrink-0" />
                )}
              </div>
            ))}
          </div>
          {/* Mobile: vertical flow */}
          <div className="md:hidden space-y-4">
            {profile.approach.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  {i < profile.approach.length - 1 && (
                    <div className="w-px h-full border-l-2 border-dashed border-primary/20 mt-2" />
                  )}
                </div>
                <div className="pb-4">
                  <p className="text-sm font-semibold">{step.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center italic">
            First feature module shipped within the first week
          </p>
        </section>

        {/* Section 4 — Skills Grid */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Tech Stack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.skillCategories.map((category) => (
              <Card
                key={category.name}
                className="shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30 transition-all duration-200"
              >
                <CardContent className="p-4 space-y-3">
                  <h3 className="text-sm font-semibold">{category.name}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 5 — CTA */}
        <Separator />
        <section className="text-center py-10 space-y-3">
          <h2 className="text-xl font-semibold">
            Let&apos;s build this together
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Available for 30 hrs/week starting immediately
          </p>
        </section>

        {/* Footer */}
        <div className="text-center pb-8">
          <p className="text-sm font-medium text-muted-foreground">
            &mdash; Humam
          </p>
        </div>
      </div>
    </div>
  );
}
