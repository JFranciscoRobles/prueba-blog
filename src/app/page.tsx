import UserMenu from "@/components/auth/UserMenu";
import PostsContainer from "@/components/landing/PostsContainer";
import { auth } from "@/lib/auth";
import React from "react";

type Props = {};

async function Page() {
  const session = await auth();

  return (
    <div className="flex flex-col">
      <PostsContainer />
    </div>
  );
}

export default Page;
