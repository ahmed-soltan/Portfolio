"use client"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react";

const CVButton = ({cv}:{cv:string}) => {

    const downloadCV = ()=>{
        const fileName = "Ahmed_Sultan_CV";
        const link = document.createElement("a");
        link.href = cv;
        link.setAttribute("download" , fileName);
        document.body.appendChild(link);
        link.target = "_blank";
        link.click();
        link.remove();
    }

  return (
    <Button variant={"default"} onClick={downloadCV}>
        <Download className="w-4 h-4 mr-2"/>
        Download CV
    </Button>
  )
}

export default CVButton