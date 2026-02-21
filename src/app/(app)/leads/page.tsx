"use client";

import { useState } from "react";
import { Search, Phone, Mail, User, Sparkles } from "lucide-react";
import { leads } from "@/data/mock-data";
import { formatCurrency, formatRelativeDate } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { LeadPriority, LeadStatus } from "@/lib/types";

const priorityConfig: Record<
  LeadPriority,
  { label: string; className: string }
> = {
  hot: {
    label: "Hot",
    className: "bg-destructive/10 text-destructive",
  },
  warm: {
    label: "Warm",
    className: "bg-[color:var(--warning)]/10 text-[color:var(--warning)]",
  },
  cold: {
    label: "Cold",
    className: "bg-muted text-muted-foreground",
  },
};

const statusLabels: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  proposal: "Proposal",
  won: "Won",
  lost: "Lost",
};

function getScoreColor(score: number) {
  if (score >= 80) return "text-[color:var(--success)]";
  if (score >= 60) return "text-[color:var(--warning)]";
  return "text-muted-foreground";
}

function getScoreLabel(score: number) {
  if (score >= 80) return "Hot";
  if (score >= 60) return "Warm";
  return "Cold";
}

export default function LeadsPage() {
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = leads.filter((lead) => {
    const matchesPriority =
      priorityFilter === "all" || lead.priority === priorityFilter;
    const matchesStatus =
      statusFilter === "all" || lead.status === statusFilter;
    const searchLower = search.toLowerCase();
    const matchesSearch =
      search === "" ||
      `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(searchLower) ||
      lead.email.toLowerCase().includes(searchLower);
    return matchesPriority && matchesStatus && matchesSearch;
  });

  const hotCount = leads.filter((l) => l.priority === "hot").length;
  const warmCount = leads.filter((l) => l.priority === "warm").length;
  const coldCount = leads.filter((l) => l.priority === "cold").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Lead Management</h1>
        <p className="text-sm text-muted-foreground mt-1">
          AI-powered lead tracking and engagement
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card
          className={`shadow-sm rounded-xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
            priorityFilter === "hot"
              ? "border-destructive/50 bg-destructive/5"
              : "hover:border-primary/30"
          }`}
          onClick={() =>
            setPriorityFilter(priorityFilter === "hot" ? "all" : "hot")
          }
        >
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-destructive">{hotCount}</p>
            <p className="text-xs text-muted-foreground">Hot Leads</p>
          </CardContent>
        </Card>
        <Card
          className={`shadow-sm rounded-xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
            priorityFilter === "warm"
              ? "border-[color:var(--warning)]/50 bg-[color:var(--warning)]/5"
              : "hover:border-primary/30"
          }`}
          onClick={() =>
            setPriorityFilter(priorityFilter === "warm" ? "all" : "warm")
          }
        >
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-[color:var(--warning)]">
              {warmCount}
            </p>
            <p className="text-xs text-muted-foreground">Warm Leads</p>
          </CardContent>
        </Card>
        <Card
          className={`shadow-sm rounded-xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
            priorityFilter === "cold"
              ? "border-muted-foreground/50 bg-muted/50"
              : "hover:border-primary/30"
          }`}
          onClick={() =>
            setPriorityFilter(priorityFilter === "cold" ? "all" : "cold")
          }
        >
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-muted-foreground">
              {coldCount}
            </p>
            <p className="text-xs text-muted-foreground">Cold Leads</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="proposal">Proposal</SelectItem>
            <SelectItem value="won">Won</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lead cards */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <Card className="shadow-sm rounded-xl">
            <CardContent className="p-8 text-center">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <User className="size-8" />
                <p>No leads found</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filtered.map((lead, index) => {
            const priority = priorityConfig[lead.priority];
            return (
              <Card
                key={lead.id}
                className="shadow-sm rounded-xl hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30 transition-all duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Lead info */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-semibold text-base">
                          {lead.firstName} {lead.lastName}
                        </h3>
                        <Badge
                          variant="outline"
                          className={`border-0 ${priority.className}`}
                        >
                          {priority.label}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {statusLabels[lead.status]}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Mail className="size-3.5" />
                          {lead.email}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Phone className="size-3.5" />
                          {lead.phone}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                        <span className="text-muted-foreground">
                          Interested in{" "}
                          <span className="text-foreground font-medium">
                            {lead.interestedMake} {lead.interestedModel}
                          </span>
                        </span>
                        <span className="text-muted-foreground">
                          Budget:{" "}
                          <span className="text-foreground font-medium">
                            {formatCurrency(lead.budget)}
                          </span>
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground italic">
                        {lead.notes}
                      </p>
                    </div>

                    {/* AI Score + Meta */}
                    <div className="flex lg:flex-col items-center lg:items-end gap-4 lg:gap-2 shrink-0">
                      <div className="flex items-center gap-2 min-w-[140px]">
                        <Sparkles
                          className={`size-4 ${getScoreColor(lead.aiScore)}`}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">
                              AI Score
                            </span>
                            <span
                              className={`text-sm font-bold ${getScoreColor(
                                lead.aiScore
                              )}`}
                            >
                              {lead.aiScore}
                            </span>
                          </div>
                          <Progress value={lead.aiScore} className="h-1.5" />
                        </div>
                      </div>
                      <div className="text-right text-xs text-muted-foreground space-y-0.5">
                        <p>
                          Assigned to{" "}
                          <span className="text-foreground">
                            {lead.assignedTo}
                          </span>
                        </p>
                        <p>Last contact: {formatRelativeDate(lead.lastContactDate)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
