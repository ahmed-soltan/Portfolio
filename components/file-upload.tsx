"use client"

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton } from "@/lib/uploadthing";
import toast from "react-hot-toast";

interface FileUploadProps{
    onChange:(url?:string)=>void;
    endpoint:keyof typeof ourFileRouter
}
const FileUpload = ({
    onChange,
    endpoint
}:FileUploadProps) => {
  return (
    <UploadButton
    endpoint={endpoint}
    onClientUploadComplete={(res) => {
      onChange(res?.[0].url);
      console.log(res?.[0].url)
    }}
    onUploadError={(error: Error) => {
      // Do something with the error.
      toast.error(`ERROR! ${error?.message}`);
    }}
  />
  )
}

export default FileUpload