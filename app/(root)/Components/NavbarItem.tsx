"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavbarItemProps = {
  label: string;
  path: string;
  icon: LucideIcon;
};
const NavbarItem = ({ label, path, icon: Icon }: NavbarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === path || pathname.includes(path);
  return (
    <Link
      href={path}
      className={cn(
        isActive && "text-sky-600 bg-slate-100 border-e-4 border-sky-600",
        "px-3 py-2 hover:bg-zinc-700  font-medium w-full flex items-center gap-3 transition"
      )}
    >
      <Icon className="w-5 h-5 mr-2" />
      <span>{label}</span>
    </Link>
  );
};

export default NavbarItem;
