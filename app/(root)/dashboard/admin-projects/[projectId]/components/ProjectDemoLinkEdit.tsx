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
import ProjectDemoLink from "../../create-project/_components/ProjectDemoLink";
const ProjectDemoLinkEdit = ({
  projectDemoLink,
  profileId,
  projectId,
}: {
  projectDemoLink: string;
  profileId: string;
  projectId: string;
}) => {
  const [isEditting, setIsEditting] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      demoLink: projectDemoLink || "",
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
      toast.success("Project Demo Link updated");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");

    } finally {
      setIsEditting(false);
    }
  };
  useEffect(() => {}, []);
  const isChanged = form.getValues("demoLink") !== projectDemoLink;

  return (
    <div className="flex flex-col items-start gap-2 w-full border-sky-500">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl lg:text-2xl font-medium">Demo Link</h1>
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
            <ProjectDemoLink form={form} />
            <Button
              type="submit"
              variant={"success"}
              disabled={isSubmitting || !isValid || !isChanged}
            >
              Save
            </Button>
          </form>
        </Form>
      ) : projectDemoLink ? (
        <h1 className="text-base text-slate-700 dark:text-slate-400">
          {projectDemoLink}
        </h1>
      ) : (
        <h1 className="text-base text-slate-700 dark:text-slate-400 italic">
          You Have Not Provided a ProjectDemoLink
        </h1>
      )}
    </div>
  );
};

export default ProjectDemoLinkEdit;
