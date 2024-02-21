import PostsContainer from "@/components/landing/PostsContainer";
import { auth } from "@/lib/auth";
import { db } from "@/lib/server/db";
import React from "react";

type Props = {};

const Page = async () => {
  const session = await auth();
  const posts = await db.post.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const title = "My Posts";
  const description = "Explore a curated collection of posts";
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
