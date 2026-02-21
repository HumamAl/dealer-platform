import type {
  Vehicle,
  Lead,
  Appraisal,
  ReconditioningJob,
  Dealership,
  DashboardStats,
  SalesMetric,
  IntegrationLog,
} from "@/lib/types";

// ===== DEALERSHIPS (MULTI-TENANT) =====
export const dealerships: Dealership[] = [
  { id: "dlr-001", name: "Pacific Auto Group", location: "Vancouver, BC", plan: "enterprise", activeUsers: 24, vehicleCount: 187, monthlyRevenue: 892000, joinedDate: "2025-06-15" },
  { id: "dlr-002", name: "Fraser Valley Motors", location: "Abbotsford, BC", plan: "professional", activeUsers: 12, vehicleCount: 94, monthlyRevenue: 445000, joinedDate: "2025-09-02" },
  { id: "dlr-003", name: "Island Auto Sales", location: "Victoria, BC", plan: "professional", activeUsers: 8, vehicleCount: 62, monthlyRevenue: 310000, joinedDate: "2025-11-20" },
  { id: "dlr-004", name: "Kelowna Car Co.", location: "Kelowna, BC", plan: "starter", activeUsers: 4, vehicleCount: 38, monthlyRevenue: 178000, joinedDate: "2026-01-08" },
];

// ===== DASHBOARD STATS =====
export const dashboardStats: DashboardStats = {
  totalVehicles: 187,
  activeLeads: 64,
  pendingAppraisals: 12,
  reconInProgress: 8,
  monthlyRevenue: 892000,
  avgDaysOnLot: 28,
  conversionRate: 34.2,
  aiLeadScore: 78,
};

