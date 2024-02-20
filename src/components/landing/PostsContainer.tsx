import React from "react";
import PostCard from "./PostCard";
import { Noto_Sans } from "next/font/google";

const NotoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

type Props = {};

function PostsContainer({}: Props) {
  return (
    <div className={`${NotoSans.className} my-8 flex flex-col p-2`}>
      <PostCard />
    </div>
  );
}

export default PostsContainer;
