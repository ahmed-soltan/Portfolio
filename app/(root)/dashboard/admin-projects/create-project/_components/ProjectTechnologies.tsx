"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSkills } from "../hooks/use-skills";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProjectTechnologyProps = {
  form: any;
  onClick: (tech: string) => void;
  technologies: string[];
  onDeleteTechnology: (tech: string) => void;
};

const ProjectTechnologies = ({
  form,
  onClick,
  technologies,
  onDeleteTechnology,
}: ProjectTechnologyProps) => {
  const { skills } = useSkills();

  const AddTechnology = (tech: string) => {
    onClick(tech);
    console.log(tech);
    form.setValue("technology", "");
  };

  return (
    <div className="flex flex-col items-start gap-4 w-full ">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl">Project Technologies</h1>
      </div>
      <FormField
        control={form.control}
        name="technology"
        render={({ field }) => (
          <FormItem className="flex items-center flex-row space-x-3 space-y-0 rounded-md w-full">
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Technology" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {skills.map((skill) => (
                    <SelectItem value={skill.skill}>{skill.skill}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          technologies.map((technology: string, index: number) => (
            <h1
              className="bg-slate-200 text-slate-800 px-2 flex gap-2 items-center rounded-sm"
              key={index}
            >
              {technology}
              <X
                className="w-4 h-4 cursor-pointer font-thin"
                onClick={() => onDeleteTechnology(technology)}
              />
            </h1>
          ))}
      </div>
    </div>
  );
};

export default ProjectTechnologies;
