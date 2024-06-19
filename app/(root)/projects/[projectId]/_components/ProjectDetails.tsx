"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Projects } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaGithub } from "react-icons/fa6";

interface ProjectDetailsProps {
  project: Projects;
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 gap-5">
      <div className="w-full">
        {project.video ? (
          <div className="flex flex-col items-center justify-between p-1 rounded-xl border-4 border-slate-800 dark:border-slate-300">
            <video className="rounded-xl" controls>
              <source src={project.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-between p-1 border-slate-800 dark:border-slate-300 border-[10px] rounded-xl">
            <Image
              src={project.thumbnail}
              alt={project.title}
              width={800}
              height={600}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col items-start gap-4 w-full">
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
        <p className="text-slate-700 text-sm max-w-full dark:text-slate-300">
          {project.description}
        </p>
        <Separator className="dark:bg-slate-200" />
        <div className="flex items-center gap-5">
          <Link href={project.repoLink} target="_blank">
            <Button
              variant={"secondary"}
              size={"sm"}
              className="flex items-center"
            >
              <FaGithub size={20} className="mr-2" />
              View Source Code
            </Button>
          </Link>
          <Link href={project.demoLink} target="_blank">
            <Button
              variant={"default"}
              size={"sm"}
              className="flex items-center"
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
