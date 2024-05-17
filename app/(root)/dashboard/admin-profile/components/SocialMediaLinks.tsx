"use client";
import { FieldValues, useForm, useFieldArray } from "react-hook-form";
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
import { ExternalLink, Facebook, Link2, LucideIcon, Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { SocialMediaLinks } from "@prisma/client";
import Link from "next/link";

const SocialMediaLinksComponent = ({ socialMediaLinks, profileId }: { socialMediaLinks: {
  app: string;
  link: string;
}[]; profileId: string }) => {
  const [isEditting, setIsEditting] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      socialMediaLinks: socialMediaLinks || [],
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "socialMediaLinks",
  });

  const onSubmit = async (data: FieldValues) => {
    const LinksData ={
      ...data,
      profileId:profileId,
    }
    try {
      await axios.patch(`/api/profile/${profileId}/socialMediaLinks`, LinksData);
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditting(false);
    }
    console.log(data)
  };

  useEffect(() => {
    form.reset({ socialMediaLinks });
  }, [socialMediaLinks, form]);

  const isChanged = JSON.stringify(form.getValues("socialMediaLinks")) !== JSON.stringify(socialMediaLinks);

  return (
    <div className="flex flex-col items-start gap-2 w-full border-sky-500">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl lg:text-2xl font-medium">Social Media Links</h1>
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
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-4">
                <FormField
                  control={form.control}
                  name={`socialMediaLinks.${index}.app`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="App Name"
                          {...field}
                          className="max-w-[150px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`socialMediaLinks.${index}.link`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Link"
                          {...field}
                          className="max-w-[250px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
               
                <Button
                  variant={"destructive"}
                  size={"sm"}
                  onClick={() => remove(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button type="button" className="mx-2" onClick={() => append({ app: "", link: "" })}>
              Add Link
            </Button>
            <Button type="submit" variant={"success"} disabled={isSubmitting || !isValid || !isChanged}>
              Save
            </Button>
          </form>
        </Form>
      ) : socialMediaLinks.length>0 ? (
        <ul className="text-base text-slate-700 dark:text-slate-400 flex flex-col gap-2">
          {socialMediaLinks.map((link, index) =>{
            return (
              <Link href={link.link} key={index} className=" text-sky-700 dark:text-sky-400 underline w-[130px] px-2 rounded-md flex items-center gap-2">
                  <ExternalLink className="w-4 h-4"/>
                  {link.app}
              </Link>
            )
          })}
        </ul>
      ) : (
        <h1 className="text-base text-slate-700 dark:text-slate-400 italic">
          You have not provided any social media links.
        </h1>
      )}
    </div>
  );
};

export default SocialMediaLinksComponent;
