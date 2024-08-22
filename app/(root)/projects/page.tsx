import prisma from "../../../lib/prismadb";
import ProjectsContainer from "./_components/Projects";

const page = async() => {
  const projects = await prisma.projects.findMany();

  if (!projects) {
    return null;
  }

  return (
    <div className="px-2 xl:px-10 w-full flex flex-col items-center justify-center">
      <ProjectsContainer projects={projects}/>
    </div>
  )
}

export default page