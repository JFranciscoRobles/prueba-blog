import { auth } from "@/lib/auth";
import React from "react";

type Props = {};

async function Page() {
  const session = await auth();
  console.log(session);
  return <p>Welcome ! {session?.user.email}</p>;
}

export default Page;
