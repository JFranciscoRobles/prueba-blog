import PostForm from "@/components/post/PostForm";
import { db } from "@/lib/server/db";
import React from "react";

type Props = {};

const Page = async ({ params }: { params: { postId: string } }) => {
  const post = await db.post.findFirst({
    where: {
      id: params.postId,
    },
  });

  const title = post ? "Edit Post" : "New Post";
  const description = post
    ? "Edit the post data."
    : "Form to create a new post";

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
