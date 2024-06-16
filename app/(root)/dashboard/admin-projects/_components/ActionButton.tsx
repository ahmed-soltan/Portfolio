"use client";
import { Button } from "@/components/ui/button";
import { Trash, X } from "lucide-react";
import React, { useState } from "react";
import ConfirmModel from "./ConfirmModel";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ActionButton = ({projectId , profileId}:{projectId:string , profileId:string}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const deleteProject = async() => {
    try {
        setIsLoading(true);
        await axios.delete(`/api/profile/${profileId}/projects/${projectId}`)
        router.refresh();
        router.push('/dashboard/admin-projects')
        toast.success("Project Deleted")
    } catch (error) {
        toast.error("someThing went Wrong")
        console.log(error)
    }finally{
        setIsLoading(false);
    }
  };
  return (
    <ConfirmModel onConfirm={deleteProject}>
      <Button disabled={isLoading} variant={"destructive"} size={"sm"}>
        <Trash className="h-4 w-4" />
      </Button>
    </ConfirmModel>
  );
};

export default ActionButton;
