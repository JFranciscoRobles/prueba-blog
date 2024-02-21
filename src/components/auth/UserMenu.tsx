"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {};

function UserMenu({}: Props) {
  const { data: session } = useSession();
  return !session ? (
    <Link href={"/login"} className="ml-auto">
      <Button size={"sm"} variant={"link"}>
        Iniciar Sesión
      </Button>
    </Link>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="ml-auto" size={"sm"}>
          Menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={"/dashboard/posts/new"}>
            <DropdownMenuItem>
              New Post
              <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href={"/dashboard/posts"}>
            <DropdownMenuItem>
              My Posts
              <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            Log out
            <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
