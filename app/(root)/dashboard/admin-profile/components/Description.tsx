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
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, X } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
const Description = ({
  description,
  profileId,
}: {
  description: string;
  profileId: string;
}) => {
  const [isEditting, setIsEditting] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      description: description || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;


  const isChanged = form.getValues("description") !== description;


  const onSubmit = async (data: FieldValues) => {
    try {
      await axios.patch(`/api/profile/${profileId}`, data);
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditting(false);
    }
  };



  return (
    <div className="flex flex-col items-start gap-2 w-full border-sky-500">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl">Description</h1>
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder='e.g. "I am a Web Developer..."'
                      {...field}
                      className="max-w-[500px] h-[250px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant={"success"}
              disabled={isSubmitting || !isValid || !isChanged}
            >
              Save
            </Button>
          </form>
        </Form>
      ) : description ? (
        <h1 className="text-base text-slate-700 dark:text-slate-400 ">
          {description}
        </h1>
      ) : (
        <h1 className="text-base text-slate-700 dark:text-slate-400 italic">You Have Not Provided a Description</h1>
      )}
    </div>
  );
};

export default Description;
