import PostForm from "@/components/post/PostForm";
import { db } from "@/lib/server/db";
import React from "react";

type Props = {};

const Page = async ({ params }: { params: { postId: string } }) => {
  const post = await db.post.findFirst({
    where: {
      id: params.postId,
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

  if (!post) {
    return 404;
  }

  const fechaOriginal = new Date(post.publishedAt);
  const fechaFormateada = fechaOriginal.toLocaleDateString("es-ES");

  return (
    <div className="flex flex-col my-8  space-y-8">
      <div className="flex flex-col space-y-8 my-4">
        <h1 className="text-2xl font-bold text-center">{post?.title}</h1>
        <p className="whitespace-break-spaces">{post?.content}</p>
      </div>
      <div>
        <span className="font-bold">@{post?.author.name}</span> -{" "}
        {fechaFormateada}
      </div>
    </div>
  );
};

export default Page;
