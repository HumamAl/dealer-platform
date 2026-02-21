"use client";

import { useState } from "react";
import {
  Car,
  Users,
  DollarSign,
  Clock,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  dashboardStats,
  salesMetrics,
  leadPipelineSummary,
  vehicleStatusSummary,
  integrationLogs,
  leads,
} from "@/data/mock-data";
import {
  formatCurrency,
  formatCompactNumber,
  formatRelativeDate,
} from "@/lib/formatters";

const kpiCards = [
  {
    title: "Total Vehicles",
    value: dashboardStats.totalVehicles,
    format: "number" as const,
    icon: Car,
    trend: "+12",
    trendUp: true,
    description: "in inventory",
  },
  {
    title: "Active Leads",
    value: dashboardStats.activeLeads,
    format: "number" as const,
    icon: Users,
    trend: "+8",
    trendUp: true,
    description: "this month",
  },
  {
    title: "Monthly Revenue",
    value: dashboardStats.monthlyRevenue,
    format: "currency" as const,
    icon: DollarSign,
    trend: "+9.8%",
    trendUp: true,
    description: "vs last month",
  },
  {
    title: "Avg Days on Lot",
    value: dashboardStats.avgDaysOnLot,
    format: "number" as const,
    icon: Clock,
    trend: "-3",
    trendUp: true,
    description: "days average",
  },
];

function formatKpiValue(value: number, format: "number" | "currency") {
  if (format === "currency") return formatCompactNumber(value);
  return value.toString();
}

function formatKpiPrefix(format: "number" | "currency") {
  if (format === "currency") return "$";
  return "";
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-background p-3 shadow-md">
      <p className="text-sm font-medium">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm text-muted-foreground">
          <span
            className="mr-2 inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          {entry.name}:{" "}
          {typeof entry.value === "number" && entry.value > 1000
            ? `$${(entry.value / 1000).toFixed(0)}K`
            : entry.value}
        </p>
      ))}
    </div>
  );
};

const recentDeals = leads
  .filter((l) => l.status === "won" || l.status === "proposal")
  .slice(0, 5);

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of dealership performance and key metrics
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales Performance</TabsTrigger>
        </TabsList>

        {/* KPI Stats Grid — always visible */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpiCards.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <Card
                key={kpi.title}
                className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 shadow-lg rounded-xl hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration: "400ms",
                }}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {kpi.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-primary/60" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    {formatKpiPrefix(kpi.format)}
                    {formatKpiValue(kpi.value, kpi.format)}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs">
                    {kpi.trendUp ? (
                      <ArrowUpRight className="h-3 w-3 text-[color:var(--success)]" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-[color:var(--warning)]" />
                    )}
                    <span className="font-medium text-[color:var(--success)]">
                      {kpi.trend}
                    </span>
                    <span className="text-muted-foreground">
                      {kpi.description}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Lead Pipeline Chart */}
            <Card className="shadow-sm rounded-xl hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="h-4 w-4 text-primary" />
                  Lead Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={leadPipelineSummary}
                      layout="vertical"
                      margin={{ top: 0, right: 20, bottom: 0, left: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={false}
                        stroke="var(--border)"
                      />
                      <XAxis type="number" fontSize={12} stroke="var(--muted-foreground)" />
                      <YAxis
                        dataKey="stage"
                        type="category"
                        width={80}
                        fontSize={12}
                        stroke="var(--muted-foreground)"
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="count"
                        name="Leads"
                        radius={[0, 4, 4, 0]}
                        barSize={24}
                      >
                        {leadPipelineSummary.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Status Summary */}
            <Card className="shadow-sm rounded-xl hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Car className="h-4 w-4 text-primary" />
                  Vehicle Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={vehicleStatusSummary}
                      margin={{ top: 0, right: 20, bottom: 0, left: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="var(--border)"
                      />
                      <XAxis
                        dataKey="status"
                        fontSize={11}
                        stroke="var(--muted-foreground)"
                        tickLine={false}
                      />
                      <YAxis fontSize={12} stroke="var(--muted-foreground)" />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="count"
                        name="Vehicles"
                        radius={[4, 4, 0, 0]}
                        barSize={36}
                      >
                        {vehicleStatusSummary.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Integration Logs Table */}
          <Card className="shadow-sm rounded-xl hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4 text-primary" />
                Recent Integrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>System</TableHead>
                    <TableHead>Direction</TableHead>
                    <TableHead>Record Type</TableHead>
                    <TableHead className="text-right">Records</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {integrationLogs.slice(0, 5).map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">
                        {log.system}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {log.direction}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.recordType}</TableCell>
                      <TableCell className="text-right">
                        {log.recordCount}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            log.status === "success"
                              ? "default"
                              : log.status === "failed"
                                ? "destructive"
                                : "secondary"
                          }
                          className={
                            log.status === "success"
                              ? "bg-[color:var(--success)] text-white"
                              : log.status === "pending"
                                ? "bg-[color:var(--warning)] text-white"
                                : ""
                          }
                        >
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">
                        {formatRelativeDate(log.timestamp)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SALES PERFORMANCE TAB */}
        <TabsContent value="sales" className="mt-6 space-y-6">
          {/* Sales & Revenue Chart */}
          <Card className="shadow-sm rounded-xl hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4 text-primary" />
                Sales & Revenue Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={salesMetrics}
                    margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="revenueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--chart-1)"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--chart-1)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="salesGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--chart-2)"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--chart-2)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                    />
                    <XAxis
                      dataKey="month"
                      fontSize={12}
                      stroke="var(--muted-foreground)"
                    />
                    <YAxis
                      yAxisId="revenue"
                      orientation="left"
                      fontSize={12}
                      stroke="var(--muted-foreground)"
                      tickFormatter={(v) =>
                        v >= 1000 ? `$${(v / 1000).toFixed(0)}K` : `$${v}`
                      }
                    />
                    <YAxis
                      yAxisId="sales"
                      orientation="right"
                      fontSize={12}
                      stroke="var(--muted-foreground)"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      yAxisId="revenue"
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue"
                      stroke="var(--chart-1)"
                      strokeWidth={2}
                      fill="url(#revenueGradient)"
                    />
                    <Area
                      yAxisId="sales"
                      type="monotone"
                      dataKey="sales"
                      name="Units Sold"
                      stroke="var(--chart-2)"
                      strokeWidth={2}
                      fill="url(#salesGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Deals Table */}
          <Card className="shadow-sm rounded-xl hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <DollarSign className="h-4 w-4 text-primary" />
                Recent Deals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Vehicle Interest</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>AI Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentDeals.map((deal) => (
                    <TableRow key={deal.id}>
                      <TableCell className="font-medium">
                        {deal.firstName} {deal.lastName}
                      </TableCell>
                      <TableCell>
                        {deal.interestedMake} {deal.interestedModel}
                      </TableCell>
                      <TableCell>{formatCurrency(deal.budget)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${deal.aiScore}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {deal.aiScore}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            deal.status === "won"
                              ? "bg-[color:var(--success)] text-white"
                              : "bg-[color:var(--chart-4)] text-white"
                          }
                        >
                          {deal.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {deal.assignedTo}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Monthly Metrics Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className="shadow-sm rounded-xl hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Conversion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardStats.conversionRate}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Lead to sale conversion
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-sm rounded-xl hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  AI Lead Score Avg
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardStats.aiLeadScore}/100
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Predictive lead quality
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-sm rounded-xl hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending Appraisals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardStats.pendingAppraisals}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Awaiting review
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
