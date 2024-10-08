"use client";
import { Projects } from "@prisma/client";
import CategoryList from "./CategoryList";
import Image from "next/image";
import { shortenTitle } from "@/lib/shortenTitle";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProjectsContainer = ({ projects }: { projects: Projects[] }) => {
  const [category, setCategory] = useState<string>("All");
  const [filteredProjects, setFilteredProjects] =
    useState<Projects[]>(projects);

  useEffect(() => {
    setFilteredProjects(
      projects.filter((project) =>
        category === "All"
          ? projects
          : project.category === category ||
            project.technologies.includes(category!)
      )
    );
  }, [category]);

  return (
    <div className="w-full flex flex-col items-center justify-center lg:justify-start mt-5">
      <CategoryList setCategory={setCategory} category={category} />
      <div className="w-full flex items-center justify-center lg:justify-start gap-4 flex-wrap">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => {
            return (
              <Link
                href={`/projects/${project.id}`}
                className="border-[1px] rounded-xl w-[300px] h-[270px] relative flex flex-col items-start justify-between gap-3 pb-3"
                key={project.id}
              >
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  width={350}
                  height={250}
                  className="bg-black min-h-[150px] rounded-t-xl"
                />
                <h1 className="text-slate-800 dark:text-slate-100 font-medium mx-2">
                  {shortenTitle(project.title, 31)}
                </h1>
                <h1 className="text-sky-700 text-sm bg-sky-100 dark:bg-white rounded-full mx-2 px-3">
                  {project.category}
                </h1>
              </Link>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ProjectsContainer;
