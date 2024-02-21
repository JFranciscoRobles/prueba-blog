import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

function Footer({}: Props) {
  return (
    <div className="w-full flex">
      <Link
        href={"https://github.com/JFranciscoRobles/prueba-blog"}
        className="ml-auto"
      >
        <Button variant={"link"}>@Github</Button>
      </Link>
    </div>
  );
}

export default Footer;
