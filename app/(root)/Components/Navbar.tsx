import { ModeToggle } from "@/components/DarkModeButton";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import MobileSidebar from "./MobileSidebar";
import Logo from "./Logo";
export default async function Navbar() {
  const user = await currentUser();
  return (
    <header className="flex items-center justify-between border-b-[1px] shadow-sm p-2 h-full z-50 bg-white">
      <div className="flex items-center gap-3">
        <MobileSidebar />
        <Link href={"/"} className="hidden md:block">
          <Logo />
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <h1>Hello, {user?.firstName ? user?.firstName :"Guest"}</h1>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ModeToggle />
      </div>
    </header>
  );
}
