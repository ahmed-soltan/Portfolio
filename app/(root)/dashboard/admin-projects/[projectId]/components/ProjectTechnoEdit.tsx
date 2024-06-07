"use client";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ProjectTitle from "../../create-project/_components/ProjectTitle";
import toast from "react-hot-toast";
import ProjectTechnologies from "../../create-project/_components/ProjectTechnologies";
const ProjectTechnoEdit = ({
  projectTechnologies,
  profileId,
  projectId,
}: {
  projectTechnologies: string[];
  profileId: string;
  projectId: string;
}) => {
  const [isEditting, setIsEditting] = useState(false);
  const [technologies, setTechnologies] =
    useState<string[]>(projectTechnologies);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      technology: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const onClick = (tech: string) => {
    setTechnologies((prev) => [...prev, tech]);
  };
  const onDeleteTechnology = (tech: string) => {
    console.log(tech);
    setTechnologies((prev) => prev.filter((techno) => techno !== tech));
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      await axios.patch(`/api/profile/${profileId}/projects/${projectId}`, {
        technologies: technologies,
      });
      router.refresh();
      toast.success("Project Technologies updated");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsEditting(false);
    }
  };
  useEffect(() => {}, []);
  const isChanged = !projectTechnologies.includes(form.getValues("technology"));

  return (
    <div className="flex flex-col items-start gap-2 w-full border-sky-500">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl lg:text-2xl font-medium">Technologies</h1>
        {isEditting ? (
          <Button
            variant={"default"}
            onClick={() => setIsEditting(false)}
            size={"sm"}
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        ) : (
          <Button
            variant={"default"}
            onClick={() => setIsEditting(true)}
            size={"sm"}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Button>
        )}
      </div>
      {isEditting ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <ProjectTechnologies
              form={form}
              onClick={onClick}
              technologies={technologies}
              onDeleteTechnology={onDeleteTechnology}
            />
            <Button
              type="submit"
              variant={"success"}
              disabled={isSubmitting || !isValid || !isChanged}
            >
              Save
            </Button>
          </form>
        </Form>
      ) : projectTechnologies ? (
        <div className="flex items-center gap-2 flex-wrap">
          {projectTechnologies.length > 0 &&
            projectTechnologies.map((technology: string, index: number) => (
              <h1
                className="bg-slate-200 text-slate-800 px-2 flex gap-2 items-center rounded-sm font-medium"
                key={index}
              >
                {technology}
              </h1>
            ))}
        </div>
      ) : (
        <h1 className="text-base text-slate-700 dark:text-slate-400 italic">
          You Have Not Provided a ProjectTitle
        </h1>
      )}
    </div>
  );
};

export default ProjectTechnoEdit;
