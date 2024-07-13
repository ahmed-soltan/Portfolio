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
import ProjectDescription from "../../create-project/_components/ProjectDescription";
import { Preview } from "@/components/preview";
const ProjectDescriptionDescriptionEdit = ({
  projectDescription,
  profileId,
  projectId,
}: {
  projectDescription: string;
  profileId: string;
  projectId: string;
}) => {
  const [isEditting, setIsEditting] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      description: projectDescription || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: FieldValues) => {
    try {
      await axios.patch(
        `/api/profile/${profileId}/projects/${projectId}`,
        data
      );
      router.refresh();
      toast.success("Project Description updated");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");

    } finally {
      setIsEditting(false);
    }
  };
  useEffect(() => {}, []);
  const isChanged = form.getValues("description") !== projectDescription;

  return (
    <div className="flex flex-col items-start gap-2 w-full border-sky-500">
      <div className="flex justify-between items-center w-full">
      {!isEditting ? (
          <h1 className="text-xl">Project Description</h1>
        ) : (
          <div></div>
        )}
        {isEditting ? (
          <Button
            variant={"secondary"}
            onClick={() => setIsEditting(false)}
            size={"sm"}
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        ) : (
          <Button
            variant={"secondary"}
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
            <ProjectDescription form={form} />
            <Button
              type="submit"
              variant={"success"}
              disabled={isSubmitting || !isValid || !isChanged}
            >
              Save
            </Button>
          </form>
        </Form>
      ) : projectDescription ? (
        <Preview value={projectDescription}/>
      ) : (
        <h1 className="text-base text-slate-700 dark:text-slate-400 italic">
          You Have Not Provided a ProjectDescription
        </h1>
      )}
    </div>
  );
};

export default ProjectDescriptionDescriptionEdit;
