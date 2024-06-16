"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type ProjectTechnoloyProps = {
  form: any;
  onClick: (tech: string) => void;
  technologies: string[];
  onDeleteTechnology:(tech:string)=>void
};
const ProjectTechnologies = ({
  form,
  onClick,
  technologies,
  onDeleteTechnology
}: ProjectTechnoloyProps) => {
  const AddTechnology = (tech: string) => {
    onClick(tech);
    console.log(tech)
    form.setValue("technology", "");
  };
  return (
    <div className="flex flex-col items-start gap-4 w-full ">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl">Project Technolgies</h1>
      </div>
      <FormField
        control={form.control}
        name="technology"
        render={({ field }) => (
          <FormItem className="flex items-center flex-row space-x-3 space-y-0 rounded-md w-full">
            <FormControl>
              <Input
                placeholder='e.g. "Next"'
                {...field}
                className="max-w-full"
              />
            </FormControl>
            <Button
              onClick={() => AddTechnology(form.getValues("technology"))}
              variant={"default"}
              type="button"
            >
              Add
            </Button>
          </FormItem>
        )}
      />
      <div className="flex items-center gap-2 flex-wrap">
        {technologies.length > 0 &&
          technologies.map((technology: string , index:number) => (
            <h1 className="bg-slate-200 text-slate-800 px-2 flex gap-2 items-center rounded-sm" key={index}>
              {technology}
              <X className="w-4 h-4 cursor-pointer font-thin" onClick={()=>onDeleteTechnology(technology)}/>
            </h1>
          ))}
      </div>
    </div>
  );
};

export default ProjectTechnologies;
