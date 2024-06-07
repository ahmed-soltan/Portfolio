"use client";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Banner from "@/app/(root)/Components/banner";
import ProjectTitle from "./ProjectTitle";
import ProjectDescription from "./ProjectDescription";
import ProjectAvailabilty from "./ProjectAvailabilty";
import ProjectTechnologies from "./ProjectTechnologies";
import ProjectCategory from "./ProjectCategory";
import ProjectVideo from "./ProjectVideo";
import ProjectThumbnail from "./ProjectThumbnail";
import ProjectRepoLink from "./ProjectRepoLink";
import ProjectDemoLink from "./ProjectDemoLink";

type AddProjectFormProps = {
  profileId: string;
};

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Product name must be at least 3 characters.",
  }),
  category: z.string(),
  description: z.string().min(3, {
    message: "Product description must be at least 3 characters.",
  }),
  repoLink:z.string(),
  demoLink:z.string(),
  isPublished: z.boolean(),
  technology: z.string(),
});
const AddProjectForm = ({ profileId }: AddProjectFormProps) => {
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState("");
  const [video, setVideo] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      technology: "",
      repoLink: "",
      demoLink: "",
      isPublished: false,
    },
  });
  const router = useRouter();
  const { getValues } = form;
  const { isSubmitting, isValid } = form.formState;

  const requiredField = [
    getValues("title"),
    getValues("description"),
    getValues("category"),
    thumbnail,
    video,
    technologies.length > 0,
  ];
  const onClick = (tech: string) => {
    setTechnologies((prev) => [...prev, tech]);
  };
  const onDeleteTechnology = (tech: string) => {
    console.log(tech);
    setTechnologies((prev) => prev.filter((techno) => techno !== tech));
  };

  const totalFields = requiredField.length;
  const completedFields = requiredField.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredField.every(Boolean);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const projectData = {
      ...data,
      technologies: technologies,
      thumbnail: thumbnail,
      video: video,
      profileId: profileId,
    };

    try {
      await axios.post(`/api/profile/${profileId}/projects`, projectData);
      toast.success("Project Created successfully");
      router.refresh();
      router.push(`/dashboard/admin-projects`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
    }
  };
  return (
    <>
      {!form.getValues("isPublished") && (
        <Banner
          variant={"warning"}
          label="This Project is not Published. It will not be Visible to your Visitors"
        />
      )}
      <div className="p-6">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Product Creation</h1>
          <span className="text-sm text-slate-700">
            Compelete All Fields {completionText}
          </span>
          <Separator />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4  w-full">
          <Form {...form}>
            <form
              className="space-y-4 mt-4 max-w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <ProjectTitle form={form} />
              <ProjectDescription form={form} />
              <ProjectCategory form={form} />

              <ProjectRepoLink form={form} />
              <ProjectDemoLink form={form} />
              <ProjectAvailabilty form={form} />
              <div className="flex justify-start gap-5">
                <ProjectTechnologies
                  form={form}
                  onClick={onClick}
                  technologies={technologies}
                  onDeleteTechnology={onDeleteTechnology}
                />
              </div>
              <Button
                variant={"success"}
                disabled={!isComplete || !isValid || isSubmitting}
              >
                Add Project
              </Button>
            </form>
          </Form>
          <div className="flex flex-col items-start gap-5 mt-4">
            <ProjectVideo setVideo={setVideo} video={video} />
            <ProjectThumbnail
              setThumbnail={setThumbnail}
              thumbnail={thumbnail}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProjectForm;
