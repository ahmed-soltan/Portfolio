"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { File, Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import FileUpload from "@/components/file-upload";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

const ProjectThumbnialEdit = ({
  ProjectThumbnail,
  profileId,
  projectId,
}: {
  ProjectThumbnail: string;
  profileId: string;
  projectId: string;
}) => {
  const [isEditting, setIsEditting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const router = useRouter();

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/profile/${profileId}/projects/${projectId}`, {
        thumbnail: thumbnail,
      });
      router.refresh();
      toast.success("Project Thumnbnail Updated");

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
        <h1 className="text-xl lg:text-2xl font-medium">Project Thumbnail</h1>
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
          {thumbnail && (
            <div className="flex flex-col items-center justify-between w-full p-3 bg-slate-600 border-sky-200 border text-sky-700 rounded-md h-[330px] relative">
              <Image src={thumbnail} alt="Thumbnail" fill />
              <Button
                size={"sm"}
                variant={"destructive"}
                onClick={() => setThumbnail("")}
                className="absolute top-0 right-0"
              >
                Delete
              </Button>
            </div>
          )}

          <FileUpload
            endpoint="image"
            onChange={(url) => {
              if (url) {
                setThumbnail(url);
              }
            }}
          />
          <Button
            type="submit"
            variant={"success"}
            disabled={!thumbnail || isLoading}
            onClick={onSubmit}
          >
            Save
          </Button>
        </div>
      ) : ProjectThumbnail ? (
        <div className="flex flex-col items-center justify-between p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md">
          <div className="flex flex-col items-center justify-between p-3 w-full bg-slate-600 border-sky-200 border text-sky-700 rounded-md h-[330px] relative">
            <Image src={ProjectThumbnail} alt="Thumbnail" fill />
          </div>
        </div>
      ) : (
        <h1 className="text-base text-slate-700 dark:text-slate-400 italic">
          You Have Not Provided a Thumbnail
        </h1>
      )}
    </div>
  );
};

export default ProjectThumbnialEdit;
