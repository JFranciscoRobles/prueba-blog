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

import { Post } from "@prisma/client";

import { Textarea } from "../ui/textarea";
import { postService } from "@/lib/client/services/postService";
import { useSession } from "next-auth/react";

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
}

const PostForm: React.FC<PostFormProps> = ({ initialData }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const toastMessage = initialData ? "Updated Post" : "Post Created.";
  const action = initialData ? "Save Changes" : "New Post";

  const form = useForm<PostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      userId: session?.user.id,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      let s_postId;
      if (!initialData) {
        const newPost = await postService.newPost(values);
        s_postId = newPost.data.id;
      } else {
        if (!session) {
          return 404;
        }
        await postService.updatePost(values, initialData.id, session);

        s_postId = initialData.id;
      }

      toast({
        variant: "default",
        title: "Success",
        description: toastMessage,
      });

      router.push(`/posts/${s_postId}`);
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
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
                <Input disabled={loading} {...field} />
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
                <Textarea disabled={loading} {...field} />
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
