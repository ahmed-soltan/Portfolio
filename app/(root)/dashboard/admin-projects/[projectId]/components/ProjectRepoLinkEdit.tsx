"use client";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ProjectRepoLink from "../../create-project/_components/ProjectRepoLink";
const ProjectRepoLinkEdit = ({
  projectRepoLink,
  profileId,
  projectId,
}: {
  projectRepoLink: string;
  profileId: string;
  projectId: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      repoLink: projectRepoLink || "",
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
      toast.success("Project Repo updated");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");

    } finally {
      setIsEditing(false);
    }
  };
  useEffect(() => {}, []);
  const isChanged = form.getValues("repoLink") !== projectRepoLink;

  return (
    <div className="flex flex-col items-start gap-2 w-full border-sky-500">
      <div className="flex justify-between items-center w-full">
      {!isEditing ? (
          <h1 className="text-xl">Repo Link</h1>
        ) : (
          <div></div>
        )}
        {isEditing ? (
          <Button
            variant={"secondary"}
            onClick={() => setIsEditing(false)}
            size={"sm"}
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        ) : (
          <Button
            variant={"secondary"}
            onClick={() => setIsEditing(true)}
            size={"sm"}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Button>
        )}
      </div>
      {isEditing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <ProjectRepoLink form={form} />
            <Button
              type="submit"
              variant={"success"}
              disabled={isSubmitting || !isValid || !isChanged}
            >
              Save
            </Button>
          </form>
        </Form>
      ) : projectRepoLink ? (
        <h1 className="text-base text-slate-700 dark:text-slate-400">
          {projectRepoLink}
        </h1>
      ) : (
        <h1 className="text-base text-slate-700 dark:text-slate-400 italic">
          You Have Not Provided a Project RepoLink
        </h1>
      )}
    </div>
  );
};

export default ProjectRepoLinkEdit;
