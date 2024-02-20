import React from "react";
import { Separator } from "../ui/separator";
import { Post } from "@prisma/client";
import { User } from "next-auth";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  data: Post & {
    author: User;
  };
  edit?: boolean;
};

function PostCard({ data, edit = false }: Props) {
  const fechaOriginal = new Date(data.publishedAt);
  const fechaFormateada = fechaOriginal.toLocaleDateString("es-ES");
  const descripcionReducida =
    data.content.length > 70
      ? `${data.content.substring(0, 70)}...`
      : data.content;

  return (
    <article className="flex flex-col space-y-1">
      <div className="flex flex-wrap ">
        <h1 className="text-md font-bold">{data.title}</h1>

        <div className="flex gap-4 ml-auto">
          <Link href={`/posts/${data.id}`}>
            <Button size={"sm"}>View post</Button>
          </Link>

          {edit && <Button size={"sm"}>{edit ? "Published" : "Draft"}</Button>}
          {edit && <Button size={"sm"}>{"Edit"}</Button>}
        </div>
      </div>
      <p className="text-sm max-ch">{descripcionReducida}</p>

      <span className="text-xs">
        <span className="font-semibold">@{data.author.name}</span> -{" "}
        {fechaFormateada}
      </span>

      <Separator decorative />
    </article>
  );
}

export default PostCard;
