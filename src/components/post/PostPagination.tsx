"use client";
import React from "react";
import { Button } from "../ui/button";
import { PageInfo } from "@/app/api/posts/route";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  data: PageInfo;
};

const PostPagination = ({ data }: Props) => {
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(data.totalItems / data.itemsPerPage);
  const currentPage = Math.floor(data.currentPage / data.itemsPerPage) + 1;

  const startPage = Math.max(1, currentPage - 4);
  const endPage = Math.min(startPage + 9, totalPages);

  const generatePageLink = (page: number) => {
    const searchParamString = searchParams?.get("search")
      ? `search=${searchParams.get("search")}&`
      : "";
    return `/posts/?${searchParamString}page=${
      (page - 1) * data.itemsPerPage
    }&limit=${data.itemsPerPage}`;
  };

  return (
    <div className="flex w-full gap-4 justify-end items-center flex-wrap">
      <span>Page: </span>
      <Link passHref href={generatePageLink(1)}>
        <Button variant={"outline"} disabled={currentPage === startPage}>
          Start
        </Button>
      </Link>
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <Link
          passHref
          href={generatePageLink(startPage + index)}
          key={startPage + index}
        >
          <Button
            variant={"outline"}
            disabled={currentPage === startPage + index}
          >
            {startPage + index}
          </Button>
        </Link>
      ))}
      <Link passHref href={generatePageLink(totalPages)}>
        <Button variant={"outline"} disabled={currentPage === endPage}>
          End
        </Button>
      </Link>
    </div>
  );
};

export default PostPagination;
