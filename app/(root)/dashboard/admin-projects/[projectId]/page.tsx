import { currentUser } from "@clerk/nextjs/server";
import prisma from "../../../../../lib/prismadb";
import ProjectTitleEdit from "./components/ProjectTitleEdit";
import { Separator } from "@/components/ui/separator";
import ProjectDescriptionEdit from "./components/ProjectDescriptionEdit";
import ProjectVideoEdit from "./components/ProjectVideoEdit";
import ProjectThumbnialEdit from "./components/ThumbnailEdit";
import ProjectCategoryEdit from "./components/ProjectCategoryEdit";
import ProjectAvailabilityEdit from "./components/ProjectAvailabilityEdit";
import ProjectTechnoEdit from "./components/ProjectTechnoEdit";
import ProjectRepoLinkEdit from "./components/ProjectRepoLinkEdit";
import ProjectDemoLinkEdit from "./components/ProjectDemoLinkEdit";
const page = async ({ params }: { params: { projectId: string } }) => {
  const user = await currentUser();
  if (
    !user ||
    user.emailAddresses[0].emailAddress !== process.env.NEXT_PUBLIC_ADMIN_EMAIL
  ) {
    return <div>You are not authorized to view this page</div>;
  }

  const profile = await prisma.profile.findFirst();
  if (!profile) {
    return <div>You are not authorized to view this page</div>;
  }

  const project = await prisma.projects.findFirst({
    where: {
      id: params.projectId,
    },
  });

  if (!project) {
    return null;
  }

  console.log(project);

  return (
    <div className="flex flex-col gap-3 w-full py-5">
      <h1 className="text-2xl font-medium">Project Details</h1>
      <Separator />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4  w-full">
        <div className="flex items-start flex-col w-full gap-4">
          <ProjectTitleEdit
            profileId={profile.id}
            projectId={params.projectId}
            projectTitle={project.title}
          />
          <Separator />
          <ProjectDescriptionEdit
            profileId={profile.id}
            projectId={params.projectId}
            projectDescription={project.description}
          />
          <Separator />
          <ProjectCategoryEdit
            profileId={profile.id}
            projectId={params.projectId}
            projectCategory={project.category}
          />
          <Separator />
          <ProjectAvailabilityEdit
            profileId={profile.id}
            projectId={params.projectId}
            projectAvailability={project.isPublished}
          />
          <Separator />
          <ProjectTechnoEdit
            profileId={profile.id}
            projectId={params.projectId}
            projectTechnologies={project.technologies}
          />
          <Separator />
          <ProjectRepoLinkEdit
            profileId={profile.id}
            projectId={params.projectId}
            projectRepoLink={project.repoLink}
          />
          <Separator />
          <ProjectDemoLinkEdit
            profileId={profile.id}
            projectId={params.projectId}
            projectDemoLink={project.demoLink}
          />

        </div>
        <div className="flex items-start flex-col w-full gap-5">
          <ProjectVideoEdit
            profileId={profile.id}
            projectId={params.projectId}
            video={project.video}
          />
          <Separator />
          <ProjectThumbnialEdit
            profileId={profile.id}
            projectId={params.projectId}
            ProjectThumbnail={project.thumbnail}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
