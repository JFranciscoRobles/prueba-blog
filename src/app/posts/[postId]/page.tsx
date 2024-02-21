import { postService } from "@/lib/client/services/postService";
import React from "react";
import { PostWithAuthor } from "../../../../types/Post";
import { formatDate } from "@/lib/client/utils";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: { postId: string } }) => {
  const post: PostWithAuthor = await getData(params.postId);

  if (!post) {
    return notFound();
  }

  const newDate = formatDate(post.publishedAt);

  return (
    <div className="flex flex-col my-8  space-y-8">
      <div className="flex flex-col space-y-8 my-4">
        <h1 className="text-2xl font-bold text-center">{post?.title}</h1>
        <p className="whitespace-break-spaces">{post?.content}</p>
      </div>
      <div>
        <span className="font-bold">@{post?.author.name}</span> - {newDate}
      </div>
    </div>
  );
};

export default Page;

async function getData(postId: string): Promise<PostWithAuthor> {
  const data = await postService.getPostById(postId);
  const { data: post } = data;
  return post;
}
