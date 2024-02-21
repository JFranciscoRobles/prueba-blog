import PostsContainer from "@/components/post/PostsContainer";
import { auth } from "@/lib/auth";
import React from "react";
import { PostWithAuthor } from "../../../../types/Post";
import { postService } from "@/lib/client/services/postService";

const Page = async () => {
  const session = await auth();
  const posts: PostWithAuthor[] = await getData(session?.user.id || "");

  const title = "My Posts";
  const description = "Explore your collection of posts";
  return (
    <div className="flex flex-col my-8  space-y-8">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-center">{title}</h1>
        <h2 className="text-xl font-semibold text-center">{description}</h2>
      </div>
      <PostsContainer data={posts} edit />
    </div>
  );
};

export default Page;

async function getData(userId: string): Promise<PostWithAuthor[]> {
  const data = await postService.getPostByUser(userId);
  const { data: posts } = data;
  return posts.data;
}
