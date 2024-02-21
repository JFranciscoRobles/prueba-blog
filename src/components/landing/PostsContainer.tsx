import React from "react";
import PostCard from "./PostCard";
import { Noto_Sans } from "next/font/google";
import { Post } from "@prisma/client";
import { User } from "next-auth";

const NotoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

type Props = {
  data: Post[] & {
    author: User;
  };
  edit?: boolean;
};

function PostsContainer({ data, edit = false }: Props) {
  return (
    <div className={`${NotoSans.className} my-8 flex flex-col p-2 space-y-8`}>
      {data.map((post) => (
        <PostCard key={post.id} data={post} edit={edit} />
      ))}
    </div>
  );
}

export default PostsContainer;
