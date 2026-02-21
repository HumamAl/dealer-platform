"use client";

import { useState } from "react";
import { Wrench, DollarSign, Clock, ArrowRight } from "lucide-react";
import { reconditioningJobs } from "@/data/mock-data";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { ReconStage, ReconPriority } from "@/lib/types";

const stageOrder: ReconStage[] = [
  "inspection",
  "mechanical",
  "body-work",
  "detailing",
  "photography",
  "complete",
];

const stageLabels: Record<ReconStage, string> = {
  inspection: "Inspection",
  mechanical: "Mechanical",
  "body-work": "Body Work",
  detailing: "Detailing",
  photography: "Photography",
  complete: "Complete",
};

const priorityConfig: Record<
  ReconPriority,
  { label: string; className: string; order: number }
> = {
  urgent: {
    label: "Urgent",
    className: "bg-destructive/10 text-destructive",
    order: 0,
  },
  high: {
    label: "High",
    className: "bg-[color:var(--warning)]/10 text-[color:var(--warning)]",
    order: 1,
  },
  normal: {
    label: "Normal",
    className: "bg-muted text-muted-foreground",
    order: 2,
  },
  low: {
    label: "Low",
    className: "bg-muted/50 text-muted-foreground",
    order: 3,
  },
};

export default function ReconditioningPage() {
  const [selectedStage, setSelectedStage] = useState<string>("all");

  const totalEstimated = reconditioningJobs.reduce(
    (sum, j) => sum + j.estimatedCost,
    0
  );
  const totalActual = reconditioningJobs.reduce(
    (sum, j) => sum + (j.actualCost ?? 0),
    0
  );
  const activeJobs = reconditioningJobs.filter(
    (j) => j.stage !== "complete"
  ).length;

  const filteredStages =
    selectedStage === "all"
      ? stageOrder
      : stageOrder.filter((s) => s === selectedStage);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reconditioning Pipeline</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track vehicle reconditioning from inspection to lot-ready
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-sm rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wrench className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Jobs</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {activeJobs}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Est. Total Cost</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {formatCurrency(totalEstimated)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Actual Spent</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {formatCurrency(totalActual)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stage flow indicator */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedStage("all")}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
            selectedStage === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-muted/50 text-muted-foreground hover:bg-muted"
          }`}
        >
          All Stages
        </button>
        {stageOrder.map((stage, i) => {
          const count = reconditioningJobs.filter(
            (j) => j.stage === stage
          ).length;
          return (
            <div key={stage} className="flex items-center gap-1">
              {i > 0 && (
                <ArrowRight className="size-3.5 text-muted-foreground/50 shrink-0" />
              )}
              <button
                onClick={() =>
                  setSelectedStage(selectedStage === stage ? "all" : stage)
                }
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  selectedStage === stage
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                {stageLabels[stage]}
                {count > 0 && (
                  <span className="ml-1.5 text-xs opacity-75">({count})</span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Pipeline columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStages.map((stage) => {
          const stageJobs = reconditioningJobs
            .filter((j) => j.stage === stage)
            .sort(
              (a, b) =>
                priorityConfig[a.priority].order -
                priorityConfig[b.priority].order
            );

          if (stageJobs.length === 0 && selectedStage === "all") return null;

          return (
            <div key={stage} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">{stageLabels[stage]}</h3>
                <Badge variant="secondary" className="text-xs">
                  {stageJobs.length}
                </Badge>
              </div>
              <div className="space-y-3">
                {stageJobs.length === 0 ? (
                  <Card className="shadow-sm rounded-xl border-dashed">
                    <CardContent className="p-4 text-center text-sm text-muted-foreground">
                      No vehicles in this stage
                    </CardContent>
                  </Card>
                ) : (
                  stageJobs.map((job, index) => {
                    const priority = priorityConfig[job.priority];
                    return (
                      <Card
                        key={job.id}
                        className="shadow-sm rounded-xl hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30 transition-all duration-200"
                        style={{ animationDelay: `${index * 80}ms` }}
                      >
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-medium text-sm leading-snug">
                              {job.vehicleDescription}
                            </p>
                            <Badge
                              variant="outline"
                              className={`border-0 shrink-0 ${priority.className}`}
                            >
                              {priority.label}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {job.notes}
                          </p>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">
                              {job.assignedTech}
                            </span>
                            <span className="font-medium">
                              {job.actualCost
                                ? `${formatCurrency(job.actualCost)} / ${formatCurrency(job.estimatedCost)}`
                                : formatCurrency(job.estimatedCost)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Target: {formatDate(job.targetDate)}</span>
                            {job.completedDate && (
                              <span className="text-[color:var(--success)]">
                                Done {formatDate(job.completedDate)}
                              </span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