// ===== VEHICLES (INVENTORY) =====
export const vehicles: Vehicle[] = [
  { id: "veh-001", vin: "1HGCM82633A004352", year: 2024, make: "Toyota", model: "RAV4", trim: "XLE Premium", color: "Lunar Rock", mileage: 8420, fuelType: "hybrid", transmission: "cvt", listPrice: 42990, costBasis: 36800, status: "in-stock", condition: "excellent", daysOnLot: 14, addedDate: "2026-02-06", dealershipId: "dlr-001" },
  { id: "veh-002", vin: "5YJSA1E26MF123456", year: 2023, make: "Honda", model: "CR-V", trim: "Touring", color: "Platinum White", mileage: 22150, fuelType: "gasoline", transmission: "cvt", listPrice: 38500, costBasis: 31200, status: "in-stock", condition: "excellent", daysOnLot: 22, addedDate: "2026-01-29", dealershipId: "dlr-001" },
  { id: "veh-003", vin: "3GNKBKRS8MS512478", year: 2024, make: "Ford", model: "F-150", trim: "Lariat", color: "Agate Black", mileage: 5800, fuelType: "gasoline", transmission: "automatic", listPrice: 62400, costBasis: 54100, status: "in-stock", condition: "excellent", daysOnLot: 8, addedDate: "2026-02-12", dealershipId: "dlr-001" },
  { id: "veh-004", vin: "WBA8E9C51GK789012", year: 2022, make: "BMW", model: "X3", trim: "xDrive30i", color: "Alpine White", mileage: 38900, fuelType: "gasoline", transmission: "automatic", listPrice: 41200, costBasis: 34500, status: "reconditioning", condition: "good", daysOnLot: 35, addedDate: "2026-01-16", dealershipId: "dlr-001" },
  { id: "veh-005", vin: "1N4BL4BV4MN345678", year: 2024, make: "Tesla", model: "Model Y", trim: "Long Range", color: "Midnight Silver", mileage: 12300, fuelType: "electric", transmission: "automatic", listPrice: 52800, costBasis: 45600, status: "in-stock", condition: "excellent", daysOnLot: 11, addedDate: "2026-02-09", dealershipId: "dlr-001" },
  { id: "veh-006", vin: "JTDKN3DU5A0123456", year: 2023, make: "Chevrolet", model: "Silverado 1500", trim: "RST", color: "Cherry Red", mileage: 28700, fuelType: "gasoline", transmission: "automatic", listPrice: 48900, costBasis: 41200, status: "in-stock", condition: "good", daysOnLot: 42, addedDate: "2026-01-09", dealershipId: "dlr-001" },
  { id: "veh-007", vin: "2T1BURHE4HC789012", year: 2024, make: "Hyundai", model: "Tucson", trim: "Limited", color: "Amazon Gray", mileage: 3200, fuelType: "hybrid", transmission: "automatic", listPrice: 44100, costBasis: 38400, status: "reserved", condition: "excellent", daysOnLot: 5, addedDate: "2026-02-15", dealershipId: "dlr-001" },
  { id: "veh-008", vin: "1G1YY22G955789012", year: 2022, make: "Mazda", model: "CX-5", trim: "Grand Touring", color: "Soul Red Crystal", mileage: 41200, fuelType: "gasoline", transmission: "automatic", listPrice: 33800, costBasis: 27900, status: "pending-appraisal", condition: "good", daysOnLot: 48, addedDate: "2026-01-03", dealershipId: "dlr-001" },
  { id: "veh-009", vin: "5NPE34AF7MH456789", year: 2024, make: "Subaru", model: "Outback", trim: "Premium", color: "Crystal White", mileage: 6100, fuelType: "gasoline", transmission: "cvt", listPrice: 39900, costBasis: 34200, status: "in-stock", condition: "excellent", daysOnLot: 18, addedDate: "2026-02-02", dealershipId: "dlr-001" },
  { id: "veh-010", vin: "1FTFW1E81MF901234", year: 2023, make: "Mercedes-Benz", model: "GLC 300", trim: "4MATIC", color: "Obsidian Black", mileage: 19800, fuelType: "gasoline", transmission: "automatic", listPrice: 49500, costBasis: 42100, status: "sold", condition: "excellent", daysOnLot: 19, addedDate: "2026-01-22", dealershipId: "dlr-001" },
  { id: "veh-011", vin: "WDBRF61J21F234567", year: 2024, make: "Kia", model: "Sportage", trim: "SX Prestige", color: "Dawning Red", mileage: 9100, fuelType: "hybrid", transmission: "automatic", listPrice: 41500, costBasis: 35800, status: "in-stock", condition: "excellent", daysOnLot: 12, addedDate: "2026-02-08", dealershipId: "dlr-001" },
  { id: "veh-012", vin: "3VW467AT6MM678901", year: 2022, make: "Volkswagen", model: "Tiguan", trim: "SE R-Line", color: "Platinum Gray", mileage: 35600, fuelType: "gasoline", transmission: "automatic", listPrice: 31200, costBasis: 25400, status: "reconditioning", condition: "fair", daysOnLot: 52, addedDate: "2025-12-30", dealershipId: "dlr-001" },
  { id: "veh-013", vin: "1C4RJFAG3MC345678", year: 2024, make: "Jeep", model: "Grand Cherokee", trim: "Limited", color: "Bright White", mileage: 14500, fuelType: "gasoline", transmission: "automatic", listPrice: 55200, costBasis: 47800, status: "in-stock", condition: "excellent", daysOnLot: 9, addedDate: "2026-02-11", dealershipId: "dlr-001" },
  { id: "veh-014", vin: "5TDDY5G12MS789012", year: 2023, make: "Nissan", model: "Rogue", trim: "SL", color: "Champagne Silver", mileage: 27400, fuelType: "gasoline", transmission: "cvt", listPrice: 35600, costBasis: 29800, status: "in-stock", condition: "good", daysOnLot: 31, addedDate: "2026-01-20", dealershipId: "dlr-001" },
  { id: "veh-015", vin: "2HGFC2F59MH012345", year: 2024, make: "Toyota", model: "Camry", trim: "XSE", color: "Cavalry Blue", mileage: 4800, fuelType: "hybrid", transmission: "cvt", listPrice: 38900, costBasis: 33400, status: "in-stock", condition: "excellent", daysOnLot: 6, addedDate: "2026-02-14", dealershipId: "dlr-001" },
];

