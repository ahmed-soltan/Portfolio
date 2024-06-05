"use client";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { File, Pencil, Video, X } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import FileUpload from "@/components/file-upload";
import Link from "next/link";

const ProjectVideo = ({
  video,
  setVideo,
}: {
  video: string;
  setVideo: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 w-full border-sky-500">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl lg:text-2xl font-medium">Project Video</h1>
      </div>

      <div className="flex flex-col items-start gap-4 w-full">
        {video ? (
          <div className="flex flex-col items-center justify-between p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md h-[330px] relative">
            <video className="w-full rounded-md h-full" controls>
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <Button size={"sm"} variant={"destructive"} onClick={()=>setVideo("")} className="absolute top-0 right-0">Delete</Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 p-3 w-full bg-slate-200 border-sky-200 border text-sky-700 rounded-md h-[300px]">
            <Video className="h-8 w-8 mr-2 flex-shrink-0" />
            <FileUpload
              endpoint="projectVideo"
              onChange={(url) => {
                if (url) {
                  setVideo(url);
                }
              }}
            />
          </div>
        )} 

      </div>
    </div>
  );
};

export default ProjectVideo;
