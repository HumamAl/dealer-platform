"use client";

import { useState } from "react";
import { Search, Car } from "lucide-react";
import { vehicles } from "@/data/mock-data";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import type { VehicleStatus } from "@/lib/types";

const statusConfig: Record<
  VehicleStatus,
  { label: string; className: string }
> = {
  "in-stock": {
    label: "In Stock",
    className: "bg-[color:var(--success)]/10 text-[color:var(--success)]",
  },
  reconditioning: {
    label: "Reconditioning",
    className: "bg-[color:var(--warning)]/10 text-[color:var(--warning)]",
  },
  sold: {
    label: "Sold",
    className: "bg-muted text-muted-foreground",
  },
  reserved: {
    label: "Reserved",
    className: "bg-[color:var(--chart-4)]/10 text-[color:var(--chart-4)]",
  },
  "pending-appraisal": {
    label: "Pending Appraisal",
    className: "bg-[color:var(--chart-2)]/10 text-[color:var(--chart-2)]",
  },
};

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = vehicles.filter((v) => {
    const matchesStatus =
      statusFilter === "all" || v.status === statusFilter;
    const searchLower = search.toLowerCase();
    const matchesSearch =
      search === "" ||
      `${v.year} ${v.make} ${v.model} ${v.trim}`.toLowerCase().includes(searchLower) ||
      v.vin.toLowerCase().includes(searchLower);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Vehicle Inventory</h1>
            <Badge variant="secondary" className="text-xs">
              {filtered.length} vehicles
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and track your vehicle stock
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by make, model, or VIN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="in-stock">In Stock</SelectItem>
            <SelectItem value="reconditioning">Reconditioning</SelectItem>
            <SelectItem value="reserved">Reserved</SelectItem>
            <SelectItem value="pending-appraisal">Pending Appraisal</SelectItem>
            <SelectItem value="sold">Sold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="shadow-sm rounded-xl">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle</TableHead>
                <TableHead className="hidden md:table-cell">VIN</TableHead>
                <TableHead className="hidden sm:table-cell">Color</TableHead>
                <TableHead className="hidden lg:table-cell">Mileage</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell text-right">Days on Lot</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Car className="size-8" />
                      <p>No vehicles found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((vehicle) => {
                  const status = statusConfig[vehicle.status];
                  return (
                    <TableRow
                      key={vehicle.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {vehicle.trim}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell font-mono text-xs text-muted-foreground">
                        ...{vehicle.vin.slice(-8)}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm">
                        {vehicle.color}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm">
                        {formatNumber(vehicle.mileage)} mi
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(vehicle.listPrice)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`border-0 ${status.className}`}
                        >
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-right">
                        <span
                          className={
                            vehicle.daysOnLot > 45
                              ? "text-[color:var(--destructive)] font-medium"
                              : vehicle.daysOnLot > 30
                              ? "text-[color:var(--warning)] font-medium"
                              : "text-muted-foreground"
                          }
                        >
                          {vehicle.daysOnLot}d
                        </span>
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