// ===== LEADS =====
export const leads: Lead[] = [
  { id: "lead-001", firstName: "Sarah", lastName: "Chen", email: "sarah.chen@gmail.com", phone: "604-555-0123", status: "qualified", source: "website", priority: "hot", aiScore: 92, interestedVehicleId: "veh-005", interestedMake: "Tesla", interestedModel: "Model Y", budget: 55000, notes: "Pre-approved financing, ready to buy this week", assignedTo: "Mike Torres", lastContactDate: "2026-02-19", createdDate: "2026-02-12", dealershipId: "dlr-001" },
  { id: "lead-002", firstName: "James", lastName: "Patel", email: "jpatel@outlook.com", phone: "604-555-0456", status: "contacted", source: "walk-in", priority: "warm", aiScore: 74, interestedMake: "Toyota", interestedModel: "RAV4", budget: 45000, notes: "Comparing with Honda CR-V, test drove RAV4", assignedTo: "Lisa Wang", lastContactDate: "2026-02-18", createdDate: "2026-02-10", dealershipId: "dlr-001" },
  { id: "lead-003", firstName: "Emily", lastName: "Rodriguez", email: "emily.r@yahoo.com", phone: "778-555-0789", status: "new", source: "social-media", priority: "warm", aiScore: 68, interestedMake: "Hyundai", interestedModel: "Tucson", budget: 42000, notes: "Clicked Instagram ad, submitted form", assignedTo: "Mike Torres", lastContactDate: "2026-02-20", createdDate: "2026-02-19", dealershipId: "dlr-001" },
  { id: "lead-004", firstName: "David", lastName: "Kim", email: "dkim@techcorp.ca", phone: "604-555-1234", status: "proposal", source: "referral", priority: "hot", aiScore: 88, interestedVehicleId: "veh-003", interestedMake: "Ford", interestedModel: "F-150", budget: 65000, notes: "Business vehicle purchase, needs fleet pricing", assignedTo: "Lisa Wang", lastContactDate: "2026-02-19", createdDate: "2026-02-05", dealershipId: "dlr-001" },
  { id: "lead-005", firstName: "Priya", lastName: "Sharma", email: "priya.s@gmail.com", phone: "778-555-4567", status: "contacted", source: "third-party", priority: "cold", aiScore: 42, interestedMake: "Mazda", interestedModel: "CX-5", budget: 35000, notes: "Early research phase, not committed yet", assignedTo: "Mike Torres", lastContactDate: "2026-02-15", createdDate: "2026-02-08", dealershipId: "dlr-001" },
  { id: "lead-006", firstName: "Michael", lastName: "Thompson", email: "mthompson@bc.ca", phone: "604-555-7890", status: "won", source: "website", priority: "hot", aiScore: 96, interestedVehicleId: "veh-010", interestedMake: "Mercedes-Benz", interestedModel: "GLC 300", budget: 52000, notes: "Closed deal — financing approved, delivery scheduled", assignedTo: "Lisa Wang", lastContactDate: "2026-02-17", createdDate: "2026-01-28", dealershipId: "dlr-001" },
  { id: "lead-007", firstName: "Jessica", lastName: "Nguyen", email: "jnguyen@startup.io", phone: "778-555-2345", status: "qualified", source: "phone", priority: "warm", aiScore: 71, interestedMake: "Subaru", interestedModel: "Outback", budget: 40000, notes: "Needs AWD for ski trips, likes the Outback", assignedTo: "Mike Torres", lastContactDate: "2026-02-18", createdDate: "2026-02-11", dealershipId: "dlr-001" },
  { id: "lead-008", firstName: "Robert", lastName: "Wilson", email: "rwilson@email.com", phone: "604-555-3456", status: "new", source: "website", priority: "warm", aiScore: 63, interestedMake: "Jeep", interestedModel: "Grand Cherokee", budget: 58000, notes: "Filled out online inquiry, wants to trade in current vehicle", assignedTo: "Lisa Wang", lastContactDate: "2026-02-20", createdDate: "2026-02-20", dealershipId: "dlr-001" },
  { id: "lead-009", firstName: "Amanda", lastName: "Lee", email: "alee@corp.com", phone: "778-555-6789", status: "contacted", source: "walk-in", priority: "hot", aiScore: 85, interestedVehicleId: "veh-007", interestedMake: "Hyundai", interestedModel: "Tucson", budget: 46000, notes: "Test drove the Limited trim, very interested", assignedTo: "Mike Torres", lastContactDate: "2026-02-19", createdDate: "2026-02-14", dealershipId: "dlr-001" },
  { id: "lead-010", firstName: "Chris", lastName: "Brown", email: "cbrown@mail.ca", phone: "604-555-8901", status: "lost", source: "third-party", priority: "cold", aiScore: 28, interestedMake: "Honda", interestedModel: "CR-V", budget: 38000, notes: "Went with competitor — price was lower", assignedTo: "Lisa Wang", lastContactDate: "2026-02-10", createdDate: "2026-01-25", dealershipId: "dlr-001" },
  { id: "lead-011", firstName: "Natalie", lastName: "Chang", email: "nchang@gmail.com", phone: "778-555-0011", status: "new", source: "social-media", priority: "warm", aiScore: 59, interestedMake: "Kia", interestedModel: "Sportage", budget: 43000, notes: "Saw Facebook ad, interested in hybrid options", assignedTo: "Mike Torres", lastContactDate: "2026-02-20", createdDate: "2026-02-20", dealershipId: "dlr-001" },
  { id: "lead-012", firstName: "Daniel", lastName: "Martinez", email: "dmartinez@company.ca", phone: "604-555-2233", status: "qualified", source: "referral", priority: "hot", aiScore: 91, interestedVehicleId: "veh-013", interestedMake: "Jeep", interestedModel: "Grand Cherokee", budget: 60000, notes: "Referred by Michael Thompson, ready to negotiate", assignedTo: "Lisa Wang", lastContactDate: "2026-02-19", createdDate: "2026-02-16", dealershipId: "dlr-001" },
];

