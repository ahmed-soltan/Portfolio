import { ModeToggle } from "@/components/DarkModeButton";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser()
  return (
    <div className="text-red">
      hello world
    </div>
  );
}
