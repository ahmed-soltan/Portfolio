import { currentUser } from "@clerk/nextjs/server";
import prisma from "../../../../lib/prismadb";
import Skills from "./_components/skills";
const AdminSkills = async () => {
  const user = await currentUser();
  if (
    !user ||
    user.emailAddresses[0].emailAddress !== process.env.NEXT_PUBLIC_ADMIN_EMAIL
  ) {
    return <div>You are not authorized to view this page</div>;
  }

  const profile = await prisma.profile.findFirst({
    include: {
      skills: {
        select: {
          id:true,
          skill: true,
        },
      },
    },
  });
  if (!profile) {
    return <div>You are not authorized to view this page</div>;
  }
  return (
    <div className="flex flex-col items-start gap-5 w-full mt-5 p-2">
      <Skills skills={profile.skills!} profileId={profile.id} />
    </div>
  );
};

export default AdminSkills;
