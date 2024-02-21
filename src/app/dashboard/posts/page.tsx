import PostsContainer from "@/components/post/PostsContainer";
import { auth } from "@/lib/auth";
import React from "react";
import { postService } from "@/lib/client/services/postService";
import PostSearch from "@/components/post/PostSearch";
import PostPagination from "@/components/post/PostPagination";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

async function Page({ searchParams }: Props) {
  const session = await auth();
  const data = await getData(session?.user.id || "", searchParams);

  const title = "My Posts";
  const description = "Explore your collection of posts";
  return (
    <div className="flex flex-col my-8  space-y-8">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-center">{title}</h1>
        <h2 className="text-xl font-semibold text-center">{description}</h2>
      </div>
      <PostSearch />
      <PostsContainer data={data.data.data} edit />
      <PostPagination data={data.data.paginationInfo} />
    </div>
  );
}

export default Page;

async function getData(userId: string, searchParams: any) {
  const data = await postService.getPostByUser(userId, searchParams);
  return data;
}
