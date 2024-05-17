"use client"
import { Award, Contact, MessageCircle, Pen, PencilRuler } from "lucide-react";
import React from "react";
import DashboardNavItem from "./DashboardNavItem";

const DashboardNav = () => {
  const dashboardRoutes = [
    {
      path: "/dashboard/admin-profile",
      name: "Profile",
      icon: Contact,
    },
    {
      path: "/dashboard/admin-projects",
      name: "Projects",
      icon: PencilRuler,
    },
    {
      path: "/dashboard/admin-skills",
      name: "Skills",
      icon: Award,
    },
    {
      path: "/dashboard/admin-blogs",
      name: "Blogs",
      icon: Pen,
    },
    {
      path: "/dashboard/admin-messages",
      name: "Messages",
      icon: MessageCircle,
    },
  ];
  return (
    <div className="flex items-center justify-start gap-3 overflow-x-auto pb-3 md:border-b-[1px]">
      {dashboardRoutes.map((route) => (
        <DashboardNavItem
          key={route.name}
          label={route.name}
          path={route.path}
          icon={route.icon}
        />
      ))}
    </div>
  );
};

export default DashboardNav;
