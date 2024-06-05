import { currentUser } from "@clerk/nextjs/server";
import NavbarRoutes from "./NavbarRoutes";

const Sidebar = async () => {
  const user = await currentUser();
  const emailAddress = user?.emailAddresses[0].emailAddress;

  return (
    <div className="h-full">
      <NavbarRoutes emailAddress={emailAddress} />
    </div>
  );
};

export default Sidebar;
