
import { currentUser } from "@clerk/nextjs/server";
import prisma from '../../../../lib/prismadb'
import { DataTable } from "./_components/DataTable";
import { columns } from "./_components/columns";
const Profile = async() => {
  const user = await currentUser()
  if(!user || user.emailAddresses[0].emailAddress!==process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    return <div>You are not authorized to view this page</div>
  }
  
  const profile = await prisma.profile.findFirst({
    include:{
      projects:{
        orderBy:{
          updatedAt: "desc"
        }
      }
    }
  });

  if(!profile) {
    return <div>You are not authorized to view this page</div>
  }

  
  return (
    <div className="w-full mt-5 p-2">
      <DataTable columns={columns} data={profile.projects}/>
    </div>
  );
};

export default Profile;
