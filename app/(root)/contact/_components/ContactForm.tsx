"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
const formSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  message: z.string().min(3),
});

const ContactForm = ({signedIn}:{signedIn:boolean}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/messages", data);
      toast.success("Your message has been sent successfully");
    } catch (error) {
      console.log(error);
      toast.error("Soemthing went wrong");
    } finally {
      form.reset();
    }
  };

  return (
    <div className="mt-5 w-full flex flex-col items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full lg:w-[600px] "
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. 'John Doe'" />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. 'John@gmail.com'" />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="e.g. 'Greet Job'" />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
                {!signedIn && <div className='text-rose-400'>You Have To be Signed in to send a Message</div>}
          <Button disabled={isSubmitting || !signedIn}>Send</Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
