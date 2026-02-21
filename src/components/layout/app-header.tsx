"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Car,
  Users,
  ClipboardCheck,
  Wrench,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/inventory", label: "Inventory", icon: Car },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/appraisals", label: "Appraisals", icon: ClipboardCheck },
  { href: "/reconditioning", label: "Reconditioning", icon: Wrench },
];

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/inventory": "Vehicle Inventory",
  "/leads": "Lead Management",
  "/appraisals": "Vehicle Appraisals",
  "/reconditioning": "Reconditioning Pipeline",
};

export function AppHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const pageTitle =
    Object.entries(pageTitles).find(
      ([path]) => path === pathname || (path !== "/" && pathname.startsWith(path))
    )?.[1] ?? "Dashboard";

  return (
    <>
      <header className="h-14 border-b border-border bg-background flex items-center px-4 md:px-6">
        <button className="md:hidden mr-3" onClick={() => setOpen(true)}>
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-sm font-medium">{pageTitle}</h2>
      </header>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <span className="text-primary-foreground font-bold text-sm">D</span>
            </div>
            <div>
              <h1 className="font-semibold text-sm leading-tight">DealerHub</h1>
              <p className="text-[10px] text-muted-foreground">
                Dealership Platform
              </p>
            </div>
          </div>
          <nav className="p-2 space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary border-l-2 border-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
