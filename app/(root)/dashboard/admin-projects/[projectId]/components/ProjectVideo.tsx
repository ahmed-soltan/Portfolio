"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { File, Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import FileUpload from "@/components/file-upload";
import Link from "next/link";

const ProjectVideo = ({
  video,
  profileId,
}: {
  video: string;
  profileId: string;
}) => {
  const [isEditting, setIsEditting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [projectVideo, setProjectVideo] = useState("");
  const router = useRouter();

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/profile/${profileId}`, { video: projectVideo });
      router.refresh();
    } catch (error) {
      console.log(error);
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
        <div className="flex flex-col items-start gap-4">
          {projectVideo && (
            <div className="flex flex-col items-center justify-between p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md">
              <div className="flex items-center mb-2">
                <File className="h-4 w-4 mr-2 flex-shrink-0" />
                <p className="text-xs line-clamp-1">{projectVideo}</p>
              </div>
              <video className="w-full rounded-md" controls>
                <source src={projectVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          <FileUpload
            endpoint="projectVideo"
            onChange={(url) => {
              if (url) {
                setProjectVideo(url);
              }
            }}
          />
          <Button
            type="submit"
            variant={"success"}
            disabled={!projectVideo || isLoading}
            onClick={onSubmit}
          >
            Save
          </Button>
        </div>
      ) : video ? (
        <Link
          href={video}
          className="flex items-center justify-between p-3 max-w-[500px] bg-sky-100 border-sky-200 text-sky-700 border-[2.5px] rounded-md hover:underline"
        >
          <div className="flex items-center">
            <File className="h-4 w-4 mr-2 flex-shrink-0" />
            <p className="text-xs line-clamp-1">{video}</p>
          </div>
        </Link>
      ) : (
        <h1 className="text-base text-slate-700 dark:text-slate-400 italic">
          You Have Not Provided a Video
        </h1>
      )}
    </div>
  );
};

export default ProjectVideo;
