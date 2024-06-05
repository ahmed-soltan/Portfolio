"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type DashboardNavItemProps = {
  label: string;
  path: string;
  icon: LucideIcon;
};
const DashboardNavItem = ({
  label,
  path,
  icon: Icon,
}: DashboardNavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === path || pathname.includes(path);
  return (
    <Link href={path}>
      <Button variant={isActive ? "secondary" : "outline"} className={cn(isActive && "border border-slate-700")}>
        <Icon className={cn("w-5 h-5  mr-2")} />
        <span className={cn("")}>{label}</span>
      </Button>
    </Link>
  );
};

export default DashboardNavItem;
