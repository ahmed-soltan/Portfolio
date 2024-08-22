"use client";

import { Preview } from "@/components/preview";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Projects } from "@prisma/client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEye, FaGithub } from "react-icons/fa6";

interface ProjectDetailsProps {
  project: Projects;
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Loader2 className="w-9 h-9 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full min-h-screen">
      <div className="w-full bg-white dark:bg-slate-200 rounded-md">
        {project.video ? (
          <div className="flex flex-col items-center justify-between h-[400px] lg:h-[600px]
            p-1 rounded-xl border-4 border-slate-800 ">
            <video className="rounded-xl h-full w-full" controls>
              <source src={project.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-between p-1
           border-slate-800 dark:border-slate-300 border-4 rounded-xl">
            <Image
              src={project.thumbnail}
              alt={project.title}
              width={800}
              height={600}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col items-start gap-4 w-full bg-white dark:bg-slate-900 p-4 rounded-md">
        <h1 className="text-xl sm:text-3xl font-medium text-slate-800 dark:text-slate-100">
          {project.title}
        </h1>
        <Separator className="dark:bg-slate-200" />
        <h1 className="text-lg sm:text-xl font-medium text-slate-800 dark:text-slate-100">
          Technologies Used:
        </h1>
        <div className="flex flex-wrap gap-2 items-center">
          {project.technologies.map((technology) => {
            return (
              <Button
                key={technology}
                variant={"secondary"}
                className="rounded-full text-xs"
                size={"sm"}
              >
                {technology}
              </Button>
            );
          })}
        </div>
        <Separator className="dark:bg-slate-200" />
        <h1 className="text-xl sm:text-3xl font-medium text-slate-800 dark:text-slate-100">Project Description</h1>
        <Preview value={project.description}/>
        <Separator className="dark:bg-slate-200" />
        <div className="flex items-center gap-5 flex-wrap md:flex-nowrap w-full">
          <Link href={project.repoLink} target="_blank" className="w-full">
            <Button
              variant={"secondary"}
              size={"sm"}
              className="flex items-center w-full py-6"
            >
              <FaGithub size={20} className="mr-2" />
              View Source Code
            </Button>
          </Link>
          <Link href={project.demoLink} target="_blank" className="w-full">
            <Button
              variant={"default"}
              size={"sm"}
              className="flex items-center w-full py-6"
            >
              <FaEye size={20} className="mr-2" />
              View Live Demo
            </Button>
          </Link>
        </div>
        <Separator className="dark:bg-slate-200" />
      </div>
    </div>
  );
};

export default ProjectDetails;
