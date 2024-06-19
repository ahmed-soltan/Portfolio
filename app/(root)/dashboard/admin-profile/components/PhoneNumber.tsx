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
const PhoneNumber = ({phoneNumber , profileId}:{phoneNumber:string , profileId:string}) => {
  const [isEditting, setIsEditting] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      phoneNumber: phoneNumber||"",
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
  const isChanged = form.getValues("phoneNumber") !== phoneNumber;

  return (
    <div className="flex flex-col items-start gap-2 w-full border-sky-500">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl">Phone Number</h1>
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='e.g. "+20 123 456 7890"'
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
      ) :phoneNumber ? (
        <h1 className="text-base text-slate-700 dark:text-slate-400">
          {phoneNumber}
        </h1>
      ) : (
        <h1 className="text-base text-slate-700 dark:text-slate-400 italic">You Have Not Provided a Phone Number</h1>
      )}
    </div>
  );
};

export default PhoneNumber;
