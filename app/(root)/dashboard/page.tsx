import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await currentUser();

  if (
    user?.emailAddresses[0].emailAddress !== process.env.NEXT_PUBLIC_ADMIN_EMAIL
  ) {
    return redirect("/");
  }
  return redirect("/dashboard/admin-profile");
};

export default page;
