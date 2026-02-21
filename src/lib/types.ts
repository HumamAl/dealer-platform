import type { LucideIcon } from "lucide-react";

// Sidebar navigation
export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// Challenge visualization types
export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

// Proposal types
export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string; icon?: string }[];
  skillCategories: { name: string; skills: string[] }[];
  stats: { label: string; value: string }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  outcome: string;
  tech: string[];
  url?: string;
  relevance?: string;
}

// ===== APP-SPECIFIC TYPES =====

export type VehicleStatus = "in-stock" | "pending-appraisal" | "reconditioning" | "sold" | "reserved";
export type VehicleCondition = "excellent" | "good" | "fair" | "poor";
export type FuelType = "gasoline" | "diesel" | "hybrid" | "electric";
export type TransmissionType = "automatic" | "manual" | "cvt";

export interface Vehicle {
  id: string;
  vin: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  color: string;
  mileage: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  listPrice: number;
  costBasis: number;
  status: VehicleStatus;
  condition: VehicleCondition;
  daysOnLot: number;
  addedDate: string;
  dealershipId: string;
}

export type LeadStatus = "new" | "contacted" | "qualified" | "proposal" | "won" | "lost";
export type LeadSource = "website" | "walk-in" | "referral" | "phone" | "social-media" | "third-party";
export type LeadPriority = "hot" | "warm" | "cold";

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: LeadSource;
  priority: LeadPriority;
  aiScore: number; // 0-100
  interestedVehicleId?: string;
  interestedMake?: string;
  interestedModel?: string;
  budget: number;
  notes: string;
  assignedTo: string;
  lastContactDate: string;
  createdDate: string;
  dealershipId: string;
}

export type AppraisalStatus = "pending" | "in-progress" | "completed" | "expired";

export interface Appraisal {
  id: string;
  vehicleDescription: string;
  year: number;
  make: string;
  model: string;
  mileage: number;
  condition: VehicleCondition;
  customerName: string;
  customerPhone: string;
  marketValue: number;
  offeredPrice: number;
  status: AppraisalStatus;
  appraiser: string;
  createdDate: string;
  completedDate?: string;
  dealershipId: string;
}

export type ReconStage = "inspection" | "mechanical" | "body-work" | "detailing" | "photography" | "complete";
export type ReconPriority = "urgent" | "high" | "normal" | "low";

export interface ReconditioningJob {
  id: string;
  vehicleId: string;
  vehicleDescription: string;
  stage: ReconStage;
  priority: ReconPriority;
  estimatedCost: number;
  actualCost?: number;
  assignedTech: string;
  startDate: string;
  targetDate: string;
  completedDate?: string;
  notes: string;
  dealershipId: string;
}

export interface Dealership {
  id: string;
  name: string;
  location: string;
  plan: "starter" | "professional" | "enterprise";
  activeUsers: number;
  vehicleCount: number;
  monthlyRevenue: number;
  joinedDate: string;
}

export interface DashboardStats {
  totalVehicles: number;
  activeLeads: number;
  pendingAppraisals: number;
  reconInProgress: number;
  monthlyRevenue: number;
  avgDaysOnLot: number;
  conversionRate: number;
  aiLeadScore: number;
}

export interface SalesMetric {
  month: string;
  sales: number;
  revenue: number;
  leads: number;
  appraisals: number;
}

export interface IntegrationLog {
  id: string;
  system: string;
  direction: "inbound" | "outbound";
  status: "success" | "failed" | "pending";
  recordType: string;
  recordCount: number;
  timestamp: string;
  duration: number;
  errorMessage?: string;
}
