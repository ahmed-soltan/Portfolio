import prisma from "../../../../lib/prismadb";

const page = async({params}:{params:{projectId:string}}) => {

    const project = await prisma.projects.findUnique({
        where:{
            id: params.projectId
        }
    })

    if(!project){
        return null;
    }
    console.log(project)
  return (
    <div>
        ID : {project.id}
    </div>
  )
}

export default page