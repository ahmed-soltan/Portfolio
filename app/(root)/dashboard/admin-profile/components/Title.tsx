"use client";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from 'axios'
const Title = ({title , profileId}:{title:string , profileId:string}) => {
  const [isEditting, setIsEditting] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      title: title||"",
    },
  });

  const {isSubmitting , isValid} = form.formState;

  const onSubmit = async (data: FieldValues) => {
    try {
      await axios.patch(`/api/profile/${profileId}`,data);
      router.refresh()
    } catch (error) {
      console.log(error)
    }finally {
      setIsEditting(false)
    }
  };
  useEffect(()=>{
    
  },[])
  const isChanged = form.getValues("title") !== title;

  return (
    <div className="flex flex-col items-start gap-2 w-full border-sky-500">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl">Title</h1>
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
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='e.g. "Hello, My Name is Ahmed..."'
                      {...field}
                      className="max-w-[500px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant={"success"} disabled={isSubmitting || !isValid || !isChanged}>
              Save
            </Button>
          </form>
        </Form>
      ) :title ? (
        <h1 className="text-base text-slate-700 dark:text-slate-400">
          {title}
        </h1>
      ) : (
        <h1 className="text-base text-slate-700 dark:text-slate-400 italic">You Have Not Provided a Title</h1>
      )}
    </div>
  );
};

export default Title;
