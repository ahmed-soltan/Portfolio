"use client";
import { Award, Boxes, Grid, Layers, Mail, Pen, User } from "lucide-react";
import NavbarItem from "./NavbarItem";

const NavbarRoutes = ({
  emailAddress,
}: {
  emailAddress: string | undefined;
}) => {
  console.log(emailAddress);
  const routes =
    emailAddress === process.env.NEXT_PUBLIC_ADMIN_EMAIL
      ? [
          {
            path: "/profile",
            name: "About Me",
            icon: User,
          },
          {
            path: "/skills",
            name: "Skills",
            icon: Award,
          },
          {
            path: "/projects",
            name: "Projects",
            icon: Layers,
          },
          {
            path: "/blogs",
            name: "Blog",
            icon: Pen,
          },
          {
            path: "/contact",
            name: "Contact me",
            icon: Mail,
          },
          {
            path: "/dashboard",
            name: "Dashboard",
            icon: Boxes,
          },
        ]
      : [
          {
            path: "/profile",
            name: "About Me",
            icon: User,
          },
          {
            path: "/skills",
            name: "Skills",
            icon: Award,
          },
          {
            path: "/projects",
            name: "Projects",
            icon: Layers,
          },
          {
            path: "/blogs",
            name: "Blog",
            icon: Pen,
          },
          {
            path: "/contact",
            name: "Contact me",
            icon: Mail,
          },
        ];

  return (
    <div className="flex items-start gap-3 border-r-[.5px] flex-col h-full pt-3">
      {routes.map((route) => (
        <NavbarItem
          key={route.name}
          label={route.name}
          path={route.path}
          icon={route.icon}
        />
      ))}
    </div>
  );
};

export default NavbarRoutes;
