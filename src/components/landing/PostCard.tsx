import React from "react";
import { Separator } from "../ui/separator";

type Props = {};

function PostCard({}: Props) {
  return (
    <article>
      <h1 className="text-md font-bold">Making web faster</h1>
      <p className="text-sm max-ch">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Di
      </p>
      <span className="text-xs">
        <span className="font-semibold">@Angel Frontera</span> - June 23, 2021
      </span>
      <Separator decorative />
    </article>
  );
}

export default PostCard;
