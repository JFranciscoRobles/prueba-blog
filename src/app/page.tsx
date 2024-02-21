import PostsContainer from "@/components/post/PostsContainer";
import { Button } from "@/components/ui/button";
import { postService } from "@/lib/client/services/postService";
import Link from "next/link";
import React from "react";

type Props = {};

async function Page() {
  const { data } = await getData();

  return (
    <div className="flex flex-col my-8">
      <h1 className="text-2xl font-bold text-center my-8">Lastest Posts</h1>
      <PostsContainer data={data.data} />
      <Link href={"/posts"}>
        <Button className="w-full">View more Posts</Button>
      </Link>
    </div>
  );
}

export default Page;

async function getData() {
  const data = await postService.getPosts();
  return data;
}