// ===== APPRAISALS =====
export const appraisals: Appraisal[] = [
  { id: "apr-001", vehicleDescription: "2021 Toyota Highlander XLE", year: 2021, make: "Toyota", model: "Highlander", mileage: 48200, condition: "good", customerName: "Robert Wilson", customerPhone: "604-555-3456", marketValue: 38500, offeredPrice: 34200, status: "pending", appraiser: "Tom Fletcher", createdDate: "2026-02-20", dealershipId: "dlr-001" },
  { id: "apr-002", vehicleDescription: "2022 Honda Accord Sport", year: 2022, make: "Honda", model: "Accord", mileage: 31400, condition: "excellent", customerName: "Sarah Chen", customerPhone: "604-555-0123", marketValue: 29800, offeredPrice: 27100, status: "completed", appraiser: "Tom Fletcher", createdDate: "2026-02-18", completedDate: "2026-02-19", dealershipId: "dlr-001" },
  { id: "apr-003", vehicleDescription: "2020 Ford Escape SE", year: 2020, make: "Ford", model: "Escape", mileage: 62300, condition: "fair", customerName: "James Patel", customerPhone: "604-555-0456", marketValue: 22100, offeredPrice: 18500, status: "completed", appraiser: "Maria Santos", createdDate: "2026-02-15", completedDate: "2026-02-16", dealershipId: "dlr-001" },
  { id: "apr-004", vehicleDescription: "2023 Subaru Crosstrek Limited", year: 2023, make: "Subaru", model: "Crosstrek", mileage: 18900, condition: "excellent", customerName: "Jessica Nguyen", customerPhone: "778-555-2345", marketValue: 33200, offeredPrice: 30500, status: "in-progress", appraiser: "Tom Fletcher", createdDate: "2026-02-19", dealershipId: "dlr-001" },
  { id: "apr-005", vehicleDescription: "2019 Chevrolet Equinox LT", year: 2019, make: "Chevrolet", model: "Equinox", mileage: 78400, condition: "fair", customerName: "Amanda Lee", customerPhone: "778-555-6789", marketValue: 18900, offeredPrice: 15200, status: "expired", appraiser: "Maria Santos", createdDate: "2026-01-28", dealershipId: "dlr-001" },
  { id: "apr-006", vehicleDescription: "2022 Mazda CX-9 Signature", year: 2022, make: "Mazda", model: "CX-9", mileage: 29500, condition: "excellent", customerName: "Daniel Martinez", customerPhone: "604-555-2233", marketValue: 37800, offeredPrice: 34600, status: "pending", appraiser: "Tom Fletcher", createdDate: "2026-02-20", dealershipId: "dlr-001" },
  { id: "apr-007", vehicleDescription: "2021 Nissan Murano SV", year: 2021, make: "Nissan", model: "Murano", mileage: 44100, condition: "good", customerName: "Natalie Chang", customerPhone: "778-555-0011", marketValue: 27600, offeredPrice: 24800, status: "in-progress", appraiser: "Maria Santos", createdDate: "2026-02-19", dealershipId: "dlr-001" },
  { id: "apr-008", vehicleDescription: "2023 Hyundai Santa Fe Calligraphy", year: 2023, make: "Hyundai", model: "Santa Fe", mileage: 15200, condition: "excellent", customerName: "Chris Brown", customerPhone: "604-555-8901", marketValue: 40100, offeredPrice: 37200, status: "completed", appraiser: "Tom Fletcher", createdDate: "2026-02-14", completedDate: "2026-02-15", dealershipId: "dlr-001" },
];

