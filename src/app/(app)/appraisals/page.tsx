"use client";

import { useState } from "react";
import { ClipboardCheck, DollarSign } from "lucide-react";
import { appraisals } from "@/data/mock-data";
import { formatCurrency, formatNumber, formatDate } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AppraisalStatus, VehicleCondition } from "@/lib/types";

const statusConfig: Record<
  AppraisalStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className: "bg-[color:var(--warning)]/10 text-[color:var(--warning)]",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-[color:var(--chart-1)]/10 text-[color:var(--chart-1)]",
  },
  completed: {
    label: "Completed",
    className: "bg-[color:var(--success)]/10 text-[color:var(--success)]",
  },
  expired: {
    label: "Expired",
    className: "bg-muted text-muted-foreground",
  },
};

const conditionConfig: Record<
  VehicleCondition,
  { label: string; className: string }
> = {
  excellent: {
    label: "Excellent",
    className: "bg-[color:var(--success)]/10 text-[color:var(--success)]",
  },
  good: {
    label: "Good",
    className: "bg-[color:var(--chart-1)]/10 text-[color:var(--chart-1)]",
  },
  fair: {
    label: "Fair",
    className: "bg-[color:var(--warning)]/10 text-[color:var(--warning)]",
  },
  poor: {
    label: "Poor",
    className: "bg-destructive/10 text-destructive",
  },
};

export default function AppraisalsPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = appraisals.filter(
    (a) => statusFilter === "all" || a.status === statusFilter
  );

  const pendingCount = appraisals.filter(
    (a) => a.status === "pending" || a.status === "in-progress"
  ).length;

  const completedAppraisals = appraisals.filter(
    (a) => a.status === "completed"
  );
  const avgMargin =
    completedAppraisals.length > 0
      ? completedAppraisals.reduce((sum, a) => {
          const margin =
            ((a.marketValue - a.offeredPrice) / a.marketValue) * 100;
          return sum + margin;
        }, 0) / completedAppraisals.length
      : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Vehicle Appraisals</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Evaluate trade-ins and acquisitions
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="shadow-sm rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <ClipboardCheck className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Pending / In Progress
              </p>
              <p className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {pendingCount}
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
              <p className="text-sm text-muted-foreground">
                Avg. Acquisition Margin
              </p>
              <p className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {avgMargin.toFixed(1)}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="shadow-sm rounded-xl">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle</TableHead>
                <TableHead className="hidden sm:table-cell">Customer</TableHead>
                <TableHead className="hidden lg:table-cell">Mileage</TableHead>
                <TableHead className="hidden md:table-cell">Condition</TableHead>
                <TableHead className="hidden lg:table-cell">Market Value</TableHead>
                <TableHead>Offered</TableHead>
                <TableHead className="hidden lg:table-cell">Margin</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Appraiser</TableHead>
                <TableHead className="hidden lg:table-cell">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <ClipboardCheck className="size-8" />
                      <p>No appraisals found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((appraisal) => {
                  const status = statusConfig[appraisal.status];
                  const condition = conditionConfig[appraisal.condition];
                  const margin =
                    ((appraisal.marketValue - appraisal.offeredPrice) /
                      appraisal.marketValue) *
                    100;

                  return (
                    <TableRow
                      key={appraisal.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">
                            {appraisal.vehicleDescription}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm">
                        {appraisal.customerName}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm">
                        {formatNumber(appraisal.mileage)} mi
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge
                          variant="outline"
                          className={`border-0 ${condition.className}`}
                        >
                          {condition.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm">
                        {formatCurrency(appraisal.marketValue)}
                      </TableCell>
                      <TableCell className="font-medium text-sm">
                        {formatCurrency(appraisal.offeredPrice)}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span
                          className={`text-sm font-medium ${
                            margin >= 10
                              ? "text-[color:var(--success)]"
                              : margin >= 5
                              ? "text-[color:var(--warning)]"
                              : "text-destructive"
                          }`}
                        >
                          {margin.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`border-0 ${status.className}`}
                        >
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                        {appraisal.appraiser}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                        {formatDate(appraisal.createdDate)}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
