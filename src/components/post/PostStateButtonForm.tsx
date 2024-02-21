"use client";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { Post } from "@prisma/client";
import { postService } from "@/lib/client/services/postService";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  Published: z.boolean(),
  publishedAt: z.date(),
});

type PostFormValues = z.infer<typeof formSchema>;

interface PostFormProps {
  initialData: PostFormValues & Post;
}

const PostStateButtonForm: React.FC<PostFormProps> = ({ initialData }) => {
  const { data: session } = useSession();

  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const toastMessage = "Updated Post";

  const form = useForm<PostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Published: !initialData.Published,
      publishedAt: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      if (!session) {
        return 404;
      }
      const updatePost = await postService.updatePost(
        values,
        initialData.id,
        session
      );
      console.log(updatePost);
      toast({
        variant: "default",
        title: "Success",
        description: toastMessage,
      });

      router.refresh();
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
        <Button disabled={loading} className="w-full" type="submit" size={"sm"}>
          {initialData.Published ? "Published" : "Draft"}
        </Button>
      </form>
    </Form>
  );
};

export default PostStateButtonForm;
