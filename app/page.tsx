import { ModeToggle } from "@/components/DarkModeButton";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser()
  return (
    redirect("/profile")
  );
}
