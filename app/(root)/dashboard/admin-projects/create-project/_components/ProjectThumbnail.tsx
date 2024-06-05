"use client";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { File } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import FileUpload from "@/components/file-upload";
import Link from "next/link";
import Image from "next/image";

const ProjectThumbnail = ({
  thumbnail,
  setThumbnail,
}: {
  thumbnail: string;
  setThumbnail: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 w-full border-sky-500">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl lg:text-2xl font-medium">Project thumbnail</h1>
      </div>

      <div className="flex flex-col items-start gap-4 w-full">
        {thumbnail ? (
          <div className="flex flex-col items-center justify-between p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md h-[330px] relative">
            <Image src={thumbnail} alt="Thumbnail" fill />
            <Button size={"sm"} variant={"destructive"} onClick={()=>setThumbnail("")} className="absolute top-0 right-0">Delete</Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 p-3 w-full bg-slate-200 border-sky-200 border text-sky-700 rounded-md h-[300px]">
            <File className="h-8 w-8 mr-2 flex-shrink-0" />
            <FileUpload
              endpoint="image"
              onChange={(url) => {
                if (url) {
                  setThumbnail(url);
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectThumbnail;
