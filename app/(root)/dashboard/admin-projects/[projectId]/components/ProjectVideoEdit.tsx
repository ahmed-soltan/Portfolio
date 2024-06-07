"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { File, Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import FileUpload from "@/components/file-upload";
import Link from "next/link";
import toast from "react-hot-toast";

const ProjectVideoEdit = ({
  video,
  profileId,
  projectId,
}: {
  video: string;
  profileId: string;
  projectId: string;
}) => {
  const [isEditting, setIsEditting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [projectVideoEdit, setProjectVideoEdit] = useState("");
  const router = useRouter();

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/profile/${profileId}/projects/${projectId}`, {
        video: projectVideoEdit,
      });
      router.refresh();
      toast.success("Project Video Updated");

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");

    } finally {
      setIsEditting(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2 w-full border-sky-500">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl lg:text-2xl font-medium">Project Video</h1>
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
        <div className="flex flex-col items-start gap-4 w-full">
          {projectVideoEdit && (
            <div className="flex flex-col items-center justify-between p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md">
              <div className="flex items-center mb-2">
                <File className="h-4 w-4 mr-2 flex-shrink-0" />
                <p className="text-xs line-clamp-1">{projectVideoEdit}</p>
              </div>
              <video className="w-full rounded-md" controls>
                <source src={projectVideoEdit} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          <FileUpload
            endpoint="projectVideo"
            onChange={(url) => {
              if (url) {
                setProjectVideoEdit(url);
              }
            }}
          />
          <Button
            type="submit"
            variant={"success"}
            disabled={!projectVideoEdit || isLoading}
            onClick={onSubmit}
          >
            Save
          </Button>
        </div>
      ) : video ? (
        <div className="flex flex-col items-center justify-between p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md">
          <div className="flex items-center mb-2">
            <File className="h-4 w-4 mr-2 flex-shrink-0" />
            <p className="text-xs line-clamp-1">{video}</p>
          </div>
          <video className="w-full rounded-md" controls>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <h1 className="text-base text-slate-700 dark:text-slate-400 italic">
          You Have Not Provided a Video
        </h1>
      )}
    </div>
  );
};

export default ProjectVideoEdit;
