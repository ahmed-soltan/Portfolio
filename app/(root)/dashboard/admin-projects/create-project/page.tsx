import AddProjectForm from "./_components/AddProjectForm"
import prisma from '../../../../../lib/prismadb'
import { currentUser } from "@clerk/nextjs/server"
const page = async() => {
    const user = await currentUser()
    if(!user || user.emailAddresses[0].emailAddress!==process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      return <div>You are not authorized to view this page</div>
    }
    
    const profile = await prisma.profile.findFirst();
    if(!profile) {
      return <div>You are not authorized to view this page</div>
    }

  return (
    <div>
        <AddProjectForm profileId={profile.id}/>
    </div>
  )
}

export default page