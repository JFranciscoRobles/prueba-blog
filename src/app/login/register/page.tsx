import RegisterForm from "@/components/auth/RegisterForm";
import React from "react";

type Props = {};

function Page({}: Props) {
  return (
    <div className="flex flex-col my-8  space-y-8">
      <h1 className="text-2xl font-bold text-center">Register</h1>
      <RegisterForm />
    </div>
  );
}

export default Page;