// ===== RECONDITIONING JOBS =====
export const reconditioningJobs: ReconditioningJob[] = [
  { id: "rec-001", vehicleId: "veh-004", vehicleDescription: "2022 BMW X3 xDrive30i", stage: "mechanical", priority: "high", estimatedCost: 2800, actualCost: 1950, assignedTech: "Jake Rivera", startDate: "2026-02-10", targetDate: "2026-02-22", notes: "Brake pads + rotors, oil change, cabin filter", dealershipId: "dlr-001" },
  { id: "rec-002", vehicleId: "veh-012", vehicleDescription: "2022 Volkswagen Tiguan SE R-Line", stage: "body-work", priority: "normal", estimatedCost: 3400, assignedTech: "Sam Okafor", startDate: "2026-02-08", targetDate: "2026-02-24", notes: "Rear bumper repaint, door ding repair, touch-up scratches", dealershipId: "dlr-001" },
  { id: "rec-003", vehicleId: "veh-006", vehicleDescription: "2023 Chevrolet Silverado 1500 RST", stage: "detailing", priority: "normal", estimatedCost: 450, actualCost: 420, assignedTech: "Jake Rivera", startDate: "2026-02-16", targetDate: "2026-02-21", notes: "Full interior/exterior detail, ceramic coat", dealershipId: "dlr-001" },
  { id: "rec-004", vehicleId: "veh-008", vehicleDescription: "2022 Mazda CX-5 Grand Touring", stage: "inspection", priority: "urgent", estimatedCost: 200, assignedTech: "Sam Okafor", startDate: "2026-02-20", targetDate: "2026-02-21", notes: "Initial inspection before pricing — possible engine noise", dealershipId: "dlr-001" },
  { id: "rec-005", vehicleId: "veh-014", vehicleDescription: "2023 Nissan Rogue SL", stage: "photography", priority: "low", estimatedCost: 150, actualCost: 150, assignedTech: "Jake Rivera", startDate: "2026-02-18", targetDate: "2026-02-20", notes: "Studio photos + 360 walkaround for website", dealershipId: "dlr-001" },
  { id: "rec-006", vehicleId: "veh-002", vehicleDescription: "2023 Honda CR-V Touring", stage: "complete", priority: "normal", estimatedCost: 1100, actualCost: 980, assignedTech: "Sam Okafor", startDate: "2026-02-01", targetDate: "2026-02-12", completedDate: "2026-02-11", notes: "Tire replacement + alignment, detail, photos — ready for lot", dealershipId: "dlr-001" },
  { id: "rec-007", vehicleId: "veh-009", vehicleDescription: "2024 Subaru Outback Premium", stage: "complete", priority: "low", estimatedCost: 350, actualCost: 320, assignedTech: "Jake Rivera", startDate: "2026-02-03", targetDate: "2026-02-08", completedDate: "2026-02-07", notes: "Detail only — vehicle in excellent shape", dealershipId: "dlr-001" },
  { id: "rec-008", vehicleId: "veh-011", vehicleDescription: "2024 Kia Sportage SX Prestige", stage: "complete", priority: "normal", estimatedCost: 600, actualCost: 580, assignedTech: "Sam Okafor", startDate: "2026-02-05", targetDate: "2026-02-10", completedDate: "2026-02-09", notes: "Minor paint touch-up, full detail, photo shoot", dealershipId: "dlr-001" },
];

