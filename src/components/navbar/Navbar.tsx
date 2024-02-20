import React from "react";
import Link from "next/link";
import UserMenu from "../auth/UserMenu";

type Props = {};

function Navbar({}: Props) {
  return (
    <div className="flex w-full justify-center items-center flex-wrap">
      <Link href={"/"} className="text-xl font-bold  hover:bg-slate-200 p-1">
        Tech Blog
      </Link>
      <UserMenu />
    </div>
  );
}

export default Navbar;
