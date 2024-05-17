import type { Metadata } from "next";
import DashboardNav from "./components/DashboardNav";

export const metadata: Metadata = {
  title: "Ahmed Sultan's Portfolio",
  description: "I am a Web Developer and This My Portfolio",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-1 md:px-3 lg:px-5 py-5 h-full">
      <DashboardNav/>
      {children}
    </div>
  );
}
