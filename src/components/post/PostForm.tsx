"use client";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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

import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { userService } from "@/lib/server/services/userService";
import { Post } from "@prisma/client";
import { Session } from "next-auth";

const formSchema = z.object({
  title: z.string({
    required_error: "Title Required",
  }),
  content: z.string({
    required_error: "Description Required",
  }),

  userId: z.string(),
});

type PostFormValues = z.infer<typeof formSchema>;

interface PostFormProps {
  initialData: (PostFormValues & Post) | null;
  session: Session;
}

const PostForm: React.FC<PostFormProps> = ({ initialData, session }) => {
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Post" : "New Post";
  const description = initialData
    ? "Edit the post data."
    : "Form to create a new post";
  const toastMessage = initialData ? "Updated Post" : "Post Created.";
  const action = initialData ? "Save Changes" : "New Post";

  const form = useForm<PostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await userService.newUser(values);

      toast({
        variant: "default",
        title: "Éxito",
        description: toastMessage,
      });

      router.push(`/`);
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Incorrecto",
        description: error.response.data,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} className="w-full" type="submit">
          {action}
        </Button>
      </form>
    </Form>
  );
};

export default PostForm;
