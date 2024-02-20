import LoginForm from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {};

function Page({}: Props) {
  return (
    <div className="flex flex-col my-8  space-y-8">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <LoginForm />
      <Link href={"/login/register"}>
        <Button variant={"link"} className="p-0">
          Register here, start writing for the blog.
        </Button>
      </Link>
    </div>
  );
}

export default Page;
