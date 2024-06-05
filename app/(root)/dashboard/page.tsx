import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const user = await currentUser();
  if(!user){
    return redirect("/")
  }
  if (
    user?.emailAddresses[0].emailAddress !== process.env.NEXT_PUBLIC_ADMIN_EMAIL
  ) {
    return redirect("/");
  }
  return redirect("/dashboard/admin-profile");
};

export default page;
