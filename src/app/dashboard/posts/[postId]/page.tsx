import PostForm from "@/components/post/PostForm";
import { auth } from "@/lib/auth";
import { postService } from "@/lib/client/services/postService";
import { Post } from "@prisma/client";
import { notFound } from "next/navigation";

import React from "react";

const Page = async ({ params }: { params: { postId: string } }) => {
  const session = await auth();
  const post = await getData(params.postId);
  const title = post ? "Edit Post" : "New Post";
  const description = post
    ? "Edit the post data."
    : "Form to create a new post";

  if (!post) {
    return notFound();
  }

  if (post.userId !== session?.user.id) {
    return notFound();
  }

  return (
    <div className="flex flex-col my-8  space-y-8">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-center">{title}</h1>
        <h2 className="text-xl font-semibold text-center">{description}</h2>
      </div>
      <PostForm initialData={post} />
    </div>
  );
};

export default Page;

async function getData(postId: string): Promise<Post> {
  const data = await postService.getPostById(postId);
  return data.data;
}
