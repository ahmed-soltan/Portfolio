"use client";
import { Button } from "@/components/ui/button";
import { Trash, X } from "lucide-react";
import React, { useState } from "react";
import ConfirmModel from "../../admin-projects/_components/ConfirmModel";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ActionButton = ({messageId}:{messageId:string}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const deleteMessage = async() => {
    try {
        setIsLoading(true);
        await axios.delete(`/api/messages/${messageId}`)
        router.refresh();
        router.push('/dashboard/admin-messages')
        toast.success("Project Deleted")
    } catch (error) {
        toast.error("someThing went Wrong")
        console.log(error)
    }finally{
        setIsLoading(false);
    }
  };
  return (
    <ConfirmModel onConfirm={deleteMessage}>
      <Button disabled={isLoading} variant={"destructive"} size={"sm"}>
        <Trash className="h-4 w-4" />
      </Button>
    </ConfirmModel>
  );
};

export default ActionButton;
