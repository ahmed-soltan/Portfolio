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
import {  useState } from "react";
import { Dot, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
const Skills = ({
  skills,
  profileId,
}: {
  skills: {
    id: string;
    skill: string;
  }[];
  profileId: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      skill: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: FieldValues) => {
    const skilData = {
      skill: data.skill,
      profileId: profileId,
    };
    try {
      await axios.patch(`/api/profile/${profileId}/skills`, skilData);
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      form.reset();
    }
  };
  const onDelete = async (id: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/profile/${profileId}/skills/${id}`);
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2 w-full border-sky-500">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl lg:text-2xl font-medium">Add Skills</h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="skill"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='e.g. "HTML"'
                    {...field}
                    className="max-w-[300px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={"success"}
            disabled={isSubmitting || !isValid || isLoading}
          >
            Add
          </Button>
        </form>
      </Form>
      {skills.length ? (
        <div className="flex flex-col items-start gap-3 mt-2">
          <Separator />
          <h1 className="text-xl lg:text-2xl font-medium">Your Skills</h1>

          <ul className="flex flex-col items-start gap-2 mt-5 max-h-[450px] flex-wrap justify-between w-[500px]">
            {skills.map((skill) => (
              <li
                className="text-base text-slate-700 dark:text-slate-400 flex items-center gap-2 w-[200px] justify-between"
                key={skill.id}
              >
                <div className="flex items-center">
                  <Dot className="w-10 h-10" />
                  {skill.skill}
                </div>
                <Button
                  variant={"ghost"}
                  onClick={() => onDelete(skill.id)}
                  disabled={isLoading}
                >
                  <XCircle className="w-4 h-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h1 className="text-base text-slate-700 dark:text-slate-400 italic">
          You Have Not Provided a Skills
        </h1>
      )}
    </div>
  );
};

export default Skills;
