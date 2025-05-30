import Link from "next/link";
import prisma from "../../../../lib/prismadb";
import ProjectDetails from "./_components/ProjectDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const page = async({params}:{params:{projectId:string}}) => {

    const project = await prisma.projects.findUnique({
        where:{
            id: params.projectId
        }
    })

    if(!project){
        return null;
    }

    return (
    <div className="p-6 flex flex-col items-start gap-5 bg-slate-100 dark:bg-slate-950 min-h-screen"  >
        <Link href={"/projects"}>
            <Button variant={"link"} className="flex items-center p-0">
                <ArrowLeft className="w-4 h-4 mr-1" />
                View Other Projects
            </Button>
        </Link>
        <ProjectDetails project={project}/>
    </div>
  )
}

export default page