// ===== SALES METRICS (Monthly) =====
export const salesMetrics: SalesMetric[] = [
  { month: "Sep", sales: 22, revenue: 748000, leads: 89, appraisals: 34 },
  { month: "Oct", sales: 28, revenue: 921000, leads: 102, appraisals: 41 },
  { month: "Nov", sales: 19, revenue: 642000, leads: 78, appraisals: 29 },
  { month: "Dec", sales: 31, revenue: 1085000, leads: 115, appraisals: 48 },
  { month: "Jan", sales: 24, revenue: 812000, leads: 94, appraisals: 37 },
  { month: "Feb", sales: 18, revenue: 892000, leads: 64, appraisals: 28 },
];

// ===== INTEGRATION LOGS =====
export const integrationLogs: IntegrationLog[] = [
  { id: "int-001", system: "CDK Global", direction: "inbound", status: "success", recordType: "Vehicle Inventory", recordCount: 12, timestamp: "2026-02-20T14:30:00", duration: 2.4 },
  { id: "int-002", system: "PBS Systems", direction: "outbound", status: "success", recordType: "Customer Records", recordCount: 8, timestamp: "2026-02-20T13:15:00", duration: 1.8 },
  { id: "int-003", system: "Dealertrack", direction: "inbound", status: "failed", recordType: "F&I Data", recordCount: 0, timestamp: "2026-02-20T12:00:00", duration: 5.1, errorMessage: "Connection timeout — retry scheduled" },
  { id: "int-004", system: "Tekion", direction: "inbound", status: "success", recordType: "Service Records", recordCount: 24, timestamp: "2026-02-20T11:45:00", duration: 3.2 },
  { id: "int-005", system: "CDK Global", direction: "outbound", status: "success", recordType: "Appraisal Results", recordCount: 5, timestamp: "2026-02-20T10:30:00", duration: 1.5 },
  { id: "int-006", system: "Keyloop", direction: "inbound", status: "success", recordType: "Lead Data", recordCount: 18, timestamp: "2026-02-20T09:00:00", duration: 2.1 },
  { id: "int-007", system: "PBS Systems", direction: "inbound", status: "pending", recordType: "Parts Catalog", recordCount: 0, timestamp: "2026-02-20T08:30:00", duration: 0 },
  { id: "int-008", system: "Dealertrack", direction: "outbound", status: "success", recordType: "Credit Applications", recordCount: 3, timestamp: "2026-02-19T16:45:00", duration: 1.9 },
  { id: "int-009", system: "CDK Global", direction: "inbound", status: "success", recordType: "Vehicle Inventory", recordCount: 9, timestamp: "2026-02-19T14:30:00", duration: 2.2 },
  { id: "int-010", system: "Tekion", direction: "outbound", status: "success", recordType: "Work Orders", recordCount: 6, timestamp: "2026-02-19T13:00:00", duration: 1.4 },
];

// ===== LEAD PIPELINE SUMMARY =====
export const leadPipelineSummary = [
  { stage: "New", count: 3, color: "var(--chart-1)" },
  { stage: "Contacted", count: 3, color: "var(--chart-2)" },
  { stage: "Qualified", count: 3, color: "var(--chart-3)" },
  { stage: "Proposal", count: 1, color: "var(--chart-4)" },
  { stage: "Won", count: 1, color: "var(--success)" },
  { stage: "Lost", count: 1, color: "var(--destructive)" },
];

// ===== VEHICLE STATUS SUMMARY =====
export const vehicleStatusSummary = [
  { status: "In Stock", count: 10, color: "var(--success)" },
  { status: "Reconditioning", count: 2, color: "var(--warning)" },
  { status: "Reserved", count: 1, color: "var(--chart-4)" },
  { status: "Pending Appraisal", count: 1, color: "var(--chart-2)" },
  { status: "Sold", count: 1, color: "var(--chart-5)" },
];

// ===== TOP PERFORMING STAFF =====
export const staffPerformance = [
  { name: "Lisa Wang", role: "Sales Manager", deals: 14, revenue: 498000, conversionRate: 38.2 },
  { name: "Mike Torres", role: "Sales Associate", deals: 10, revenue: 342000, conversionRate: 31.5 },
  { name: "Tom Fletcher", role: "Appraiser", deals: 0, revenue: 0, conversionRate: 0, appraisalsCompleted: 42 },
  { name: "Maria Santos", role: "Appraiser", deals: 0, revenue: 0, conversionRate: 0, appraisalsCompleted: 36 },
];
