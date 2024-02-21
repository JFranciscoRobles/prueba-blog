import PostsContainer from "@/components/post/PostsContainer";
import PostPagination from "@/components/post/PostPagination";
import PostSearch from "@/components/post/PostSearch";
import { postService } from "@/lib/client/services/postService";
import React from "react";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

async function Page({ searchParams }: Props) {
  const { data } = await getData(searchParams);
  return (
    <div className="flex flex-col my-8">
      <h1 className="text-2xl font-bold text-center my-8">View all Posts</h1>
      <PostSearch />
      <PostsContainer data={data.data} />
      <PostPagination data={data.paginationInfo} />
    </div>
  );
}

export default Page;

async function getData(searchParams: any) {
  const data = await postService.getPosts(searchParams);
  return data;
}
